import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';



function Protected ({children}){
    let  navigate = useNavigate();
    // let token =  Cookies.get("token");
    let token = localStorage.getItem('token')
    let [loading,setLoading] = useState(true)
    console.log(token)

   
         useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user/checkToken", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log("here is the responce ",res)

        if (res.data.isBlacklisted) {
          navigate("/login");
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        navigate("/login"); // API fail ho to bhi safe side pe login bhej do
      }
    };

    verifyToken();
  }, []);

    if (loading) return <h1>Loading...</h1>;


    return(
        <div>
          {children}
        </div>
    )
}

 export default Protected