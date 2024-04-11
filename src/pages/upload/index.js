import Link from 'next/link'
import { useState } from "react";
import { db } from '../../firebase'
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { confetti } from '@tsparticles/confetti';

export default function UploadPage() {

  const [file, set_file] = useState(null);
  const [name, set_name] = useState("");
  const [uploading, set_uploading] = useState(false);
  const [upload_completed, set_upload_completed] = useState(false);
  const storage = getStorage();

  const handle_file_change = (event) => {
    set_upload_completed(false)
    const file_ = event.target.files[0];
    if (file_ && file_.type === 'application/pdf') {
      set_file(file_);
      set_name(file_.name)
    } else {
      alert('Please select a PDF file.');
    }
  };


  async function handle_upload_click() {
    set_uploading(true)
    if (name && file) {
      try {
        // Set document in Firestore
        const storage_ref = ref(storage, `books/${name}`);
        const metadata = {
          contentType: 'application/pdf',
        };

        const snapshot = await uploadBytes(storage_ref, file, metadata);
        
        const downloadURL = await getDownloadURL(snapshot.ref);
        await setDoc(doc(db, "books", name), {
          doc_name: name,
          name: name.slice(0, -4),
          downloadURL: downloadURL,
          ref: snapshot.metadata.fullPath,
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

    set_uploading(false)
  }



  return (
    <div className='font-mono ml-10 mt-10'>

      <Link className=" text-2xl " href="/"><u>Home</u></Link>
      <h1 className="font-mono text-5xl">Upload book</h1>
      <br />
      <input
        type="file"
        accept=".pdf"
        onChange={handle_file_change}
        className='
        block w-full 
      file:mr-4 file:py-2 file:px-4
       file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-200
      '
      />
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
      <h3 className="font-mono text-1xl mt-2">{uploading && "Uploading..."}</h3>
      <h3 className="font-mono text-1xl mt-2">{upload_completed && "Finished upload YAY!!🎉"}</h3>
      <button
        className="inline-flex items-center justify-center px-3 py-2 text-base font-medium leading-6 text-blue-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none"
        onClick={handle_upload_click}>
        Upload
      </button>
    </div>
  )
}
