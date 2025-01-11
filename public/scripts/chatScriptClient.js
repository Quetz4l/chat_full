const chatScriptClient = document.getElementById('chat');
const form = document.getElementById('form');
const messageInput = document.getElementById('message');

let NICK_NAME = ""

// Sockets
// const socket = io("http://localhost:5173");
const socket = io("https://04c4-185-68-210-241.ngrok-free.app");

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
    createNewMessageDiv(newMessage);
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

    if (NICK_NAME === '') {
        alert('Please enter your name!');
        return
    }

    const newMessage = messageInput.value;
    // socket.emit('message_to_server', newMessage);
    socket.emit('message_to_server', {"nickname": NICK_NAME, "msg": newMessage});
    messageInput.value = '';
});

// Change loading display
function changeLoadingDisplay(state) {
    const loading = document.getElementById('loading');
    loading.style.display = state;
}

// Get nickname {
const nicknameContainer = document.getElementById('nicknameContainer');
const nicknameInput = document.getElementById('nicknameInput');
const nicknameButton = document.getElementById('nicknameButton');

nicknameButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (nicknameInput.value.trim() === '') {
        alert('Please enter a valid nickname');
        return;
    }
    NICK_NAME = nicknameInput.value;
    nicknameContainer.style.display = 'none';
})

// Change color
const color_picker = document.getElementById("color_picker")
const chat = document.getElementById("chat")
color_picker.addEventListener('change', () => {
    chat.style.color = color_picker.value;
})



