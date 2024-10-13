import express from 'express';
import dotenv from 'dotenv'; 
import routes from './Routers/TaskRoutes.js';
import connectToDatabase from './Config/connectToDatabase.js';
import { initializeTasks } from './Config/cronConfig.js';
import cors from 'cors';

const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to the database
connectToDatabase();

// API routes
app.use('/api', routes);

// Initialize scheduled tasks
initializeTasks();

// Health check route (optional)
app.get('/health', (req, res) => {
    res.status(200).send('Server is healthy');
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
