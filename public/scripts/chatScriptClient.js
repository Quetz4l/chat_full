const chatScriptClient = document.getElementById('chat');
const form = document.getElementById('form');
const messageInput = document.getElementById('message');

// Sockets
const socket = io("http://localhost:5173");

socket.on('connect', () => {
    console.log('Connected to server');
    // task 6 ...

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        // task 5 and 6 ...
    })

    socket.on('all_messages_to_client', (messages) => {
        console.log(messages);
        // task 4 ...
    })
});

socket.on('message_to_client', (newMessage) => {
    console.log(newMessage);
    // task 2 ...
});


// Create new message line
function createNewMessageDiv(newMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = newMessage;
    chatScriptClient.appendChild(messageDiv);
    chatScriptClient.scrollTop = chatScriptClient.scrollHeight;
}

// Form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMessage = messageInput.value;
    // task 1 ...
});

// Change loading display
function changeLoadingDisplay(state) {
    const loadingImg = document.getElementById('loading');
    // task 6 ...
}