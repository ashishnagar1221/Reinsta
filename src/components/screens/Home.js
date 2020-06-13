import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
const Home = () => {
  const [data,setData] = useState([])
  const {state,dispatch} = useContext(UserContext)
  useEffect(() =>{
    fetch('http://localhost:3600/allpost',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(result =>{
      console.log(result.allpost)
      setData(result.allpost)
    })
  },[])

  const likePost = (id) =>{
    fetch('http://localhost:3600/like',{
      method:'put',
      headers:{
        'Content-type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res => res.json())
    .then(result =>{
      //console.log(result)
      const newData = data.map(ele =>{
        if(ele._id == result._id){
          return result
        }else{
          return ele
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const unlikePost = (id) =>{
    fetch('http://localhost:3600/unlike',{
      method:'put',
      headers:{
        'Content-type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res => res.json())
    .then(result =>{
      //console.log(result)
      const newData = data.map(ele =>{
        if(ele._id == result._id){
          return result
        }else{
          return ele
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  const makeCommnent = (text,postId) => {
    fetch('http://localhost:3600/comment',{
      method:'put',
      headers:{
        'Content-type':'application/json',
        'Authorization':'Bearer '+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        postId,text
      })
    }).then(res => res.json())
    .then(result =>{
      console.log(result)
      const newData = data.map(ele =>{
        if(ele._id == result._id){
          return result
        }else{
          return ele
        }
      })
      setData(newData)
    }).catch(err => {
      console.log(err)
    })
  }

  return(
    <div className="home">
      {
        data.map(item =>{
          return (
            <div className="card home-card" key={item._id}>
              <h5>{item.postedBy.name}</h5>
              <div className="card-image">
              <img alt="" src={item.photo}/>
              </div>
              <div className="card-content">
            <i className="material-icons" style={{color:"red"}} >favorite</i>
            {item.likes.includes(state._id)?
            <i className="material-icons" 
            onClick = {() => {unlikePost(item._id)}} 
             >thumb_down</i>
             :
             <i className="material-icons"
               onClick = {() => {likePost(item._id)}} 
               >thumb_up</i>
            }
          <h6>{item.likes.length} likes</h6>
          <h6>{item.title}</h6>
        <p>{item.body}</p>
        {
          item.comments.map(record => {
            return(
              <h6 key={record._id}><span style={{fontWeight:'500'}}>{record.postedBy.name}</span> {record.text}</h6>
            )
          })
        }
        <form onSubmit ={(e) => {
            e.preventDefault()
              makeCommnent(e.target[0].value,item._id)
        }}>
          <input type="text" placeholder ="add a comment"/>
        </form>
        </div>
        </div>
          )
        })
      }    
    </div>
   )

 }

export default Home