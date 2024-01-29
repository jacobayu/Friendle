"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const questionService_1 = require("./services/questionService");
const config = require("./config");
const app = (0, express_1.default)();
const port = config.app.port || 3000;
// Middlewares
app.use((0, cors_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173' // Replace with your front-end app's URL
}));
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, questionService_1.selectNewQuestionForToday)();
        console.log('New question selected for today');
    }
    catch (_a) {
        console.error('Error selecting new question:');
    }
}));
app.use(express_1.default.json());
// MongoDB Connection
mongoose_1.default.connect(config.db.uri, {}).then(() => console.log("Connected to MongoDB"))
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
