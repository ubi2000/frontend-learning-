import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import DynamicForm from './DynamicForm'
import { movieApi } from '../constants/axios'
import { userRequests } from '../constants/requests'
import { useAppStatContext } from '../hooks/useAppStateContext'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

  const navigate = useNavigate()
  const { dispatch } = useAppStatContext()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [showPass, setShowPass] = useState(false)

  const authentication = (event) => {
    event.preventDefault()

    if (!email || !password) {
      setMessage("Please fill all required fields")
    } else {
      // MAKE AN API CALL
      movieApi.post(userRequests.login, {
        email,
        password
      }).then((response) => {
        console.log(response)
        dispatch({
          type: "Login",
          payload: {
            token: response.data.token,
            email,
            username: response.data.username
          }
        })
        navigate("/home")
      }).catch((error) => {
        setMessage(error.response.data.message)
      })
    }
  }

  const togglePassword = (event) => {
    event.preventDefault()

    setShowPass(!showPass)
  }

  return (
    <>
      <DynamicForm
        fields={[
          { name: 'email', label: 'Email', type: 'email', placeholder: 'Email', gridColumn: '1 / -1' },
          {
            name: 'password',
            label: 'Password',
            type: showPass ? 'text' : 'password',
            placeholder: 'Password',
            gridColumn: '1 / -1'
          }
        ]}
        values={{ email, password }}
        onChange={({ email, password }) => {
          if (email !== undefined) setEmail(email)
          if (password !== undefined) setPassword(password)
        }}
        onSubmit={authentication}
        useFormWrapper={false}
        submitLabel="Login"
      />
      <span onClick={(e) => togglePassword(e)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '12px' }}>
        {showPass ? (
          <FontAwesomeIcon icon={faEye} className='customIcon' />
        ) : (
          <FontAwesomeIcon icon={faEyeSlash} className='customIcon' />
        )}
        {showPass ? 'Hide password' : 'Show password'}
      </span>
      <span style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {message}
      </span>
    </>
  )
}

export default LoginForm
