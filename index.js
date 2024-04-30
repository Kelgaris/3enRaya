$(document).ready(function(){
    let nombre_jugador1, nombre_jugador2;

    $("#boton_jugador1").click(function(){
        nombre_jugador1 = $("#jugador1").val();
        console.log("Nombre del jugador 1:", nombre_jugador1);
        $("#jugador1").hide(); 
        $(this).hide();
        $(".jugadores").append('<div class="jugador_nombre1"><p>Jugador 1: '+ nombre_jugador1 +'</p><p>Símbolo: X</p></div>');

        // Ahora que tenemos el nombre del jugador 1, podemos asignarlo al objeto jugador1
        jugador1.nombre = nombre_jugador1;
    });

    $("#boton_jugador2").click(function(){
        nombre_jugador2 = $("#jugador2").val();
        console.log("Nombre del jugador 2:", nombre_jugador2);
        $("#jugador2").hide(); 
        $(this).hide();
        $(".jugadores").append('<div class="jugador_nombre2"><p>Jugador 2: '+ nombre_jugador2 +'</p><p>Símbolo: O</p></div>');

        // Ahora que tenemos el nombre del jugador 2, podemos asignarlo al objeto jugador2
        jugador2.nombre = nombre_jugador2;
    });

    const jugador1 = {
        nombre: nombre_jugador1,
        simbolo: 'X'
    };

    const jugador2 = {
        nombre: nombre_jugador2,
        simbolo: 'O'
    };

    let tablero = ['','','','','','','','',''];
    let jugadorActual = jugador1;
    let juegoAcabado = false;

    //Conseguimos todas las celdas del tablero
    let celdas = document.querySelectorAll('.celda');

    function actualizarTablero(){
        celdas.forEach((celda, i)=>{
            celda.textContent = tablero[i];
        })
    }
    function comprobarGanador(){
    
        //Comprobamos las firal con el jugador actual, las filas van de la posicion 0-2, 3-5, 6-8
        if((tablero[0] === jugadorActual && tablero[1] === jugadorActual && tablero[2] === jugadorActual) || 
            (tablero[3] === jugadorActual && tablero[4] === jugadorActual && tablero[5] === jugadorActual) ||
            (tablero[6] === jugadorActual && tablero[7] === jugadorActual && tablero[8] === jugadorActual))
            {
            return true;
        }
    
        //Ahora lo haremos igual pero con las columnas el codigo anterior ya nos da una pista
        if((tablero[0] === jugadorActual && tablero[3] === jugadorActual && tablero[6] === jugadorActual) ||
            (tablero[1] === jugadorActual && tablero[4] === jugadorActual && tablero[7] === jugadorActual) ||
            (tablero[2] === jugadorActual && tablero[5] === jugadorActual && tablero[8] === jugadorActual))
            {
            return true;
        }
    
        //Diagonales
        if ((tablero[0] === jugadorActual && tablero[4] === jugadorActual && tablero[8] === jugadorActual) ||
            (tablero[2] === jugadorActual && tablero[4] === jugadorActual && tablero[6] === jugadorActual)) {
            return true;
        }
    
        return false;
    }
    

    function cambiarJugador(){
        jugadorActual = (jugadorActual === jugador1.simbolo) ? jugador2.simbolo : jugador1.simbolo;
    }

    celdas.forEach((celda, i) => {
        celda.addEventListener('click', () => {
            if (juegoAcabado || tablero[i] !== '') {
                return;
            }

            tablero[i] = jugadorActual;
            actualizarTablero();

            if (comprobarGanador()) {
                setTimeout(function() {
                    alert(`El jugador ${jugadorActual.nombre} ha ganado.`);
                }, 1.5);
                juegoAcabado = true;
                return;
            }

            if (tablero.every(celda => celda != '')) {
                setTimeout(function() {
                    alert("El juego ha acabado en tablas, jugad otra vez");
                }, 1.5);
                juegoAcabado = true;
                return;
            }
            
            cambiarJugador();
        });
    });

    function limpiarTablero(){
        tablero = ['','','','','','','','',''];
        jugadorActual = jugador1.simbolo;
        juegoAcabado = false;
        actualizarTablero();
    }

    const boton = document.getElementById('limpiar');
    boton.addEventListener('click', limpiarTablero);
});
