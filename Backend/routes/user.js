const User = require("../models/user");
const BlackList = require("../models/blackList")
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();


router.post("/signup", async(req,res)=>{
           let{name,email,password} = req.body;
           
           if(!name || !email || !password){
            return res.status(400).json({message:"All Field Are Required"})
           }

           let user =  await User.findOne({email});
           if(user){
            return res.status(400).json({message:"User Already Existed"})
              
           }
           
           let newpass =  await bcrypt.hash(password,10);

           let newUser = new User({
               name:name,
               email:email,
               password:newpass
           })
             await newUser.save();
         

           let token = jwt.sign({id:newUser.id},process.env.Secret,{expiresIn:"24h"})

           return res.status(200).json({token:token,user:newUser});
           
           


});


router.post("/login",async(req,res)=>{
          let{email,password} = req.body;
           
           if( !email || !password){
            return res.status(400).json({message:"All Field Are Required"})
           }

           let user =await User.findOne({email});

           if(!user){
            return res.status(400).json({message:"User& Password Are Wrong bro"})
               
           }

           let newpass = await bcrypt.compare(password,user.password);
           console.log(newpass)

           if(!newpass){
            return res.status(400).json({message:"User& Password Are Wrong ok"})

           }

           let token = jwt.sign({id:user.id},process.env.Secret,{expiresIn:"24h"});
               

           return res.status(200).json({token:token,user:user})

});


router.get("/checkToken", async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    const blacklisted = await BlackList.findOne({ token });
    console.log("here is the backend proof",!!blacklisted)

    return res.status(200).json({ isBlacklisted: !!blacklisted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});



router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    const tokenSave = new BlackList({ token });
    await tokenSave.save();

    res.clearCookie('token');

    return res.status(200).json({ message: "User logged out" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;