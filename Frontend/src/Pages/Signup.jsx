import React, { useState } from "react";
import './Signup.css'
import {Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";




function Signup (){
   let[name,setName] = useState("");
   let[email,setEmail] = useState("");
   let[password,setPassword] = useState("");

   let Navigate = useNavigate();

   const handleSubmit = async (e)=>{
           e.preventDefault()  //preventDefault
          const user = {
            name:name,
            email:email,
            password:password
          }

          let response =  await axios.post("http://localhost:8080/user/signup",user);
           let token = response.data.token
          // Cookies.set("token", response.data.token);
          localStorage.setItem('token',response.data.token)
               Navigate("/home")
               console.log("token addedd")
           
   }


    return(
        <div>
             <h1>Signup Your Account</h1>

            <form action="" onSubmit={handleSubmit}>
                
                <input type="text" 
                placeholder="Write Your Name" 
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
                <input type="email"  
                placeholder="Write  Your  Email "
                  name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                />
                <input type="password" 
                placeholder="Write  Your  Password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                
                />
                     <button className="btns">Signup</button>
                   <hr />                                   
            </form>

                <Link to={'/login'}>  <button className="btns">Login</button>    </Link>

          
     




        </div>
    )
}

 export default Signup