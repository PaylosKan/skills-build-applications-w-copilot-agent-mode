"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-tracker-backend',
        baseUrl,
        database: 'mongodb://localhost:27017/octofit_db',
    });
});
const startServer = async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost:27017/octofit_db');
        console.log('Connected to MongoDB at mongodb://localhost:27017/octofit_db');
        app.listen(PORT, () => {
            console.log(`OctoFit Tracker API running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
};
startServer();
