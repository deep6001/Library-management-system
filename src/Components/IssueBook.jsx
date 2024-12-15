import React, { useEffect, useState } from 'react';
import img from '../assets/image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, addDoc, collection } from "firebase/firestore"; // Firestore functions
import { db } from './firebase';  // Import Firestore instance

function IssueBook() {
    const navigate = useNavigate();
  const { bookId } = useParams();  // Get the bookId from URL params
  const [bookData, setBookData] = useState(null);  // Store book data
  const [loading, setLoading] = useState(true);  // Loading state
  const [userName, setUserName] = useState('');  // Store user's name
  const [userEmail, setUserEmail] = useState('');  // Store user's email

  // Fetch the book data from Firestore by bookId
  const fetchBookData = async (id) => {
    try {
      const bookDoc = doc(db, "books", id);  
      const docSnap = await getDoc(bookDoc);  

      if (docSnap.exists()) {
        setBookData(docSnap.data());  
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching book data: ", error);
    } finally {
      setLoading(false);  // Stop loading once data is fetched
    }
  };

  // Function to handle issuing the book
  const handleIssueBook = async () => {
    if (!userName || !userEmail) {
      alert("Please enter your name and email.");
      return;
    }

    try {
      await addDoc(collection(db, "IssuedBooks"), {
        bookName: bookData.bookName,
        authorName: bookData.authorName,
        userName: userName,
        email: userEmail,
      });
      console.log("Book issued successfully!");

      
      // Clear the input fields after issuing
      setUserName('');
      setUserEmail('');
      navigate('/home');
    } catch (error) {
      console.error("Error issuing book: ", error);
    }
  };

  useEffect(() => {
    fetchBookData(bookId);  // Call fetch function when component mounts
  }, [bookId]);

  if (loading) {
    return <div>Loading...</div>;  // Show loading while fetching
  }

  if (!bookData) {
    return <div>No book found!</div>;  // Show message if no book is found
  }

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <div className='w-[90%] md:w-[60%] h-[70%] flex flex-col sm:flex-row rounded-lg border'>
        <div className='w-full sm:w-[50%] sm:h-full h-[50%] flex justify-center items-center'>
          <img src={img} alt="" className='object-contain' />
        </div>
        <div className='w-full sm:w-[50%] border sm:h-full h-[50%] flex justify-start items-start flex-col gap-2 p-2'>
          <div className='text-3xl font-bold'>{bookData.bookName}</div> {/* Display book name */}
          <div className='text-xl font-semibold'>{bookData.authorName}</div> {/* Display author name */}

          <input 
            className='w-[80%] p-2 rounded-lg border sm:w-[100%] outline-none'
            type="text" 
            placeholder='Enter Your Name'
            value={userName} // Bind to state
            onChange={(e) => setUserName(e.target.value)} // Update state on change
          />

          <input 
            className='w-[80%] p-2 rounded-lg border sm:w-[100%] outline-none'
            type="text" 
            placeholder='Enter Email'
            value={userEmail} // Bind to state
            onChange={(e) => setUserEmail(e.target.value)} // Update state on change
          />

          <button 
            type='button' // Change to button to prevent form submission
            className='w-full p-2 border bg-blue-500 text-white cursor-pointer'
            onClick={handleIssueBook} // Handle click to issue book
          >
            Issue Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueBook;
