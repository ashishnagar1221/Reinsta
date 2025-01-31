import React,{useState,useContext} from 'react'
import { Link,useHistory } from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'


const Login = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")

  const postData =() =>{
    console.log(email,password)
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return
  }
    fetch('https://reinsta-server.herokuapp.com/signin',{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }) 
    .then(res => res.json())
    .then(data =>{
      console.log(data)
      if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        dispatch({type:"USER",payload:data.user})
        M.toast({html:"Signin Successfully",classes:"#43a047 green darken-3"})
        history.push('/')
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }
  return(
    <div className='my-card input-field input'>
    <div className="card auth-card">
      <h2>Reinstagaon</h2>
      <input
      type="text"
      placeholder="email" 
      value={email}
      onChange ={(e) =>setEmail(e.target.value)}/> 
       <input
      type="password"
      placeholder="password"
      value={password}
      onChange ={(e) =>setPassword(e.target.value)} /> 
      <button className ='btn waves-effect waves-light #64b5f6 blue darken-1'
      onClick={() =>postData()}>
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