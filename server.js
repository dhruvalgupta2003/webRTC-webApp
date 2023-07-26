const express = require('express');

// const { Server } = require('socket.io');
const io = require('socket.io')({
    path: '/webrtc'
})
const cors = require('cors');



const app = express();
const port = 8080;

app.use(cors());
app.get('/',(req,res) =>{
    res.send("Hello WebRTC!!")
})

const server = app.listen(port, () => {
    console.log(`webRTC is listening on port ${port}`)
})

// const io = new Server(server, {
//     path: '/webrtc',
// })
io.listen(server)

const webRTCNamespace = io.of('/webRTCPeers')

webRTCNamespace.on('connection',(socket) =>{
    console.log(socket.id);

    socket.emit('connection-success', {
        status: 'connection-success',
        socketId: socket.id,

    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`)
    })

    socket.on('sdp', data =>{
        console.log(data)
        socket.broadcast.emit('sdp', data)
    })

    socket.on('candidate', data =>{
        console.log(data)
        socket.broadcast.emit('candidate',data)
    })
})