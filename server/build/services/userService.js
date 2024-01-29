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
const User = require("../models/user");
/**
 * Returns an array of all users
 */
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        return User.find().exec();
    });
}
/**
 * Returns a specific user profile according to provided user ID
 * @param userId - User's ID
 */
function getUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(userId);
        return User.findById(userId).exec();
    });
}
function getUsersByParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Searching for users with params:', params);
        try {
            // Make sure you're querying the 'email' field, not '_id'
            const users = yield User.find(params);
            return users;
        }
        catch (error) {
            console.error('Error fetching users:', error);
            throw error; // Throw the error to be caught by the try-catch in the route
        }
    });
}
/**
 * Create a user profile
 * @param newUser - new User information
 * @param validateOnly - if true, only perform validation and don't create the user.
 */
function createUser(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingUser = yield User.findOne({ email: newUser.email }).exec();
        if (existingUser) {
            throw new Error("An account with this email already exists");
        }
        const user = yield new User(newUser).save();
        return user;
    });
}
/**
 * Update a user
 * @param userId - User's ID
 * @param updatedUser - Updated user's profile
 */
function updateUser(userId, updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = yield User.findByIdAndUpdate(userId, updatedUser, {
            new: true,
        }).exec();
        return newUser;
    });
}
/**
 * Add a friend to the user's friend list
 * @param userId - User's ID
 * @param friendId - Friend's ID to add
 */
function addFriend(userId, friendId) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true }).exec();
    });
}
/**
 * Remove a friend from the user's friend list
 * @param userId - User's ID
 * @param friendId - Friend's ID to remove
 */
function removeFriend(userId, friendId) {
    return __awaiter(this, void 0, void 0, function* () {
        return User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true }).exec();
    });
}
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    addFriend,
    removeFriend,
    getUsersByParams,
};
