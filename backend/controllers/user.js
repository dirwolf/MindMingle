import { User } from "../models/user.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

export const signup = async (req, res) => {

   try {

    console.log(req.body);


 

       const { username, email,  password, tags} = req.body;

        if (!username || !email || !password || !tags) {

           return res.status(400).json({

               message: "Invalid request body",

               success: false

           });

       };

        const user = await User.findOne({ email });

       if (user) {

           return res.status(400).json({

               message: 'User already exist with this email.',

               success: false,

           })

       }

       const hashedPassword = await bcrypt.hash(password, 10);

      const newuser=  await User.create({

           username,

           email,

           password: hashedPassword,

           tags,

         });

         if(!newuser){

            return res.status(500).json({message:"user not created",success:false});

         }

         console.log("newuser has been created this is it : ",newuser);

         const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET,{expiresIn:"12h"});


 

       return res.status(200).json({

           message: "User created successfully.",

           success: true,

           token,

            user:{id:newuser._id,username:newuser.username,email:newuser.email,tags:newuser.tags},

       });

   } catch (error) {

       console.log(error);

       res.status(500).json({message:"server error",success:false});

   }

}


 

export const login=async(req,res)=>{

    try{

        console.log(req.body);

        const {email,password}=req.body ||{};

        if(!email ||!password){

            return res.status(400).json({message:"Email and Password are required",success:false});


 

        }

        const user=await User.findOne({email});

        if(!user){

            return res.status(400).json({message:"Invalid email or password",success:false});


 

        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){

            return res.status(400).json({message:"Invalid email or password",success:false});

        }

        const token=jwt.sign(

            {id:user._id},

            process.env.JWT_SECRET,

            {expiresIn:"1h"}

        );

        return  res.status(200).json({

            message:"Login successful",

            success:true,

            token,

            user:{id:user._id,username:user.username,email:user.email},



 

        });

    }

    catch(error){

        console.error(error);

        res.status(500).json({message:"Server error",success:false});

    }

}