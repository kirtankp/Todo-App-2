"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const Signup: React.FC = () => {
  const router = useRouter()
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
      const response = await axios.post("http://localhost:5001/user/signup", formData);
      if (response.data["token"]) {        
        console.log("Signup successfully", response.data);
        router.push("/dashboard");
      } else {
        alert("already signed up")
        console.log("already signed up", response.data);
      }
    } catch (error: any) {
      console.log("Signup failed", error.message);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here (e.g., send data to the server)
    handleformData(formData)
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
      <div className='mb-3'>
        <Link href="/login" className="text-blue-600 rounded  hover:text-red-500 md:p-0 ">
          Already have an account? Login here
        </Link>
      </div>
      <Link href="/" className="text-blue-600 rounded  hover:text-red-500 md:p-0 ">
        Home
      </Link>
    </form>
  );
};

export default Signup;
