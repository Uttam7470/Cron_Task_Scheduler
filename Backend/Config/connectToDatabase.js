import { set, connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectDB = async () => {
    set("strictQuery", false);  // Mongoose option to handle strict query filtering

    try {
        const conn = await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,     // Recommended options to avoid deprecation warnings
            useUnifiedTopology: true,  // Recommended options for newer MongoDB drivers
            connectTimeoutMS: 10000,   // Timeout after 10 seconds if it fails to connect
            retryWrites: true,         // Enable retryable writes
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`); // Successful connection log
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`); // Log detailed error message
        process.exit(1); // Exit process with failure if connection fails
    }
};

export default connectDB;
