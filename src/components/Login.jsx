import React, { useState } from 'react'
import { useCookies } from 'react-cookie';

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null) 
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmedPassword, setConfirmedPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(cookies)

  const viewLogIn = (status) => {
    setError(null);
    setIsLogIn(status)
  }

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault()
    if (!isLogIn && password !== confirmedPassword) {
      setError('Do your passwords match?')
      return
    }

    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, password})
    })

    const data =  await response.json()
    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
    
  }



  return (
    <div className='auth-container'>
      <h1>Planifier</h1>
      <div className='auth-container-box'>
        <form>
          <h2>{isLogIn ? 'Login' : 'SignUp'}</h2>
          <input 
          type="email" 
          placeholder='Email' 
          onChange={(e) => setEmail(e.target.value)} />
          <input 
          type="password" 
          placeholder='Password' 
          onChange={(e) => setPassword(e.target.value)}/>
          {!isLogIn && <input type="password" placeholder='Confirm Password' 
          onChange={(e) => setConfirmedPassword(e.target.value)}/>}
          <input type="submit" 
          className='auth-submit' 
          onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')}/>
          {error && <p>{error}</p>}
        </form>
        <div className='auth-footer'>
          <button onClick={() => viewLogIn(false)} className='auth-choice'>Sign Up</button>
          <button onClick={() => viewLogIn(true)} className='auth-choice'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login