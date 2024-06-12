const express = require('express');
const sequelize = require('./connection/connection');
const taskRouter = require('./route/taskRoute');
const cors = require('cors');

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

