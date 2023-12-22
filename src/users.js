
const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const Subscriber = require("./model/schema");
const { error } = require("console");
const app=express();



// any platform can access my api
// what evere data is coming in the body can not be redable body parser aloow it to be redable
app.use(bodyParser.urlencoded({ extended:true}))
app.use(bodyParser.json());



// Middleware to check MongoDB connection status
routes.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(500).send("Internal server error: MongoDB not connected");
    }
    next();
});


routes.get("/subscribers", async (req, res) => {
    try {
        let subscribers = await Subscriber.find({});
        console.log(subscribers);
        res.send(JSON.stringify({ subscribers}));
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});



app.use(express.urlencoded({ extended:true}))
app.use(express.json());

routes.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
});





//  find by id 
routes. get("/subscribers/:id",async(req,res)=>{

    try{
        const id=req.params.id;
        if(!id){
            res.statusMessage(400).json({message:"no id provided"});
            return;
        }
        const Subscriberss=await Subscriber.findById(id);
        if(!Subscriber){
            res.status(400).json({message:"subscriber not found"})
            return;
        }
        res.send(Subscriberss);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});


// //THIS ROUTE PROVIDES AN ARRAY OF ALL SUBSCRIBERS WITH ONLY TWO FIELDS, THEIR NAME AND SUBSCRIBED CHANNEL.

routes.get("/subscriberss/names",async (req,res)=>{
    
    try{
      


        let Subscribersss =  await Subscriber.find(
            {},
            {name:1,subscribedChannel:1,_id:0});

        res.status(200).json(Subscribersss);
        // res.send(JSON.stringify({ Subscribersss}));
        // res.send(subscribers)
    }
    catch(err){
        res.status(400);
       
    }
});



// Dummy API route
routes.get('/dummyapi', (req, res) => {
    res.send("Dummy API is working");
});


module.exports = routes;
