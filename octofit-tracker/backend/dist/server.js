"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const Activity_1 = __importDefault(require("./models/Activity"));
const Leaderboard_1 = __importDefault(require("./models/Leaderboard"));
const Team_1 = __importDefault(require("./models/Team"));
const User_1 = __importDefault(require("./models/User"));
const Workout_1 = __importDefault(require("./models/Workout"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const sendList = (res, resource, data) => {
    res.json({
        message: `${resource} retrieved successfully`,
        baseUrl,
        data,
    });
};
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        baseUrl,
        database: 'mongodb://localhost:27017/octofit_db',
    });
});
app.get('/api/users', async (_req, res) => {
    try {
        const data = await User_1.default.find().lean();
        sendList(res, 'Users', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.get('/api/users/', async (_req, res) => {
    try {
        const data = await User_1.default.find().lean();
        sendList(res, 'Users', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error });
    }
});
app.get('/api/teams', async (_req, res) => {
    try {
        const data = await Team_1.default.find().lean();
        sendList(res, 'Teams', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const data = await Team_1.default.find().lean();
        sendList(res, 'Teams', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
app.get('/api/activities', async (_req, res) => {
    try {
        const data = await Activity_1.default.find().lean();
        sendList(res, 'Activities', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const data = await Activity_1.default.find().lean();
        sendList(res, 'Activities', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
app.get('/api/leaderboard', async (_req, res) => {
    try {
        const data = await Leaderboard_1.default.find().sort({ rank: 1 }).lean();
        sendList(res, 'Leaderboard', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const data = await Leaderboard_1.default.find().sort({ rank: 1 }).lean();
        sendList(res, 'Leaderboard', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch leaderboard', error });
    }
});
app.get('/api/workouts', async (_req, res) => {
    try {
        const data = await Workout_1.default.find().lean();
        sendList(res, 'Workouts', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const data = await Workout_1.default.find().lean();
        sendList(res, 'Workouts', data);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
const startServer = async () => {
    try {
        await (0, database_1.connectToDatabase)();
        app.listen(PORT, () => {
            console.log(`OctoFit Tracker API running on ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
startServer();
