const express = require('express');
const app = express();
const redis = require('redis');
const socketIo = require('socket.io')
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379
});

app.get('/', function(req, res) {
       res.send('server is running')
});

const server  = app.listen(5000, function() {
    console.log('Web application is listening on port 5000');
});

const io = socketIo(server,{
  cors: {
    origin: "*",
  },
})

io.on('connection',(socket)=>{
   socket.on('setup',(msg)=>{
    socket.join(msg.id)
    console.log('joined a client with ID: ',msg.id)
   })
   socket.on('position',async(data)=>{
    const msg = JSON.parse(data)
    redisClient.set('position',JSON.stringify(msg.position))
   })
   socket.on('velocity',async(data)=>{
    const msg = JSON.parse(data)
    redisClient.set('velocity',JSON.stringify(msg.velocity))
   })

})

