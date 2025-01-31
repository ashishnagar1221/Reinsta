import React,{useState, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
  const history = useHistory()
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [image,setImage] = useState('')
  const [url,setUrl] = useState(undefined)

  useEffect(() =>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic = () => {
    const data  = new FormData()
    data.append("file",image)
    data.append("upload_preset","Reinsta")
    data.append("cloud_name","ashish1221")

    fetch('	https://api.cloudinary.com/v1_1/ashish1221/image/upload',{
      method:"post",
      body:data
    })
    .then(res => res.json())
    .then(data =>{
      setUrl(data.url)
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const uploadFields = () =>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
      return
  }
    fetch('https://reinsta-server.herokuapp.com/signup',{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        pic:url
      })
    }) 
    .then(res => res.json())
    .then(data =>{
      if(data.error){
        M.toast({html: data.error,classes:"#c62828 red darken-3"})
      }
      else{
        M.toast({html:data.message,classes:"#43a047 green darken-3"})
        history.push('/login')
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const postData =() =>{
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
    
  }
 
  return(
    <div className='my-card input-field input'>
    <div className="card auth-card">
      <h2>Reinstagaon</h2>
      <input
      type="text"
      placeholder="name" 
      value={name}
      onChange ={(e) =>setName(e.target.value)}/>
      <input
      type="text"
      placeholder="email" 
      value ={email}
      onChange={(e) => setEmail(e.target.value)}/> 
       <input
      type="password"
      placeholder="password" 
      value ={password}
      onChange={(e) =>setPassword(e.target.value)}/>
        <div className="file-field input-field">
        <div className="btn">
          <span>Upload Pic</span>
          <input type="file" onChange ={(e) => setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text"/>
        </div>
        </div>
      <button className ='btn waves-effect waves-light #64b5f6 blue darken-1'
      onClick = {() => postData()}>
      Signup
    </button>

    <h5>
      <Link to='/login'>Already have an account ?</Link>
    </h5>
    </div>
    </div>
   )

 }

export default Signup