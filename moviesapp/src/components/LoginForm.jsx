import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, selectUserStatus, selectUserError } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useAppStatContext } from '../hooks/useAppStateContext'
import useToast from '../hooks/useToast'
import { validateEmail, validatePassword } from '../utils/validation'

const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { dispatch: contextDispatch } = useAppStatContext()
  const status = useSelector(selectUserStatus)
  const error = useSelector(selectUserError)
  const toast = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    if (status === "success") {
      // Sync with context
      const user = JSON.parse(localStorage.getItem('user'))
      contextDispatch({
        type: "Login",
        payload: user
      })
      toast.success("Login successful!")
      navigate("/home")
    }
    if (error) {
      toast.error(error?.message || "Login failed")
    }
  }, [status, error, navigate, contextDispatch, toast])

  const validateForm = () => {
    const newErrors = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else {
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const authentication = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix all errors")
      return
    }

    dispatch(loginUser({ email, password }))
  }

  const togglePassword = (event) => {
    event.preventDefault()
    setShowPass(!showPass)
  }

  return (
    <>
      <label className='email' aria-required>Email</label>
      <input 
        type="text" 
        className='email' 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (errors.email) setErrors({...errors, email: undefined})
        }}
        style={{ borderColor: errors.email ? "red" : "#ccc" }}
      ></input>
      {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}

      <label className='password' aria-required>Password</label>
      <input 
        type={showPass ? 'text' : 'password'} 
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          if (errors.password) setErrors({...errors, password: undefined})
        }}
        style={{ borderColor: errors.password ? "red" : "#ccc" }}
      ></input>
      {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}

      <span onClick={(e) => togglePassword(e)} style={{ cursor: "pointer" }}>
        <span>
          {showPass ? (
            <FontAwesomeIcon icon={faEye} className='customIcon' />
          ) : <FontAwesomeIcon icon={faEyeSlash} className='customIcon' />}
        </span>
      </span>
      <button className='submit' onClick={(e) => authentication(e)} disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "submit"}
      </button>
    </>
  )
}

export default LoginForm
