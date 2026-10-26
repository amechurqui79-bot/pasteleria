# MEMORIA DEL PROYECTO: DULCE TENTACIÓN

**Estudiante:** Amalia Patty Churqui  
**Cliente:** Pastelería Dulce Tentación  
**Materia / Módulo:** Programación Web - Frontend  
**Fecha de actualización:** 26 de octubre de 2026  

---

## 1. Introducción y Justificación

### 1.1. Contexto del Cliente
**Dulce Tentación** es una pastelería artesanal de barrio reconocida por la frescura y dedicación en sus productos (pasteles del día, selva negra, tortas frutales, tres leches y queques tradicionales). 

### 1.2. El Problema a Resolver
El negocio enfrentaba la limitación de no contar con una vitrina virtual donde sus clientes pudieran consultar de forma inmediata el catálogo completo de productos disponibles, sus precios actualizados, horarios de atención, formas de pago y opciones de delivery. Además, la recepción de pedidos requería un canal ordenado con validación de fechas para evitar confusiones de entrega.

### 1.3. Solución Implementada
Se diseñó e implementó un sitio web interactivo, accesible y adaptable a dispositivos móviles (responsive), estructurado con **HTML5 semántico**, estilizado con **CSS3 moderno (Flexbox y CSS Grid)**, con catálogo generado mediante **JavaScript moderno (ES6+)** y un panel interactivo con **jQuery**.

---

## 2. Arquitectura de Archivos y Componentes

El proyecto sigue una separación clara de responsabilidades entre maquetación, estilos y capas lógicas:

```
amalia_patty_pasteleria/
├── index.html              # Estructura principal, accesibilidad y maquetación semántica
├── estilos.css             # Hoja de estilos con variables CSS, Grid, Flexbox y animaciones
├── app.js                  # Inicialización general, aviso de stock y constantes de negocio
├── datos.js                # Objetos y catálogo de productos (precios, categorías, disponibilidad)
├── funciones.js            # Funciones auxiliares de cálculo, closures y lógica comercial
├── render.js               # Generación dinámica de tarjetas del catálogo en el DOM
├── eventos.js              # Búsqueda en tiempo real, filtros por categoría y validación del formulario
├── jquery-panel.js         # Panel interactivo: menú móvil, acordeón FAQ, avisos y scroll suave
├── jquery-comparado.js     # Pruebas comparativas entre DOM nativo (Vanilla) y jQuery
├── README.md               # Resumen ejecutivo del repositorio
├── MEMORIA.md              # Documentación técnica integral del proyecto
└── assets/                 # Logo e imágenes de productos (selva-negra, torta-frutal, tres-leches, etc.)
```

---

## 3. Estructura y Semántica (HTML5)

- **`<header>`**: Contiene la identidad de marca (`.logo`, nombre de la pastelería, eslogan y aviso dinámico de stock diario) junto al menú de navegación principal (`<nav>`).
- **`<main>`**: Agrupa las secciones de contenido:
  - **`#productos`**: Catálogo comercial dinámico, con caja de búsqueda (`<input type="search">`) y botones de filtro por categoría (`data-categoria`).
  - **`#horarios`**: Tabla informativa accesible (`<table>`, `<caption>`, `<thead>`, `<tbody>`, `scope="col"`) con disponibilidad y precios.
  - **`#pedido`**: Formulario estructurado con `<fieldset>` y `<legend>`, campos validados (`required`, `type="date"`, `pattern` para teléfono nacional de 7 a 8 dígitos) y control de términos.
  - **`#panel`**: Sección interactiva de atención al cliente gestionada con jQuery (menú móvil, acordeón de preguntas frecuentes y avisos del día).
- **`<aside>`**: Columna de información de valor (*"¿Sabías? Calidad y frescura en cada preparación"*).
- **`<footer>`**: Datos de contacto, dirección física y derechos reservados dentro de etiquetas `<address>` y `<small>`.

---

## 4. Diseño Visual y Estilos (CSS3)

1. **Variables y Diseño Centralizado (`:root`)**:
   - Paleta cromática coordinada con la identidad dulce y artesanal:
     - Color principal: `#C83E75` (fucsia frambuesa)
     - Color de acento: `#F06292` (rosa suave vibrante)
     - Texto base: `#8F405D`
     - Fondo: `#FFF0F5` (lavanda blush)
     - Superficie: `#FFFFFF`
     - Bordes: `#F2C5D5`
2. **Layout Responsivo**:
   - **CSS Grid:** Utilizado en `#lista-productos` mediante `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` para que las tarjetas se adapten fluidamente a cualquier ancho de pantalla (móviles, tablets y escritorio).
   - **Flexbox:** Empleado en controles de búsqueda, filtros, encabezados y en la distribución vertical interna de cada tarjeta pastel.
3. **Micro-interacciones y Estados**:
   - Efectos de elevación sutil en las tarjetas al pasar el cursor (`transform: translateY(-5px)` con sombras difusas).
   - Indicadores automáticos de estado en el acordeón (`+` y `−` mediante pseudo-elementos `::after` según el atributo `aria-expanded`).
   - Resalte amarillo (`.resaltado`) para avisos y títulos destacados.

---

## 5. Lógica Dinámica con JavaScript (Vanilla ES6+)

1. **Catálogo de Datos ([datos.js](datos.js))**:
   - Estructuración de datos mediante objetos literales y arreglos de productos con propiedades de control (`nombre`, `precio`, `categoria`, `stock`, `disponible`, `imagen`, `descripcion`).
   - Uso de métodos modernos de arreglo (`map`, `filter`, `reduce`, `find`, `some`, `every`).
2. **Renderizado Dinámico ([render.js](render.js))**:
   - Función `crearTarjeta(producto)`: genera los nodos HTML semánticos en memoria (`<article class="tarjeta pastel">`), inyectando imagen, nombre, descripción, precio formateado a dos decimales y estado de stock (o clase `.agotado`).
   - Función `render(lista)`: limpia e inserta las tarjetas generadas en `#lista-productos`.
3. **Filtrado y Búsqueda Reactiva ([eventos.js](eventos.js))**:
   - Evento `input` en el buscador que filtra por coincidencia de texto sin importar mayúsculas o minúsculas.
   - Delegación de eventos en `#filtros` para conmutar categorías (`todos`, `pastel`, `chocolate`, `frutal`, `dulce`).
   - Validación personalizada en el formulario de pedido: comprueba que la fecha de entrega seleccionada no sea anterior a la fecha actual local (`new Date().toLocaleDateString("en-CA")`).

---

## 6. Interactividad Avanzada con jQuery ([jquery-panel.js](jquery-panel.js))

En el **Día 11** se integró la librería jQuery (v3.7.1 vía CDN oficial) para el desarrollo del **Panel del Proyecto**, abarcando las 6 áreas fundamentales del módulo:

1. **Gestión de Eventos con `.on()`**:
   - Control del botón `#menu-toggle` para mostrar y ocultar el menú de navegación móvil con animación fluida `.slideToggle(200)`.
   - Mantenimiento sincronizado del atributo de accesibilidad `aria-expanded` entre `"true"` y `"false"`.
2. **Delegación de Eventos en el Acordeón FAQ**:
   - `$("#acordeon").on("click", ".titulo", ...)`: despliega la respuesta seleccionada y contrae automáticamente cualquier otra respuesta abierta (`.not($cuerpo).slideUp(200)`).
   - Respuestas actualizadas con las políticas reales del negocio (anticipación de 8 horas, delivery con motoboy y pagos por QR/transferencia/efectivo).
3. **Efectos de Interacción (`fadeOut` y `fadeTo`)**:
   - Cada aviso en `#avisos` permite el descarte individual con animación suave al hacer clic en él (`.fadeOut(300)`).
   - Efecto `fadeTo()` al posar y retirar el puntero sobre los avisos.
4. **Iteración y Efectos Escalonados (`.each()` + `.delay()`)**:
   - El botón `#mostrar-avisos` despliega los avisos con un retraso escalonado proporcional al índice (`delay(indice * 140).fadeIn(250)`).
   - Alternancia continua entre `mostrarAvisos` y `ocultarAvisos` mediante re-vinculación con `.off("click").on("click", ...)`.
5. **Animaciones Personalizadas con `.animate()`**:
   - Desplazamiento suave de pantalla (*Smooth Scroll*) al pulsar cualquier enlace de anclaje de la página (`a[href^="#"]`), recalculando la posición superior del destino y cerrando el menú móvil automáticamente si estaba abierto.
6. **Encadenamiento (Chaining) y Funciones Personalizadas**:
   - Función `resaltar($seleccion, milisegundos)`: aplica transitoriamente la clase `.resaltado` devolviendo la selección de jQuery para permitir encadenar llamadas como `.css("letter-spacing", "0.5px")`.

---

## 7. Retos Técnicos Superados

1. **Carga y resolución de jQuery**:
   - *Problema:* El panel no ejecutaba ninguna acción debido a la ausencia del script de jQuery en el HTML, originando el error `ReferenceError: $ is not defined`.
   - *Solución:* Se vinculó la versión oficial `jquery-3.7.1.min.js` antes de la ejecución de `jquery-panel.js`.
2. **Conflicto del atributo nativo `[hidden]`**:
   - *Problema:* El atributo nativo `hidden` en el HTML impedía que los métodos de animación de jQuery (`slideToggle` y `fadeIn`) desplegaran correctamente los contenedores.
   - *Solución:* Se sincronizó la remoción y adición del atributo `hidden` dentro de las funciones de retorno (*callbacks*) de las animaciones, garantizando fluidez visual y compatibilidad semántica.
3. **Ciclo continuo del botón de avisos**:
   - *Problema:* Al pulsar por tercera vez el botón de avisos, el evento quedaba inerte porque la función interna no volvía a registrar el disparador de apertura.
   - *Solución:* Se crearon funciones conmutativas nombradas (`mostrarAvisos` y `ocultarAvisos`) que reasignan de forma recíproca el evento `click`.
4. **Coherencia de marca en los contenidos**:
   - Se reemplazaron los textos de plantilla de panadería por la oferta auténtica de pasteles y tortas de Dulce Tentación.

---

## 8. Conclusiones

El proyecto **Dulce Tentación** demuestra la evolución integral de una aplicación web desde sus fundamentos estáticos hasta una experiencia de usuario interactiva y profesional. Se logró un equilibrio entre diseño visual atractivo, código limpio y modular, buenas prácticas de accesibilidad y una arquitectura frontend sólida que facilita futuras expansiones (como pasarela de pagos o almacenamiento persistente).
