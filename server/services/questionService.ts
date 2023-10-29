const Question = require('../models/question')

// Get all questions
async function getQuestions() {
  return await Question.find();
}

// Get a single question by ID
async function getQuestionById(questionId: string){
  return await Question.findById(questionId);
}

async function getQuestionsByParams(params: any) {
  return await Question.find(params);
}

// Create a new question
async function createQuestion(input: any){
  const question = new Question(input);
  return await question.save();
}

// Update a question
async function updateQuestion(questionId: string, updateData: any) {
  return await Question.findByIdAndUpdate(questionId, updateData, { new: true });
}

// Delete a question
async function deleteQuestion(questionId: string){
  return await Question.findByIdAndDelete(questionId);
}

export { 
   getQuestions,
   getQuestionById,
   getQuestionsByParams,
   createQuestion, 
   updateQuestion, 
   deleteQuestion };
