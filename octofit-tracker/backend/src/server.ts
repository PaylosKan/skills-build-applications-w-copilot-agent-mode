import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl,
    database: 'mongodb://localhost:27017/octofit_db',
  });
});

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/octofit_db');
    console.log('Connected to MongoDB at mongodb://localhost:27017/octofit_db');

    app.listen(PORT, () => {
      console.log(`OctoFit Tracker API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();
