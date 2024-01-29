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
const userService = require('../services/userService');
const router = express_1.default.Router();
// GET /users - Get a list of users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
router.get('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query; // Capture query params
        console.log('query ', params);
        const answers = yield userService.getUsersByParams(params);
        res.json(answers);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET /users/:id - Get a specific user
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUser(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// POST /users - Create a new user
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        const user = yield userService.createUser(newUser);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// PUT /users/:id - Update a user
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUserData = req.body;
        const updatedUser = yield userService.updateUser(req.params.id, updatedUserData);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// POST /users/:id/friends/:friendId - Add a friend
router.post('/:id/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userService.addFriend(req.params.id, req.params.friendId);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
// DELETE /users/:id/friends/:friendId - Remove a friend
router.delete('/:id/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userService.removeFriend(req.params.id, req.params.friendId);
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
module.exports = router;
