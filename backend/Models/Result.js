const mongoose = require('mongoose')
const { Schema } = mongoose;

const ResultSchema = new Schema({
    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    result: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Result", ResultSchema)