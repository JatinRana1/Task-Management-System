const express = require('express');
const sequelize = require('./connection/connection');
const taskRouter = require('./route/taskRoute');
const cors = require('cors');
const { checkTaskNotification } = require('./notification/notification');
const cron = require('node-cron');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use((req,res, next)=>{
  console.log(req.method, req.path, req.body)
  next()
})
app.use('/task', taskRouter)

app.get('/', (req, res) => {
    res.json({message:'Hello, World!'});
})

// Schedule the check to run every 10 seconds
// cron.schedule('*/10 * * * * *', checkTaskNotification);

// const interval = setInterval(()=>{
//   checkTaskNotification()
// }, 10000)

// Sync the model with the database
sequelize.sync()
  .then(() => {
    console.log('Database and tables synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err.message);
  });

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

