import {Server} from "socket.io";

export function initSocket(server) {
    const io = new Server(server);

    let allMessages = [];

    io.on("connection", (socket) => {
        console.log("User connected with id " + socket.id);
        // task 4 ...

        socket.on("disconnect", () => {
            console.log("User disconnected with id " + socket.id);
        });


        socket.on("message_to_server", (data) => {
            // task 3 ...

            allMessages.push(newMessage);
            console.log(newMessage);

            // task 2 ...
        });

    });
}