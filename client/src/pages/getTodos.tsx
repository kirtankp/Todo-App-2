"use client"

import '../app/globals.css'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import { data } from 'autoprefixer';

const getTodos = () => {
    const router = useRouter()
    const [todos, settodos] = useState('')
    const getTodo = async () => {
        axios.get('http://localhost:5001/user/todos', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            }
        })
            .then(function (response) {
                console.log(response)
                const todosarray = response.data
                if (todosarray) {
                    // for (let i = 0; i < response.data.length; i++) {
                    //     settodoTitle(response.data[i]['title'])
                    //     settodoDesc(response.data[i]['description'])
                    // }
                    settodos(todosarray)
                } else {
                    alert(response.data.error)
                }
                // console.log(response);
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
                getTodo()
            }
        }
    }, [])
    return (
        <>
            <div className="home_page">
                <h1>Todos</h1>
                <TodoData todo={todos} />
            </div>
        </>
    )
}

const TodoData = ({ todo }) => {
    return (
        <table border={1}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(todo)
                    ? todo.map((data) => {
                        return (
                            <tr>
                                <td>{data['title']}</td>
                                <td>{data['description']}</td>
                            </tr>
                        )
                    })
                    : null}
            </tbody >
        </table>
    );
};
export default getTodos