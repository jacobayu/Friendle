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
const answerService = require('../services/answerService');
const router = express_1.default.Router();
// GET all answers
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = yield answerService.getAnswers();
        res.json(answers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET answers based on query parameters
router.get('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query; // Capture query params
        console.log("searching for items with params: ", params);
        const answers = yield answerService.getAnswersByParams(params);
        res.json(answers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET a single answer by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield answerService.getAnswerById(req.params.id);
        if (!answer) {
            return res.status(404).send('Answer not found');
        }
        res.json(answer);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// POST a new answer
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAnswer = yield answerService.createAnswer(req.body);
        res.status(201).json(newAnswer);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT to update an answer
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAnswer = yield answerService.updateAnswer(req.params.id, req.body);
        if (!updatedAnswer) {
            return res.status(404).send('Answer not found');
        }
        res.json(updatedAnswer);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE an answer
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAnswer = yield answerService.deleteAnswer(req.params.id);
        if (!deletedAnswer) {
            return res.status(404).send('Answer not found');
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
module.exports = router;
