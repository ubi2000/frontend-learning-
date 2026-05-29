import React, { useEffect, useState } from 'react'
import { useAppStatContext } from '../hooks/useAppStateContext'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, selectUser } from '../slices/userSlice'
import '../styles/Navbar.css'

const Navbar = () => {
  const { appState, dispatch: contextDispatch } = useAppStatContext()
  const reduxDispatch = useDispatch()
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  const [showDropDown, setShowDropDown] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }
    })

    return window.removeEventListener("scroll", null)
  }, [])

  const handleAvatarClick = (event) => {
    event.preventDefault()
    setShowDropDown(!showDropDown)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    reduxDispatch(logoutUser()).then(() => {
      contextDispatch({
        type: "Logout"
      })
      navigate('/login')
    })
  }

  const handleProfileClick = (event) => {
    event.preventDefault()
    setShowDropDown(false)
    navigate('/profile')
  }

  const handleSearchClick = (event) => {
    event.preventDefault()
    setShowDropDown(false)
    navigate('/search')
  }

  const handleCategoriesClick = (event) => {
    event.preventDefault()
    setShowDropDown(false)
    navigate('/categories')
  }

  const displayName = user?.username || appState?.user?.username || "User"

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        alt="Netflix Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        onClick={() => navigate('/home')}
        style={{ cursor: 'pointer' }}
      />
      
      <div className="nav_links">
        <button onClick={handleSearchClick} className="nav_link">Search</button>
        <button onClick={handleCategoriesClick} className="nav_link">Categories</button>
      </div>

      <img
        className="nav_avatar"
        onClick={(event) => handleAvatarClick(event)}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yQFL1YOsN3esm6p1jB1HT-Q6qKtxtZqh9LGwMDIgDCy-p54eMf8jdGSN6yZUeySqseA&usqp=CAU"
        alt="Netflix avatar"
      />
      {showDropDown && (
        <div className="dropdown">
          <span>{displayName}</span>
          <span onClick={(event) => handleProfileClick(event)}>Profile</span>
          <span onClick={(event) => handleLogout(event)}>Logout</span>
        </div>
      )}
    </div>
  );
}

export default Navbar
