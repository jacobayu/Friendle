"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    fromID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    toID: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    dateSent: { type: Date, default: Date.now },
    dateResponded: Date,
});
const FriendRequest = mongoose_1.default.model('FriendRequest', requestSchema);
module.exports = FriendRequest;
