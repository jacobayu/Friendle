import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    used: Boolean,
    usersCompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dateCreated: { type: Date, default: Date.now },
    dateUsed: { type: Date },
  });

const Question = mongoose.model('Question', questionSchema);
module.exports = Question