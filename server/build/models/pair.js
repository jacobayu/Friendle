"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pairSchema = new mongoose_1.default.Schema({
    users: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
    currentScore: {
        type: Number,
        default: 0
    },
    highScore: {
        type: Number,
        default: 0
    }
});
const Pair = mongoose_1.default.model('Pair', pairSchema);
module.exports = Pair;
