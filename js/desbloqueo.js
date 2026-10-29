const botonesFecha = document.querySelectorAll("[data-fecha]");

function formatear(fecha) {
    return fecha.toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

function revisar() {
    const ahora = new Date();
    botonesFecha.forEach(boton => {
        const fecha = new Date(boton.dataset.fecha);
        const clave = "abierto-" + boton.dataset.fecha + "-" + boton.textContent.trim();
        let abierto = false;
        try { abierto = localStorage.getItem(clave) === "si"; } catch (e) {}
        if (!abierto && ahora >= fecha) {
            abierto = true;
            try { localStorage.setItem(clave, "si"); } catch (e) {}
        }
        boton.classList.toggle("bloqueado", !abierto);
        boton.parentElement.querySelector(".fecha-texto").textContent =
            abierto ? "Disponible" : "Se habilita el " + formatear(fecha);
    });
}

botonesFecha.forEach(boton => {
    boton.addEventListener("click", () => {
        const aviso = boton.parentElement.querySelector(".aviso");
        if (boton.classList.contains("bloqueado")) {
            aviso.textContent = "Aún no se habilita. Se abre el " +
                formatear(new Date(boton.dataset.fecha)) + " a primera hora.";
        } else if (boton.dataset.link) {
            window.open(boton.dataset.link, "_blank");
        } else {
            aviso.textContent = "¡Ya está desbloqueada!";
        }
    });
});

revisar();
setInterval(revisar, 1000);