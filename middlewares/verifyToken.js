const generateJwt = require("../utilize/generate.jwt");
const jwt=require('jsonwebtoken')
const httpstatustext=require('../utilize/httpstatustext.js');
const apperror = require("../utilize/apperror");

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers['Authorization'] || req.headers['authorization']
    if(!authHeader){
        const error=apperror.create('invalid token 1',401,httpstatustext.ERROR)
        return next(error);
    }
    const token=authHeader.split(' ')[1]
    try{
        const currentUser=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.currentUser=currentUser;
        next();
    }
    catch(err){
        const error=apperror.create('invalid token 2',401,httpstatustext.ERROR)
        console.log(err);
        return next(error);
    }
   
}


module.exports=verifyToken