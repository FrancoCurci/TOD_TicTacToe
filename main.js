let tablero = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}]
]
const containerMainGame = document.querySelector(".container-game");
const buttonCircle = document.getElementById("buttonCircle")
const buttonX = document.getElementById("buttonX")
const cruz = '<iconify-icon icon="ph:x-bold" width="50" height="50"></iconify-icon>';
const circle = '<iconify-icon icon="material-symbols:circle-outline" width="50" height="50"></iconify-icon>';
const jugador = (name, [item, itemName]) => {
    return {
        playerName: name,
        playerItem: [item, itemName],

        seleccionarJugadorCasilla: (id) => {


            let casillaContainer = document.getElementById(id);
            casillaContainer.innerHTML = item;
            casillaContainer.setAttribute("check", itemName);
        },
        getPlaterName: () => {
            return name;
        },
        getItemPlayerName: () => {
            return itemName
        },
        getPlaterItem: () => {
            return item;
        },
        setPlayerItem: (newItem) => {
            item = newItem;
        }
    };

}
const objTablero = (id, item) => {
    return {
        id: id,
        item: item
    }
}
const jugadorP = jugador("Franco", [circle, "O"]);
const jugadorC = jugador("Computadora", [cruz, "X"]);

buttonCircle.addEventListener("click", (e) => { changeItemPlayer(e.target.id) })
buttonX.addEventListener("click", (e) => { changeItemPlayer(e.target.id) })
// Función para abrir el modal


// Evento para cerrar el modal
document.getElementById('cerrarModal').addEventListener('click', function () {
    const modal = document.getElementById('miModal');
    modal.style.display = 'none';
});

main();



function main() {
    printGame();
}


function printGame() {
    containerMainGame.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        let item = document.createElement("button");
        item.classList.add("casilleros")
        item.setAttribute("id", i);
        item.addEventListener("click", (e) => seleccionarCasilla(e))
        containerMainGame.appendChild(item);
    }
    llenarTablero(containerMainGame.childNodes)
}
function changeItemPlayer(e) {
    if (e === "buttonX") {
        jugadorP.setPlayerItem(cruz)
        jugadorC.setPlayerItem(circle)
    } else {
        jugadorP.setPlayerItem(circle)
        jugadorC.setPlayerItem(cruz)

    }
    printGame()

}
function seleccionarCasilla(e) {
    if (jugadorP.getPlaterItem() === null) {
        alert("Por favor elija un item para jugar")
        return
    }
    jugadorP.seleccionarJugadorCasilla(e.target.id)
    actualizarTablero(e.target.id, jugadorP.getItemPlayerName());
    makeAMovePlayerC()


}
function makeAMovePlayerC() {
    const casillaId = getNumeroCasillaVacia();
    jugadorC.seleccionarJugadorCasilla(casillaId)
    actualizarTablero(casillaId, jugadorC.getItemPlayerName());

}
function verificarGanador(tablero, jugador) {
    // Verificación de línea en horizontal
    for (let fila = 0; fila < 3; fila++) {
        if (tablero[fila][0].item === jugador && tablero[fila][1].item === jugador && tablero[fila][2].item === jugador) {
            return true; // Hay línea en horizontal
        }
    }

    // Verificación de línea en vertical
    for (let columna = 0; columna < 3; columna++) {
        if (tablero[0][columna].item === jugador && tablero[1][columna].item === jugador && tablero[2][columna].item === jugador) {
            return true; // Hay línea en vertical
        }
    }

    // Verificación de línea en diagonal (diagonal principal)
    if (tablero[0][0].item === jugador && tablero[1][1].item === jugador && tablero[2][2].item === jugador) {
        return true; // Hay línea en diagonal principal
    }

    // Verificación de línea en diagonal (diagonal secundaria)
    if (tablero[0][2].item === jugador && tablero[1][1].item === jugador && tablero[2][0].item === jugador) {
        return true; // Hay línea en diagonal secundaria
    }

    return false; // No hay línea ganadora
}
const getNumeroCasillaVacia = () => {
    if (!casillasDisponibles()) {
        return
    }
    let casilla = null
    do {
        let aleatorio = Math.floor(Math.random() * 9);
        casilla = document.getElementById(aleatorio)
    } while (casilla.hasAttribute("check"))

    return casilla.getAttribute("id")
}
const casillasDisponibles = () => {
    let casillas = document.querySelectorAll(".casilleros");
    for (let i = 0; i < casillas.length; i++) {
        if (!casillas[i].hasAttribute('check')) {
            return true
        }
    }
    return false
}
const seleccionarCasillaTalbe = (id) => {

}
function llenarTablero(id) {
    let contador = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            tablero[i][j] = objTablero(id[contador].attributes.id.value, id[contador].attributes.check);
            contador++;
        }
    }
}
function actualizarTablero(idElegido, item) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (tablero[i][j].id == idElegido) {
                tablero[i][j].item = item
            }

        }
    }
    if (verificarGanador(tablero, item)) {
        abrirModal();
        printGame();
        return true
    }

    return false

}
function abrirModal() {
    const modal = document.getElementById('miModal');
    modal.style.display = 'block';
}
