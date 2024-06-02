const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const codekataRoutes = require('./routes/codekataRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const topicRoutes = require('./routes/topicRoutes');
const taskRoutes = require('./routes/taskRoutes');
const companyDriveRoutes = require('./routes/companyDriveRoutes');
const mentorRoutes = require('./routes/mentorRoutes');

dotenv.config();

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Failed to connect to MongoDB', err);
// });

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


// Routes
app.use('/api/users', userRoutes);
app.use('/api/codekata', codekataRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/company-drives', companyDriveRoutes);
app.use('/api/mentors', mentorRoutes);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
