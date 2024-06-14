// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const machineSchema = new Schema({
//   machineName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   description: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   website: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   supportMail: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   supportContact: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   establishmentYear: {
//     type: Number,
//     required: true,
//     min: 1800,
//     max: new Date().getFullYear()
//   },
//   numberOfMachines: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   machineImage: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   machineMake: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   machineId: {
//     type: String,
//     required: true,
//     trim: true
//   }
// }, {
//   timestamps: true
// });

// const Machine = mongoose.model('Machine', machineSchema);
// module.exports = Machine;

const { ObjectId } = require('mongodb');

const machineSchema = {
    machineName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    supportMail: { type: String, required: true, trim: true },
    supportContact: { type: String, required: true, trim: true },
    establishmentYear: { type: Number, required: true, min: 1800, max: new Date().getFullYear() },
    numberOfMachines: { type: Number, required: true, min: 0 },
    machineImage: { type: String, required: true, trim: true },
    machineMake: { type: String, required: true, trim: true },
    machineId: { type: String, required: true, trim: true }
};

module.exports = machineSchema;
