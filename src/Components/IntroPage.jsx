import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import videoFile from '../assets/video.mp4';
import './IntroPage.css'; // If you have styles for this component

const IntroPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (email === "admin@example.com" && password === "admin123") {
      navigate('/admin');
    } else {
      alert("Incorrect admin credentials");
    }
  };

  const handleUserSelection = () => {
    navigate('/home');
  };

  return (
    <div className="intro-container h-screen w-full border ">
       <video 
        className="absolute top-0 left-0 w-full h-full object-cover" 
        src={videoFile} 
        autoPlay 
        muted 
        loop
      />
      <div className='relative flex flex-col items-center justify-center h-full'>

    
      <h1 className="text-[50px] sm:text-[70px] text-center text-white  font-bold mb-4">Welcome to the Library Management System</h1>
      <p className='text-white  mb-4 '>Please select your role:</p>
      <div className="button-container flex gap-4">
      <button onClick={() => setIsAdmin(true)} className='bg-blue-500 hover:bg-blue-700 text-white text-[25px] font-bold py-2 px-4 rounded'>Admin</button>
      <button onClick={handleUserSelection} className='bg-blue-500 hover:bg-blue-700 text-white text-[25px] font-bold py-2 px-4 rounded'>User</button> 
      </div>

      {isAdmin && (
        <div className="admin-login">
          <h2 className='text-[30px] sm:text-[50px] text-center  font-bold'>Admin Login</h2>
          <input
            className='outline-none'
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='outline-none'
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <button onClick={handleAdminLogin} className='p-4 text-[25px] font-mono bg-blue-700 text-white'>Login</button>
        </div>
          
      )}
      </div>
    </div>
  );
};

export default IntroPage;
