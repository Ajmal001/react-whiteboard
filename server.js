const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express()
const port = 8000;
// server instance
const server = http.createServer(app)
// socket using the instance of the server
const io = socketIO(server)

io.on('connection', socket => {
  console.log('connected');
  
  socket.on('createNewPath', (data) => {
    io.sockets.emit('createNewPath', data);
  });

  socket.on('pointDrag', (data) => {
    io.sockets.emit('pointDrag', data);
  });

  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
