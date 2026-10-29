const musica = document.getElementById("musica");
const btnMusica = document.getElementById("btn-musica");

if (musica && btnMusica) {
    musica.volume = 0.5;
    let decidido = false;
    let pausadaPorMedia = false;

    function actualizar() {
        btnMusica.classList.toggle("sonando", !musica.paused);
        btnMusica.textContent = musica.paused ? "🎵" : "🎶";
    }
    function sonar() { musica.play().then(actualizar).catch(() => {}); }

    document.addEventListener("click", () => {
        if (!decidido) { decidido = true; sonar(); }
    });

    btnMusica.addEventListener("click", e => {
        e.stopPropagation();
        decidido = true;
        if (musica.paused) sonar();
        else { musica.pause(); actualizar(); }
    });

    document.addEventListener("play", e => {
        if (e.target !== musica && (e.target.tagName === "VIDEO" || e.target.tagName === "AUDIO")) {
            if (!musica.paused) { musica.pause(); pausadaPorMedia = true; actualizar(); }
        }
    }, true);
    document.addEventListener("pause", e => {
        if (e.target !== musica && pausadaPorMedia) { pausadaPorMedia = false; sonar(); }
    }, true);
    document.addEventListener("ended", e => {
        if (e.target !== musica && pausadaPorMedia) { pausadaPorMedia = false; sonar(); }
    }, true);
}