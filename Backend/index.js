import express from 'express';
import dotenv from 'dotenv/config'; // Autoloads .env variables
import routes from './Routers/TaskRoutes.js';
import connectToDatabase from './Config/connectToDatabase.js';
import { initializeTasks } from './Config/cronConfig.js';
import cors from 'cors';

const app = express();

// Middleware setup
// app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MongoDB
connectToDatabase();

// API routes
app.use('/api', routes);

// Initialize scheduled tasks
initializeTasks();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
