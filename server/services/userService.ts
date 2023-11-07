const User = require("../models/user");

/**
 * Returns an array of all users
 */
async function getUsers() {
  return User.find().exec();
}

/**
 * Returns a specific user profile according to provided user ID
 * @param userId - User's ID
 */
async function getUser(userId: any) {
  return User.findById(userId).exec();
}

async function getUsersByParams(params: any) {
  console.log('Searching for users with params:', params);
  try {
    // Make sure you're querying the 'email' field, not '_id'
    const users = await User.find(params);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Throw the error to be caught by the try-catch in the route
  }
}

/**
 * Create a user profile
 * @param newUser - new User information
 * @param validateOnly - if true, only perform validation and don't create the user.
 */
async function createUser(newUser: any) {
  const existingUser = await User.findOne({ email: newUser.email }).exec();
  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const user = await new User(newUser).save();
  return user;
}

/**
 * Update a user
 * @param userId - User's ID
 * @param updatedUser - Updated user's profile
 */
async function updateUser(userId: any, updatedUser: any) {
  const newUser = await User.findByIdAndUpdate(userId, updatedUser, {
    new: true,
  }).exec();
  return newUser;
}

/**
 * Add a friend to the user's friend list
 * @param userId - User's ID
 * @param friendId - Friend's ID to add
 */
async function addFriend(userId: any, friendId: any) {
  return User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true }).exec();
}

/**
 * Remove a friend from the user's friend list
 * @param userId - User's ID
 * @param friendId - Friend's ID to remove
 */
async function removeFriend(userId: any, friendId: any) {
  return User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true }).exec();
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
