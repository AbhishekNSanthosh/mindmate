const mongoose = require('mongoose');

const questionnaireSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    mentalStates: [{
        type: String,
        required: true
      }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);

module.exports = Questionnaire;