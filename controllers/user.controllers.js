const asyncwrapper = require("../middlewares/asyncwrapper");
const User=require('../models/user.model');
const AppError = require("../utilize/apperror");
const bcrypt=require('bcryptjs');
const httpstatustext=require('../utilize/httpstatustext.js');
const jwt = require("jsonwebtoken");
const generateJwt = require("../utilize/generate.jwt");

const getAllUsers=asyncwrapper(
    async(req,res)=>{
        console.log(req.headers);
        const query=req.query;
        const limit=query.limit||10;
        const page=query.page||1;
        const users=await User.find({},{
            "__v":false,
            password:false
        }).limit(limit).skip((page-1)*limit);
        res.json({
            status:httpstatustext.SUCCESS,
            data:users
        })
    }
    )

const register=asyncwrapper(async(req,res,next)=>{
    
    const {firstName,lastName,email,password,role}=req.body;
    const olduser = await User.findOne({email:email})
    if (olduser) {
        const error=AppError.create('user already exists ',404,httpstatustext.FAIL)
        return next(error);
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=new User({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        role
    })
    const token=await generateJwt({email:newUser.email,id:newUser._id,role:newUser.role})
    newUser.token=token;
    await newUser.save();
    res.status(201).json({
        status:httpstatustext.SUCCESS,
        data:newUser
        } 
    )

})
const login=asyncwrapper(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email&&!password){
        const error=AppError.create('email and Password are required  ',404,httpstatustext.FAIL)
        return next(error);
    }
    const user=await User.findOne({email:email})
    if(!user){
        const error=AppError.create('user not found  ',404,httpstatustext.FAIL)
        return next(error);
    }
    const matchedPassword=await bcrypt.compare(password,user.password)
    if (user && matchedPassword ) {
        const token=await generateJwt({email:user.email,id:user._id,role:user.role})
        return res.json({
            status:httpstatustext.SUCCESS,
            data:{token}
        })
    }else{
        const error=AppError.create('Something went wrong',500,httpstatustext.ERROR)
        return next(error);
    }
})
module.exports={
    getAllUsers,
    register,
    login
}