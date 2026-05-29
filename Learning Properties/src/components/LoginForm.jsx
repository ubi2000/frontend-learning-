import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppStatContext } from "../hooks/useAppStatContext"

import React from 'react'
import { learningAPI } from './../constants/axios';
import { authRequest } from './../constants/requests';

const LoginForm = () => {

const navigate = useNavigate()
  const { dispatch } = useAppStatContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")


const handleLogin = (e) => {
    e.preventDefault()
    // 2. make API call here
   

    if (!email || !password) {
      setMessage("Please fill all required fields")
    } else {
      // MAKE AN API CALL
      learningAPI.post(authRequest.login, {
        email,
        password
      }).then((response) => {
       
        dispatch({
          type: "Login",
          payload: {
            token: response.data.token,
            email,
           // username: response.data.username
          }
        })
        navigate("/home")
      }).catch((error) => {
        setMessage(error.response.data.message)
      })
    }
  }


  return (
    <div>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={(e) => handleLogin(e)}>Login</button>
      <span>{message}</span>
    </div>
  )
}

export default LoginForm
