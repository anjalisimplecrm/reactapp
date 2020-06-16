import React, { Component } from 'react';
import { BrowserRouter as Router , Route , NavLink, Link} from 'react-router-dom';
import fire from './fire';
import signupform from './pages/signupform';
import signinform from './pages/signinform';
import Home from './Home';
import Login from './Login';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user : {}
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    fire.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({user})
      }else{
        this.setState({user :null})
      }
    })
  }
  render(){
  return (
    <div>
     {this.state.user ? (<Home />) : (<Login />)}
    </div>
  );
}
}
export default App;
