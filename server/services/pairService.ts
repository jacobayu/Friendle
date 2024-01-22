const Pair = require('../models/pair');

// Get all pairs
async function getPairs() {
  return await Pair.find();
}

// Get a single pair by ID
async function getPairById(pairId: string) {
  return await Pair.findById(pairId);
}

async function getPairByParams(params:any){
  return await Pair.find(params)
}

// Create a new pair
async function createPair(input: any) {
  const pair = new Pair(input);
  return await pair.save();
}

// Update a pair
async function updatePair(pairId: string, updateData: any) {
  return await Pair.findByIdAndUpdate(pairId, updateData, { new: true });
}

// Delete a pair
async function deletePair(pairId: string) {
  return await Pair.findByIdAndDelete(pairId);
}

module.exports = { 
  getPairs, 
  getPairById, 
  createPair, 
  updatePair, 
  deletePair,
  getPairByParams,
};
