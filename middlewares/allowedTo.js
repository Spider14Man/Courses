const apperror = require("../utilize/apperror");

module.exports=(...roles)=>{
    return (req,res,next)=>{
        console.log(roles);
        if (!roles.includes(req.currentUser.role)) {
            return next(apperror.create('this role is not authorized',401))
        }
        next();
    }
}