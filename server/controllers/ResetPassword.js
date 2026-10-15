const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
//resetPassToken
exports.resetPasswordToken = async(req,res)=>{
    try{
        //fetch email from the req
        const {email} = req.body;
        //email validation
        if(!email){
            return res.status(403).json({
                success:false,
                message:'please fill the email',
            });
        }
        const user = await User.findOne({email:email});

        if(!user){
            return res.json({
                success:false,
                message:'User is not registered',
            });
        }
        //generate token
        const token = crypto.randomUUID();
        console.log('token ',token );

        //update in db
        const updatedDetails = await User.findOneAndUpdate({email:email},{
                                                                token: token,
                                                                resetPasswordExpires: Date.now() + 5*60*1000,                        
                                                                    },
                                                                {new:true});

        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send mail
        await mailSender(email,"Password Reset Link",
                                `Password Reset Link ${url}`);

        
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change password',
        });
        
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while sending reset pass mail',
        });
    }
}

//reset password
exports.resetPassword = async(req,res)=>{
    try{
        //data fetched 
        const {password ,confirmPassword,token} = req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Password Mismatched",
            });
        }
        //find user from db using token
        const userDetails = await User.findOne({token:token});
        //if no entry -invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is Invalid',
            });
        }
        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
             return res.json({
                success:false,
                message:'Token is Expired, Please regenerate your token',
            });
        }
        //hash pass
        const hashedPassword = await bcrypt.hash(password,10);

        //password update
        await User.findOneAndUpdate({token:token},{password:hashedPassword},{new:true});

        //return res
        return res.status(200).json({
            success:true,
            message:'Password Reset Successfully',
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while Password reseting',
        });
    }
}