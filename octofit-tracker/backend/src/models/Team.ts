import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    city: { type: String, default: 'Mergington' },
    members: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    sport: { type: String, default: 'Fitness' },
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

const Team = mongoose.models.Team || mongoose.model('Team', teamSchema);

export default Team;
