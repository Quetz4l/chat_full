import {Server} from "socket.io";

export function initSocket(server) {
    const io = new Server(server);

    let allMessages = [];

    io.on("connection", (socket) => {
        console.log("User connected with id " + socket.id);
        socket.emit("all_messages_to_client", allMessages);

        socket.on("disconnect", () => {
            console.log("User disconnected with id " + socket.id);
        });


        // socket.on("message_to_server", (nickname, newMessage) => {
        socket.on("message_to_server", (data) => {
            // newMessage = socket.id + ": " + newMessage;
            let newMessage = data["nickname"] + ": " + data["msg"];
            allMessages.push(newMessage);
            console.log(newMessage);
            io.emit("message_to_client", newMessage);
        });

    });
}