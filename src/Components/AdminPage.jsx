import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import axios from 'axios'; // Import axios for making API calls

const App = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [reportedBooks, setReportedBooks] = useState([]);

  // Fetch IssuedBooks
  const fetchIssuedBooks = async () => {
    const issuedBooksCollection = collection(db, 'IssuedBooks');
    const issuedBooksSnapshot = await getDocs(issuedBooksCollection);
    const issuedBooksList = issuedBooksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setIssuedBooks(issuedBooksList);
  };

  // Fetch ReportedBooks
  const fetchReportedBooks = async () => {
    const reportedBooksCollection = collection(db, 'ReportedBooks');
    const reportedBooksSnapshot = await getDocs(reportedBooksCollection);
    const reportedBooksList = reportedBooksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReportedBooks(reportedBooksList);
  };

  // Function to send email and update Firestore
  const handleBookArrival = async (book) => {
    try {
      // 1. Add book to "Books" collection
      await addDoc(collection(db, 'books'), {
        bookName: book.bookName,
        authorName: book.authorName,
      });

      // 2. Remove the book from the "ReportedBooks" collection
      await deleteDoc(doc(db, 'ReportedBooks', book.id));

      // 3. Update the UI by removing the book from the reportedBooks state array
      setReportedBooks(reportedBooks.filter((b) => b.id !== book.id));

      // 4. Send email notification
      await axios.post('http://localhost:5000/send-email', {
        to: book.email,
        bookName: book.bookName,
      });

      alert(`${book.bookName} by ${book.authorName} added to the library and email sent!`);
    } catch (error) {
      console.error('Error processing book arrival:', error);
    }
  };

  // Fetch data when component loads
  useEffect(() => {
    fetchIssuedBooks();
    fetchReportedBooks();
  }, []);

  return (
    <div>
      <header className="text-center py-5 bg-gray-200">
        <h1 className="text-3xl font-bold">Admin</h1>
      </header>

      <div className="flex justify-between p-5">
        <div className="w-full md:w-1/2 p-4 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Issued Books</h2>
          {issuedBooks.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-300 border">Book Name</th>
                  <th className="p-2 bg-gray-300 border">User Name</th>
                  <th className="p-2 bg-gray-300 border">Author Name</th>
                  <th className="p-2 bg-gray-300 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="p-2 border">{book.bookName}</td>
                    <td className="p-2 border">{book.userName}</td>
                    <td className="p-2 border">{book.authorName}</td>
                    <td className="p-2 border">{book.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No issued books found.</p>
          )}
        </div>

        <div className="w-full md:w-1/2 p-4 border border-gray-300">
          <h2 className="text-xl font-semibold mb-4">Reported Books</h2>
          {reportedBooks.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-300 border">Book Name</th>
                  <th className="p-2 bg-gray-300 border">User Name</th>
                  <th className="p-2 bg-gray-300 border">Author Name</th>
                  <th className="p-2 bg-gray-300 border">Email</th>
                  <th className="p-2 bg-gray-300 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reportedBooks.map((book) => (
                  <tr key={book.id}>
                    <td className="p-2 border">{book.bookName}</td>
                    <td className="p-2 border">{book.userName}</td>
                    <td className="p-2 border">{book.authorName}</td>
                    <td className="p-2 border">{book.email}</td>
                    <td className="p-2 border">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => handleBookArrival(book)}
                      >
                        Book Arrived
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No reported books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
