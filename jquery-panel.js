$(function () {
  // ── 1. .on() ES LA FORMA ÚNICA ──────────────────────────────────────────
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
    $(this).attr("aria-expanded", !abierto);
  });

  // ── 2. DELEGACIÓN, EN UNA LÍNEA ─────────────────────────────────────────
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

    $titulo.attr("aria-expanded", $titulo.attr("aria-expanded") !== "true");

    $("#acordeon .cuerpo").not($cuerpo).stop(true, true).slideUp(200, function () {
      $(this).attr("hidden", "");
    });
    $("#acordeon .titulo").not($titulo).attr("aria-expanded", "false");
  });

  // ── 3. LOS EFECTOS ──────────────────────────────────────────────────────
  // Al hacer clic en un aviso de la pastelería, se oculta suavemente
  $("#avisos").on("click", "li", function () {
    $(this).fadeOut(250, function () {
      $(this).attr("hidden", "");
    });
  });

  // Efecto de enfoque suave al pasar el cursor por los avisos del horno
  $("#avisos")
    .on("mouseenter", "li", function () {
      $(this).stop(true, true).fadeTo(150, 0.85);
    })
    .on("mouseleave", "li", function () {
      $(this).stop(true, true).fadeTo(150, 1);
    });

  // ── 4. .each() Y EL ESCALONADO ──────────────────────────────────────────
  function mostrarAvisosPasteleria() {
    $("#avisos li").each(function (indice) {
      $(this)
        .stop(true, true)
        .delay(indice * 120)
        .fadeIn(250, function () {
          $(this).removeAttr("hidden");
        });
    });

    $("#mostrar-avisos")
      .text("Ocultar avisos del día")
      .off("click")
      .on("click", ocultarAvisosPasteleria);
  }

  function ocultarAvisosPasteleria() {
    $("#avisos li").stop(true, true).fadeOut(200, function () {
      $(this).attr("hidden", "");
    });

    $("#mostrar-avisos")
      .text("Ver avisos de horneado")
      .off("click")
      .on("click", mostrarAvisosPasteleria);
  }

  $("#mostrar-avisos").on("click", mostrarAvisosPasteleria);

  // ── 5. .animate(), PARA LO QUE NO CUBRE UN EFECTO ───────────────────────
  $('a[href^="#"]').on("click", function (evento) {
    const destinoId = $(this).attr("href");
    const $destino = $(destinoId);

    if ($destino.length) {
      evento.preventDefault();

      if ($("#menu-movil").is(":visible")) {
        $("#menu-movil").slideUp(200, function () {
          $(this).attr("hidden", "");
        });
        $("#menu-toggle").attr("aria-expanded", "false");
      }

      $("html, body").stop().animate(
        {
          scrollTop: $destino.offset().top - 16,
        },
        450
      );
    }
  });

  // ── 6. UNA FUNCIÓN PROPIA QUE DEVUELVE LA SELECCIÓN ─────────────────────
  function resaltar($seleccion, milisegundos = 1200) {
    $seleccion.addClass("resaltado");
    setTimeout(() => $seleccion.removeClass("resaltado"), milisegundos);
    return $seleccion;
  }

  resaltar($("#panel h2")).css("letter-spacing", "0.5px");
});
