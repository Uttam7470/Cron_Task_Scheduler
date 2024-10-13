import cron from 'node-cron';
import { Task, TaskLog } from '../Models/taskModel.js';
import { sendEmail } from './SendMail.js';
import logger from '../Config/logger.js';

// Schedule a task
export const scheduleTask = async (task) => {
  try {
    // Validate cron schedule pattern
    if (!cron.validate(task.schedule)) {
      throw new Error(`Invalid cron schedule pattern: ${task.schedule}`);
    }

    const job = cron.schedule(task.schedule, async () => {
      try {
        // Send the email
        await sendEmail(task.email, 'Scheduled Task', task.message);

        // Log successful execution
        const taskLog = new TaskLog({
          taskId: task.taskId,
          executedAt: new Date(),
          status: 'success',
        });
        await taskLog.save();

        logger.info(`Task ${task.name} executed successfully at ${new Date().toLocaleString()}`, {
          taskId: task.taskId,
          status: 'success',
        });
      } catch (error) {
        // Log failure
        const taskLog = new TaskLog({
          taskId: task.taskId,
          executedAt: new Date(),
          status: 'failure',
        });
        await taskLog.save();

        logger.error(`Task ${task.name} failed at ${new Date().toLocaleString()}: ${error.message}`, {
          taskId: task.taskId,
          error: error.message,
          status: 'failure',
        });
      }
    });

    job.start(); // Start the cron job
    logger.info(`Task ${task.name} scheduled with cron pattern: ${task.schedule}`);
  } catch (error) {
    logger.error(`Error scheduling task ${task.name}: ${error.message}`);
  }
};

// Initialize all active tasks
export const initializeTasks = async () => {
  try {
    const tasks = await Task.find({ status: 'active' });
    if (tasks.length === 0) {
      logger.info('No active tasks found to initialize.');
      return;
    }

    console.log('All the active tasks here:', tasks);
    tasks.forEach(task => scheduleTask(task));
    logger.info('All active tasks initialized successfully.');
  } catch (error) {
    logger.error('Error initializing tasks:', {
      error: error.message,
    });
  }
};
