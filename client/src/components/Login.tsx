"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const Login: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleformData = async (formData: object) => {
    try {
      const response = await axios.post("http://localhost:5001/user/login", formData);
      if (response.data['user']) {
        localStorage.setItem('token', response.data['user'])
        console.log("Login success", response.data);
        router.push("/dashboard");
      } else {
        alert("Login failed")
        console.log("Login failed", response.data);
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., send data to the server)
    handleformData(formData)
    console.log(formData)
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl mb-4">Log In</h2>
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
        Log In
      </button>
      <div className='mb-3'>
        <Link href="/signup" className="mb-4 text-blue-600 rounded  hover:text-red-500 md:p-0 ">
          Don't have an account? Signup here
        </Link>
      </div>
      <Link href="/" className="text-blue-600 rounded  hover:text-red-500 md:p-0 ">
        Home
      </Link>
    </form>
  );
};

export default Login;
