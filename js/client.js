const socket = io('http://localhost:8000'); //this is for connecting the nodeserver

//get DOM Elements in respective JS Variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Audio that will play on recieving messages
var audio =  new Audio('tone.mp3');

//Function which will append event info to the Container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position =='left') {
        audio.play();
    }
}


//Ask new user for her/his name and let a server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined',name)

//let the new user joins, receive his/her name from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,`right`)
});

//if a server sends a message , receive it
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`,`left`)
});

//If a user leaves the chat, append the info to the container
socket.on('left', name=>{
    append(`${name} left the chat`,`right`)
});


//If a form is submitted, sends the message to the server
form.addEventListener('submit',(e)=>{
    e.preventDefault();  //This will not reload the page
    const message = messageInput.value;
    append(`You: ${message}`,`right`);
    socket.emit('send',message);
    messageInput.value = '';

});