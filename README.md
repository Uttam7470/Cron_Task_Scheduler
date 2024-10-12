# Task Scheduler with Email Notifications

## Project Description

This project is a comprehensive task scheduler application built with Node.js and React. It allows users to create, manage, and monitor scheduled tasks with customizable execution times and optional email notifications. Key features include:

- **Task Scheduling:** Users can define tasks with specific cron expressions to schedule execution times. This allows tasks to run at precise intervals, such as every hour, daily, or at specific times.
- **Email Notifications:** The application integrates with NodeMailer to send email notifications when tasks are executed. This feature is useful for reminders, alerts, and updates.
- **Task Management:** The application provides a user-friendly interface for creating, updating, and deleting tasks. Users can manage their scheduled tasks through a web-based dashboard, which includes options for viewing and editing task details.
- **Logs and History:** Task execution logs are stored in a database, allowing users to review the history of task executions, including success and failure details.
- **Configuration Management:** The project uses dotenv for managing environment variables such as email credentials and server configurations. This ensures sensitive information is kept secure and can be easily managed.
- **Frontend and Backend Integration:** The frontend is built with React to offer a responsive and interactive user interface, while the backend, powered by Node.js and Express, handles task scheduling, email notifications, and database operations.

This project aims to provide a robust solution for task scheduling with an emphasis on ease of use, flexibility, and reliability. It is designed to handle various scheduling needs and integrates seamlessly with email services to enhance task management and notification capabilities.

## Setup Instructions

### 1. Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ganesh-Patel/Cron-job-Sheduler
   cd Cron-job-Sheduler

   ```

Install dependencies for both the frontend and backend:
bash
Copy code
npm install

2. Environment Variables

   Create a .env file in the root directory with the following environment variables:
   PORT=3004 EMAIL_HOST=smtp.example.comEMAIL_USER=your-email@example.comEMAIL_PASS=your-email-password
3. Running the Project

   To start both the backend and frontend servers:
   Start the backend server:
   npm start

  Start the frontend React app:
  npm run dev

## How the Task Scheduler Works:

The task scheduler allows users to create tasks with specific cron-based schedules. A cron expression is generated based on user input (minute, hour, day of the month, specific date) and passed to the backend. The backend uses cron to execute tasks at the correct intervals.It is designed to manage and execute tasks based on user-defined schedules using cron expressions. Here's a brief overview of how it operates:

1. **Task Creation:** Users can create tasks through a web interface, specifying details such as the task name, schedule (in cron format), optional email notifications, and expiry dates.
2. **Scheduling:** The backend uses the `node-cron` library to handle task scheduling. A cron expression, which defines the task's execution time, is parsed and used to set up cron jobs that trigger the task at the specified intervals.
3. **Task Execution:** When the scheduled time arrives, the cron job executes the task. If configured, the system sends email notifications using NodeMailer. The task's execution is logged, including any errors or successes.
4. **Task Management:** Users can view, update, and delete tasks through the interface. The backend ensures that changes are reflected in the scheduled tasks and logs.
5. **Logging:** Execution logs are maintained in the database to keep track of task runs, including success counts, error counts, and timestamps of the last execution.

## Features:

Task Creation: Users can create tasks with names, scheduled times, email notifications, and optional expiry dates.
Email Notifications: NodeMailer is used to send emails when a task is executed.
Task Management: Users can edit, delete, and update tasks.
The scheduler runs in the backend using a cron job to trigger tasks based on their cron expressions. If email notifications are set up, they will be sent at the scheduled time.

## API Documentation

**Base URL**
The base URL for all API endpoints is:
`https://cron-job-sheduler.onrender.com`

**Endpoints:**

1. **Create a New Task**

   - **Endpoint:** `/api/createTask/`
   - **Request Method:** `POST`
   - **Description:** Creates a new task with a schedule and optional email notification.
   - **Request Body:**
     ```json
     {
       "name": "Task Name",
       "email": "example@example.com",
       "schedule": "cron expression",
       "expiry": "YYYY-MM-DDTHH:MM:SS",
       "message": "This is a task message"
     }
     ```
   - **Response:**
     - Success (201 Created): Returns the created task details.
     - Error (400 Bad Request): Returns an error message if the request is invalid.
2. **Get All Tasks**

   - **Endpoint:** `/api/getAllTasks`
   - **Request Method:** `Get`
   - **Description:** Retrieves all tasks from the database.
   - **Response:**
     - Success (200 OK): Returns a list of all tasks.
3. **Get a Single Task**

   - **Endpoint:** `/api/getTaskById`
   - **Request Method:** `Get`
   - **Description:** Retrieves details of a specific task by ID.

     - **Request Body:**

     ```json
     {  
       "taskId":"uniqe task id ",
      }
     ```
   - **Response:**

     - Success (200 OK): Returns the details of the requested task.
     - Error (404 Not Found): Returns an error message if the task is not found.
4. **Update a Task**

   - **Endpoint:** `/tasks/:id`
   - **Request Method:** `PUT`
   - **Description:** Updates details of a specific task .
   - **Request Body:**
     ```json
     {

       "taskId":"uniqe task id ",
       "name": "Updated Task Name",
       "email": "updated@example.com",
       "schedule": "new cron expression",
       "expiry": "YYYY-MM-DDTHH:MM:SS",
       "message": "Updated task message"
     }
     ```
   - **Response:**
     - Success (200 OK): Returns the updated task details.
     - Error (400 Bad Request): Returns an error message if the request data is invalid.
5. **Delete a Task**

   - **Endpoint:** `/api/deleteTask`
   - **Request Method:** `DELETE`
   - **Description:** Deletes a specific task by taskId.
   - **Request Body:**

   ```json
   {

     "taskId":"uniqe task id ",
    }
   ```

   - **Response:**
     - Success (204 No Content): Task is deleted successfully.
     - Error (404 Not Found): Returns an error message if the task is not found.
6. **Activate a Task**

   - **Endpoint:** `/api/startTask`
   - **Request Method:** `POST`
   - **Description:** Activate a specific task by taskId.
   - **Request Body:**

   ```json
   {    
     "taskId":"uniqe task id ",
    }
   ```

   - **Response:**
     - Success (204 No Content): Task is Activated successfully.
     - Error (404 Not Found): Returns an error message if the task is not found.

&. **Deactivate a Task**

- **Endpoint:** `/api/stopTask`
- **Request Method:** `POST`
- **Description:** Deactivate a specific task by taskId.
  - **Request Body:**

  ```json
  {  
    "taskId":"uniqe task id ",
   }
  ```
- **Response:**
  - Success (204 No Content): Task is deactivated successfully.
  - Error (404 Not Found): Returns an error message if the task is not found.

**Note:** Replace `https://cron-job-sheduler.onrender.com` with the actual URL where your API is hosted. Once you create formal API documentation, you can update this section with a link to that documentation.

**Links:**

- [Live Version](https://cron-frontend.vercel.app/)
