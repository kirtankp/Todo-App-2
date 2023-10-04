"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleformData = async (formData: object) => {
    try {
      const response = await fetch('localhost:5001/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (response.ok) {
        console.log('Form data saved successfully');
      } else {
        console.error('Failed to save form data');
      }
    } catch (error) {
      console.error('Error saving form data', error);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here (e.g., send data to the server)
    handleformData(formData)
    console.log(formData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <div className="mb-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="mb-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
      <Link href="/login" className="text-blue-600 rounded  hover:text-red-500 md:p-0 ">
        Already Signed? Login
      </Link>
    </form>
  );
};

export default Signup;
