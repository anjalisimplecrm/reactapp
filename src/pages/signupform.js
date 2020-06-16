import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../fire';
class signupform extends Component{
	  constructor(){
    super();
    this.state= {
      name:'',
      password:'',
      confpassword:'',
      email:'',
     
      profile:'',
      signature:'',
      hasAgreed:false,
      fields: {},
      errors: {}
    };

    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
         let formIsValid = true;

        if(!fields["name"]){
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }
        if(!fields["password"]){
          formIsValid = false;
          errors["password"] = "Cannot be empty";
        }
        if(!fields["confpassword"]){
          formIsValid = false;
          errors["confpassword"] = "Cannot be empty";
        }
        if(!fields["email"]){
          formIsValid = false;
          errors["email"] = "Cannot be empty";
        }
         this.setState({errors: errors});
        return formIsValid;

    }
  handleChange = e => {
   this.setState({
      [e.target.name]: e.target.value
    });
  }

handleSubmit = e => {
      if(this.handleValidation()){
      alert("Form submitted");
      }else{
        alert("Form May be has errors. Please check if any..Else wait for submission Notification!!");
      }

     const { password, confpassword } = this.state;
     // perform all neccassary validations
      if (password !== confpassword) {
        alert("Passwords don't match");
        
      } 
      else 
      {
        // make API call
          fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(u => {
            console.log(u);
            alert('you have successfully submitted the form');
          })
          .catch(error => {
             switch (error.code) {
                case 'auth/email-already-in-use':
                  alert(`Email address ${this.state.email} already in use.`);
                default:
                  alert(error.message);
              }
          });

         e.preventDefault();

        const itemsRef = fire.database().ref('users');
        const user = {
          username: this.state.name,
          password:this.state.password,
          confpassword: this.state.confpassword,
          email: this.state.email,
          profile:this.state.profile,
          signature:this.state.signature
        }
        itemsRef.push(user);
        this.setState({
          name: '',
          email: '',
          confpassword:'',
          email:'',
          profile:'',
          signature:''
        });
    };
};

render(){
		return(
			<div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>

                   <div className="FormField">
                   <label className="FormField__Label" htmlFor="name">Username</label>
                   <input type="text" id="username" className="FormField__Input" placeholder="Enter your username" name="name" onChange={this.handleChange} value={this.state.name} />
                     <span className="error">{this.state.errors["email"]}</span>
                   </div>


                  <div className="FormField">
                   <label className="FormField__Label" htmlFor="password">Password</label>
                   <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"  onChange={this.handleChange} value={this.state.password} />
                     <span className="error">{this.state.errors["email"]}</span>
                   </div>

                   <div className="FormField">
                   <label className="FormField__Label" htmlFor="conf_password">confirm Password</label>
                   <input type="password" id="conf_password" className="FormField__Input" placeholder="Please confirm your password" name="confpassword"  onChange={this.handleChange} value={this.state.confpassword}/>
                     <span className="error">{this.state.errors["email"]}</span>
                   </div>


                  <div className="FormField">
                   <label className="FormField__Label" htmlFor="email">E-mail address</label>
                   <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email"  onChange={this.handleChange} value={this.state.email} />
                     <span className="error">{this.state.errors["email"]}</span>
                   </div>

                   <div className="FormField">
                   <label className="FormField__Label" htmlFor="Profile">Profile Picture</label>
                   <input type="file" id="file" className="FormField__Input" placeholder="Attach your profile picture" name="profile" onChange={this.handleChange} value={this.state.profile} />

                   </div>

                   <div className="FormField">
                   <label className="FormField__Label" htmlFor="signature">Signature</label>
                   <input type="file" id="file" className="FormField__Input" placeholder="Attach your signature here" name="signature" onChange={this.handleChange} value={this.state.signature} />

                   </div>

                    <div className="FormField">
                      <label className="FormField__CheckboxLabel">
                          <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={this.handleChange} /> I agree all statements in <a href="" className="FormField__TermsLink">terms of service</a>
                      </label>
                    </div>

                    <div className="FormField">
                        <button type="submit" className="FormField__Button mr-20">Sign Up</button> <Link  to="/sign-in" className="FormField__Link">I'm already member</Link>
                    </div>
                </form>
      </div>

		);
	}
}

export default signupform;