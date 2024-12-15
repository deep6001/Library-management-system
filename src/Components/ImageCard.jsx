import React from 'react';
import { Link } from 'react-router-dom';  // For navigation

function ImageCard({ img, bookName, bookAuthor, bookId }) {  // Add bookId prop to uniquely identify books
  return (
    <div className='w-[250px] flex flex-col p-2'>
      <img src={img} alt={bookName} className='object-contain' />
      <p className='font-bold text-[15px] mt-2'>{bookName}</p>
      <p className='text-[13px] font-semibold mt-2'>{bookAuthor}</p>

      {/* Redirect to /issuebook with book data */}
      <Link
        to={{
          pathname: `/issuebook/${bookId}`,  // Use bookId in URL
          state: { bookName, bookAuthor, bookId },  // Pass book details in state
        }}
      >
        <div className='text-white bg-blue-500 rounded-md text-center p-2 mt-2 cursor-pointer'>
          Issue Book
        </div>
      </Link>
    </div>
  );
}

export default ImageCard;
