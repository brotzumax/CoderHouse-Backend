const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
app.engine("hbs", handlebars.engine());
app.set("view engine", "hbs");
app.set("views", "./views");




const productos = [];

function getLastId() {
    if (productos.length === 0) {
        return 0;
    }

    const lastId = productos[(productos.length - 1)].id;
    return lastId;
}




app.get("/", (req, res) => {
    res.render("form");
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

app.listen(8080, () => {
    console.log("Servidor escuchando en puerto 8080");
})
