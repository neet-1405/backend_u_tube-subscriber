const express=require("express");
const dotenv=require("dotenv").config();
const cors=require("cors")

const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const path = require("path");

// const users=require("./src/users.js")
const users=require("../subscriberbackend/src/users")

const app=express();

// routing file
// own module for routes custom import


const mongodbURI=process.env.MONGOOSE_URI;
const port=process.env.port||8080;
const server=app.listen(port,()=>{
    console.log("server is running on the port 8010")
})

// database configuration
mongoose.connect(mongodbURI)
.then(()=>console.log("mongoDB succesfull connected"))
.catch(err=>console.log(err))

// any platform can access my api
app.use(cors());
// what evere data is coming in the body can not be redable body parser aloow it to be redable
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json());





// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname,"/index.html"))
// });

// app.get("/",(req,res)=>{
//     res.sendFile(path.join(__dirname, "/index.html"))
// });


// app.use('/', require('./src/users'));

// app.use('/subscribers', require('./src/users'));


app.use("/users",users)
