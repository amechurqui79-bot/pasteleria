// ── 1. SELECCIONAR ──────────────────────────────────────────────────────
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

const textosDeTitulos = [...titulos].map(t => t.textContent);
console.log(textosDeTitulos);

// ── 2. LEER Y MODIFICAR CONTENIDO ───────────────────────────────────────

// ── 3. ATRIBUTOS Y CLASES ───────────────────────────────────────────────

// ── 4. CREAR ELEMENTOS ──────────────────────────────────────────────────
function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  articulo.classList.add("tarjeta", "pastel");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  }

  articulo.dataset.nombre = producto.nombre;

  const imagenHTML = producto.imagen
    ? `<img src="${producto.imagen}" alt="${producto.nombre}">`
    : "";

  const descripcionHTML = producto.descripcion
    ? `<p class="descripcion">${producto.descripcion}</p>`
    : "";

  articulo.innerHTML = `
    ${imagenHTML}
    <h3>${producto.nombre}</h3>
    ${descripcionHTML}
    <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
    <p class="stock">${producto.disponible ? `${producto.stock} en stock` : "Agotado"}</p>
  `;

  return articulo;
}

// ── 5. RENDER: EL PATRÓN DEL MÓDULO ─────────────────────────────────────

function render(lista) {
  const contenedor = document.querySelector("#lista-productos");

  if (!contenedor) {
    console.error(
      'No se encontró el elemento HTML con id="lista-productos".'
    );
    return;
  }

  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.append(crearTarjeta(producto));
  });

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos que mostrar.</p>";
  }
}

