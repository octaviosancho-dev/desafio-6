const fs = require('fs');

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
    this.objects = this.readData(this.nombreArchivo) || [];
  }

  readData(path) {
    const data = fs.readFileSync(path, 'utf-8').toString();
    if(data === '') return [];
    return JSON.parse(data);
  }
  
  writeData(objects) {
    fs.writeFileSync(this.nombreArchivo, JSON.stringify(objects, null, 2));
  }

  async generateId() {
    try {
      this.objects = await this.getAll() || [];

      let maxId = this.objects.length;
      this.objects.forEach(el => {
        el.id > maxId ? maxId = el.id : maxId
      })

      return maxId + 1;
    } catch (error) {
      throw error
    }
}

  async save(obj) {
    try {
      const file = await this.getAll();

      if (!file) {
        obj.id = await this.generateId();
        this.objects.push(obj);
        this.writeData(this.objects);
        return obj.id;
      }

      this.objects = file;
      obj.id = await this.generateId();
      this.objects.push(obj);
      this.writeData(this.objects);
      return obj.id;

    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const data = await this.readData(this.nombreArchivo);
      return data;
    }
    catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      this.objects = await this.getAll();
      const obj = this.objects.find( element => element.id === parseInt(id));
      return obj ? obj : null;
    } catch (error) {
      throw error
    }
  }

  async deleteById(id) {
    try {
      this.objects = await this.getAll();
      const obj = this.objects.filter( element => element.id !== parseInt(id) );
      this.writeData(obj);
    } catch (error) {
      throw error
    }
  }

  async deleteAll() {
    try {
      this.objects = await this.getAll();
      this.objects = [];
      this.writeData(this.objects);
      console.log(this.objects); //? dejo aqui el console.log para que pueda verse que todos fueron eliminados
    } catch (error) {
      throw error
    }
  }
}

module.exports = Contenedor;