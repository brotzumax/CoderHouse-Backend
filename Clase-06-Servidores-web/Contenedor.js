module.exports = class Contenedor {
    constructor(nombre) {
        this.nombreArchivo = `./${nombre}`;
        this.data = [];
        this.fs = require("fs");
    }

    async save(producto) {
        if (!this.fileExist()) {
            await this.fs.promises.writeFile(this.nombreArchivo, "");
        }
        if (await this.isEmpty()) {
            try {
                this.data.push(await this.setId(producto, 1));
                await this.fs.promises.writeFile(this.nombreArchivo, `${JSON.stringify(this.data, null, 2)}\n`);
                console.log("Archivo creado - Id: 1");
                return 1;
            } catch (error) {
                console.log("Error en la creación del archivo");
                console.log(error);
            }
        } else {
            try {
                this.data = await this.getAll();
                this.data.push(await this.setId(producto, (this.getLastId() + 1)));
                await this.fs.promises.writeFile(this.nombreArchivo, `${JSON.stringify(this.data, null, 2)}\n`);
                console.log(`Archivo creado - Id: ${this.getLastId()}`);
                return this.getLastId();
            } catch (error) {
                console.log("Error en la creación del archivo");
                console.log(error);
            }
        }
    }

    async getById(id) {
        let producto;
        this.data = await this.getAll();
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                producto = this.data[i];
                break;
            } else {
                producto = null;
            }
        }
        return producto;
    }

    async getAll() {
        try {
            const newData = await this.fs.promises.readFile(this.nombreArchivo, "utf-8");
            return JSON.parse(newData);
        } catch (error) {
            console.error("Error en la lectura del archivo");
        }
    }

    async deleteById(id) {
        try {
            this.data = await this.getAll();
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].id === id) {
                    this.data.splice(i, 1);
                    break;
                }
            }
            await this.fs.promises.writeFile(this.nombreArchivo, `${JSON.stringify(this.data, null, 2)}\n`);
            console.log("Archivo eliminado");
        } catch (error) {
            console.log("Error al eliminar el archivo");
            console.log(error);
        }
    }

    async deleteAll() {
        await this.fs.promises.writeFile(this.nombreArchivo, "");
    }

    setId(obj, id) {
        obj.id = id;
        return obj;
    }

    getLastId() {
        let lastId = this.data[(this.data.length - 1)].id;
        return lastId;
    }

    async isEmpty() {
        const info = await this.fs.promises.readFile(this.nombreArchivo, "utf-8");
        return (info == "");
    }

    fileExist() {
        return this.fs.existsSync(this.nombreArchivo);
    }
}