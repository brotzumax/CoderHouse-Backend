const express = require('express');

const app = express();

app.get("/productos", (req, res) => {
    res.send("Hola Mundo!");
});

app.get("/productoRandom", (req, res) => {
    res.send("Hola Mundo!");
});

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor: ${error}`));