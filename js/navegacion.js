const menu = document.querySelector("main");
const secciones = document.querySelectorAll(".seccion");
const botones = document.querySelectorAll("[data-ir]");

botones.forEach(boton => {
    boton.addEventListener("click", () => {
        const destino = boton.dataset.ir;
        menu.hidden = true;
        secciones.forEach(s => s.hidden = true);
        if (destino === "menu") {
            menu.hidden = false;
        } else {
            document.getElementById("sec-" + destino).hidden = false;
        }
        window.scrollTo(0, 0);
    });
});

const opciones = document.querySelectorAll("[data-ver]");
const mensajes = document.querySelectorAll(".msg-triste");

opciones.forEach(op => {
    op.addEventListener("click", () => {
        mensajes.forEach(m => m.hidden = true);
        document.getElementById(op.dataset.ver).hidden = false;
    });
});