const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');


//auth
exports.auth = async(req,res,next)=>{
    try{
        // console.log('auth middleware token')
        // console.log("req.body =", req.body.token);
        // console.log("req.cookies =", req.cookies);
        // console.log("header token:", req.header("Authorization"));
        const token =  req.body?.token || req.cookies?.token ||
                                    req.header('Authorization')?.replace("Bearer ","");
        console.log('final token',token);
        //if token missing 
        if(!token){
            return res.status(401).json({
                success:false,
                message:'token missing',
            });
        }

        //verify token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error){
            //verification issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }catch(error){
        return res.status(500).json({
                success:false,
                message:'something went wrong while validating the token',
            })
    }
}


//is Student

exports.isStudent = async(req,res,next)=>{
    try{
        if(req.user.accountType !== 'Student'){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Students Only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
}

//is instructor
exports.isInstructor = async(req,res,next)=>{
    try{
        if(req.user.accountType !== 'Instructor'){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor Only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
} 

//is admin

exports.isAdmin = async(req,res,next)=>{
    try{
        if(req.user.accountType !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin Only",
            })
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again"
        })
    }
} 