import { useState, useEffect } from 'react'
import Link from 'next/link'
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { db } from './firebase.js'

export default function Home() {
  const [books, set_books] = useState([])
  async function get_books() {
    const books_ref = collection(db, "books");
    const q = query(books_ref, orderBy("name"), limit(3));
    const query_snapshot = await getDocs(q);
    let books_ = []
    query_snapshot.forEach((doc) => {
      books_.push(doc.data())
    });
    set_books(books_)
  }
  useEffect(() => {
    get_books()
    return () => {
      //
    };
  }, []);

  get_books()
  return (
    <main>
      <h1 className="font-mono text-5xl">Tiny Library📚</h1>
      <br />
      <Link className="font-mono text-1xl" href="/upload">
        <u>Go to upload page📁</u>
      </Link>
      <br />
      <div>
        <h2 className='font-mono text-2xl'>List of Books</h2>
        <ul className='font-mono'>
          {books.map((item, index) => (
            <li key={index}><a href='google.com' target="_blank"className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600 cursor-pointer'>{item.name}</a></li>
          ))}
        </ul>
      </div>

    </main>
  );
}
