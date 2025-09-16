import jwt from "jsonwebtoken";

import {User} from '../models/user.js'

// const jwt = require('jsonwebtoken')

const authMiddleware=async(req,res,next)=>{

    // const token=req.header('Authorization')?.replace('Bearer','')

    //     if(!token){

    //     return res.status(401).json({message:"No token Provided"});

    // }

    // // console.log(token)

    // // token = token.toString();

    try{

        const authHeader=req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){

            return res.status(401).json({message:"No token Provided"});

        }

        const token=authHeader.split(" ")[1];

        // console.log(token);

        const decoded=await jwt.verify(token,process.env.JWT_SECRET);


 

        const user =await User.findById(decoded.id);

        if(!user){

            return res.status(401).json({message:"User not found"});

        }

        console.log(decoded);


 

        req.user = {id: user._id, ...user.toObject()};

        console.log("decoded  : ",decoded);

        next();


 

    }

    catch(err){

        console.log("Auth middleware error: ", err );

        res.status(401).json({message:"Invalid or expired token"});

    }

};

export default authMiddleware;