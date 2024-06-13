require("dotenv").config();
const express= require("express");
require('./db/conn');
const cors=require('cors');
const machine=require('./models/machineSchema');
const router=require('./routes/router');




const app=express();



app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000,()=>{
    console.log('server is running in http://localhost:5000/');
});

