

const mongoose = require('mongoose')
const subscriberModel = require('./model/schema')
const data = require('./src/data')
const dotenv = require("dotenv").config();



const mongodbURI=process.env.MONGOOSE_URI;
const port=process.env.port||8080;
const server=app.listen(port,()=>{
    console.log("server is running on the port 8010")
})

// database configuration
mongoose.connect(mongodbURI)
.then(()=>console.log("mongoDB succesfull connected "))
.catch(err=>console.log(err))



const refreshAll = async () => {
    await subscriberModel.deleteMany({});
    await subscriberModel.insertMany(data);
    await mongoose.disconnect();
}
refreshAll();

