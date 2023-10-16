"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken'

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
      </div>
    </>
  )
}

export default dashboard