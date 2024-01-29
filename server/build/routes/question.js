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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionService = require('../services/questionService');
const router = express_1.default.Router();
// GET all questions
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield questionService.getQuestions();
        res.json(questions);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET answers based on query parameters
router.get('/today', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield questionService.getTodaysQuestion();
        res.json(question);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET answers based on query parameters
router.get('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query; // Capture query params
        const answers = yield questionService.getQuestionsByParams(params);
        res.json(answers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET a single question by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield questionService.getQuestionById(req.params.id);
        if (!question) {
            return res.status(404).send('Question not found');
        }
        res.json(question);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// POST a new question
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = yield questionService.createQuestion(req.body);
        res.status(201).json(newQuestion);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT to update a question
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedQuestion = yield questionService.updateQuestion(req.params.id, req.body);
        if (!updatedQuestion) {
            return res.status(404).send('Question not found');
        }
        res.json(updatedQuestion);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE a question
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedQuestion = yield questionService.deleteQuestion(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).send('Question not found');
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
module.exports = router;
