
const mongoose=require("mongoose");
const db="mongodb://localhost:27017/MachineDetails";

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("Connection Starts")).catch((error)=>console.log(error.message));