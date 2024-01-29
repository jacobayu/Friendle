"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const answerSchema = new mongoose_1.default.Schema({
    userID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    questionID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Question' },
    pairID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Pair' },
    answer: String,
    date: { type: Date, default: Date.now }
});
const Answer = mongoose_1.default.model('Answer', answerSchema);
module.exports = Answer;
