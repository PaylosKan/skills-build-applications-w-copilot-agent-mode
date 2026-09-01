import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, required: true },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export type WorkoutDocument = InferSchemaType<typeof workoutSchema>;

const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);

export default Workout;
