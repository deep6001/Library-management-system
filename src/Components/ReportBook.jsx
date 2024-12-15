import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase'; // Make sure to import your Firebase config

function ReportBook() {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle form submission and add the report to Firestore
  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "ReportedBooks"), {
        bookName: bookName,
        authorName: authorName,
        userName: userName,
        email: email,
      });
      console.log("Reported book added successfully!");

      // Clear the input fields after submission
      setBookName('');
      setAuthorName('');
      setUserName('');
      setEmail('');
    } catch (e) {
      console.error("Error adding reported book: ", e);
    }
  };

  return (
    <div className='flex flex-col items-center gap-2'>
      <h1 className='text-3xl font-bold'>Report Book</h1>

      <input 
        type="text" 
        placeholder='Enter book name' 
        className='p-2 outline-none border w-[400px]'
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        required
      />
      <input 
        type="text" 
        placeholder='Enter book author' 
        className='p-2 outline-none border w-[400px]'
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
        required
      />
      <input 
        type="text" 
        placeholder='Enter your name' 
        className='p-2 outline-none border w-[400px]'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        required
      />
      <input 
        type="text" 
        placeholder='Enter your email' 
        className='p-2 outline-none border w-[400px]'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button 
        className='p-2 bg-blue-500 text-white'
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default ReportBook;
