// #!/user/bin/env node

// // console.log("Hello World");
// // console.log(process.argv)
// // console.log("Hello World");
// // console.log("Hello World");
// import fs  from 'fs';
// import {Command} from'commander';
// // import {inquirer} from 'inquirer';
// import inquirer from 'inquirer';
// import { log } from 'console';
// const program=new Command();
// var que=[
//     {
//         type:"input",
//         name:"programming",
//         message:"What is your fav programming ?"
//     },
//     {
//             type:"number",
//             name:"price",
//             message:"What is your price ?"
//         }
// ];
// const path ="./courses.json";
// program
//     .name('Session two')
//     .description('THIS IS the seconed session i had to make the tasks and im happy to do this ')
//     .version('0.8.0');
    
//     program 
//     .command('add')
//     .alias('a')
//     .description('Add a course')
//     // .argument("<title>","add course title")
//     // .option("--price <price>","add course price")
//     .action(()=>{
//         // console.log(param,option);
//         inquirer
//         .prompt(que)
//         .then((answers)=>{
//             console.log(answers);
//             if (fs.existsSync(path)) {
//                     fs.readFile(path,'utf-8',(err,data)=>{
//                             if (err) {
//                                     console.log("err" ,err);
//                                     process.exit();
//                                 }
//                                 console.log("content" ,data);
//                                 const fileContentAsJson=JSON.parse(data)
//                                 fileContentAsJson.push(answers)
//                     console.log(answers);
//                     fs.writeFile(path,JSON.stringify(fileContentAsJson),'utf-8',()=>{
//                             console.log("Done");
//                         })
//                 })
//             }else{
//                 fs.writeFile(path,JSON.stringify([answers]),'utf-8',()=>{
//                         console.log("Done");
//                     })
//                 }
//             })
// })
// program 
// .command('list')
//     .alias('li')
//     .description('list courses')
//     // .argument("<title>","add course title")
//     // .option("--price <price>","add course price")
//     .action(()=>{
   
//         fs.readFile(path,'utf-8',(err,content)=>{
//             if (err) {
//                 console.log("ERROR",err);
//             };
//             console.table(JSON.parse(content));
//         })
    
    
//     })
// program.parse(process.argv)
// const { log } = require("node:console");
// const fs =require("node:fs")
// const file=fs.readFile('./file.txt','utf-8',(err,data)=>{
//     if (err) {
    //         console.log("ERROR =>>>>",err);
//         exit();
//     }
//     console.log(data);
//         });
// const crypto=require('crypto')
// // process.env.UV_THREADPOOL_SIZE=7;
// process.env.UV_THREADPOOL_SIZE=3
// const start=performance.now();
// function crypto_(params) {
    
//     crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//         console.log("End of Performance",performance.now()-start);
//     })
// }
// console.log("hady")
// crypto_()
// crypto_()
// crypto_()
// crypto_()
// crypto_()
// crypto_()
// crypto_()
// console.log("Gamal")

// const { log } = require("node:console");
// const http=require("node:http")

// const server=http.createServer((req,res)=>{
//     console.log(req.url);
//     if (req.url=='/') {
//         res.end("home")
//     }else if(req.url=='/contact'){
//         res.end("Contact");
//     }else{
//         res.end("about")
//     }
// })
// server.listen(3001,()=>{
//     console.log("listining on port 3001");
// })
const fs=require('node:fs');

const homepage=fs.readFileSync('./views/index.html','utf-8')
const http=require('node:http')
const server=http.createServer((req,res)=>{
    // res.write(req.url);
    // res.write(<h1></h1>);
    // res.write("Haday")
    if (req.url=='/') {
        res.write(homepage) 
    }else if(req.url=='/about'){
        res.write("<h1>HELLO From about page</h1>")
    
    }else if(req.url=='/login'){
        res.write("<h1>HELLO From Login page</h1>")
    }else{
        res.write("<h1>NOT FOUND PAGE</h1>")
        res.statusCode=404;
        
    }
    res.end()

})
server.listen(5000,'localhost',()=>{
    console.log("listioning on bort 5000");
})