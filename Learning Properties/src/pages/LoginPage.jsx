
import LoginForm from './../components/LoginForm';
import { useState } from 'react';
import RegisterForm from './../components/RegisterForm';


const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false)
  return (
    <div>
      <button onClick={() => setShowRegister(false)}>Login</button>
      <button onClick={() => setShowRegister(true)}>Register</button>
      
      {showRegister ? (
        <RegisterForm onSuccess={() => setShowRegister(false)} />  // 👈 add this
      ) : (
        <LoginForm />
      )}
    </div>
  )
}

export default LoginPage
