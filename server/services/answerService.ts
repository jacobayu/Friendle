const Answer = require('../models/answer');

// Get all answers
async function getAnswers() {
  return await Answer.find();
}

// Get a single answer by ID
async function getAnswerById(answerId: string) {
  return await Answer.findById(answerId);
}

async function getAnswersByParams(params: any) {
  return await Answer.find(params);
}

// Create a new answer
async function createAnswer(input: any) {
  const answer = new Answer(input);
  return await answer.save();
}

// Update an answer
async function updateAnswer(answerId: string, updateData: any) {
  return await Answer.findByIdAndUpdate(answerId, updateData, { new: true });
}

// Delete an answer
async function deleteAnswer(answerId: string) {
  return await Answer.findByIdAndDelete(answerId);
}

module.exports = { 
    getAnswers, 
    getAnswerById, 
    getAnswersByParams, 
    createAnswer, 
    updateAnswer, 
    deleteAnswer };
