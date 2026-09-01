import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
    calories: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

const Activity = mongoose.models.Activity || mongoose.model('Activity', activitySchema);

export default Activity;
