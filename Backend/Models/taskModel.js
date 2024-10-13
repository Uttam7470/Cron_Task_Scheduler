import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: String,
      required: true,
      unique: true,
      default: uuidv4, // Generates a unique UUID for each task
    },
    name: {
      type: String,
      required: true,
    },
    schedule: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'stopped'],
      default: 'active',
    },
    expiration: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Index on taskId for better performance on queries
taskSchema.index({ taskId: 1 });

const logSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
    ref: 'Task', // Referencing the taskId from Task schema
  },
  executedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['success', 'failure'],
    required: true,
  },
});

// Exporting the models
export const Task = mongoose.model('Task', taskSchema);
export const TaskLog = mongoose.model('TaskLog', logSchema);
