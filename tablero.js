const COLUMNAS = ["carrito", "vitrina", "favoritos"];
const ETIQUETAS_COLUMNAS = {
  carrito: "Mi carrito",
  vitrina: "Vitrina rápida",
  favoritos: "Para encargo",
};

const ZONAS_ENVIO = {
  barrio: {
    nombre: "Zona Barrio (radio 10 cuadras)",
    tarifa: 10,
    metaGratis: 150,
  },
  ciudad: {
    nombre: "Resto de la ciudad (Motoboy)",
    tarifa: 18,
    metaGratis: 220,
  },
  tienda: {
    nombre: "Recojo en pastelería (Av. La Paz 45)",
    tarifa: 0,
    metaGratis: 0,
  },
};

let zonaSeleccionada = "barrio";

let tablero = {
  carrito: [
    { nombre: "Selva negra", precio: 100, cantidad: 1, imagen: "img/selva-negra-1.jpg" },
  ],
  vitrina: [
    { nombre: "Pastel del día", precio: 40, cantidad: 1, imagen: "img/pastel-del-dia.jpg" },
    { nombre: "Torta frutal", precio: 80, cantidad: 1, imagen: "img/torta-frutal.jpg" },
  ],
  favoritos: [
    { nombre: "Tres leches", precio: 150, cantidad: 1, imagen: "img/tres-leches.jpg" },
  ],
};

// ── 1. PINTAR EL TABLERO, BARRA DE ENVÍO Y RESUMEN DE COMPRA ────────────
function renderTablero() {
  COLUMNAS.forEach((nombreColumna) => {
    const columna = document.querySelector(`[data-columna="${nombreColumna}"]`);
    const lista = columna.querySelector(".lista-columna");
    const insignia = document.querySelector(`[data-contador="${nombreColumna}"]`);
    lista.innerHTML = "";

    if (tablero[nombreColumna].length === 0) {
      const vacio = document.createElement("li");
      vacio.className = "ficha-vacia";
      vacio.textContent =
        nombreColumna === "carrito"
          ? "Tu carrito está vacío. Usa «Agregar al carrito» o arrastra un pastel aquí."
          : "Arrastra un pastel a esta sección";
      lista.append(vacio);
    }

    tablero[nombreColumna].forEach((item, indice) => {
      const li = document.createElement("li");
      li.className = "ficha";
      li.draggable = true;
      li.dataset.columna = nombreColumna;
      li.dataset.indice = indice;

      const subtotalItem = item.precio * item.cantidad;
      const miniatura = item.imagen
        ? `<img src="${item.imagen}" alt="${item.nombre}" class="ficha-img">`
        : `<span class="ficha-icono">🍰</span>`;

      const accionRapida =
        nombreColumna === "carrito"
          ? `<button type="button" class="btn-ficha btn-quitar" data-accion="quitar" title="Quitar del carrito">✕</button>`
          : `<button type="button" class="btn-ficha btn-al-carrito" data-accion="al-carrito" title="Pasar al carrito">🛒</button>`;

      li.innerHTML = `
        <div class="ficha-info">
          ${miniatura}
          <div class="ficha-textos">
            <span class="ficha-nombre">${item.nombre}</span>
            <small class="ficha-unitario">Bs ${item.precio.toFixed(2)} c/u</small>
          </div>
        </div>
        <div class="ficha-controles">
          <div class="control-cantidad">
            <button type="button" class="btn-cant" data-accion="restar" aria-label="Disminuir cantidad">−</button>
            <span class="ficha-cantidad">${item.cantidad}</span>
            <button type="button" class="btn-cant" data-accion="sumar" aria-label="Aumentar cantidad">+</button>
          </div>
          <strong class="ficha-precio">Bs ${subtotalItem.toFixed(2)}</strong>
          ${accionRapida}
        </div>
      `;
      lista.append(li);
    });

    const totalUnidades = tablero[nombreColumna].reduce((suma, i) => suma + i.cantidad, 0);
    const totalBs = tablero[nombreColumna].reduce((suma, i) => suma + i.precio * i.cantidad, 0);

    if (insignia) {
      insignia.textContent = totalUnidades;
    }

    const n = tablero[nombreColumna].length;
    columna.querySelector(".total").textContent =
      `${n} ${n === 1 ? "item" : "items"} (${totalUnidades} u.) · Bs ${totalBs.toFixed(2)}`;
  });

  actualizarPanelCheckoutYEnvio();
  dibujarGrafico();
}

function calcularCostoEnvio(subtotal, unidades) {
  const config = ZONAS_ENVIO[zonaSeleccionada] || ZONAS_ENVIO.barrio;
  if (unidades === 0 || config.tarifa === 0) return 0;
  if (config.metaGratis > 0 && subtotal >= config.metaGratis) return 0;
  return config.tarifa;
}

function actualizarPanelCheckoutYEnvio() {
  const unidades = tablero.carrito.reduce((s, i) => s + i.cantidad, 0);
  const subtotal = tablero.carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const config = ZONAS_ENVIO[zonaSeleccionada] || ZONAS_ENVIO.barrio;
  const envio = calcularCostoEnvio(subtotal, unidades);
  const totalPagar = subtotal + envio;

  // Actualizar barra de envío estilo Educatodo
  const $nombreZona = document.querySelector("#envio-nombre-zona");
  const $tarifaActual = document.querySelector("#envio-tarifa-actual");
  const $restante = document.querySelector("#envio-restante");
  const $barraFill = document.querySelector("#barra-envio-fill");
  const $barraCont = document.querySelector("#barra-envio-contenedor");
  const $metaTexto = document.querySelector("#envio-meta-texto");

  if ($nombreZona) $nombreZona.textContent = config.nombre;

  if (config.metaGratis === 0) {
    if ($tarifaActual) $tarifaActual.textContent = "Sin costo (Bs 0.00)";
    if ($restante) $restante.textContent = "📍 Recojo directo en nuestra pastelería sin cargo.";
    if ($barraFill) $barraFill.style.width = "100%";
    if ($barraCont) $barraCont.setAttribute("aria-valuenow", "100");
    if ($metaTexto) $metaTexto.textContent = "Disponible de lunes a sábado";
  } else {
    const falta = Math.max(0, config.metaGratis - subtotal);
    const porcentaje = Math.min(100, Math.round((subtotal / config.metaGratis) * 100));

    if ($tarifaActual) {
      $tarifaActual.textContent =
        unidades === 0
          ? `Envío Bs ${config.tarifa.toFixed(2)}`
          : falta === 0
            ? "¡Envío GRATIS!"
            : `Envío Bs ${config.tarifa.toFixed(2)}`;
    }
    if ($restante) {
      $restante.textContent =
        unidades === 0
          ? `Agrega pasteles para alcanzar envío gratis desde Bs ${config.metaGratis.toFixed(2)}`
          : falta > 0
            ? `Te faltan Bs ${falta.toFixed(2)} para envío gratis`
            : "🎉 ¡Felicidades! Ya tienes envío gratis en tu compra.";
    }
    if ($barraFill) $barraFill.style.width = `${porcentaje}%`;
    if ($barraCont) $barraCont.setAttribute("aria-valuenow", String(porcentaje));
    if ($metaTexto) $metaTexto.textContent = `Gratis desde Bs ${config.metaGratis.toFixed(2)}`;
  }

  // Actualizar resumen de checkout y contador del header
  const $destacado = document.querySelector("#total-destacado-carrito");
  const $unidades = document.querySelector("#checkout-unidades");
  const $subtotal = document.querySelector("#checkout-subtotal");
  const $envio = document.querySelector("#checkout-envio");
  const $total = document.querySelector("#checkout-total");
  const $headerPill = document.querySelector("#header-carrito-contador");

  if ($destacado) $destacado.textContent = `Bs ${totalPagar.toFixed(2)}`;
  if ($unidades) $unidades.textContent = `${unidades} u.`;
  if ($subtotal) $subtotal.textContent = `Bs ${subtotal.toFixed(2)}`;
  if ($envio) {
    $envio.textContent =
      unidades === 0 ? "Bs 0.00" : envio === 0 ? "¡Gratis!" : `Bs ${envio.toFixed(2)}`;
  }
  if ($total) $total.textContent = `Bs ${totalPagar.toFixed(2)}`;
  if ($headerPill) $headerPill.textContent = `${unidades} (Bs ${totalPagar.toFixed(2)})`;
}

// Selector de zona de envío
const selectZonaEnvio = document.querySelector("#zona-envio");
if (selectZonaEnvio) {
  selectZonaEnvio.addEventListener("change", (event) => {
    zonaSeleccionada = event.target.value;
    actualizarPanelCheckoutYEnvio();
  });
}

// ── 2. DRAG & DROP Y CONTROLES INTERACTIVOS ─────────────────────────────
const elTablero = document.querySelector("#tablero");
const contenedorCatalogo = document.querySelector("#lista-productos");
const mensajeCompra = document.querySelector("#mensaje-compra");

// Permitir arrastrar tarjetas directamente desde el catálogo izquierdo
if (contenedorCatalogo) {
  contenedorCatalogo.addEventListener("dragstart", (event) => {
    const tarjeta = event.target.closest(".pastel");
    if (!tarjeta || tarjeta.classList.contains("agotado")) return;

    event.dataTransfer.setData("text/plain", JSON.stringify({
      desdeCatalogo: true,
      nombre: tarjeta.dataset.nombre,
    }));
    event.dataTransfer.effectAllowed = "copyMove";
    tarjeta.classList.add("arrastrando");
  });

  contenedorCatalogo.addEventListener("dragend", (event) => {
    const tarjeta = event.target.closest(".pastel");
    if (tarjeta) tarjeta.classList.remove("arrastrando");
    document.querySelectorAll(".columna").forEach(c => c.classList.remove("encima"));
  });
}

elTablero.addEventListener("dragstart", (event) => {
  const ficha = event.target.closest(".ficha");
  if (!ficha) return;

  event.dataTransfer.setData("text/plain", JSON.stringify({
    columna: ficha.dataset.columna,
    indice: Number(ficha.dataset.indice),
  }));

  event.dataTransfer.effectAllowed = "move";
  ficha.classList.add("arrastrando");
});

elTablero.addEventListener("dragend", (event) => {
  const ficha = event.target.closest(".ficha");
  if (ficha) ficha.classList.remove("arrastrando");
  document.querySelectorAll(".columna").forEach(c => c.classList.remove("encima"));
});

elTablero.addEventListener("dragover", (event) => {
  const columna = event.target.closest(".columna");
  if (!columna) return;

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  columna.classList.add("encima");
});

elTablero.addEventListener("dragleave", (event) => {
  const columna = event.target.closest(".columna");
  if (columna) columna.classList.remove("encima");
});

elTablero.addEventListener("drop", (event) => {
  const columna = event.target.closest(".columna");
  if (!columna) return;

  event.preventDefault();
  columna.classList.remove("encima");

  const destino = columna.dataset.columna;
  const textoDatos = event.dataTransfer.getData("text/plain");
  if (!textoDatos) return;

  const origen = JSON.parse(textoDatos);

  if (origen.desdeCatalogo) {
    agregarProductoAColumna(origen.nombre, destino);
    return;
  }

  if (origen.columna === destino) return;

  moverItemEntreColumnas(origen.columna, origen.indice, destino);
});

function agregarProductoAColumna(nombreProducto, colDestino = "carrito") {
  const prodCatalogo = productos.find(p => p.nombre === nombreProducto);
  if (!prodCatalogo) return;

  const existente = tablero[colDestino].find(p => p.nombre === nombreProducto);
  if (existente) {
    existente.cantidad += 1;
  } else {
    tablero[colDestino].push({
      nombre: prodCatalogo.nombre,
      precio: prodCatalogo.precio,
      cantidad: 1,
      imagen: prodCatalogo.imagen || "img/pastel-del-dia.jpg",
    });
  }

  renderTablero();

  if (mensajeCompra) {
    mensajeCompra.textContent = `✓ Se agregó "${nombreProducto}" a ${ETIQUETAS_COLUMNAS[colDestino] || colDestino}.`;
    mensajeCompra.className = "ok";
  }
}

function moverItemEntreColumnas(colOrigen, indiceOrigen, colDestino) {
  const [item] = tablero[colOrigen].splice(indiceOrigen, 1);
  if (!item) return;

  const existente = tablero[colDestino].find(p => p.nombre === item.nombre);
  if (existente) {
    existente.cantidad += item.cantidad;
  } else {
    tablero[colDestino].push(item);
  }

  if (mensajeCompra) {
    mensajeCompra.textContent = "";
    mensajeCompra.className = "";
  }

  renderTablero();
}

function prepararEncargoEnFormulario(listaItems) {
  const formPedido = document.querySelector("#pedido form");
  const selectProducto = document.querySelector("#producto");
  const inputCantidad = document.querySelector("#cantidad");
  const textareaNotas = document.querySelector("#notas");

  if (!formPedido || listaItems.length === 0) return;

  const mapaValores = {
    "Pastel del día": "pastel-dia",
    "Selva negra": "selva-negra",
    "Torta frutal": "torta-frutal",
    "Tres leches": "tres-leches",
  };

  const primero = listaItems[0];
  if (selectProducto) {
    selectProducto.value = mapaValores[primero.nombre] || "pastel-dia";
  }

  const totalUnidades = listaItems.reduce((s, i) => s + i.cantidad, 0);
  if (inputCantidad) {
    inputCantidad.value = totalUnidades;
  }

  const resumenTexto = listaItems
    .map(i => `${i.cantidad}x ${i.nombre} (Bs ${(i.precio * i.cantidad).toFixed(2)})`)
    .join(", ");

  if (textareaNotas) {
    textareaNotas.value = `Pedido desde la tienda: ${resumenTexto}. Entrega: ${ZONAS_ENVIO[zonaSeleccionada].nombre}.`;
  }

  const seccionPedido = document.querySelector("#pedido");
  if (seccionPedido) {
    seccionPedido.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Botones interactivos dentro de cada ficha (+, −, pasar al carrito, quitar)
elTablero.addEventListener("click", (event) => {
  const boton = event.target.closest("button[data-accion]");
  if (!boton) return;

  const ficha = boton.closest(".ficha");
  if (!ficha) return;

  const col = ficha.dataset.columna;
  const idx = Number(ficha.dataset.indice);
  const item = tablero[col][idx];
  if (!item) return;

  const accion = boton.dataset.accion;

  if (accion === "sumar") {
    item.cantidad += 1;
    renderTablero();
  } else if (accion === "restar") {
    if (item.cantidad > 1) {
      item.cantidad -= 1;
    } else if (col === "carrito") {
      tablero.carrito.splice(idx, 1);
    }
    renderTablero();
  } else if (accion === "al-carrito") {
    moverItemEntreColumnas(col, idx, "carrito");
  } else if (accion === "quitar") {
    tablero[col].splice(idx, 1);
    renderTablero();
  }
});

// Conectar botones de las tarjetas del catálogo izquierdo (Agregar al carrito y Pedir encargo)
if (contenedorCatalogo) {
  contenedorCatalogo.addEventListener("click", (event) => {
    const btnAgregar = event.target.closest(".boton-agregar-catalogo");
    if (btnAgregar && !btnAgregar.disabled) {
      const nombre = btnAgregar.dataset.agregar;
      agregarProductoAColumna(nombre, "carrito");

      const textoOriginal = btnAgregar.textContent;
      btnAgregar.textContent = "✓ Agregado";
      setTimeout(() => {
        btnAgregar.textContent = textoOriginal;
      }, 900);
      return;
    }

    const btnEncargar = event.target.closest(".boton-encargar-catalogo");
    if (btnEncargar) {
      const nombre = btnEncargar.dataset.encargar;
      const prod = productos.find(p => p.nombre === nombre);
      if (prod) {
        prepararEncargoEnFormulario([{ nombre: prod.nombre, precio: prod.precio, cantidad: 1 }]);
      }
    }
  });
}

// Conectar botones de compra directa de la vitrina superior (.edu-hero)
document.querySelectorAll("[data-comprar-hero]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.comprarHero;
    agregarProductoAColumna(nombre, "carrito");

    const textoOriginal = boton.textContent;
    boton.textContent = "✓ En tu carrito";
    setTimeout(() => {
      boton.textContent = textoOriginal;
    }, 1000);
  });
});

// Botones de acción principales del carrito
const btnConfirmar = document.querySelector("#confirmar-compra");
const btnPasarPedido = document.querySelector("#pasar-a-pedido");
const btnVaciar = document.querySelector("#vaciar-carrito");

if (btnConfirmar) {
  btnConfirmar.addEventListener("click", () => {
    if (tablero.carrito.length === 0) {
      mensajeCompra.textContent = "Tu carrito está vacío. Elige algún pastel del catálogo de la izquierda.";
      mensajeCompra.className = "error";
      return;
    }

    const unidades = tablero.carrito.reduce((s, i) => s + i.cantidad, 0);
    const subtotal = tablero.carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const envio = calcularCostoEnvio(subtotal, unidades);
    const totalCompra = subtotal + envio;
    const detalle = tablero.carrito.map(i => `${i.cantidad}x ${i.nombre}`).join(", ");

    mensajeCompra.textContent =
      `🎉 ¡Compra registrada! (${detalle}) · Modalidad: ${ZONAS_ENVIO[zonaSeleccionada].nombre} · Total: Bs ${totalCompra.toFixed(2)}.`;
    mensajeCompra.className = "ok";
  });
}

if (btnPasarPedido) {
  btnPasarPedido.addEventListener("click", () => {
    const itemsParaEncargo =
      tablero.carrito.length > 0 ? tablero.carrito : tablero.favoritos;

    if (itemsParaEncargo.length === 0) {
      mensajeCompra.textContent = "Agrega al menos un pastel al carrito o a «Para encargo» antes de programar tu pedido.";
      mensajeCompra.className = "error";
      return;
    }

    prepararEncargoEnFormulario(itemsParaEncargo);
    mensajeCompra.textContent = "📋 Tus pasteles se copiaron al formulario de pedido programado más abajo.";
    mensajeCompra.className = "ok";
  });
}

if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (tablero.carrito.length === 0) return;
    tablero.carrito = [];

    if (mensajeCompra) {
      mensajeCompra.textContent = "Se vació tu carrito de compras.";
      mensajeCompra.className = "";
    }
    renderTablero();
  });
}

// ── 3. CANVAS: EL TAMAÑO (OPCIONAL SI EXISTE EN EL DOM) ─────────────────
const canvas = document.querySelector("#grafico");
const ctx = canvas ? canvas.getContext("2d") : null;

// ── 4. DIBUJAR ──────────────────────────────────────────────────────────
function dibujarGrafico() {
  if (!canvas || !ctx) return;
  const totales = COLUMNAS.map(c =>
    tablero[c].reduce((suma, i) => suma + i.precio * i.cantidad, 0)
  );
  const maximo = Math.max(...totales, 50);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const margen = 36;
  const anchoBarra = 100;
  const separacion = 55;
  const alturaUtil = canvas.height - margen * 2;

  const estilo = getComputedStyle(document.body);
  const colorPrincipal = estilo.getPropertyValue("--color-principal").trim() || "#c83270";
  const colorAcento = estilo.getPropertyValue("--color-acento").trim() || "#e95791";
  const colorTexto = estilo.getPropertyValue("--color-texto").trim() || "#5a263c";
  const colorBorde = estilo.getPropertyValue("--borde").trim() || "#f3c6d7";

  ctx.strokeStyle = colorBorde;
  ctx.lineWidth = 1;
  for (let paso = 0.25; paso <= 1; paso += 0.25) {
    const yGuia = canvas.height - margen - alturaUtil * paso;
    ctx.beginPath();
    ctx.moveTo(margen, yGuia);
    ctx.lineTo(canvas.width - margen, yGuia);
    ctx.stroke();
  }

  COLUMNAS.forEach((nombre, i) => {
    const x = margen + 18 + i * (anchoBarra + separacion);
    const alto = Math.max((totales[i] / maximo) * alturaUtil, totales[i] > 0 ? 6 : 0);
    const y = canvas.height - margen - alto;

    ctx.fillStyle = nombre === "carrito" ? colorAcento : colorPrincipal;
    ctx.beginPath();
    if (ctx.roundRect && alto > 0) {
      ctx.roundRect(x, y, anchoBarra, alto, [8, 8, 0, 0]);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, anchoBarra, alto);
    }

    ctx.fillStyle = colorTexto;
    ctx.font = "600 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(ETIQUETAS_COLUMNAS[nombre] || nombre, x + anchoBarra / 2, canvas.height - margen + 20);
    ctx.fillText(`Bs ${totales[i].toFixed(0)}`, x + anchoBarra / 2, y - 8);
  });

  ctx.beginPath();
  ctx.moveTo(margen, canvas.height - margen);
  ctx.lineTo(canvas.width - margen, canvas.height - margen);
  ctx.strokeStyle = colorTexto;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// ── 5. ANIMAR: EL LOOP ──────────────────────────────────────────────────

// ── 6. LO QUE NO FUNCIONA EN MÓVIL ──────────────────────────────────────
renderTablero();
