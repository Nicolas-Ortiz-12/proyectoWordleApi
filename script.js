let intentos = 6;
let diccionario = [
    'AMIGO', 'BELLA', 'CARRO', 'DEDOS', 'ESCAL',
    'FELIZ', 'GATOS', 'HOGAR', 'IDEAL', 'JUGAR',
    'KIWIS', 'LIBRO', 'MANOS', 'NUBES', 'ORGAN',
    'PARIS', 'QUESO', 'REINO', 'SUEÑO', 'TIEMO',
    'UNICO', 'VIAJE', 'YERBA', 'ZORRO', 'AGUA',
    'BAJAR', 'CIELO', 'DURAR', 'EXTRA', 'FLACO',
    'GRITO', 'HORAS', 'IRANI', 'JUEGO', 'KOALA',
    'LUCES', 'MORIR', 'NOTAR', 'OSADO', 'PIZZA',
    'QUIZA', 'RADAR', 'SALIR', 'TOMAR', 'UNION',
    'VELAR', 'XENON', 'YERNO', 'ZAFAR'
];
let palabra;
window.addEventListener('load', init)
function init() {
    cargarpalabra();
    console.log('Esto se ejecuta solo cuando se carga la pagina web')

    const retryButton = document.getElementById("retry-button");
    retryButton.addEventListener("click", reintentar);
}
function cargarpalabra() {
    fetch("https://random-word.ryanrk.com/api/en/word/random?length=5")
        .then(Response => Response.json())
        .then(Response => {
            console.log(Response[0].toUpperCase());
            palabra = Response[0].toUpperCase();
        })
        .catch(err => {
            console.log("succedio un error");
            let posicion = Math.floor(Math.random() * diccionario.length);
            palabra = diccionario[posicion];
            console.log(palabra);
        })
}

function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}
function intentar() {
    const INTENTO = leerIntento();
    if (INTENTO.length !== 5) {
        alert("Deben ser palabras de 5 letras")
        document.getElementById("guess-input").value = ""
        return
    }
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!</h1>")
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    if (intentos == 0) {
        terminar("<h1>PERDISTE!</h1>")
    }
    document.getElementById("guess-input").value = ""
}

function reintentar() {
    intentos = 6;
    palabra = '';

    const grid = document.getElementById("grid");
    grid.innerHTML = '';

    const input = document.getElementById("guess-input");
    input.disabled = false;
    input.value = '';

    const button = document.getElementById("guess-button");
    button.disabled = false;

    const retryButton = document.getElementById("retry-button");
    retryButton.disabled = true;

    const contenedor = document.getElementById('guesses');
    contenedor.innerHTML = '';

    cargarpalabra();
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    input.disabled = true;
    button.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
    const retryButton = document.getElementById("retry-button");
    retryButton.disabled = false
}

const input = document.getElementById("guess-input");
const valor = input.value;
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);