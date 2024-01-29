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
const Pair = require('../models/pair');
// Get all pairs
function getPairs() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pair.find();
    });
}
// Get a single pair by ID
function getPairById(pairId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pair.findById(pairId);
    });
}
function getPairByParams(params) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pair.find(params);
    });
}
// Create a new pair
function createPair(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const pair = new Pair(input);
        return yield pair.save();
    });
}
// Update a pair
function updatePair(pairId, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pair.findByIdAndUpdate(pairId, updateData, { new: true });
    });
}
// Delete a pair
function deletePair(pairId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Pair.findByIdAndDelete(pairId);
    });
}
module.exports = {
    getPairs,
    getPairById,
    createPair,
    updatePair,
    deletePair,
    getPairByParams,
};
