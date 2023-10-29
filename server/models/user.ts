import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: String,
    firstName: String,
    lastName:String,
    email: String,
    friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  });

const User = mongoose.model('User', userSchema);

module.exports = User