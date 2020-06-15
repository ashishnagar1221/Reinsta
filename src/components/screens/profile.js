import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
  const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const [image,setImage] = useState('')

  useEffect(() =>{

    fetch('https://reinsta-server.herokuapp.com/myPost',{
      headers:{
        'Authorization':"Bearer "+ localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(result =>{
        setPics(result.mypost)
    })
  },[])


  useEffect(() => {
    if(image){
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
      // localStorage.setItem('user',JSON.stringify({...state,pic:data.url}))
      // dispatch({type:'UPDATEPIC',payload:data.url})
      fetch('https://reinsta-server.herokuapp.com/updatepic',{
        method:'put',
        headers:{
          "Content-Type":"application/json",
          'Authorization':"Bearer "+ localStorage.getItem('jwt')
        },
        body:JSON.stringify({
          pic:data.url
        })
      }).then(res => res.json())
      .then(result =>{
        console.log(result)
        localStorage.setItem('user',JSON.stringify({...state,pic:result.pic}))
        dispatch({type:'UPDATEPIC',payload:result.pic})
      })
      //window.location.reload()
    })
    .catch(err =>{
      console.log(err)
    })
    }
  },[image])


  const uploadPic = (file) => {
    setImage(file)
  }

  return(
    <div style={{maxWidth:"550px", margin:"0px auto"}}>
      <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"1px solid gray"
        }}>
        <div>
            <img alt="" style={{width:"160px",height:"160px",borderRadius:"80px"}}
            src={state?state.pic:"loading..."}
            />
            
            <div className="file-field input-field">
        <div className="btn">
          <span>Upload Pic</span>
          <input type="file" onChange ={(e) => uploadPic(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text"/>
        </div>
        </div>
        </div>
        <div>
      <h4>{state?state.name:"loading"}</h4>
      <h5>{state?state.email:"loading"}</h5>
          <div style={{display:"flex", justifyContent:"space-between", width:"110%"}}>
            <h6>{mypics.length} Posts</h6>
            <h6>{state?state.followers.length:0} followers</h6>
            <h6>{state?state.following.length:0} following</h6>
          </div>
        </div>
      </div>
    <div className="gallary">
       { mypics.map(item =>{
          return( 
          <img key= {item._id} alt="" className="item" src={item.photo} />
          )
        })
      }
    </div>
    </div>
   )

 }

export default Profile