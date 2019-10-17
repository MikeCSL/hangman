
var palabras = [['ramiro'], ['videojuego'], ['playstation'], ['mesa'], ['bootstrap'], ['fortnite'], ['html'], ['mysql'], ['apache'], ['mariadb'], ['laravel'], ['mouse'], ['teclado'], ['raton']];
var palabra = '';
var letra_oculta = [];
var espacio_letra = document.getElementById("palabra");
var contador = 6;
var contador_fallos = 1;

function generaPalabra() {
    var total_palabras = palabras.length - 1;
    rand = (Math.random() * total_palabras).toFixed(0);
    palabra = palabras[rand][0].toUpperCase();

}


function generaEspacio(num) {
    espacio_letra = document.getElementById("palabra");
    for (var i = 0; i < num; i++) {
      letra_oculta[i] = "_";
    }
    espacio_letra.innerHTML = letra_oculta.join("");

}


function generaBotones (a,z) {
    var i = a.charCodeAt(0), j = z.charCodeAt(0);
    var letra = '';

    for( i ; i<=j; i++) {
        letra = String.fromCharCode(i).toUpperCase();
        document.getElementById("botones").innerHTML += "<button value='" + letra + "', onclick='intento_letra(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    }

}


function intento_letra(letra) {
    document.getElementById(letra).disabled = true;
    document.getElementById(letra).classList.remove("letra");
    
    if(palabra.indexOf(letra) != -1) {
        for(var i=0; i<letra.length; i++) {
            if(palabra[i]==letra) letra_oculta[i] = letra;
        }
        espacio_letra.innerHTML = letra_oculta.join("");
        document.getElementById(letra).classList.add("letra-correcta");
    }
    else {
        contador--;
        contador_fallos++;
        document.getElementById(letra).classList.add("letra-incorrecta");
        document.getElementById('intento').innerHTML = contador;
        document.getElementById("image").src = './img/hangman_'+contador_fallos+'.png';
    }

    compruebaPalabra();

}


function compruebaPalabra() {
    if (contador == 0) {
        document.getElementById('botones').innerHTML = "<button onclick='location.reload()' >Volver a empezar</button>";
    }
    else if (letra_oculta.indexOf("_") == -1 ) {
        document.getElementById("image").src = './img/hangman_win.png';
        document.getElementById('botones').innerHTML = "<button onclick='location.reload()' >Volver a empezar</button>";
    }

}


function iniciaJuego() {
    generaPalabra();
    generaEspacio(palabra.length);
    generaBotones ('a', 'z');

}

window.onload = iniciaJuego();