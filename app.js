/* ═════════════════════════════════════════════════════════════════════════
   DEMO DEL DÍA 5 - Primer contacto con JavaScript (sin cambios hoy)

   Se ejecuta solo, de arriba abajo, al cargar la página. Para verlo trabajar
   hay que abrir la consola: F12, pestaña Console.

   Lo que cambia respecto de Programación I y II no es la lógica: es el
   ENTORNO. Esto no corre en una terminal, corre dentro de una página, y por
   eso puede alcanzar los elementos del HTML y modificarlos.

   La consola además es un laboratorio: se escribe cualquier línea y se ve el
   resultado al instante. Probar ahí antes de escribir en el archivo es el
   hábito más útil del módulo.
   ═════════════════════════════════════════════════════════════════════════ */

// ── 1. CONSTANTES ───────────────────────────────────────────────────────
// const es la opción por defecto: se empieza con const y solo se pasa a let
// si hace falta. No es que el valor sea inmutable: DECLARA LA INTENCIÓN de
// que no cambia, y el navegador avisa con un error si alguien lo reasigna.
const negocio = "Pasteleria, Dulce Tentacion";
const anioFundacion = 2026;

// ── 2. VARIABLES ────────────────────────────────────────────────────────
// let, solo cuando el valor va a cambiar: aquí el stock baja de 40 a 35.
// Existe una tercera forma, var, que es la antigua y no se usa: sus reglas
// de alcance producen errores difíciles de encontrar.
let tortaFrutal = 40;
tortaFrutal = 35;                   // se vendieron cinco
let selvaNegra = 40;
selvaNegra = 35;                   // se vendieron cinco
let tresLeches = 40;
tresLeches = 35;                   // se vendieron cinco


// ── 3. TIPOS ────────────────────────────────────────────────────────────
// El tipo NO se declara: lo tiene el valor, no la variable. Eso es el tipado
// dinámico, la diferencia más grande contra Java o C. typeof lo consulta.
//
// null y undefined se parecen y no son lo mismo:
//   null       lo puso el programador a propósito: "aquí no hay nada"
//   undefined  nadie asignó nada todavía. Lo pone JavaScript.
const precioPastel = 40;                  // number
const abiertoHoy = true;               // boolean
const promocionDelDia = null;          // vacío a propósito
let telefono;                          // undefined: declarada, todavía sin valor

console.log("tipos:", typeof negocio, typeof precioPastel, typeof abiertoHoy);
console.log("null es", promocionDelDia, "| sin asignar es", telefono);

// ── 4. TEMPLATE LITERAL ─────────────────────────────────────────────────
// Texto entre comillas invertidas ( ` ). Dentro, ${...} se evalúa y se
// inserta. Reemplaza a concatenar con +, que se vuelve ilegible enseguida.
//
// EL TROPIEZO: el backtick está a la izquierda del 1, o AltGr + }. Y es
// traicionero: con ' en vez de ` NO sale ningún error, sale ${negocio}
// literal en la pantalla. Ese es el síntoma que hay que reconocer.
const resumen = `${negocio} abrió en ${anioFundacion} y hoy quedan ${selvaNegra} tortas selva negra.`;
console.log(resumen); 

// ── 5. COMPARACIÓN ──────────────────────────────────────────────────────
//   ==   convierte los tipos por su cuenta antes de comparar
//   ===  compara valor Y tipo, sin convertir nada
// Se usa siempre ===. Si hay que convertir, se hace a mano con Number(...),
// donde se vea. Las reglas de conversión de == son una fuente de bugs.
console.log("40" == precioPastel);       // true  - convierte el texto a número por su cuenta
console.log("40" === precioPastel);      // false - un string nunca es igual a un number

// ── 6. PRIMER CAMBIO EN LA PÁGINA ───────────────────────────────────────
// Aquí JavaScript deja de ser una calculadora y toca el documento.
// document representa la página cargada. querySelector busca el primer
// elemento que coincida, con EL MISMO selector que se usa en CSS.
// textContent es el texto visible del elemento: asignarle algo lo reemplaza.
//
// Si no encuentra nada devuelve null, y escribir en null da el error
// "Cannot set properties of null": el selector no coincide con nada.
const subtitulo = document.querySelector("#aviso-stock");
subtitulo.textContent = `Hoy quedan ${selvaNegra} tortas selva negra.`;

// ── LA PREGUNTA DEL DÍA ─────────────────────────────────────────────────
// Un texto cambiado desde la consola desaparece al recargar: se tocó la
// copia en memoria, no index.html. El de la línea 72 vuelve porque app.js
// corre otra vez en cada carga. Guardar de verdad llega el Día 13.

