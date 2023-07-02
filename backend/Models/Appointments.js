const mongoose = require('mongoose');

// Define the appointments schema
const appointmentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    createdBy: {
         type: mongoose.Types.ObjectId, ref: 'User' 
        },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    hospitalname: {
        type: String,
        required: true
    }
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;