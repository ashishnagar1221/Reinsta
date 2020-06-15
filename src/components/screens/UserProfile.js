import React,{useState,useEffect, useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile = () => {
  const [userProfile,setProfile] = useState(null)
  const {state,dispatch} = useContext(UserContext)
  const {userid} = useParams()
  const [showFollow,setFollow] = useState(state?!state.following.includes(userid):true)

  useEffect(() =>{
    fetch(`http://localhost:3600/user/${userid}`,{
      headers:{
        'Authorization':"Bearer "+ localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(result =>{
        console.log(result)
        setProfile(result)
    })
  },[])

  const followUser = () =>{
    fetch(`http://localhost:3600/follow`,{
      method:'put',
      headers:{
        'Content-type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userid
      })
    })
    .then(res => res.json())
    .then(data =>{
        dispatch({type:'UPDATE',payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState) => {
            return {
                ...prevState,
                user:{
                  ...prevState.user,
                  followers:[...prevState.user.followers,data._id]
                }
            }
        })
        setFollow(false)
    })
  }


  const unfollowUser = () =>{
    fetch(`http://localhost:3600/unfollow`,{
      method:'put',
      headers:{
        'Content-type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    })
    .then(res => res.json())
    .then(data =>{
        dispatch({type:'UPDATE',payload:{following:data.following,followers:data.followers}})
        localStorage.setItem("user",JSON.stringify(data))
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(item => item !== data._id)
            return {
                ...prevState,
                user:{
                  ...prevState.user,
                  followers:newFollower
                }
            }
        })
        setFollow(true)
    })
  }
  //console.log(state.following)
  return(
      <>
     { userProfile ? 
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
        <h4>{userProfile.user.name}</h4>
            <div style={{display:"flex", justifyContent:"space-between", width:"110%"}}>
            <h6>{userProfile.posts.length} Posts</h6>
            <h6>{userProfile.user.followers.length} followers</h6>
            <h6>{userProfile.user.following.length} following</h6>
            </div>
            {showFollow ?
              <button className ='btn waves-effect waves-light #64b5f6 blue darken-1'
                onClick={() =>followUser()}>Follow</button>
              
              :
              <button className ='btn waves-effect waves-light #64b5f6 blue darken-1'
              onClick={() =>unfollowUser()}>Unfollow</button>
          
            }
            </div>
        </div>
    <div className="gallary">
        { userProfile.posts.map(item =>{
            return( 
            <img key= {item._id} alt="" className="item" src={item.photo} />
            )
        })
        }
    </div>
    </div>
        
     : 
     <h2>
         Loading ...!
    </h2>}
      </>
   )

 }

export default Profile