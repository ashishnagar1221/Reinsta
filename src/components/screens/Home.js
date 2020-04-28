import React,{useState,useEffect} from 'react'

const Home = () => {
  const [data,setData] = useState([])
  useEffect(() =>{
    fetch('https://reinsta-server.herokuapp.com/allpost',{
    headers:{
      "Authorization":"Bearer "+localStorage.getItem('jwt')
      }
    })
    .then(res => res.json())
    .then(result =>{
      //console.log(result.allpost)
      setData(result.allpost)
    })
  },[])

  return(
    <div className="home">
      {
        data.map(item =>{
          return (
            <div className="card home-card" key={item._id}>
              <h5>{item.postedBy.name}</h5>
              <div className="card-image"></div>
            <img alt="" src={item.photo}/>
              <div className="card-content">
            <i className="material-icons" style={{color:"red"}} >favorite</i>
          <h6>{item.title}</h6>
        <p>{item.body}</p>
        <input type="text" placeholder ="add a comment"/>
        </div>
        </div>
          )
        })
      }    
    </div>
   )

 }

export default Home