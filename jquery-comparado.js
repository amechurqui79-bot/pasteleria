// ── 1. COMPROBAR QUE CARGÓ ──────────────────────────────────────────────
console.log("jQuery versión:", $.fn.jquery);

// ── 2. ESPERAR AL DOM ───────────────────────────────────────────────────
$(function () {

  // ── 3. SELECCIONAR ──────────────────────────────────────────────────────
  const vanillaP = document.querySelector("#salida-vanilla");
  const jqueryP = $("#salida-jquery");

  console.log("vanilla es un elemento:", vanillaP instanceof HTMLElement);
  console.log("jQuery es una colección de", jqueryP.length);

  console.log("mismo elemento:", $(vanillaP)[0] === vanillaP);

  // ── 4. LEER Y ESCRIBIR CONTENIDO ────────────────────────────────────────
  vanillaP.textContent =
    "Especialidad del día (Vanilla JS): Selva Negra artesanal con bizcocho húmedo de chocolate, crema chantilly y cerezas.";
  jqueryP.text(
    "Promoción dulce (jQuery): Torta Tres Leches y Torta Frutal con entrega gratuita en pedidos desde 2 unidades."
  );

  // ── 5. CLASES ───────────────────────────────────────────────────────────

  // ── 6. EVENTOS ──────────────────────────────────────────────────────────
  document.querySelector("#boton-vanilla").addEventListener("click", () => {
    vanillaP.classList.toggle("resaltado");
  });

  $("#boton-jquery").on("click", function () {
    $(this).closest("section").find("#salida-jquery").toggleClass("resaltado");
  });

  // Permitir también hacer clic sobre los propios textos para resaltarlos
  vanillaP.addEventListener("click", () => {
    vanillaP.classList.toggle("resaltado");
  });

  jqueryP.on("click", function () {
    $(this).toggleClass("resaltado");
  });

  // ── 7. CHAINING ─────────────────────────────────────────────────────────
  $("#salida-jquery")
    .addClass("destacado")
    .attr("data-origen", "jquery")
    .css("cursor", "pointer");

  vanillaP.classList.add("destacado");
  vanillaP.setAttribute("data-origen", "vanilla");
  vanillaP.style.cursor = "pointer";

  // ── 8. LA COMPARACIÓN QUE IMPORTA ───────────────────────────────────────
  console.log("Pasteles que ve jQuery:", $(".tarjeta").length);
  console.log("Pasteles que ve vanilla:", document.querySelectorAll(".tarjeta").length);
});
