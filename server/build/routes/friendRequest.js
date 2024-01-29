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
const friendRequestService = require('../services/friendRequestService');
const router = express_1.default.Router();
// GET all friend requests
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendRequests = yield friendRequestService.getFriendRequests();
        res.json(friendRequests);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET friend requests based on query parameters
router.get('/query', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        const friendRequests = yield friendRequestService.getFriendRequestsByParams(params);
        res.json(friendRequests);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// GET a single friend request by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendRequest = yield friendRequestService.getFriendRequestById(req.params.id);
        if (!friendRequest) {
            return res.status(404).send('Friend Request not found');
        }
        res.json(friendRequest);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// POST a new friend request
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newFriendRequest = yield friendRequestService.createFriendRequest(req.body);
        res.status(201).json(newFriendRequest);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// PUT to update a friend request
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedFriendRequest = yield friendRequestService.updateFriendRequest(req.params.id, req.body);
        if (!updatedFriendRequest) {
            return res.status(404).send('Friend Request not found');
        }
        res.json(updatedFriendRequest);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// DELETE a friend request
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFriendRequest = yield friendRequestService.deleteFriendRequest(req.params.id);
        if (!deletedFriendRequest) {
            return res.status(404).send('Friend Request not found');
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
module.exports = router;
