// ── 1. OBJETO LITERAL ───────────────────────────────────────────────────
const pastelDelDia = {
  nombre: "Pastel del día",
  precio: 40,
  categoria: "pastel",
  stock: 40,
  disponible: true,
};

console.log(pastelDelDia.nombre);

const propiedad = "precio";
console.log(pastelDelDia[propiedad]);

pastelDelDia.stock = 35;
pastelDelDia.integral = false;
delete pastelDelDia.integral;

// ── 2. DESTRUCTURING ────────────────────────────────────────────────────
const { nombre, precio } = pastelDelDia;
console.log(`${nombre} cuesta Bs ${precio}`);

const pastelDeAyer = { ...pastelDelDia, precio: 30, nombre: "Pastel de ayer" };
console.log(pastelDeAyer);

// ── 3. ARREGLO DE OBJETOS ───────────────────────────────────────────────
const productos = [
  { nombre: "Pastel del día", precio: 40.0,  categoria: "pastel",    stock: 20, disponible: true,
    imagen: "selva-negra.jpg",   descripcion: "Una dulce sorpresa para cada día." },
  { nombre: "Selva negra",    precio: 100.0, categoria: "chocolate", stock: 10, disponible: true,
    imagen: "selva-negra-1.jpg", descripcion: "Chocolate, crema y mucho sabor." },
  { nombre: "Torta frutal",   precio: 80.0,  categoria: "frutal",    stock: 8,  disponible: true,
    imagen: "torta-frutal.jpg",  descripcion: "Fresca, dulce y llena de frutas." },
  { nombre: "Tres leches",    precio: 150.0, categoria: "dulce",     stock: 5,  disponible: true,
    imagen: "tres-leches.jpg",   descripcion: "Suave, cremosa y deliciosa." },
  { nombre: "Torta en vaso",        precio: 15.0,  categoria: "dulce",   stock: 0, disponible: false },
  { nombre: "Torta chocolate", precio: 90.0, categoria: "chocolate", stock: 0, disponible: false },
  { nombre: "Torta de frutilla",       precio: 70.0,  categoria: "frutal",   stock: 0, disponible: false },
  { nombre: "Queque de platano",      precio: 30.0,  categoria: "dulce",    stock: 0,  disponible: false },
];

// ── 4. LOS MÉTODOS QUE IMPORTAN ─────────────────────────────────────────
productos.forEach(p => console.log(p.nombre));

const nombres = productos.map(p => p.nombre);
console.log(nombres);

const disponibles = productos.filter(p => p.disponible);
console.log(disponibles.length, "de", productos.length, "disponibles");

const caro = productos.find(p => p.precio > 60);
console.log(caro);

console.log(nombres.includes("Queque de platano"));
console.log(productos.some(p => p.stock === 0));
console.log(productos.every(p => p.precio > 0));

const porPrecio = [...productos].sort((a, b) => a.precio - b.precio);
console.log(porPrecio.map(p => p.nombre));

const valorInventario = productos.reduce((acumulador, p) => acumulador + p.precio * p.stock, 0);
console.log("Valor del inventario: Bs", valorInventario.toFixed(2));

// ── 5. ENCADENAR ────────────────────────────────────────────────────────
const nombresDisponibles = productos
  .filter(p => p.disponible)
  .map(p => p.nombre);
console.log(nombresDisponibles);

const totalTortasEnStock = productos
  .filter(p => p.categoria === "frutal" && p.disponible)
  .reduce((total, p) => total + p.precio * p.stock, 0);
console.log("Tortas en stock: Bs", totalTortasEnStock.toFixed(2));

const porCategoria = productos.reduce((grupos, p) => {
  if (!grupos[p.categoria]) grupos[p.categoria] = [];
  grupos[p.categoria].push(p.nombre);
  return grupos;
}, {});
console.log(porCategoria);

// ── 6. CLASES ───────────────────────────────────────────────────────────
class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }

  estaDisponible() {
    return this.stock > 0;
  }

  valorEnStock() {
    return this.precio * this.stock;
  }
}

const quequedeVainilla = new Producto("quequedeVainilla", 30.0, 5);
console.log(quequedeVainilla.nombre, quequedeVainilla.estaDisponible(), quequedeVainilla.valorEnStock());

class ProductoConDescuento extends Producto {
  constructor(nombre, precio, stock, descuento) {
    super(nombre, precio, stock);
    this.descuento = descuento;
  }

  precioFinal() {
    return this.precio * (1 - this.descuento / 100);
  }
}

const rosquete = new ProductoConDescuento("Rosquete", 1.0, 20, 25);
console.log(rosquete.precioFinal(), rosquete.estaDisponible());
