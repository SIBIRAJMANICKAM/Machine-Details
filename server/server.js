// require("dotenv").config();
// const express= require("express");
// require('./db/conn');
// const cors=require('cors');
// const machine=require('./models/machineSchema');
// const router=require('./routes/router');
// const path=require('path');



// const app=express();


// app.use('/images', express.static(path.join(__dirname, 'uploads')));
// app.use(cors());
// app.use(express.json());
// app.use(router);

// app.listen(5000,()=>{
//     console.log('server is running in http://localhost:5000/');
// });
require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require('path');
const router = require('./routes/router');

const app = express();

app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(5000, () => {
    console.log('server is running on http://localhost:5000/');
});
