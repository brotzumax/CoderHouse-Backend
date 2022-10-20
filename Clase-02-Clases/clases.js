class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        let fullName = `${this.nombre} ${this.apellido}`;
        return fullName;
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        let bookNames = [];
        this.libros.forEach(libro => {
            bookNames.push(libro.nombre);
        });
        return bookNames;
    }
}

const usuario = new Usuario("Maximiliano", "Brotzu", [], []);
usuario.addMascota("Beto");
usuario.addMascota("Nano");
usuario.addBook("El señor de los anillos", "J. R. R. Tolkien");
usuario.addBook("La espada de la verdad", "Terry Goodkind");
usuario.addBook("Harry potter y la piedra filosofal", "J. K. Rowling");


console.log(`Nombre completo: ${usuario.getFullName()}`);
console.log(`Cantidad de mascotas: ${usuario.countMascotas()}`);
console.log(`Nombres de libros favoritos: ${usuario.getBookNames()}`);