const productos = [];

function getLastId() {
    if (productos.length === 0) {
        return 0;
    }

    const lastId = productos[(productos.length - 1)].id;
    return lastId;
}


//Requisitos
const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
const handlebars = require('express-handlebars');
app.engine("hbs", handlebars.engine());
app.set("view engine", "hbs");


//Peticiones del servidor
app.get("/", (req, res) => {
    const listEmpty = productos.length === 0;
    res.render("formulario", { productos: productos, notEmpty: !listEmpty });
});

app.post("/productos", (req, res) => {
    const producto = req.body;
    const idAsignado = getLastId() + 1;
    producto.id = idAsignado;
    productos.push(producto);

    res.redirect("/");
});

app.get("/productos", (req, res) => {
    const listEmpty = productos.length === 0;
    res.render("products", { productos: productos, notEmpty: !listEmpty });
});


//Escucha del servidor
httpServer.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080");
})
