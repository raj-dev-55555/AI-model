import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function Login (){

      let[email,setEmail] = useState("");
       let[password,setPassword] = useState("");
            let Navigate = useNavigate();

          const handleSubmit = async (e)=>{
           e.preventDefault()  //preventDefault
          const user = {
            email:email,
            password:password
          }

          let response =  await axios.post("http://localhost:8080/user/login",user);
           let token = response.data.token
          // Cookies.set("token", response.data.token);
          localStorage.setItem('token',response.data.token)

               Navigate("/home")
               console.log("token addedd")
           
   }

    return(
        <div>
             <h1>Login Your Account</h1>

            <form action="" onSubmit={handleSubmit}>
                
             
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
                
                   <button className="btns">Login</button>  
                           
                        <Link to={'/'}> <button className="btns">Signup</button> </Link>   
                         
                 
            </form>
          
     




        </div>
    )
}

 export default Login