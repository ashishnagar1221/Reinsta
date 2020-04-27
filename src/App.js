import React ,{useEffect,createContext,useReducer,useContext}from 'react';
import './App.css';
import NavBar from './components/Navbar'
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Login from './components/screens/login'
import Profile from './components/screens/profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/createPost'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/login')
    }
  },[])
  return (
  <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/Signup">
        <Signup/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      </Switch>   
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value ={{state,dispatch}}>
    <BrowserRouter>
    <NavBar/>    
    <Routing/>
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
