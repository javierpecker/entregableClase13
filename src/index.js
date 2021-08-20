import express from 'express';
import path from 'path';
import routerRead from './routes/rutas.js';
import handlebars from 'express-handlebars';
import * as http from 'http';
import io from 'socket.io';
import fs from "fs";
import moment from "moment";

const app = express();
const puerto = 8080;
const server = http.Server(app)

server.listen(puerto, () =>
  console.log('Server up en puerto', puerto)
);
server.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});

const layoutFolderPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPath = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialFolderPath = path.resolve(__dirname, '../views/partial');
app.set('view engine', 'hbs');

app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutFolderPath,
    partialsDir: partialFolderPath,
    defaultLayout: defaultLayerPath,
    extname: 'hbs',
  })
);

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routerRead);

//Esta funcion se encarga de leer y devolver los mensajes de existir el archivo de mensajes.
const readfile = () => {
  let filenames = fs.readdirSync("./");
  const found = filenames.find((element) => "chat.txt" === element);
  if (found === "chat.txt") {
    const data = fs.readFileSync("./chat.txt", "utf-8");
    return data;
  } else {
    console.log("Archivo no leido");
  }
};

// Esta función guarda el array de mensajes en un archivo con formato JSON
const guardarMessages = (messages) => {
  fs.writeFileSync(
    "./chat.txt",
    JSON.stringify(messages, undefined, 2),
    "utf-8"
  );
};

//Funcion que guarda mensaje en archivo
const guardarNewMessage = (data) => {
  let messages = JSON.parse(readfile());
  let now = new Date();
  let date = moment(now).format("DD/MM/YYYY HH:MM:SS");
  const newMessage = { email: data.email, fecha: date, mensaje: data.mensaje };
  messages.push(newMessage);
  guardarMessages(messages);
};

const productos = [];

const myWSServer = io(server);


myWSServer.on('connection', (socket) => {
  console.log('\n\nUn cliente se ha conectado');
  console.log(`ID DEL SOCKET DEL CLIENTE => ${socket.client.id}`);
  console.log(`ID DEL SOCKET DEL SERVER => ${socket.id}`);

  socket.on('new-message', (data) => {
    productos.push(data);
    socket.emit('messages', productos);
  });

  socket.on('askData', (data) => {
    const chatfile = readfile();
    socket.emit('messages', productos);
    socket.emit('message', chatfile);

  });

  socket.on("chatMessage", (chat) => {
    guardarNewMessage(chat);
    const chatfile = readfile();
    //Envio del chat a los usuarios
    socket.emit("message", chatfile);
    socket.broadcast.emit("message", chatfile);
  });
});