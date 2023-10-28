import mongoose from 'mongoose';

const pairSchema = new mongoose.Schema({
    users: [{ 
      type: mongoose.Schema.Types.ObjectId, 
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

const Pair = mongoose.model('Pair', pairSchema);