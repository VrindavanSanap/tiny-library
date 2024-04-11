import { getStorage, ref, deleteObject } from "firebase/storage"
import { db } from "@/firebase"
import { doc, getDoc, deleteDoc } from "firebase/firestore"

export default function Book(props) {
  const storage = getStorage()


  return (
    <li className="ml-5 mt-5" key={props.name}>
      <div>
        <h3 className="text-xl">{props.name}</h3>
        <div className="mt-2">
          <a
            href={props.href}
            target="_blank"
            className='inline-flex items-center justify-center px-3 py-2 text-base font-medium leading-6 text-gray-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none'>
            Download
          </a>
          &nbsp;&nbsp;
          <a
            onClick={() => { props.callback(props.doc_name, props.storage_ref) }}
            className='inline-flex items-center justify-center px-3 py-2 text-base font-medium leading-6 text-red-600 whitespace-no-wrap bg-white border border-gray-200 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:shadow-none'>
            Delete
          </a>


        </div>
      </div>
    </li>
  )
}
