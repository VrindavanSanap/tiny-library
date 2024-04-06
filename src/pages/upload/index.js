import Link from 'next/link'
import { useState } from "react";
import { db } from '../../firebase'
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { confetti } from '@tsparticles/confetti';

export default function UploadPage() {

  const [file, set_file] = useState(null);
  const [name, set_name] = useState("");
  const [upload_completed, set_upload_completed] = useState(false);
  const storage = getStorage();

  const handle_file_change = (event) => {
    set_upload_completed(false)
    const file_ = event.target.files[0];
    if (file_ && file_.type === 'application/pdf') {
      set_file(file_);
      set_name(file_.name.slice(0, -4))
    } else {
      alert('Please select a PDF file.');
    }
  };


  async function handle_upload_click() {
    if (name && file) {
      try {
        // Set document in Firestore
        const storage_ref = ref(storage, `books/${name}`);
        const snapshot = await uploadBytes(storage_ref, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(snapshot.metadata)
        await setDoc(doc(db, "books", name), {
          name: name,
          downloadURL: downloadURL,
        });


        set_upload_completed(true);
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.75 },

        });
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('Name or file is missing.');
    }

  }



  return (
    <div className='ml-10 mt-10'>

      <Link className="font-mono text-2xl " href="/"><u>Home</u></Link>
      <h1 className="font-mono text-5xl">Upload Page📁</h1>
      <br />
      <input type="file" accept="application/pdf" onChange={handle_file_change} />
      {file && (
        <div className='font-mono'>
          <h3>Selected File:</h3>
          <p>Name: {file.name}</p>
          <p>Type: {file.type}</p>
          <p>Size: {file.size} bytes</p>
        </div>
      )}

      <br />

      <br />
      <label className="font-mono text-2xl" htmlFor="name">Book Name:</label>
      <input
        placeholder=""
        type={"text"}
        className="font-mono border border-gray-300 focus:border-blue-500"
        id="name"
        name="name"
        value={name}
        onChange={(e) => set_name(e.target.value)}
      />
      <br />
      <br />
      <h3 className="font-mono text-1xl">{upload_completed && "Finished upload YAY!!🎉"}</h3>
      <button
        className="font-mono bg-blue-500 hover:bg-blue-700 text-white py-1 px-2"
        onClick={handle_upload_click}>
        Upload
      </button>
    </div>
  )
}
