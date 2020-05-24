const express = require('express')
const socket = require('socket.io')
const app = express()
const port = 3000

var server = app.listen(port, 'localhost', function(){
    console.log('Listen to request on port ' + port)
});

app.use(express.static('public'))

var io = socket(server);

io.on('connection', function(socket){
    console.log("Connect,", Date(Date.now()).toString() + ',', socket.handshake.headers['x-real-ip'] + ',', socket.id + ',', socket.request.headers['user-agent'] + ',', socket.handshake.headers.referer + ',', socket.client.conn.server.clientsCount);
    socket.emit('message', socket.client.conn.server.clientsCount + " users connected");
    //socket.emit('info', socket.client.conn.server.clientsCount);

    socket.on('disconnect', function (socket2) {
        console.log("Disconnected,", Date(Date.now()).toString() + ',', socket.handshake.headers['x-real-ip'] + ',', socket.id + ',', socket.request.headers['user-agent'] + ',', socket.handshake.headers.referer + ',', socket.client.conn.server.clientsCount);
        socket.emit('info', socket.client.conn.server.clientsCount);
    });

    socket.on('www', function (e) {
        console.log("Disconnected", e.x);
    });
});