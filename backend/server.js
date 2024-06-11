const express = require('express');
const sequelize = require('./connection/connection');
const taskRouter = require('./route/taskRoute');
const cors = require('cors');
// const socketIo = require('socket.io');
// const http = require('http');

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

// Create http server and attaching Socket.io to it
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket)=>{

//   socket.on('sendNotification', (message) => {
//     io.emit('receiveNotification', message);
//   });

//   socket.on('disconnect', ()=>{
//     console.log('A user disconnected');
//   })
// });


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

