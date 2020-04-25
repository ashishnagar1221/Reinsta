import React from 'react'
import { Link } from 'react-router-dom'


const Login = () => {
  return(
    <div className='my-card input-field input'>
    <div className="card auth-card">
      <h2>Reinstagaon</h2>
      <input
      type="text"
      placeholder="email" /> 
       <input
      type="password"
      placeholder="password" /> 
      <button className ='btn waves-effect waves-light #64b5f6 blue darken-1'>
      Login
    </button>

    <h5>
      <Link to='/Signup'>Not a memeber ?</Link>
    </h5>
    </div>
    </div>
   )

 }

export default Login