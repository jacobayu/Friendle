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
const Answer = require('../models/answer');
// Get all answers
function getAnswers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Answer.find();
    });
}
// Get a single answer by ID
function getAnswerById(answerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Answer.findById(answerId);
    });
}
function getAnswersByParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Answer.find(params);
    });
}
// Create a new answer
function createAnswer(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const answer = new Answer(input);
        return yield answer.save();
    });
}
// Update an answer
function updateAnswer(answerId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Answer.findByIdAndUpdate(answerId, updateData, { new: true });
    });
}
// Delete an answer
function deleteAnswer(answerId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Answer.findByIdAndDelete(answerId);
    });
}
module.exports = {
    getAnswers,
    getAnswerById,
    getAnswersByParams,
    createAnswer,
    updateAnswer,
    deleteAnswer
};
