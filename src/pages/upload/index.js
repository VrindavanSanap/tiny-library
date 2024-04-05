import Link from 'next/link'
import { useState } from "react";
import { db } from '../index.js'
import { doc, setDoc } from "firebase/firestore"; 

export default function AboutPage() {
  const [name, set_name] = useState("");
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
