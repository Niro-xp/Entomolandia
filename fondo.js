// Fondo rotativo con transición suave entre imágenes.
// Cambia los nombres de la lista por tus fotos (en la carpeta img/).
const fotos = [
  "img/forest.jpg",
  "img/forest2.jpg",
  "img/forest3.jpg",
  "img/forest4.jpg",
];
const segundos = 8; // tiempo entre cambios

// Crea las dos capas que se turnan (así no hace falta tocar el HTML)
const fondo = document.createElement("div");
fondo.id = "fondo";
fondo.innerHTML = '<div class="capa"></div><div class="capa"></div>';
document.body.prepend(fondo);

const capas = fondo.querySelectorAll(".capa");

// Precarga para que no parpadee al cambiar
fotos.forEach(f => { new Image().src = f; });

// Cada página empieza en una foto distinta
let actual = Math.floor(Math.random() * fotos.length);
let visible = 0;
capas[0].style.backgroundImage = `url("${fotos[actual]}")`;
capas[0].classList.add("activa");

// Si la persona pidió menos movimiento, se queda con una sola foto
const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducido && fotos.length > 1) {
  setInterval(() => {
    actual = (actual + 1) % fotos.length;
    const siguiente = 1 - visible;
    capas[siguiente].style.backgroundImage = `url("${fotos[actual]}")`;
    capas[siguiente].classList.add("activa");
    capas[visible].classList.remove("activa");
    visible = siguiente;
  }, segundos * 1000);
}
