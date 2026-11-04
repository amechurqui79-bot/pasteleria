// ── 1. SELECCIONAR ──────────────────────────────────────────────────────
const contenedor = document.querySelector("#lista-productos");
const titulos = document.querySelectorAll("h2");

console.log("El contenedor existe:", contenedor !== null);
console.log("Hay", titulos.length, "encabezados h2 en la página");

const textosDeTitulos = [...titulos].map(t => t.textContent);
console.log(textosDeTitulos);

// ── 2. LEER Y MODIFICAR CONTENIDO ───────────────────────────────────────

// ── 3. ATRIBUTOS Y CLASES ───────────────────────────────────────────────

// ── 4. CREAR ELEMENTOS (ESTILO COMPRA DIRECTA EDUCATODO) ────────────────
function crearTarjeta(producto) {
  const articulo = document.createElement("article");

  articulo.classList.add("tarjeta", "pastel", "edu-card--direct-buy");
  if (!producto.disponible) {
    articulo.classList.add("agotado");
  } else {
    articulo.draggable = true;
  }

  articulo.dataset.nombre = producto.nombre;

  const imagenSrc = producto.imagen || "img/pastel-del-dia.jpg";
  const textoDescripcion =
    producto.descripcion || "Preparación artesanal del día con ingredientes frescos.";

  const accionesHTML = producto.disponible
    ? `
      <div class="edu-card-action-row">
        <button type="button" class="boton-secundario boton-encargar-catalogo" data-encargar="${producto.nombre}">
          Pedir encargo
        </button>
        <button type="button" class="boton-agregar-catalogo" data-agregar="${producto.nombre}">
          Agregar al carrito
        </button>
      </div>
    `
    : `
      <div class="edu-card-action-row">
        <button type="button" class="boton-secundario boton-encargar-catalogo" data-encargar="${producto.nombre}">
          Reservar por encargo
        </button>
        <button type="button" class="boton-agregar-catalogo" disabled>
          Agotado hoy
        </button>
      </div>
    `;

  articulo.innerHTML = `
    <div class="pastel-imagen-wrap">
      <img src="${imagenSrc}" alt="${producto.nombre}">
      <span class="pastel-etiqueta-cat">${producto.categoria}</span>
    </div>
    <div class="pastel-cuerpo">
      <h3>${producto.nombre}</h3>
      <p class="descripcion">${textoDescripcion}</p>
      <div class="pastel-meta-precio">
        <p class="precio">Bs ${producto.precio.toFixed(2)}</p>
        <p class="stock">${producto.disponible ? `${producto.stock} en stock` : "Bajo encargo"}</p>
      </div>
      ${accionesHTML}
    </div>
  `;

  return articulo;
}

// ── 5. RENDER: EL PATRÓN DEL MÓDULO ─────────────────────────────────────
function render(lista) {
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    contenedor.append(crearTarjeta(producto));
  });

  if (lista.length === 0) {
    contenedor.innerHTML = "<p>No hay productos que mostrar.</p>";
  }
}

// ── 6. PINTAR ───────────────────────────────────────────────────────────
render(productos);

// ── 7. RECORRER EL ÁRBOL ────────────────────────────────────────────────
const primeraTarjeta = document.querySelector(".tarjeta");
console.log("Padre de la primera tarjeta:", primeraTarjeta.parentElement.id);
console.log("Su producto es:", primeraTarjeta.dataset.nombre);
