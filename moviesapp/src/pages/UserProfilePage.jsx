import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserProfile, selectUser, selectUserStatus } from '../slices/userSlice'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import "../styles/LoginPage.css"

const UserProfilePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const status = useSelector(selectUserStatus)

  useEffect(() => {
    if (status === "idle") {
      dispatch(getUserProfile())
    }
  }, [dispatch, status])

  if (status === "loading") return <div className="loading">Loading...</div>
  if (!user) {
    navigate("/login")
    return null
  }

  return (
    <div className="user-profile-page">
      <Navbar />
      
      <div className="profile-container">
        <h1>User Profile</h1>
        <div className="profile-info">
          <div className="profile-field">
            <label>Name:</label>
            <p>{user.name || user.username}</p>
          </div>
          
          <div className="profile-field">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>

          {user.phone && (
            <div className="profile-field">
              <label>Phone:</label>
              <p>{user.phone}</p>
            </div>
          )}

          {user.bio && (
            <div className="profile-field">
              <label>Bio:</label>
              <p>{user.bio}</p>
            </div>
          )}

          <div className="profile-field">
            <label>Member Since:</label>
            <p>{new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage
