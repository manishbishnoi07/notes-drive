import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import Files from './components/Files'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import Login from './components/Login';
import { auth } from './firebase';
import { useEffect } from 'react';
import { signIn, signOut } from './actions/authActions';
function App() {
  const {user}=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((userAuth)=>{
      if(userAuth){
        dispatch(signIn(userAuth))
      }
      else{
        dispatch(signOut())
      }
    })
    return unsubscribe
  },[dispatch])


  return (
    <div className="app">
        {!user?(
          <Login/>
        ):
          <Router>
              <Navbar/>
              <Switch>
                  <Route exact path='/'><Dashboard/></Route>  
                  <Route path='/:id'><Files/></Route> 
              </Switch>
          </Router>
        }
    </div>
  );
}

export default App;
