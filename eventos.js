// ── 1. LOS ELEMENTOS QUE SE VAN A ESCUCHAR ──────────────────────────────
const buscador = document.querySelector("#buscador");
const filtros = document.querySelector("#filtros");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("form");
const mensajePedido = document.querySelector("#mensaje-pedido") || resultado;

let categoriaActiva = "todos";
let textoBuscado = "";
let criterioOrden = "nombre";

// ── 2. UNA SOLA FUNCIÓN QUE DECIDE QUÉ MOSTRAR ──────────────────────────
function actualizar() {
  const visibles = productos
    .filter(p => categoriaActiva === "todos" || p.categoria === categoriaActiva)
    .filter(p => p.nombre.toLowerCase().includes(textoBuscado.toLowerCase()));

  if (criterioOrden === "precio") {
    visibles.sort((a, b) => a.precio - b.precio);
  } else if (criterioOrden === "stock") {
    visibles.sort((a, b) => b.stock - a.stock);
  } else if (criterioOrden === "nombre") {
    visibles.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }

  render(visibles);
  resultado.textContent = `${visibles.length} de ${productos.length} productos`;
}

actualizar();

// ── 3. EL EVENTO input ──────────────────────────────────────────────────
buscador.addEventListener("input", (event) => {
  textoBuscado = event.target.value;
  actualizar();
});

// ── 4. DELEGACIÓN DE EVENTOS ────────────────────────────────────────────
filtros.addEventListener("click", (event) => {

  const boton = event.target.closest("button");
  if (!boton) return;

  categoriaActiva = boton.dataset.categoria;

  filtros.querySelectorAll("button").forEach(b => b.classList.remove("activo"));
  boton.classList.add("activo");

  actualizar();
});

// ── 5. EL EVENTO submit Y preventDefault ────────────────────────────────
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  const fecha = formulario.querySelector("#fecha");
  const hoy = new Date().toISOString().slice(0, 10);
  if (fecha.value < hoy) {

    fecha.setCustomValidity("La fecha de entrega no puede ser anterior a hoy.");
    fecha.reportValidity();

    fecha.addEventListener("input", () => fecha.setCustomValidity(""), { once: true });
    return;
  }

  const datos = Object.fromEntries(new FormData(formulario));
  console.log("Pedido recibido:", datos);

  mensajePedido.textContent = `Gracias ${datos.nombre}, el pedido quedó registrado.`;
  formulario.reset();
});

// ── 6. EXPRESIONES REGULARES, LO JUSTO ──────────────────────────────────
const PATRONES = {
  telefono: /^[0-9]{7,8}$/,
  correo: /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i,
  ci: /^[0-9]{5,10}(-[0-9A-Za-z]{1,3})?$/,
};

console.log("70123456 válido:", PATRONES.telefono.test("70123456"));
console.log("7012 válido:", PATRONES.telefono.test("7012"));
console.log("ana@correo.bo válido:", PATRONES.correo.test("ana@correo.bo"));

// ── 7. LA VALIDACIÓN DE VERDAD NO ESTÁ AQUÍ ─────────────────────────────
