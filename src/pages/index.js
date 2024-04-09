import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from '../firebase.js'
import Book from './components/book.js'
import { getStorage, ref, deleteObject } from "firebase/storage"
import { doc, getDoc, deleteDoc } from "firebase/firestore"

export default function Home() {
  const [books, set_books] = useState([])
  const [error, set_error] = useState(false)
  const [getting_books, set_getting_books] = useState(true)
  const storage = getStorage()

  async function get_books() {
    set_getting_books(true)
    try {
      const books_ref = collection(db, "books");
      const q = query(books_ref, orderBy("name"), limit(10));
      const query_snapshot = await getDocs(q);
      let books_ = []
      query_snapshot.forEach((doc) => {
        books_.push(doc.data())
      });
      set_books(books_)
    } catch (e) {
      set_error(e.toString())
    }
    set_getting_books(false)
  }
  async function delete_book(doc_name, storage_ref) {
    await deleteDoc(doc(db, "books", doc_name))
    const file_ref = ref(storage, storage_ref);
    await deleteObject(file_ref)
    await get_books()
  }
  function Error_component(props) {
    const error_ = props.error;
    if (error_) {
      return (
        <div className='ml-5 text-red-500'>
          <b className='text-red-600'>Error:</b>
          {`${error_}`}
        </div>
      )
    } else {
      return <></>;
    }
  }

  useEffect(() => {
    get_books();
  }, []); // empty dependency array
  return (
    <main className='font-mono'>
      <Head>
        <title>Tiny Library</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <div className='ml-10 mt-10'>
        <h1 className="text-5xl">Tiny Library📚</h1>
        <div className="text-2xl ml-2 mt-5">
          <Link href="/upload">
            <u>Go to uploads page📁</u>
          </Link>
        </div>
        <div className='ml-5 mt-5'>
          <h2 className='text-2xl ml'>List of Books</h2>
          {getting_books && (
            <h2 className='text-xl ml-5 mt-2'>
              Getting books...
            </h2>
          )}

          <ul className='ml-4 mt-2'>

            {books.map((item, index) => (
              <Book
                key={index}
                name={item.name}
                storage_ref={item.ref}
                doc_name={item.doc_name}
                callback={delete_book}
                href={item.downloadURL} />
            ))}
          </ul>
        </div>
        <Error_component error={error} />
      </div>
    </main>
  );
}
