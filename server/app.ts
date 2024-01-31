import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cron from 'node-cron';
import { selectNewQuestionForToday } from './services/questionService';

const config = require("./config");

const app = express();
const port = config.app.port || 3000;

// Middlewares
app.use(cors());

// app.use(cors({
//   origin: 'http://localhost:5173' // DEV SERVER URL
// }));

// app.use(cors({
//   origin: 'http://localhost:4173' // BUILD SERVER URL
// }));

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))


cron.schedule('0 0 * * *', async () => {
  try {
    await selectNewQuestionForToday();
    console.log('New question selected for today');
  } catch {
    console.error('Error selecting new question:');
  }
});

app.use(express.json());

// MongoDB Connection
mongoose.connect(config.db.uri, {
}).then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// TODO: Add routes

app.use("/api/user", require("./routes/user"));
app.use("/api/answer", require("./routes/answer"));
app.use("/api/friendRequest", require("./routes/friendRequest"));
app.use("/api/pair", require("./routes/pair"));
app.use("/api/question", require("./routes/question"));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
