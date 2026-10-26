/* ═════════════════════════════════════════════════════════════════════════
   DÍA 11 - Panel del proyecto con jQuery
   ═════════════════════════════════════════════════════════════════════════ */

$(function () {
  // ── 1. .on() ES LA FORMA ÚNICA (Menú móvil) ───────────────────────────
  $("#menu-toggle").on("click", function () {
    const $menu = $("#menu-movil");

    $menu.stop(true, true).slideToggle(200, function () {
      if ($(this).is(":visible")) {
        $(this).removeAttr("hidden");
      } else {
        $(this).attr("hidden", "");
      }
    });

    const abierto = $(this).attr("aria-expanded") === "true";
    $(this).attr("aria-expanded", String(!abierto));
  });

  // ── 2. DELEGACIÓN, EN UNA LÍNEA (Acordeón de Preguntas Frecuentes) ──────
  $("#acordeon").on("click", ".titulo", function () {
    const $titulo = $(this);
    const $cuerpo = $titulo.next(".cuerpo");

    $cuerpo.stop(true, true).slideToggle(200, function () {
      if ($(this).is(":visible")) {
        $(this).removeAttr("hidden");
      } else {
        $(this).attr("hidden", "");
      }
    });

    const abierto = $titulo.attr("aria-expanded") === "true";
    $titulo.attr("aria-expanded", String(!abierto));

    // Acordeón exclusivo: cierra las otras respuestas abiertas
    $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200, function () {
      $(this).attr("hidden", "");
    });
    $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
  });

  // ── 3. LOS EFECTOS (Interacción y desvanecimiento) ─────────────────────
  // Al hacer clic en un aviso específico, se desvanece suavemente
  $("#avisos").on("click", "li", function () {
    $(this).fadeOut(300, function () {
      $(this).attr("hidden", "");
    });
  });

  // Efecto sutil de opacidad al pasar el cursor sobre los avisos
  $("#avisos").on("mouseenter", "li", function () {
    $(this).stop(true, true).fadeTo(150, 0.85);
  }).on("mouseleave", "li", function () {
    $(this).stop(true, true).fadeTo(150, 1);
  });

  // ── 4. .each() Y EL ESCALONADO (Mostrar / Ocultar avisos en cascada) ───
  function mostrarAvisos() {
    $("#avisos li").each(function (indice) {
      $(this)
        .stop(true, true)
        .delay(indice * 140)
        .fadeIn(250, function () {
          $(this).removeAttr("hidden");
        });
    });
    $("#mostrar-avisos")
      .text("Ocultar avisos")
      .off("click")
      .on("click", ocultarAvisos);
  }

  function ocultarAvisos() {
    $("#avisos li").stop(true, true).fadeOut(200, function () {
      $(this).attr("hidden", "");
    });
    $("#mostrar-avisos")
      .text("Mostrar avisos")
      .off("click")
      .on("click", mostrarAvisos);
  }

  $("#mostrar-avisos").on("click", mostrarAvisos);

  // ── 5. .animate(), PARA LO QUE NO CUBRE UN EFECTO (Scroll suave) ───────
  // Desplazamiento animado suave al hacer clic en los enlaces del menú
  $('a[href^="#"]').on("click", function (evento) {
    const destinoId = $(this).attr("href");
    const $destino = $(destinoId);

    if ($destino.length) {
      evento.preventDefault();

      // Si el menú móvil está desplegado, cerrarlo suavemente
      if ($("#menu-movil").is(":visible")) {
        $("#menu-movil").slideUp(200, function () {
          $(this).attr("hidden", "");
        });
        $("#menu-toggle").attr("aria-expanded", "false");
      }

      $("html, body").stop().animate({
        scrollTop: $destino.offset().top - 15
      }, 500);
    }
  });

  // ── 6. UNA FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN (Chaining) ─────────
  function resaltar($seleccion, milisegundos = 1200) {
    $seleccion.addClass("resaltado");
    setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
    return $seleccion;
  }

  resaltar($("#panel h2")).css("letter-spacing", "0.5px");
});


