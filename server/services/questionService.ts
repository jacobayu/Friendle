const Question = require('../models/question')

async function selectNewQuestionForToday(){
  const question = await Question.findOne({ used: false });
  if (question) {
    // Update the question as used
    question.used = true;
    question.dateUsed = new Date();
    await question.save();

    console.log("Today's question is:", question.question);
    // Perform any additional actions with the selected question
  } else {
    console.log("No more unused questions available.");
  }
}

async function getTodaysQuestion() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  return Question.findOne({
    dateUsed: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  });
}

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
   deleteQuestion,
   selectNewQuestionForToday,
   getTodaysQuestion };
