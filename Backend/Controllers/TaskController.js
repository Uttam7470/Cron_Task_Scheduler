import cron from 'node-cron';
import { Task, TaskLog } from '../Models/taskModel.js';
import { sendEmail } from '../Config/SendMail.js';
import { scheduleTask } from '../Config/cronConfig.js';
import { v4 as uuidv4 } from 'uuid';
import logger from '../Config/logger.js'; // Use a logger instead of console

// Create a new task
export const CreateTask = async (req, res) => {
    try {
        const { name, schedule, email, message, expiration } = req.body;
        
        // Field validation
        if (!name || !schedule || !email || !message) {
            return res.status(400).json({ message: 'All mandatory fields are required.' });
        }

        // Generate taskId
        const taskId = uuidv4();
        const task = new Task({
            taskId,
            name,
            schedule,
            email,
            message,
            expiration
        });

        await task.save();
        
        // Schedule the task
        scheduleTask(task);
        
        res.status(201).json({ message: 'Task created and scheduled successfully', task });
    } catch (error) {
        logger.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Edit an existing task
export const editTask = async (req, res) => {
    try {
        const { taskId, name, schedule, email, message } = req.body;

        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        // Update fields
        task.name = name || task.name;
        task.schedule = schedule || task.schedule;
        task.email = email || task.email;
        task.message = message || task.message;

        await task.save();
        res.status(200).json({ message: 'Task updated successfully.', task });
    } catch (error) {
        logger.error('Error editing task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const task = await Task.findOneAndDelete({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        await TaskLog.deleteMany({ taskId: task._id });
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        logger.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all tasks
export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        logger.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Stop a task
export const stopTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        task.status = 'stopped';
        await task.save();

        res.status(200).json({ message: 'Task stopped successfully.' });
    } catch (error) {
        logger.error('Error stopping task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Start a task
export const startTask = async (req, res) => {
    try {
        const { taskId } = req.body;

        const task = await Task.findOne({ taskId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        task.status = 'active';
        await task.save();

        res.status(200).json({ message: 'Task activated successfully.' });
    } catch (error) {
        logger.error('Error starting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a task by ID
export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params; // Use params to get the ID
        const task = await Task.findOne({ taskId: id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.status(200).json(task);
    } catch (error) {
        logger.error('Error fetching task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

