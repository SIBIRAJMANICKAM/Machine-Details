const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const machine = require('../models/machineSchema');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Use original filename
    }
});

// Initialize multer middleware
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // 10 MB limit (adjust as necessary)
    },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('machineImage'); // 'machineImage' should match the name attribute in your form input

router.post("/add-details", (req, res) => {
    console.log("Called function");
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            console.error('Multer error:', err);
            return res.status(500).send('Error uploading file');
        } else if (err) {
            // An unknown error occurred
            console.error('Unknown error:', err);
            return res.status(500).send('Unknown error occurred');
        }

        // File uploaded successfully, proceed with saving machine details
        const {
            machineName, description, website, supportMail, supportContact,
            establishmentYear, numberOfMachines, machineMake, machineId
        } = req.body;

        const machineImage = req.file ? req.file.path : null;

        if (!machineName || !description || !website || !supportMail || !supportContact ||
            !establishmentYear || !numberOfMachines || !machineMake || !machineId || !machineImage) {
            return res.status(400).send("Please Fill All The Fields");
        }

        try {
            const existingMachine = await machine.findOne({ machineName, establishmentYear });
            if (existingMachine) {
                
                return res.status(400).send("Machine with the same name and establishment year already exists");
            }

            const newMachine = new machine({
                machineName,
                description,
                website,
                supportMail,
                supportContact,
                establishmentYear,
                numberOfMachines,
                machineImage,
                machineMake,
                machineId
            });

            await newMachine.save();
            res.status(201).send("Machine details added successfully");

        } catch (error) {
            console.error("Error adding machine details:", error);
            res.status(500).send("Failed to add machine details");
        }
    });
});
router.get('/getmachine/:id',async(req,res)=>{
    try
    {console.log(req.params);
    const {id}=req.params;
    const individual=await machine.findById({_id:id});
    console.log(individual);
    res.status(201).json(individual);}
    catch(error){
        req.status(404).json(error);
    }
})

router.get('/getData',async (req,res)=>{
    try{
        const machineData=await machine.find();
        res.status(201).json(machineData);
        console.log(machineData);
    }
    catch{
        res.status(404).json(error);
    }
})

module.exports = router;
