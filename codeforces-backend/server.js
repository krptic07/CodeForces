const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.port || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let rooms = {};
let gameMap = {};
let userMap = undefined;

io.on("connection", (socket) => {
  console.log("A new user has connected", socket.id);
  socket.emit("message", "Welcome to Codenames !");

  socket.on("newGameData", (currentGame, roomId) => {
    gameMap[roomId] = currentGame;
    console.log("newData ", currentGame);
    socket.to(roomId).emit("addGameData", currentGame);
  });

  socket.on("unflipCards", (roomId) => {
    io.to(roomId).emit("showCardFront", true);
  });

  socket.on("uncoverPieceInBoard", (position, roomId) => {
    console.log("uncover", position);
    io.to(roomId).emit("updateFlippedPosition", position);
  });

  socket.on("joinRoom", (userName, roomId) => {
    if (rooms[roomId] === undefined) {
      socket.emit("errorMessage", { code: "JR-RNF", msg: "Room not found" });
    } else if (rooms[roomId].users.length === 4) {
      socket.emit("errorMessage", { code: "JR-EUR", msg: "Room is full" });
    } else if (
      rooms[roomId].users.find((user) => user == userName) !== undefined
    ) {
      socket.emit("errorMessage", {
        code: "JR-UAT",
        msg: "Username already taken",
      });
    } else {
      let newUserMap = { ...userMap, [socket.id]: userName };
      userMap = newUserMap;
      socket.join(roomId);
      socket.to(roomId).emit("message", "A new user has joined your room.");
      console.log(`User ${userName} has joined room ${roomId}`);
      rooms[roomId].users.push(userName);
      socket.emit("setUsername", userName);
      socket.emit("joinGame", roomId, gameMap[roomId]);
      io.to(roomId).emit("updateUserInRoom", rooms[roomId].users);
    }
  });

  socket.on("createRoom", (userName, roomId) => {
    if (Object.prototype.hasOwnProperty.call(rooms, roomId)) {
      // console.log(roomId);
      socket.emit("errorMessage", {
        code: "CRE-RE",
        msg: "Room Already exists with that ID",
      });
    } else {
      let newRoom = {
        roomId,
        users: [],
      };
      let newUserMap = { ...userMap, [socket.id]: userName };
      userMap = newUserMap;
      console.log(`${userName} wants to create a new room with id ${roomId}`);
      newRoom.users.push(userName);
      rooms[newRoom.roomId] = newRoom;
      socket.join(roomId);
      socket.emit("setUsername", userName);
      socket.emit("createGameRoom", roomId);
      io.to(roomId).emit("updateUserInRoom", rooms[roomId].users);
    }
  });

  socket.on("disconnect", () => {
    io.emit("message", "A user has left the game !");
    if (userMap && socket.id in userMap) {
      let leavingUser = userMap[socket.id];
      for (key in rooms) {
        if (rooms[key].users.includes(leavingUser)) {
          io.to(rooms[key].roomId).emit(
            "message",
            `${leavingUser} has left the room ${rooms[key].roomId}`
          );
          delete userMap[socket.id];
          rooms[key].users.splice(rooms[key].users.indexOf(leavingUser), 1);
          console.log("userMap", userMap);
          io.to(rooms[key].roomId).emit(
            "checkGameAndUpdateUsers",
            rooms[key].users
          );
        }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
