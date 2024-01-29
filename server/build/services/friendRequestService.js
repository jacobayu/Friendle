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
const FriendRequest = require('../models/friendRequest');
// Get all friend requests
function getFriendRequests() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield FriendRequest.find();
    });
}
// Get a single friend request by ID
function getFriendRequestById(requestId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield FriendRequest.findById(requestId);
    });
}
function getFriendRequestsByParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield FriendRequest.find(params);
    });
}
// Create a new friend request
function createFriendRequest(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const friendRequest = new FriendRequest(input);
        return yield friendRequest.save();
    });
}
// Update a friend request
function updateFriendRequest(requestId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield FriendRequest.findByIdAndUpdate(requestId, updateData, { new: true });
    });
}
// Delete a friend request
function deleteFriendRequest(requestId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield FriendRequest.findByIdAndDelete(requestId);
    });
}
module.exports = {
    getFriendRequests,
    getFriendRequestById,
    getFriendRequestsByParams,
    createFriendRequest,
    updateFriendRequest,
    deleteFriendRequest
};
