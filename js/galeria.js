const galeria = document.querySelector(".galeria");
const visor = document.getElementById("visor");
const visorImg = document.getElementById("visor-img");
const btnAnterior = document.getElementById("visor-anterior");
const btnSiguiente = document.getElementById("visor-siguiente");
const btnCerrar = document.getElementById("visor-cerrar");
const contador = document.getElementById("visor-contador");

const total = 28;
const carpeta = "img/rec/re";
const extension = ".png";
let actual = 1;
let inicioX = 0;
let inicioY = 0;

function ruta(n) {
  return carpeta + n + extension;
}

for (let i = 1; i <= total; i++) {
  const img = document.createElement("img");
  img.src = ruta(i);
  img.alt = "Recuerdo " + i;
  img.loading = "lazy";
  img.decoding = "async";
  img.dataset.num = i;
  galeria.appendChild(img);
}

function precargar(n) {
  if (n < 1 || n > total) return;
  const img = new Image();
  img.src = ruta(n);
}

function mostrarFoto(n) {
  actual = n;
  visorImg.src = ruta(n);
  visorImg.alt = "Recuerdo " + n;
  contador.textContent = n + " / " + total;
  btnAnterior.style.visibility = n === 1 ? "hidden" : "visible";
  btnSiguiente.style.visibility = n === total ? "hidden" : "visible";
  precargar(n + 1);
  precargar(n - 1);
}

function siguiente() {
  if (actual < total) mostrarFoto(actual + 1);
}

function anterior() {
  if (actual > 1) mostrarFoto(actual - 1);
}

galeria.addEventListener("click", e => {
  const img = e.target.closest("img");
  if (!img) return;
  mostrarFoto(Number(img.dataset.num));
  visor.showModal();
});

btnSiguiente.addEventListener("click", siguiente);
btnAnterior.addEventListener("click", anterior);
btnCerrar.addEventListener("click", () => visor.close());

visor.addEventListener("click", e => {
  if (e.target === visor) visor.close();
});

document.addEventListener("keydown", e => {
  if (!visor.open) return;
  if (e.key === "ArrowRight") siguiente();
  if (e.key === "ArrowLeft") anterior();
});

visor.addEventListener("touchstart", e => {
  inicioX = e.changedTouches[0].clientX;
  inicioY = e.changedTouches[0].clientY;
}, { passive: true });

visor.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - inicioX;
  const dy = e.changedTouches[0].clientY - inicioY;
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
  if (dx < 0) siguiente();
  else anterior();
}, { passive: true });