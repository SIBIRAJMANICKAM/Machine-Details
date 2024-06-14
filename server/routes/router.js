// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const machine = require('../models/machineSchema');

// // Define storage for uploaded files
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder for uploaded files
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const ext = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Use original filename
//     }
// });

// // Initialize multer middleware
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 10 // 10 MB limit (adjust as necessary)
//     },
//     fileFilter: function (req, file, cb) {
//         const filetypes = /jpeg|jpg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb(new Error('Only images are allowed'));
//     }
// }).single('machineImage');

// router.post("/add-details", (req, res) => {
//     console.log("Called function");
//     upload(req, res, async function (err) {
//         if (err instanceof multer.MulterError) {
//             // A Multer error occurred when uploading
//             console.error('Multer error:', err);
//             return res.status(500).send('Error uploading file');
//         } else if (err) {
//             // An unknown error occurred
//             console.error('Unknown error:', err);
//             return res.status(500).send('Unknown error occurred');
//         }

//         // File uploaded successfully, proceed with saving machine details
//         const {
//             machineName, description, website, supportMail, supportContact,
//             establishmentYear, numberOfMachines, machineMake, machineId
//         } = req.body;

//         const machineImage = req.file ? req.file.path : null;

//         if (!machineName || !description || !website || !supportMail || !supportContact ||
//             !establishmentYear || !numberOfMachines || !machineMake || !machineId || !machineImage) {
//             return res.status(400).send("Please Fill All The Fields");
//         }

//         try {
//             const existingMachine = await machine.findOne({ machineName, establishmentYear });
//             if (existingMachine) {
                
//                 return res.status(400).send("Machine with the same name and establishment year already exists");
//             }

//             const newMachine = new machine({
//                 machineName,
//                 description,
//                 website,
//                 supportMail,
//                 supportContact,
//                 establishmentYear,
//                 numberOfMachines,
//                 machineImage,
//                 machineMake,
//                 machineId
//             });

//             await newMachine.save();
//             res.status(201).send("Machine details added successfully");

//         } catch (error) {
//             console.error("Error adding machine details:", error);
//             res.status(500).send("Failed to add machine details");
//         }
//     });
// });
// router.get('/getmachine/:id',async(req,res)=>{
//     try
//     {console.log(req.params);
//     const {id}=req.params;
//     const individual=await machine.findById({_id:id});
//     console.log(individual);
//     res.status(201).json(individual);}
//     catch(error){
//         req.status(404).json(error);
//     }
// })

// router.get('/getData',async (req,res)=>{
//     try{
//         const machineData=await machine.find();
//         res.status(201).json(machineData);
//         console.log(machineData);
//     }
//     catch{
//         res.status(404).json(error);
//     }
// })

// router.delete("/delete/:id", async (req, res) => {
//     try {
//         console.log("Delete Request ID:", req.params.id);  
//         const { id } = req.params;
//         const deleteuser = await machine.findByIdAndDelete({ _id: id });
//         console.log(deleteuser);
//         res.status(201).json(deleteuser);
//     } catch (error) {
//         res.status(422).json(error);
//     }
// });

// router.patch('/updateMachine/:id', (req, res) => {
//     upload(req, res, async (err) => {
//         if (err instanceof multer.MulterError) {
//             // Handle Multer errors
//             console.error('Multer error:', err);
//             return res.status(500).send('Error uploading file');
//         } else if (err) {
//             // Handle other errors
//             console.error('Unknown error:', err);
//             return res.status(500).send('Unknown error occurred');
//         }

//         try {
//             const { id } = req.params;
//             const updateFields = {
//                 machineName: req.body.machineName,
//                 description: req.body.description,
//                 website: req.body.website,
//                 supportMail: req.body.supportMail,
//                 supportContact: req.body.supportContact,
//                 establishmentYear: req.body.establishmentYear,
//                 numberOfMachines: req.body.numberOfMachines,
//                 machineMake: req.body.machineMake,
//                 machineId: req.body.machineId
//             };

//             if (req.file) {
//                 updateFields.machineImage = req.file.path;
//             }

//             const updatedMachine = await machine.findByIdAndUpdate(id, updateFields, {
//                 new: true // To return updated document
//             });

//             if (!updatedMachine) {
//                 return res.status(404).send('Machine not found');
//             }

//             res.status(201).json(updatedMachine);
//         } catch (error) {
//             console.error('Error updating machine:', error);
//             res.status(422).json({ message: 'Failed to update machine' });
//         }
//     });
// });

// router.get('/search', async (req, res) => {
//     const { query } = req.query;
//     try {
//         // Perform a case-insensitive search using regex
//         const searchResults = await machine.find({
//             machineName: { $regex: query, $options: 'i' }
//         });
//         res.status(200).json(searchResults);
//     } catch (error) {
//         res.status(500).json({ message: 'Error searching for machines', error });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connectDB = require('../db/conn');
const machineSchema = require('../models/machineSchema');
const { ObjectId } = require('mongodb');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('machineImage');

router.post("/add-details", async (req, res) => {
    const db = await connectDB();
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).send('Error uploading file');
        } else if (err) {
            console.error('Unknown error:', err);
            return res.status(500).send('Unknown error occurred');
        }

        const {
            machineName, description, website, supportMail, supportContact,
            establishmentYear, numberOfMachines, machineMake, machineId
        } = req.body;

        const machineImage = req.file ? req.file.path : null;

        if (!machineName || !description || !website || !supportMail || !supportContact ||
            !establishmentYear || !numberOfMachines || !machineMake || !machineId ) {
                
            return res.status(400).send("Please Fill All The Fields");
        }

        try {
            const existingMachine = await db.collection('machines').findOne({ machineName, establishmentYear });
            if (existingMachine) {
                return res.status(400).send("Machine with the same name and establishment year already exists");
            }

            const newMachine = {
                machineName,
                description,
                website,
                supportMail,
                supportContact,
                establishmentYear,
                numberOfMachines,
                machineImage,
                machineMake,
                machineId,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            await db.collection('machines').insertOne(newMachine);
            res.status(201).send("Machine details added successfully");

        } catch (error) {
            console.error("Error adding machine details:", error);
            res.status(500).send("Failed to add machine details");
        }
    });
});

router.get('/getmachine/:id', async (req, res) => {
    const db = await connectDB();
    try {
        const { id } = req.params;
        const individual = await db.collection('machines').findOne({ _id: new ObjectId(id) });
        res.status(201).json(individual);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.get('/getData', async (req, res) => {
    const db = await connectDB();
    try {
        const machineData = await db.collection('machines').find().toArray();
        res.status(201).json(machineData);
    } catch (error) {
        res.status(404).json(error);
    }
});

router.delete("/delete/:id", async (req, res) => {
    const db = await connectDB();
    try {
        const { id } = req.params;
        const deleteuser = await db.collection('machines').deleteOne({ _id: new ObjectId(id) });
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
});

router.patch('/updateMachine/:id', async (req, res) => {
    console.log("Called update function");
    const db = await connectDB();
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).send('Error uploading file');
        } else if (err) {
            console.error('Unknown error:', err);
            return res.status(500).send('Unknown error occurred');
        }

        try {
            const { id } = req.params;
            console.log(id);
            const updateFields = {
                machineName: req.body.machineName,
                description: req.body.description,
                website: req.body.website,
                supportMail: req.body.supportMail,
                supportContact: req.body.supportContact,
                establishmentYear: req.body.establishmentYear,
                numberOfMachines: req.body.numberOfMachines,
                machineMake: req.body.machineMake,
                machineId: req.body.machineId,
                updatedAt: new Date()
            };

            if (req.file) {
                updateFields.machineImage = req.file.path;
            }

            const updatedMachine = await db.collection('machines').findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: updateFields },
                { returnOriginal: false }
            );

            if (!updatedMachine) {
                return res.status(404).send('Machine not found');
            }

            res.status(201).json(updatedMachine);
        } catch (error) {
            console.error('Error updating machine:', error);
            res.status(422).json({ message: 'Failed to update machine' });
        }
    });
});

router.get('/search', async (req, res) => {
    const db = await connectDB();
    const { query } = req.query;
    try {
        const searchResults = await db.collection('machines').find({
            machineName: { $regex: query, $options: 'i' }
        }).toArray();
        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: 'Error searching for machines', error });
    }
});

module.exports = router;
