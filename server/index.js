import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://17.76.57.76:5173",
    }
});

io.listen(3000);

const characters = [];

const generateRandomPosition = () => {
    return [Math.random() * 3, 0, Math.random() * 3];
};

const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

io.on("connection", (socket) => {
    console.log("New client connected");

    characters.push({
        id: socket.id,
        position: generateRandomPosition(),
        hairColor: generateRandomColor(),
        topColor: generateRandomColor(),
        bottomColor: generateRandomColor(),
    });

    socket.emit("hello");

    io.emit("characters", characters);
    
    socket.on("move", (position) => {
        const character = characters.find((character) => character.id === socket.id);
        character.position = position;
        io.emit("characters", characters);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");

        characters.splice(
            characters.findIndex((character) => character.id === socket.id),
            1
        );
        io.emit("characters", characters);
    });
});
