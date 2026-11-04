// ── 1. CONSTANTES ───────────────────────────────────────────────────────
const negocio = "Pastelería Dulce Tentación";
const anioFundacion = 2026;

// ── 2. VARIABLES ────────────────────────────────────────────────────────
let selvaNegra = 40;
selvaNegra = 35;

// ── 3. TIPOS ────────────────────────────────────────────────────────────
const precioPastel = 40;
const abiertoHoy = true;
const promocionDelDia = null;
let telefono;

console.log("tipos:", typeof negocio, typeof precioPastel, typeof abiertoHoy);
console.log("null es", promocionDelDia, "| sin asignar es", telefono);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
const resumen = `${negocio} abrió en ${anioFundacion} y hoy quedan ${selvaNegra} tortas selva negra.`;
console.log(resumen);

// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
console.log("40" == precioPastel);
console.log("40" === precioPastel);

// ── 6. PRIMER CAMBIO EN LA PÁGINA ───────────────────────────────────────
const subtitulo = document.querySelector("#aviso-stock");
subtitulo.textContent = `Hoy quedan ${selvaNegra} tortas selva negra.`;

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────
