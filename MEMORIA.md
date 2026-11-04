# MEMORIA DEL PROYECTO: DULCE TENTACIÓN

**Estudiante:** Amalia Patty Churqui  
**Cliente:** Pastelería Dulce Tentación  
**Materia / Módulo:** Programación Web - Frontend  
**Fecha de actualización:** 29 de octubre de 2026  

---

## 1. Introducción y Justificación

### 1.1. Contexto del Cliente
**Dulce Tentación** es una pastelería artesanal de barrio reconocida por la frescura y dedicación en sus productos (pasteles del día, selva negra, tortas frutales, tres leches y queques tradicionales).

### 1.2. El Problema a Resolver
El negocio requería una vitrina virtual donde sus clientes pudieran consultar el catálogo de productos disponibles, sus precios actualizados, horarios de atención y opciones de pedido con validación de fecha, además de herramientas internas para consultar el catálogo de proveedores y planificar la producción diaria.

### 1.3. Solución Implementada
Se diseñó e implementó un sitio web interactivo, accesible y adaptable a dispositivos móviles (responsive), estructurado con **HTML5 semántico**, estilizado con **CSS3 moderno (Variables CSS, Flexbox, CSS Grid y Modo Oscuro)**, e impulsado por **JavaScript moderno (ES6+)**, **jQuery 3.7.1** y APIs del navegador (`fetch`, `localStorage`, `Geolocation`, `Drag & Drop` y `Canvas 2D`).

---

## 2. Arquitectura de Archivos y Componentes

```
pasteleria-main/
├── index.html              # Estructura principal, accesibilidad y maquetación semántica
├── estilos.css             # Hoja de estilos con variables CSS, Grid, Flexbox y tema oscuro
├── jquery-3.7.1.min.js     # Librería jQuery local para soporte sin conexión
├── app.js                  # Inicialización general, aviso de stock y constantes del negocio
├── funciones.js            # Funciones auxiliares de cálculo, closures y lógica comercial
├── datos.js                # Objetos, clases y catálogo principal de pasteles
├── render.js               # Generación dinámica de tarjetas del catálogo en el DOM
├── eventos.js              # Búsqueda en tiempo real, filtros por categoría y validación del formulario
├── jquery-comparado.js     # Comparación práctica entre DOM nativo (Vanilla) y jQuery
├── jquery-panel.js         # Panel interactivo: menú móvil, acordeón FAQ y avisos escalonados
├── datos.json              # Datos JSON del catálogo y proveedores de la pastelería
├── remoto.js               # Peticiones asíncronas con fetch (async/await) y $.getJSON
├── preferencias.js         # Persistencia con localStorage (tema/orden) y geolocalización (Haversine)
├── tablero.js              # Tablero Drag & Drop de producción diaria y gráfico en Canvas 2D
├── README.md               # Resumen ejecutivo del repositorio
└── MEMORIA.md              # Documentación técnica integral del proyecto
```

---

## 3. Estructura y Funcionalidades por Sección

1. **Identidad y Navegación (`<header>`)**: Logo de Dulce Tentación, título, eslogan, aviso dinámico de stock (`app.js`) y barra de navegación principal.
2. **Catálogo de Pasteles (`#productos`)**: Generado dinámicamente por `render.js` a partir de `datos.js`, con buscador en tiempo real y botones de filtro por categoría (`todos`, `pastel`, `chocolate`, `frutal`, `dulce`) gestionados en `eventos.js`.
3. **Horarios y Precios (`#horarios`)**: Tabla accesible con `<caption>`, encabezados `<th scope="col">` y `<figure>` ilustrativa de la vitrina.
4. **Formulario de Pedido (`#pedido`)**: Campos con validación nativa HTML5 (`required`, `type="email"`, `pattern="[0-9]{7,8}"`) y validación personalizada en JS para impedir fechas anteriores al día actual (`setCustomValidity`).
5. **Tablero y Gráfico de Producción (`#tablero-zona` - Día 14)**: Tablero Kanban interactivo con 3 columnas (*Hornear hoy*, *Reponer*, *En pausa*) que usa eventos nativos de **Drag & Drop** (`dragstart`, `dragover`, `drop`) y actualiza en tiempo real un gráfico de barras dibujado en `<canvas id="grafico">` (`tablero.js`).
6. **Preferencias y Geolocalización (`#preferencias` y `#ubicacion` - Día 13)**:
   - Almacenamiento en `localStorage` (`pasteleria:preferencias`) del modo claro/oscuro y del orden de los productos (`nombre`, `precio`, `stock`), protegido con bloques `try/catch`.
   - Cálculo de distancia desde la ubicación del usuario hasta la pastelería usando `navigator.geolocation.getCurrentPosition` y la fórmula de Haversine.
7. **Catálogo del Proveedor (`#remoto` - Día 12)**: Carga asíncrona de `datos.json` mediante `fetch` con `async/await`, alternativa con `$.getJSON` de jQuery y botón de prueba de fallo (`no-existe.json`) mostrando estados visuales (`cargando`, `ok`, `error`).
8. **Panel del Proyecto (`#panel` - Día 11)**: Menú móvil desplegable, acordeón de preguntas frecuentes y lista de avisos con aparición escalonada (`delay` + `fadeIn`).
9. **Comparación Vanilla vs. jQuery (`#comparacion` - Día 10)**: Demostración lado a lado de selección, modificación de texto, eventos y encadenamiento (*chaining*).
