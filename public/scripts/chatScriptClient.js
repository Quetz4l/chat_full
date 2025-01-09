const chatScriptClient = document.getElementById('chat');
const form = document.getElementById('form');
const messageInput = document.getElementById('message');

// Sockets
const socket = io("http://localhost:5173");

socket.on('connect', () => {
    console.log('Connected to server');
    changeLoadingDisplay("none");

    socket.on('disconnect', () => {
        console.log('Disconnected from server');
        alert("Not connected to server");
        changeLoadingDisplay("block");
    })

    socket.on('all_messages_to_client', (messages) => {
        messages.forEach((message) => {
            createNewMessageDiv(message);
        });
    })
});

socket.on('message_to_client', (newMessage) => {
    createNewMessageDiv(newMessage)
});


// create new message line
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
    socket.emit('message_to_server', newMessage);
    messageInput.value = '';
});

// Change loading display
function changeLoadingDisplay(state) {
    const loading = document.getElementById('loading');
    loading.style.display = state
}