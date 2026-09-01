import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    team: { type: String, default: 'Unassigned' },
    streak: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
