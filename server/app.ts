import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';

const config = require("./config");


const app = express();
const port = config.app.port || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(config.db.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
    // Here, you would usually find or create a user in your database.
    // The 'profile' contains user profile information provided by Google.
    return cb(null, profile);
    }
));

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// TODO: Add routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
