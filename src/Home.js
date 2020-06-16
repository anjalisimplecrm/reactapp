import React, {Component} from 'react';
import fire from './fire';
import Table from './Table';

class Home extends Component{
  
  constructor(props){
    super(props);
    
    this.logout=this.logout.bind(this);
    this.state={
        
        developers:[]
      }
  }
 

  handleSubmit = event => {

    event.preventDefault();
    const { developers } = this.state;
    let ref = fire.database().ref('users');
    ref.on('value', snapshot => {
    const state = snapshot.val();
 
     let keys=Object.keys(state);

    for(let i=0;i <keys.length ;i++){
      let key= (Object.keys(state)[i]);
     // console.log(key);
      let username= (state[keys[i]].username);
      //console.log(username);
      let password= (state[keys[i]].password);
      //console.log(password);
      let confpassword= (state[keys[i]].confpassword);
      //console.log(confpassword);
      let email= (state[keys[i]].email);
      //console.log(email);
      let profile=(state[keys[i]].profile);
      //console.log(profile);
      let signature=(state[keys[i]].signature);

       developers.push({ key, username, password, confpassword, email, profile, signature});
       this.setState({ developers });
   
    }
  
    this.username = "";
    this.email= "";
    this.key = "";
    
  });
  alert('Your data is retriving..Please click ok to continue!!');
 
};


logout(){
  fire.auth().signOut();
}

render(){
  const { developers } = this.state;

  return(
     <React.Fragment>
    <div>

       <div className='row'>
        <div className='col-xl-12'>
        <h1>Welcome To Home Page</h1>
          <form onSubmit={ this.handleSubmit }>
            <button type="submit" className="btn btn-primary">Show List of Users</button>
          </form>
        </div>
      </div>
    <div>
     <table className="table" id="example-table">

      <thead className="text-primary">
        <tr>
          <th scope="col">Username</th>
          <th scope="col">Password</th>
          <th scope="col">Email</th>
          <th scope="col">Profile</th>
          <th scope="col">Signature</th>
        </tr>
      </thead>
      <tbody>

         {developers.map(developer => (

           <tr key={developer.key}>
            <td> {developer.username}</td>
            <td> {developer.password}</td>
            <td> {developer.confpassword} </td>
            <td> {developer.email} </td>
            <td> {developer.profile} </td>
            <td> {developer.signature} </td>
           </tr>
         ))}

    </tbody>
    </table>

    
  <button onClick={this.logout}>Logout</button>
  </div>
 </div>

</React.Fragment>
  );
}
}
export default Home;
