import React, { useState } from 'react';

const Signup: React.FC = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle signup logic here (e.g., send data to the server)
//   };

  return (
    // <form onSubmit={handleSubmit}>
    <form>
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <div className="mb-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
        //   onChange={handleChange}
        //   value={formData.username}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
        //   onChange={handleChange}
        //   value={formData.email}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
        //   onChange={handleChange}
        //   value={formData.password}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
