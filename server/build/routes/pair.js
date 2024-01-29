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
const pairService = require('../services/pairService');
const router = express_1.default.Router();
// GET all pairs
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pairs = yield pairService.getPairs();
        res.json(pairs);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET answers based on query parameters
router.get('/getByUser', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query; // Capture query params
        const query = { users: { $all: [params.user1, params.user2] } };
        const answers = yield pairService.getPairByParams(query);
        res.json(answers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.get('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        console.log(params);
        const friendRequests = yield pairService.getPairs(params);
        res.json(friendRequests);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET a single pair by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pair = yield pairService.getPairById(req.params.id);
        if (!pair) {
            return res.status(404).send('Pair not found');
        }
        res.json(pair);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// POST a new pair
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPair = yield pairService.createPair(req.body);
        res.status(201).json(newPair);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT to update a pair
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPair = yield pairService.updatePair(req.params.id, req.body);
        if (!updatedPair) {
            return res.status(404).send('Pair not found');
        }
        res.json(updatedPair);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE a pair
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPair = yield pairService.deletePair(req.params.id);
        if (!deletedPair) {
            return res.status(404).send('Pair not found');
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
module.exports = router;
