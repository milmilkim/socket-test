import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5000'],
  },
});

dotenv.config();

app.use(cors());

app.set('port', process.env.PORT || 3001);
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json('hello world');
});

app.use((err, req, res, next) => {
  //에러 처리
  res.status(500).json({ message: err.message });
});

app.use((req, res, next) => {
  res.status(404).json('Not Found');
});

// app.listen(app.get('port'), () => {
//   console.log(app.get('port'), '번 포트에서 대기 중');
// });

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

// app.listen이 아닌 http.listen를 사용한다.
server.listen(3001, () => {
  console.log('started server');
});
