const FriendRequest = require('../models/friendRequest');

// Get all friend requests
async function getFriendRequests() {
  return await FriendRequest.find();
}

// Get a single friend request by ID
async function getFriendRequestById(requestId: string) {
  return await FriendRequest.findById(requestId);
}

async function getFriendRequestsByParams(params: any) {
    return await FriendRequest.find(params);
  }

// Create a new friend request
async function createFriendRequest(input: any) {
  const friendRequest = new FriendRequest(input);
  return await friendRequest.save();
}

// Update a friend request
async function updateFriendRequest(requestId: string, updateData: any) {
  return await FriendRequest.findByIdAndUpdate(requestId, updateData, { new: true });
}

// Delete a friend request
async function deleteFriendRequest(requestId: string) {
  return await FriendRequest.findByIdAndDelete(requestId);
}

module.exports = { 
  getFriendRequests, 
  getFriendRequestById, 
  getFriendRequestsByParams,
  createFriendRequest, 
  updateFriendRequest, 
  deleteFriendRequest 
};
