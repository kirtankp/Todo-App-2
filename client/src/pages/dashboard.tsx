"use client"

import '../app/globals.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import Link from 'next/link';

const dashboard = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const getusername = async () => {
    axios.get('http://localhost:5001/user/data', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      }
    })
      .then(function (response) {
        if (response.data['status'] === 'ok') {
          setUsername(response.data['username'])
        } else {
          alert(response.data.error)
        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token')
        router.replace('/login')
      } else {
        getusername()
      }
    }
  }, [])

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link href="/getTodos">
            Get all Todos
          </Link>
        </button>
      </div>
    </>
  )
}

export default dashboard