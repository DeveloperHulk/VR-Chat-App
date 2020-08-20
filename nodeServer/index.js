// Node server which will handle the socket IO connection

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined',name=>{
        // console.log("New User",name)
        users[socket.id] = name; //this  will give the id who is joined
        socket.broadcast.emit('user-joined', name) //this will show new user joined notification to others
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})