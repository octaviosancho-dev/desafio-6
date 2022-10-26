const express = require('express');
const app = express();

const Contenedor = require('./class');
const productos = new Contenedor('./data/productos.txt');


const path = require('path');
const PORT = process.env.PORT || 8080;

// Funcion para obtener nro aleatorio 
const randomNumber = (min, max) => {
  return Math.floor(
    Math.random() * (max - min) + min
  )
}

app.get('/', (req, res) => {
  res.send('Index');
});

app.get('/productos', async (req, res) => {
  const mostrarProductos = await productos.getAll();
  res.send(mostrarProductos);
});

app.get('/productoRandom', async (req, res) => {
  const obtenerProductos = await productos.getAll();
  const randomProduct = await productos.getById(randomNumber(1, obtenerProductos.length + 1));

  res.send(randomProduct);
});

app.listen(PORT, () => {
  console.log(`Server running in PORT: ${PORT}`);
})