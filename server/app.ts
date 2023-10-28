import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:8000/lovers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// TODO: Add routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});