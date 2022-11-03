const express = require('express');
const Contenedor = require("./Contenedor.js");

const productos = new Contenedor("productos.txt");
const app = express();

app.get("/productos", (req, res) => {
    productos.getAll()
        .then(producto => res.send(producto))
        .catch(error => res.send(`Error al cargar los productos. ${error}`));
});

app.get("/productoRandom", (req, res) => {
    let numeroRandom = Math.floor(Math.random() * 3) + 1;
    productos.getById(numeroRandom)
    .then(producto => res.send(producto))
    .catch(error => res.send(`Error al cargar los productos. ${error}`));
});

const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("Error", error => console.log(`Error en servidor: ${error}`));