import { getStorage,ref,  deleteObject } from "firebase/storage"
import { db } from "@/firebase"
import { doc, getDoc, deleteDoc } from "firebase/firestore"

export default function Book(props) {
  const storage = getStorage()


  return (
    <li className="ml-5 mt-5" key={props.name}>
      <div>
        <h3 className="text-xl">{props.name}</h3>
        <div className="">
          <a
            href={props.href}
            target="_blank"
            className='bg-blue-400 hover:bg-blue-700 text-white py-1 px-2 cursor-pointer'>
            Download
          </a>
          &nbsp;&nbsp;
          <a
            onClick={() => { props.callback(props.doc_name,props.storage_ref)}}
            className='bg-red-400 hover:bg-red-700 text-white py-1 px-2 cursor-pointer'>
            Delete
          </a>


        </div>
      </div>
    </li>
  )
}
