const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    resourceTitle: {
        type: String,
        required: true,
    },
    symptoms: {
        type: String,
    },
    seeDoctor: {
        type: String,
    },
    treatMent: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const StateResources = mongoose.model('Resource', resourceSchema);

module.exports = StateResources;