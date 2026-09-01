import express, { Request, Response } from 'express';
import { connectToDatabase } from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

const sendList = (res: Response, resource: string, data: unknown[]) => {
  res.json({
    message: `${resource} retrieved successfully`,
    baseUrl,
    data,
  });
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl,
    database: 'mongodb://localhost:27017/octofit_db',
  });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  try {
    const data = await User.find().lean();
    sendList(res, 'Users', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.get('/api/users/', async (_req: Request, res: Response) => {
  try {
    const data = await User.find().lean();
    sendList(res, 'Users', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  try {
    const data = await Team.find().lean();
    sendList(res, 'Teams', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

app.get('/api/teams/', async (_req: Request, res: Response) => {
  try {
    const data = await Team.find().lean();
    sendList(res, 'Teams', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  try {
    const data = await Activity.find().lean();
    sendList(res, 'Activities', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

app.get('/api/activities/', async (_req: Request, res: Response) => {
  try {
    const data = await Activity.find().lean();
    sendList(res, 'Activities', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  try {
    const data = await Leaderboard.find().sort({ rank: 1 }).lean();
    sendList(res, 'Leaderboard', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

app.get('/api/leaderboard/', async (_req: Request, res: Response) => {
  try {
    const data = await Leaderboard.find().sort({ rank: 1 }).lean();
    sendList(res, 'Leaderboard', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  try {
    const data = await Workout.find().lean();
    sendList(res, 'Workouts', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

app.get('/api/workouts/', async (_req: Request, res: Response) => {
  try {
    const data = await Workout.find().lean();
    sendList(res, 'Workouts', data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`OctoFit Tracker API running on ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();
