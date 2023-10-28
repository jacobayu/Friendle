import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answer: String,
    date: { type: Date, default: Date.now }
  });

const Answer = mongoose.model('Answer', answerSchema);