import express from "express";
import {createServer} from "http";
import path from 'path';
import {fileURLToPath} from 'url';

import {initSocket} from "./src/sockets/chat-socket.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5173;
const pages = path.join(__dirname, 'src', 'pages');
const app = express();
app.use(express.static("public"));


// Connect routes
const router = express.Router();
router.get('/', (req, res) => {
    res.sendFile(path.join(pages, 'index.html'));
});
app.use(router);


// Create HTTP server and integrate with socket.io
const server = createServer(app);

// Connect socket.io
initSocket(server);


// Start the server
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT} -> http://localhost:${PORT}`);
});