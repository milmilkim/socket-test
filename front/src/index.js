import './assets/style.scss';
import { io } from 'socket.io-client';

const form = document.getElementById('form');
const input = document.getElementById('input');

const socket = io('http://localhost:3001');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  const item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  console.log(msg);
  window.scrollTo(0, document.body.scrollHeight);
});
