const $estado = document.querySelector("#estado");
const listaRemota = document.querySelector("#lista-remota");

// ── 1. JSON ─────────────────────────────────────────────────────────────
const textoJson = '{"nombre":"Selva negra","precio":100,"disponible":true}';
const objeto = JSON.parse(textoJson);
console.log(objeto.precio, typeof objeto.precio);
console.log(JSON.stringify(objeto));

// ── 2. LOS TRES ESTADOS ─────────────────────────────────────────────────
function mostrarEstado(texto, tipo = "info") {
  $estado.textContent = texto;
  $estado.className = tipo;
}

function pintarRemoto(productos) {
  listaRemota.innerHTML = "";
  productos.forEach(p => {
    const art = document.createElement("article");
    art.classList.add("tarjeta");
    if (!p.disponible) art.classList.add("agotado");
    const imgHTML = p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}">` : "";
    art.innerHTML = `
      ${imgHTML}
      <h3>${p.nombre}</h3>
      <p class="precio">Bs ${p.precio.toFixed(2)} / ${p.unidad}</p>
      <p class="stock">${p.disponible ? `${p.stock} en stock` : "Agotado"}</p>
    `;
    listaRemota.append(art);
  });
}

// ── 3. fetch Y async/await ──────────────────────────────────────────────
async function cargarConFetch(url = "datos.json") {
  mostrarEstado("Cargando...", "cargando");

  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`El servidor respondió ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    pintarRemoto(datos.productos);

    mostrarEstado(`${datos.productos.length} productos de ${datos.negocio.nombre}`, "ok");

  } catch (error) {

    mostrarEstado(`No se pudieron cargar los datos. ${error.message}`, "error");
    listaRemota.innerHTML = "";
  }
}

document.querySelector("#cargar-fetch")
  .addEventListener("click", () => cargarConFetch());

document.querySelector("#cargar-roto")
  .addEventListener("click", () => cargarConFetch("no-existe.json"));

// ── 4. LO MISMO CON jQUERY ──────────────────────────────────────────────
$("#cargar-jquery").on("click", function () {
  mostrarEstado("Cargando catálogo de Dulce Tentación con jQuery...", "cargando");

  $.getJSON("datos.json")
    .done(function (datos) {
      pintarRemoto(datos.productos);
      $("#lista-remota .tarjeta").hide().fadeIn(250);
      mostrarEstado(`${datos.productos.length} productos de ${datos.negocio.nombre} (vía jQuery)`, "ok");
    })
    .fail(function (jqXHR) {
      mostrarEstado(`Falló la carga: ${jqXHR.status}`, "error");
    })
    .always(function () {
      console.log("La petición de Dulce Tentación terminó, con éxito o sin él.");
    });
});

// ── 5. QUÉ ES UNA PROMESA ───────────────────────────────────────────────

// ── 6. LA PESTAÑA NETWORK ───────────────────────────────────────────────
