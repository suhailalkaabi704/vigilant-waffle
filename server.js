const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("مستخدم متصل");

    socket.on("chat message", (data) => {
        io.emit("chat message", data);
    });

    socket.on("file upload", (data) => {
        io.emit("file upload", data);
    });

    socket.on("disconnect", () => {
        console.log("مستخدم قطع الاتصال");
    });
});

server.listen(3000, () => {
    console.log("الخادم يعمل على المنفذ 3000");
});
