import React, { useState } from 'react';
import img from '../assets/image.png';
import ImageCard from './ImageCard';
import { collection, getDocs, query, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from './firebase';  // Firestore DB
import ReportBook from './ReportBook';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searched, setSearched] = useState(false);  // New state to track if search has been performed

  const fetchBookSuggestions = async (input) => {
    try {
      if (input.length === 0) {
        setSuggestions([]);
        setSearched(false);  // No search performed if input is empty
        return;
      }

      const booksQuery = query(
        collection(db, "books"),
        orderBy("bookName"),
        startAt(input),
        endAt(input + '\uf8ff')
      );
      const querySnapshot = await getDocs(booksQuery);

      const fetchedBooks = [];
      querySnapshot.forEach((doc) => {
        fetchedBooks.push({ id: doc.id, ...doc.data() });  // Include bookId (doc.id)
      });

      setSuggestions(fetchedBooks);
      setSearched(true);  // Search was performed
    } catch (e) {
      console.error("Error fetching book suggestions: ", e);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBookSuggestions(searchTerm);
  };

  return (
    <div className="font-bold flex flex-col items-center p-5 bg-gradient-to-b from-blue-100 via-indigo-100 to-purple-100 text-[#333] h-screen w-full overflow-y-auto overflow-x-hidden">
      <h1 className='text-[40px] sm:text-[60px] text-center mb-4 text-indigo-900 drop-shadow-md'>
        Library Management System
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form flex gap-2 mb-6">
        <input
          className='text-[#333] p-4 rounded-lg outline-none w-[80%] sm:w-[500px] font-sans text-[16px] font-medium shadow-md transition-all focus:ring-2 focus:ring-indigo-500'
          type="text"
          placeholder="Search by book name or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          type="submit" 
          className='bg-indigo-600 text-white p-4 rounded-lg shadow-lg hover:bg-indigo-700 transition-all'
        >
          Search
        </button>
      </form>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions w-full mt-4 p-6 border bg-white rounded-lg shadow-lg">
          <h2 className="text-[22px] mb-4 text-indigo-800 font-semibold">Search Results</h2>
          <div className="flex flex-wrap gap-4">
            {suggestions.map((book, index) => (
              <ImageCard
                key={index}
                img={img}
                bookName={book.bookName}
                bookAuthor={book.authorName}
                bookId={book.id}  
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results - Only show if searched is true and there are no suggestions */}
      {searched && suggestions.length === 0 && (
        <div className="suggestions w-full mt-4 p-6 border bg-white rounded-lg shadow-lg text-center">
          <h2 className="text-[22px] mb-4 text-gray-600">No Results Found</h2>
          <ReportBook />
        </div>
      )}
    </div>
  );
};

export default HomePage;
