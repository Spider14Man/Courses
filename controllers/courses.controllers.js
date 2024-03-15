const {validationResult}=require('express-validator');
const Course=require('../models/course.model');
const httpstatustext=require('../utilize/httpstatustext.js');
const asyncwrapper = require('../middlewares/asyncwrapper');
const AppError=require('../utilize/apperror')

const getAllCourses=asyncwrapper(
async(req,res)=>{
    const query=req.query;
    const limit=query.limit||10;
    const page=query.page||1;
    const courses=await Course.find({},{
        "__v":false
    }).limit(limit).skip((page-1)*limit);
    res.json({
        status:httpstatustext.SUCCESS,
        data:courses
    })
}
)
const addcourse=asyncwrapper (
    async(req,res,next)=>{
    // console.log(req.body);
    // console.log();
    // if (!req.body.title) {
    //     return res.status(400).json({
    //         Error:"title is Requires"
    //     })
    // }
    // if (!req.body.price) {
    //     return res.status(400).json({
    //         Error:"price is Requires"
    //     })
    // }
    const Errors=validationResult(req);
    // console.log(Error);
    if (!Errors.isEmpty()) {
        const error=AppError.create(Errors.array(),400,httpstatustext.FAIL)

        return next(error);

    //     return res.status(400).json({
    //         status:httpstatustext.FAIL,
    //         message:Errors.array()
    // })
    }
    const newCourse=new Course(req.body);
    await newCourse.save();
    res.status(201).json({
        status:httpstatustext.SUCCESS,
        data:newCourse
        } 
    )

    // courses.push({
    //     id:courses.length+1,
    //     ...req.body
    // })
}
)

const getCourse=asyncwrapper(
async(req,res,next)=>{
    const course=await Course.findById({_id:req.params.courseId},{_id:false});
    if(!course){
        const error=AppError.create('Not Found Course',404,httpstatustext.FAIL)
        return next(error);

            // return res.status(404).json({
            //     status:httpstatustext.FAIL,
            //     data:{course:"not Found"}
            
            // })
        }           
        res.json({
            status:httpstatustext.SUCCESS,
            data:course
        })
    }
      )
//         try {
//     } catch (err) {
     
//         return res.status(400).json({
//             status:httpstatustext.ERROR,
//             message:err.message
//         }
//         )
// }
    // console.log(req.params.courseId,course);

const updateCourse=asyncwrapper(
async(req,res)=>{
    const course=await Course.findByIdAndUpdate(req.params.courseId,{$set:{...req.body}});
    return res.status(200).json({
        status:httpstatustext.SUCCESS,
        data:course
    })
//     try {
// } catch (error) {
//             return res.status(400).json({
//                 status:httpstatustext.ERROR,
//                 message:err.message
//             })
//     }
}
)
const deleteCourse=asyncwrapper(
async(req,res)=>{
    await Course.deleteOne({_id:req.params.id});
    
    res.status(200).json({
        status:httpstatustext.SUCCESS,
        data:null
    })
    
}
)
module.exports={
    addcourse,
    getAllCourses,
    getCourse,
    updateCourse,
    deleteCourse
}   