import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: String,
    used: Boolean,
    dateUsed: { type: Date },
  });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question