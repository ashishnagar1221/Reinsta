import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../../App'

const Profile = () => {
  const [mypics,setPics] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(() =>{

    fetch('http://localhost:3600/myPost',{
      headers:{
        'Authorization':"Bearer "+ localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(result =>{
        setPics(result.mypost)
    })
  },[])
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
            src="https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            />
        </div>
        <div>
      <h4>{state?state.name:"loading"}</h4>
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