"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodaysQuestion = exports.selectNewQuestionForToday = exports.deleteQuestion = exports.updateQuestion = exports.createQuestion = exports.getQuestionsByParams = exports.getQuestionById = exports.getQuestions = void 0;
const Question = require('../models/question');
function selectNewQuestionForToday() {
    return __awaiter(this, void 0, void 0, function* () {
        const question = yield Question.findOne({ used: false });
        if (question) {
            // Update the question as used
            question.used = true;
            question.dateUsed = new Date();
            yield question.save();
            console.log("Today's question is:", question.question);
            // Perform any additional actions with the selected question
        }
        else {
            console.log("No more unused questions available.");
        }
    });
}
exports.selectNewQuestionForToday = selectNewQuestionForToday;
function getTodaysQuestion() {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.getTodaysQuestion = getTodaysQuestion;
// Get all questions
function getQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Question.find();
    });
}
exports.getQuestions = getQuestions;
// Get a single question by ID
function getQuestionById(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Question.findById(questionId);
    });
}
exports.getQuestionById = getQuestionById;
function getQuestionsByParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Question.find(params);
    });
}
exports.getQuestionsByParams = getQuestionsByParams;
// Create a new question
function createQuestion(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const question = new Question(input);
        return yield question.save();
    });
}
exports.createQuestion = createQuestion;
// Update a question
function updateQuestion(questionId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Question.findByIdAndUpdate(questionId, updateData, { new: true });
    });
}
exports.updateQuestion = updateQuestion;
// Delete a question
function deleteQuestion(questionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Question.findByIdAndDelete(questionId);
    });
}
exports.deleteQuestion = deleteQuestion;
