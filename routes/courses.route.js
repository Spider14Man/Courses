const express=require('express')
const router=express.Router()

const coursesController= require('../controllers/courses.controllers')
const { validation } = require('../middlewares/validation-scehme')
const verifyToken = require('../middlewares/verifyToken')
const { userRoles } = require('../utilize/roles')
const allowedTo = require('../middlewares/allowedTo')


router.route('/')
        .get(coursesController.getAllCourses)
        .post(verifyToken,allowedTo(userRoles.MANAGER),validation(),coursesController.addcourse)
router.route('/:courseId')
    .get(coursesController.getCourse)
    .patch(coursesController.updateCourse)
router.route('/:id')
    .delete(verifyToken,allowedTo(userRoles.ADMIN,userRoles.MANAGER),coursesController.deleteCourse)
module.exports=router;
