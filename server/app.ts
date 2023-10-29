import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const config = require("./config");

const app = express();
const port = config.app.port || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(config.db.uri, {
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// TODO: Add routes

app.use("/api/users", require("./routes/user"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
