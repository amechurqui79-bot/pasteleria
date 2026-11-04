(() => {
  const botones = document.querySelectorAll(".boton-tema");
  const clave = "dulce-tentacion-tema";
  const sistema = window.matchMedia("(prefers-color-scheme: dark)");

  function aplicarTema(oscuro) {
    document.documentElement.dataset.tema = oscuro ? "oscuro" : "claro";

    botones.forEach((boton) => {
      boton.textContent = oscuro ? "☀️" : "🌗";
      boton.setAttribute("aria-pressed", String(oscuro));
      boton.setAttribute(
        "aria-label",
        oscuro ? "Activar modo claro" : "Activar modo oscuro"
      );
    });
  }

  const guardado = localStorage.getItem(clave);
  aplicarTema(guardado ? guardado === "oscuro" : sistema.matches);

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const oscuro = document.documentElement.dataset.tema !== "oscuro";
      localStorage.setItem(clave, oscuro ? "oscuro" : "claro");
      aplicarTema(oscuro);
    });
  });

  sistema.addEventListener("change", (evento) => {
    if (!localStorage.getItem(clave)) aplicarTema(evento.matches);
  });
})();