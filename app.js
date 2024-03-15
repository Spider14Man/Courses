// const express=require('express');
// const morgan = require('morgan');
// const app=express();
// // app.use(express.static('./views'))
// app.use((req,res,next)=>{
//     console.log("middle ware 1");
//     // console.log(req.method);
//     // console.log(req.url);
//     next();
// })
// app.use((req,res,next)=>{
//     console.log("middle ware 2");
//     // console.log(req.method);
//     // console.log(req.url);
//     next();
// })
// app.use(morgan('dev'));

// app.get('/',(req,res)=>{
//     res.send('Welcome from home');
    
// })
// app.get('/about',(req,res)=>{
//     console.log(req.url);
//     res.send('Welcome from About aaaa');
// })
// app.get('/products',(req,res)=>{
//     res.send([
//         {
//             id:1,
//             name:"first product"
//         }
//         ,{
//             id:2,
//             name:"second product"
//         }
//     ]);
// })
// app.listen('5000',()=>{
//     console.log("listining on bort 5000");
// })
require('dotenv').config()
const express = require('express');
const cors=require('cors')
const app = express();
const mongoose=require('mongoose');
const url=process.env.MONGO_URL;
const httpstatustext=require('./utilize/httpstatustext.js');
const userRouter=require('./routes/usre.route')

mongoose.connect(url).then(()=>{
    console.log("Connected successfully");
})


app.use(cors())
app.use(express.json())



const coursesRouter=require('./routes/courses.route')
app.use('/api/courses',coursesRouter)
app.use('/api/users',userRouter)

app.all('*',(req,res,next)=>{
        res.status(400).json({
            status:httpstatustext.ERROR,
            message:'This resourse is not available',
            code:400
        })
    }
)
app.use((error,req,res,next)=>{
    res.status(error.statusCode||500).json({
        status:httpstatustext.ERROR,
        message:error.message
    })
})
app.listen(process.env.PORT,()=>{
    console.log("lisining on bort 5000");
})