const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const io = socketio(server, { wsEngine: 'ws' });
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

app.use(router);
app.use(cors());

/* IO code */
io.on("connection", (socket) => {

    socket.on("join", (data, callback) => {
        const user = { id: socket.id, ...data };
        const { error, addedUser } = addUser(user);
        if(error) {
            return callback({ error });
        }
        else {
            socket.join(addedUser.room);

            socket.emit("message", { user: 'Admin', displayName: `Admin`, text: `Welcome to the room, ${addedUser.displayName}`});
            socket.broadcast.to(addedUser.room).emit("message", { user: 'Admin', displayName: `Admin`, text: `${addedUser.displayName} has joined this room. Welcome them!`});
            
            io.to(addedUser.room).emit("roomData", { room: addedUser.room, users: getUsersInRoom(addedUser.room) });

            callback();
        }
    });

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, displayName: user.displayName, text: message });
        callback();
    });

    socket.on("disconnect", () => {
        const removedUser = removeUser(socket.id);
        if(removedUser) {
            io.to(removedUser.room).emit("message", { user: "Admin", displayName: `Admin`, text: `${removedUser.displayName} has left this room`});
            io.to(removedUser.room).emit("roomData", { room: removedUser.room, users: getUsersInRoom(removedUser.room) });
        }
    });
});

server.listen(PORT, () => {
    console.log(`server listening ${PORT}`);
});