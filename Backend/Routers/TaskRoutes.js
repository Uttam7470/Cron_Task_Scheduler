import express from "express";
import { 
    CreateTask, 
    editTask, 
    deleteTask, 
    getAllTask, 
    getTaskById, 
    stopTask,
    startTask
} from "../Controllers/TaskController.js";

const router = express.Router();

// Create a new task
router.post("/createTask", CreateTask);

// Edit an existing task
router.put("/editTask", editTask);

// Delete a task
router.post("/deleteTask", deleteTask);

// Get all tasks
router.get("/getAllTasks", getAllTask);

// Get a task by ID
router.get("/getTaskById/:id", getTaskById);

// Stop a task
router.post("/stopTask", stopTask);

// Start/Activate a task
router.post("/startTask", startTask);



export default router;
