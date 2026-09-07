import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;
const server = http.createServer((req, res) => {
      fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error reading file");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
})



const wss = new WebSocketServer({server})


const broadcast = (message) => {
  const data = JSON.stringify(message);

  wss.clients.forEach((client) => {
    client.send(data);
  });
};



wss.on("connection", (socket, req) => {
    const username = new URL(req.url, "http://localhost").searchParams.get(
  "username",
);
  console.log("Client connected");

  
   socket.username = username;

  //  someone joined
  broadcast({
    type: "system",
    text: `${username} has joined the chat`,
  });

  socket.on("message", (data) => {
    const message = JSON.parse(data);

   
    broadcast({
      type: "chat",
      username: socket.username,
      text: message.text,
    });
  });

  socket.on("close", () => {
  
    broadcast({
      type: "system",
      text: `${socket.username} has left the chat`,
    });
  });
});

server.listen(PORT, () => console.log(`server is running at http://localhost:3001 `))