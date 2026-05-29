import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectUserStatus, selectUserError } from "../slices/userSlice";
import useToast from "../hooks/useToast";
import { validateEmail, validatePassword, validateUsername } from "../utils/validation";

const RegisterForm = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectUserStatus)
  const error = useSelector(selectUserError)
  const toast = useToast()

  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({})

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    if (status === "success") {
      toast.success("Registration successful! Please login.")
      setUser({ email: "", username: "", password: "" })
      setErrors({})
    }
    if (error) {
      toast.error(error?.message || "Registration failed")
    }
  }, [status, error, toast])

  const validateForm = () => {
    const newErrors = {}

    if (!user.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(user.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!user.username.trim()) {
      newErrors.username = "Username is required"
    } else {
      const usernameValidation = validateUsername(user.username)
      if (!usernameValidation.valid) {
        newErrors.username = usernameValidation.message
      }
    }

    if (!user.password) {
      newErrors.password = "Password is required"
    } else {
      const passwordValidation = validatePassword(user.password)
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const togglePassword = (event) => {
    event.preventDefault();
    setShowPass(!showPass);
  };

  const handleRegister = (event) => {
    event.preventDefault()

    if (!validateForm()) {
      toast.error("Please fix all errors")
      return
    }

    dispatch(registerUser({
      email: user.email,
      password: user.password,
      username: user.username
    }))
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target
    setUser(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div>
      <div className="inputs-container">
        <div className="input-container">
          <label className="email">Email</label>
          <input
            type="email"
            className="email"
            value={user.email}
            onChange={(e) => handleInputChange(e, 'email')}
            style={{ borderColor: errors.email ? "red" : "#ccc" }}
          ></input>
          {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>}

          <div className="input-container">
            <label className="username">Username</label>
            <input
              type="text"
              className="username"
              value={user.username}
              onChange={(e) => handleInputChange(e, 'username')}
              style={{ borderColor: errors.username ? "red" : "#ccc" }}
            ></input>
            {errors.username && <span style={{ color: "red", fontSize: "12px" }}>{errors.username}</span>}
          </div>

          <div className="input-container">
            <label className="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="password"
              value={user.password}
              onChange={(e) => handleInputChange(e, 'password')}
              style={{ borderColor: errors.password ? "red" : "#ccc" }}
            ></input>
            {errors.password && <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>}
            <span onClick={(e) => togglePassword(e)} style={{ cursor: "pointer" }}>
              <span>
                {showPass ? (
                  <FontAwesomeIcon icon={faEye} className="customIcon" />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} className="customIcon" />
                )}
              </span>
            </span>
          </div>

          <button className="submit" onClick={(e) => handleRegister(e)} disabled={status === "loading"}>
            {status === "loading" ? "Registering..." : "submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;