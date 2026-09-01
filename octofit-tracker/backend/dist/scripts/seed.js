"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const User_1 = __importDefault(require("../models/User"));
const Team_1 = __importDefault(require("../models/Team"));
const Activity_1 = __importDefault(require("../models/Activity"));
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const Workout_1 = __importDefault(require("../models/Workout"));
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    try {
        await (0, database_1.connectToDatabase)();
        await Promise.all([
            User_1.default.deleteMany({}),
            Team_1.default.deleteMany({}),
            Activity_1.default.deleteMany({}),
            Leaderboard_1.default.deleteMany({}),
            Workout_1.default.deleteMany({}),
        ]);
        const users = await User_1.default.insertMany([
            { name: 'Ava Thompson', email: 'ava.thompson@mergington.edu', team: 'Blue Falcons', streak: 12, totalPoints: 1480 },
            { name: 'Leo Martinez', email: 'leo.martinez@mergington.edu', team: 'Red Hawks', streak: 9, totalPoints: 1425 },
            { name: 'Mia Chen', email: 'mia.chen@mergington.edu', team: 'Blue Falcons', streak: 15, totalPoints: 1510 },
            { name: 'Noah Patel', email: 'noah.patel@mergington.edu', team: 'Green Titans', streak: 7, totalPoints: 1315 },
        ]);
        const teams = await Team_1.default.insertMany([
            { name: 'Blue Falcons', city: 'Mergington', members: 7, wins: 14, sport: 'Fitness' },
            { name: 'Red Hawks', city: 'Mergington', members: 6, wins: 11, sport: 'Fitness' },
            { name: 'Green Titans', city: 'Mergington', members: 5, wins: 9, sport: 'Fitness' },
        ]);
        const activities = await Activity_1.default.insertMany([
            { userId: String(users[0]._id), type: 'Running', duration: 32, date: '2026-08-29', calories: 440 },
            { userId: String(users[1]._id), type: 'Strength', duration: 45, date: '2026-08-30', calories: 360 },
            { userId: String(users[2]._id), type: 'Cycling', duration: 28, date: '2026-08-31', calories: 390 },
            { userId: String(users[3]._id), type: 'HIIT', duration: 22, date: '2026-09-01', calories: 320 },
        ]);
        const leaderboard = await Leaderboard_1.default.insertMany([
            { name: 'Mia Chen', team: 'Blue Falcons', score: 1510, rank: 1 },
            { name: 'Ava Thompson', team: 'Blue Falcons', score: 1480, rank: 2 },
            { name: 'Leo Martinez', team: 'Red Hawks', score: 1425, rank: 3 },
            { name: 'Noah Patel', team: 'Green Titans', score: 1315, rank: 4 },
        ]);
        const workouts = await Workout_1.default.insertMany([
            {
                title: 'Cardio Blast',
                difficulty: 'Intermediate',
                duration: 25,
                focus: 'Endurance',
                description: 'A steady-state cardio session focused on stamina and pacing.',
            },
            {
                title: 'Core Circuit',
                difficulty: 'Beginner',
                duration: 20,
                focus: 'Strength',
                description: 'Short core stability sets with controlled repetitions.',
            },
            {
                title: 'Power Sprint Ladder',
                difficulty: 'Advanced',
                duration: 30,
                focus: 'Speed',
                description: 'Explosive interval work designed to improve acceleration and sprint power.',
            },
        ]);
        console.log('Database seeding complete', {
            users: users.length,
            teams: teams.length,
            activities: activities.length,
            leaderboard: leaderboard.length,
            workouts: workouts.length,
        });
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seedDatabase();
