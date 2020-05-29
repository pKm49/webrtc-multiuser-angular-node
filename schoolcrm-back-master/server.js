const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
let clients = [];


let offer;
var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
var sharedsession = require("express-socket.io-session");

// Use express-session middleware for express
app.use(session);

// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session));


io.on('connection', function (socket) {

    var usertype = socket.request._query['usertype'];
    var studentid = socket.request._query['studentid'];


    socket.join('English')
    socket.emit('connection', 'connected to channel English')

    if (usertype == 'student') {
        socket.to('English').emit('newestudentjoined',studentid);
    } else {
        console.log("usertype is teacher")
    }

    socket.on('onicecandidateteacher', (data) => {
        socket.to('English').emit('onicecandidateteacher', data)
    })

    socket.on('onicecandidatestudent', (data) => {
        socket.to('English').emit('onicecandidatestudent', data)
    })

    socket.on('newoffer', (data) => {
        socket.to('English').emit('newoffer', data)
    })

    socket.on('answer', (data) => {
        socket.to('English').emit('answer', data)
    })

})
app.use('/', express.static('views'))
http.listen(3000, () => console.log('server is running'))