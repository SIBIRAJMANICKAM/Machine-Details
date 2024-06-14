
// const mongoose=require("mongoose");
// const db="mongodb://localhost:27017/MachineDetails";

// mongoose.connect(db,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).then(()=>console.log("Connection Starts")).catch((error)=>console.log(error.message));
const { MongoClient } = require('mongodb');

const dbURI = "mongodb://localhost:27017";
const dbName = "MachineDetails";

const client = new MongoClient(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connectDB() {
    try {
        await client.connect();
        console.log("Connection Starts");
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error("Error connecting to database:", error.message);
    }
}

module.exports = connectDB;
