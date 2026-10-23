// ── 1. COERCIÓN ─────────────────────────────────────────────────────────
console.log("5" + 3);
console.log("5" - 3);

console.log(Number("5") + 3);

// ── 2. VALORES FALSY ────────────────────────────────────────────────────
console.log(Boolean(0), Boolean(""), Boolean("0"), Boolean([]));

// ── 3. CONTROL DE FLUJO ─────────────────────────────────────────────────
let stock = 12;

if (stock > 0) {
  console.log("hay stock");
} else {
  console.log("agotado");
}

const estado = stock > 0 ? "disponible" : "agotado";
console.log(estado);

const precios = [0.5, 1.5, 12];
for (const precio of precios) {
  console.log("precio:", precio);
}

// ── 4. FUNCIONES: tres formas de escribir exactamente lo mismo ──────────
function totalDeclarada(precio, cantidad) {
  return precio * cantidad;
}

const totalExpresion = function (precio, cantidad) {
  return precio * cantidad;
};

const calcularTotal = (precio, cantidad) => precio * cantidad;

console.log(totalDeclarada(0.5, 10), totalExpresion(0.5, 10), calcularTotal(0.5, 10));

// ── 5. ARROW: con llaves y sin llaves ───────────────────────────────────
const doble = (n) => n * 2;

const aplicarDescuento = (total, porcentaje) => {
  const descuento = total * (porcentaje / 100);
  return total - descuento;
};

const conImpuesto = (monto, tasa = 13) => monto * (1 + tasa / 100);

console.log(aplicarDescuento(100, 20), conImpuesto(100));

console.log(conImpuesto(100).toFixed(2));

// ── 6. LAS FUNCIONES SON VALORES ────────────────────────────────────────
const operacion = calcularTotal;
console.log(operacion(1.5, 4));

function aplicarATodos(lista, fn) {
  const salida = [];
  for (const elemento of lista) {
    salida.push(fn(elemento));
  }
  return salida;
}

console.log(aplicarATodos(precios, doble));
console.log(aplicarATodos(precios, p => `Bs ${p}`));

// ── 7. SCOPE Y CLOSURE ──────────────────────────────────────────────────
function crearContador() {
  let cuenta = 0;
  return () => {
    cuenta = cuenta + 1;
    return cuenta;
  };
}

const tortasVendidas = crearContador();
console.log(tortasVendidas(), tortasVendidas(), tortasVendidas());

const pastelesVendidos = crearContador();
console.log(pastelesVendidos());
