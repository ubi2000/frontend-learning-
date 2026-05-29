import React from 'react'
import { learningAPI } from './../constants/axios';
import { authRequest } from './../constants/requests';
import { useAppStatContext } from './../hooks/useAppStatContext';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"

const RegisterForm = ({onSuccess}) => {

    const { dispatch } = useAppStatContext()
const [name,setName]=useState("")
     const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message,setMessage]=useState("")

  const navigate = useNavigate()


  const handleRegister=(e)=>{
     e.preventDefault()
      if (!name || !email || !password ) {
      setMessage("Please fill all required fields")
    } else{
        learningAPI.post(authRequest.register,{
            name,email,password
        }).then((response)=>{
            dispatch({
                type:"Register",
                payload:{
                    name,
                    email
                    

                }
                
            })
            setMessage(response.data.msg)
            navigate("/login")
            }).catch((error)=>{
                console.log(error.response.data)
                setMessage(error.response.data.msg) 
                onSuccess()

        })
    }
  }
  return (
    <div>
    <input type="text" placeholder="Name" onChange={(e) => setName( e.target.value) } />
  <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
  <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
    <button onClick={(e) => handleRegister(e)}>Register</button>
    <span>{message}</span>
  </div>
  )
}

export default RegisterForm
