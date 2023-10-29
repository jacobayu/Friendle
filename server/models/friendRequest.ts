import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
    fromID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    toID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String,
    dateSent: { type: Date, default: Date.now },
    dateResponded: Date,
  });

const Answer = mongoose.model('FriendRequest', requestSchema);