import Link from 'next/link'
import { useState } from "react";
import { db } from '../firebase.js'
import { doc, setDoc } from "firebase/firestore";

export default function AboutPage() {
  const [file, set_file] = useState(null);
  const [name, set_name] = useState("");
  const handle_file_change = (event) => {
    const file_ = event.target.files[0];
    // Check if a file is selected and if it is a PDF file
    if (file_ && file_.type === 'application/pdf') {
      set_file(file_);
      set_name(file_.name.slice(0,-4))
    } else {
      alert('Please select a PDF file.');
    }
  };


  async function handle_upload_click() {
    if (name) {
      await setDoc(doc(db, "books", name), {
        name: name
      });
    }
  }



  return (
    <div>

      <Link className="font-mono text-2xl" href="/"><u>Home</u></Link>
      <h1 className="font-mono text-5xl">Upload Page📁</h1>
      <br />
      <input type="file" accept=".pdf" onChange={handle_file_change} />
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
      <button className="font-mono bg-blue-500 hover:bg-blue-700 text-white py-1 px-2" onClick={handle_upload_click}>Upload</button>
    </div>
  )
}
