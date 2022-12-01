//Requisitos
const express = require('express');
const fs = require('fs');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Ejs
app.set('view engine', 'ejs');

//Peticiones del servidor
app.get("/", (req, res) => {
    res.render("pages/index");
});

//Websocket
io.on('connection', function (socket) {
    console.log("Cliente conectado");
    socket.emit('productos', JSON.parse(fs.readFileSync('./products.json', 'utf-8')));
    io.sockets.emit('mensajes', JSON.parse(fs.readFileSync('./messages.json', 'utf-8')));

    socket.on("nuevo-producto", producto => {
        const products = JSON.parse(fs.readFileSync('./products.json', 'utf-8'));
        products.push(producto);
        fs.writeFileSync('./products.json', JSON.stringify(products, null, 2));
        socket.emit('productos', products);
    });

    socket.on("nuevo-mensaje", message => {
        const messages = JSON.parse(fs.readFileSync('./messages.json', 'utf-8'));
        messages.push(message);
        fs.writeFileSync('./messages.json', JSON.stringify(messages, null, 2));
        io.sockets.emit('mensajes', messages);
    })
});

//Escucha del servidor
httpServer.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080");
})
