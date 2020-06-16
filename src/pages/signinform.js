import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../fire';

class signinform extends Component{
  constructor(){
    super();
    this.state= {
   
      email:'',
      password:''
    };

    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
 
  handleChange(e){
   this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    /*alert('The form was submitted with the data in console:');*/
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{

      }).catch((error) => {
        alert(error);
      });
  }
	render(){
		return(
			<div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit} >

                  
                  <div className="FormField">
                   <label className="FormField__Label" htmlFor="email">E-mail address</label>
                   <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />

                   </div>

                   <div className="FormField">
                   <label className="FormField__Label" htmlFor="password">Password</label>
                   <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />

                   </div>


                    
                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign In</button> <Link  to="/" className="FormField__Link">Create an account</Link>
                    </div>
                </form>
                </div>

		);
	}
}
export default signinform;