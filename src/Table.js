import React from 'react';
import fire from './fire';

const Table = () => {
/*    var query = fire.database().ref("users").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var key = childSnapshot.key; // "ada"

      // Cancel enumeration
      return true;
  });
});*/
/*var query = fire.database().ref("users").orderByKey();
query.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // key will be "ada" the first time and "alan" the second time
      var key = childSnapshot.key;
      console.log(JSON.parse(childSnapshot));
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      //console.log(JSON.parse(childData));
  });
});*/

let ref = fire.database().ref('users');
  ref.on('value', gotdata ,errData)
  function gotdata(data){
    
   let users =data.val();
    /*below is json data*/
    let userdata= Object(users);
    //console.log(users);
    let keys=Object.keys(users)
    //console.log(keys[0])
   /* for(let i=0;i <keys.length ;i++){
      let id=keys[i];
      //console.log(id);
      let username= users[keys[i]].username;
      //console.log(username);
      let password=users[keys[i]].password;
      //console.log(password);
      let confpassword=users[keys[i]].confpassword;
      //console.log(confpassword);
      let email=users[keys[i]].email;
      //console.log(email);
      let profile=users[keys[i]].profile;
      //console.log(profile);
      let signature=users[keys[i]].signature;
      //console.log(signature);
    }*/

    let res=[];
    for(var i =0; i < keys.length; i++){
           res.push(
            <tr >
          <td key={users[keys[i]].id}>{users[keys[i]].id}</td>
         <td key={users[keys[i]].username}>{users[keys[i]].username}</td>
           <td key= {users[keys[i]].password}>{users[keys[i]].password}</td>
           <td key={users[keys[i]].email}>{users[keys[i]].email}</td>
           <td key={users[keys[i]].profile}>{users[keys[i]].profile}</td>
           <td key={users[keys[i]].signature}>{users[keys[i]].signature}</td>
           </tr>
           )


       }
       return res;


    
  }
    function errData(error){
      console.log(error.message ,error.code)
    }


  

  return (
           <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>username</th>
          <th>password</th>
          <th>confirmpassword</th>
          <th>email</th>
          <th>profile</th>
          <th>signature</th>
        </tr>
      </thead>
      <tbody>
         
      </tbody>
    </table>
  );
}

export default Table

