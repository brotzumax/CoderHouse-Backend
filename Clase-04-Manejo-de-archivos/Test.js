const Contenedor = require("./Contenedor.js");

(async function () {
    const contenedor = new Contenedor("productos.txt");

    console.log("\n\n----------------------------------------");

    //Se guardan 4 nuevos productos
    console.log("Nuevos productos agregados, cada uno retorna su id:");
    await contenedor.save({title: "Licuadora", price: 250.00, thumbnail: "https://dummyimage.com/600x400/000/fff"});
    await contenedor.save({title: "Tostadora", price: 100.00, thumbnail: "https://dummyimage.com/600x400/000/fff"});
    await contenedor.save({title: "Heladera", price: 630.00, thumbnail: "https://dummyimage.com/600x400/000/fff"});
    await contenedor.save({title: "Horno eléctrico", price: 570.00, thumbnail: "https://dummyimage.com/600x400/000/fff"});

    console.log("\n\n----------------------------------------");

    //Se obtiene la id numero 2
    console.log("Producto con id 2:");
    console.log(await contenedor.getById(2));

    console.log("\n\n----------------------------------------");

    //Se obtiene el array completo de productos
    console.log("Todos los productos en el archivo:");
    console.log(await contenedor.getAll());

    console.log("\n\n----------------------------------------");

    //Se elimina la id numero 2
    await contenedor.deleteById(2);
    console.log("Todos los productos luego de eliminar la id 2:");
    console.log(await contenedor.getAll());
    
    //Se eliminan todos los productos y el documento queda en blanco
    await contenedor.deleteAll();
})();

