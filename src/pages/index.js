import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from '../firebase.js'
import Book from './components/book.js'
export default function Home() {
  const [books, set_books] = useState([])
  const [error, set_error] = useState(false)

  async function get_books() {
    try {
      console.log("here")
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
    <main>
      <Head>
        <title>Tiny Library</title>
        <link rel="icon" href="./favicon.ico" />
      </Head>
      <div className='font-mono ml-10 mt-10'>
        <h1 className="font-mono text-5xl">Tiny Library📚</h1>
        <div className="text-2xl ml-2 mt-5">
          <Link href="/upload">
            <u>Go to uploads page📁</u>
          </Link>
        </div>
        <div className='ml-10 mt-5'>
          <h2 className='font-mono text-2xl '>List of Books</h2>
          <ul className='font-mono ml-5 mt-2'>

            {books.map((item, index) => (
                <Book name={item.name} href={item.downloadURL} />
            ))}
          </ul>
        </div>
        <Error_component error={error} />
      </div>
    </main>
  );
}
