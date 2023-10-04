"use client"

import React, { useState } from 'react';
import Link from 'next/link';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here (e.g., send data to the server)
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
      <Link href="/signup" className="text-blue-600 rounded  hover:text-red-500 md:p-0 ">
        Already Signed? Login
      </Link>
    </form>
  );
};

export default Login;
