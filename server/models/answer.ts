import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answer: String,
    date: { type: Date, default: Date.now }
  });

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer