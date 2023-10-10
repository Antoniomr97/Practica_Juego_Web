"use strict";

var _Bombmi$ataques, _Japlu$ataques, _Jinasu$ataques;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sectionSeleccionarAtaque = document.getElementById("Seleccionar-Ataque");
var sectionReiniciar = document.getElementById("Reiniciar");
var botonMascotaJugador = document.getElementById("boton-siervo");
var botonReiniciar = document.getElementById("boton-reiniciar");
var sectionSeleccionarSiervo = document.getElementById("Seleccionar-Siervo");
var spanMascotaJugador = document.getElementById("siervo-jugador");
var spanMascotaEnemigo = document.getElementById("siervo-enemigo");
var spanVidasJugador = document.getElementById("vidas-jugador");
var spanVidasEnemigo = document.getElementById("vidas-enemigo");
var sectionMensajes = document.getElementById("resultado");
var ataquesDelJugador = document.getElementById("ataques-del-jugador");
var ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
var contenedorTarjetas = document.getElementById("contenedorTarjetas");
var contenedorAtaques = document.getElementById("contenedorAtaques");
var sectionVerMapa = document.getElementById("ver-mapa");
var mapa = document.getElementById("mapa");
var jugadorId = null;
var enemigoId = null;
var mokepones = [];
var mokeponesEnemigos = [];
var ataqueJugador = [];
var ataqueEnemigo = [];
var opcionDeMokepones;
var inputHipodoge;
var inputCapipepo;
var inputRatigueya;
var mascotaJugador;
var mascotaJugadorObjeto;
var ataquesMokepon;
var ataquesMokeponEnemigo;
var botonFuego;
var botonAgua;
var botonPlanta;
var botones = [];
var indexAtaqueJugador;
var indexAtaqueEnemigo;
var victoriasJugador = 0;
var victoriasEnemigo = 0;
var vidasJugador = 3;
var vidasEnemigo = 3;
var lienzo = mapa.getContext("2d");
var intervalo;
var mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
var alturaQueBuscamos;
var anchoDelMapa = window.innerWidth - 20;
var anchoMaximoDelMapa = 500;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;
mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

var Mokepon =
/*#__PURE__*/
function () {
  function Mokepon(nombre, foto, vida, fotoMapa) {
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    _classCallCheck(this, Mokepon);

    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 60;
    this.alto = 60;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  _createClass(Mokepon, [{
    key: "pintarMokepon",
    value: function pintarMokepon() {
      lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
    }
  }]);

  return Mokepon;
}();

var Bombmi = new Mokepon("Bombmi", "./assets/Ratigueya.png", 5, "./assets/ratigueyacara.png");
var Japlu = new Mokepon("Japlu", "./assets/Hipodoge.png", 5, "./assets/hipodogecara.png");
var Jinasu = new Mokepon("Jinasu", "./assets/Capipepo.png", 5, "./assets/capipepocara.png");
var JAPLU_ATAQUES = [{
  nombre: "💧",
  id: "boton-agua"
}, {
  nombre: "💧",
  id: "boton-agua"
}, {
  nombre: "💧",
  id: "boton-agua"
}, {
  nombre: "🔥",
  id: "boton-fuego"
}, {
  nombre: "☘️",
  id: "boton-planta"
}];
var BOMBMI_ATAQUES = [{
  nombre: "🔥",
  id: "boton-fuego"
}, {
  nombre: "🔥",
  id: "boton-fuego"
}, {
  nombre: "🔥",
  id: "boton-fuego"
}, {
  nombre: "💧",
  id: "boton-agua"
}, {
  nombre: "☘️",
  id: "boton-planta"
}];
var JINASU_ATAQUES = [{
  nombre: "☘️",
  id: "boton-planta"
}, {
  nombre: "☘️",
  id: "boton-planta"
}, {
  nombre: "☘️",
  id: "boton-planta"
}, {
  nombre: "💧",
  id: "boton-agua"
}, {
  nombre: "🔥",
  id: "boton-fuego"
}];

(_Bombmi$ataques = Bombmi.ataques).push.apply(_Bombmi$ataques, BOMBMI_ATAQUES);

(_Japlu$ataques = Japlu.ataques).push.apply(_Japlu$ataques, JAPLU_ATAQUES);

(_Jinasu$ataques = Jinasu.ataques).push.apply(_Jinasu$ataques, JINASU_ATAQUES);

mokepones.push(Bombmi, Japlu, Jinasu);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionVerMapa.style.display = "none";
  mokepones.forEach(function (Mokepon) {
    opcionDeMokepones = "\n        <input type=\"radio\" name=\"siervo\" id = ".concat(Mokepon.nombre, " />\n        <label class=\"tarjeta-de-mokepon\" for=").concat(Mokepon.nombre, ">\n                <p>").concat(Mokepon.nombre, "</p>\n                <img src=").concat(Mokepon.foto, " alt=").concat(Mokepon.nombre, ">\n        </label>\n        ");
    contenedorTarjetas.innerHTML += opcionDeMokepones;
    inputHipodoge = document.getElementById("Bombmi");
    inputCapipepo = document.getElementById("Japlu");
    inputRatigueya = document.getElementById("Jinasu");
  });
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  botonReiniciar.addEventListener("click", reiniciarJuego);
  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://192.168.1.129:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    spanMascotaJugador.innerHTML = inputCapipepo.id;
    mascotaJugador = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Elige un siervo, no seas timido");
    return;
  }

  sectionSeleccionarSiervo.style.display = "none";
  seleccionarMokepon(mascotaJugador);
  extraerAtaques(mascotaJugador);
  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
  fetch("http://192.168.1.129:8080/mokepon/".concat(jugadorId), {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mokepon: mascotaJugador
    })
  });
}

function extraerAtaques(mascotaJugador) {
  var ataques;

  for (var i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }

  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach(function (ataque) {
    ataquesMokepon = "\n        <button id=".concat(ataque.id, " class=\"boton-de-ataque BAtaque\">").concat(ataque.nombre, " </button>\n        ");
    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonPlanta = document.getElementById("boton-planta");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach(function (boton) {
    boton.addEventListener("click", function (e) {
      if (e.target.textContent === "🔥 ") {
        ataqueJugador.push("🔥");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💧 ") {
        ataqueJugador.push("💧");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("☘️");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      }

      if (ataqueJugador.length === 5) {
        enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch("http://192.168.1.129:8080/mokepon/".concat(jugadorId, "/ataques"), {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ataques: ataqueJugador
    })
  });
  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch("http://192.168.1.129:8080/mokepon/".concat(enemigoId, "/ataques")).then(function (res) {
    if (res.ok) {
      res.json().then(function (_ref) {
        var ataques = _ref.ataques;

        if (ataques.length === 5) {
          ataqueEnemigo = ataques;
          combate();
        }
      });
    }
  });
}

function seleccionarMascotaEnemigo(enemigo) {
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  /*let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
  
  if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
      ataqueEnemigo.push('FUEGO')
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
      ataqueEnemigo.push('AGUA')
  } else {
      ataqueEnemigo.push('TIERRA')
  }*/
  var ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  var ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre;
  ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);

  if (ataque == "🔥") {
    ataqueEnemigo.push("🔥");
  } else if (ataque == "💧") {
    ataqueEnemigo.push("💧");
  } else {
    ataqueEnemigo.push("☘️");
  }
  /*if(ataqueAleatorio == 0 || ataqueAleatorio ==1){
      ataqueEnemigo.push("FUEGO")
  } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
      ataqueEnemigo.push("AGUA")
  } else{
      ataqueEnemigo.push("PLANTA")
  }*/


  console.log(ataqueEnemigo);
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  clearInterval(intervalo);

  for (var index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("¡EMPATE! 😐");
    } else if (ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "☘️") {
      indexAmbosOponentes(index, index);
      crearMensaje("¡GANASTE! ✌️");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador + "🏆";
    } else if (ataqueJugador[index] === "💧" && ataqueEnemigo[index] === "🔥") {
      indexAmbosOponentes(index, index);
      crearMensaje("¡GANASTE! ✌️");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador + "🏆";
    } else if (ataqueJugador[index] === "☘️" && ataqueEnemigo[index] === "💧") {
      indexAmbosOponentes(index, index);
      crearMensaje("¡GANASTE! ✌️");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador + "🏆";
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("¡PERDISTE! 😫");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo + "🏆";
    }
  }

  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("¡Te alzaste con la victoria! 🏆GG🏆");
  } else if (victoriasJugador < victoriasEnemigo) {
    crearMensajeFinal("Tu siervo fue masacrado...💀☠️ ");
  } else if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("😱 ¡DOBLE K.O! 😱");
  }
}

function crearMensaje(resultado) {
  var nuevoAtaqueDelJugador = document.createElement("p");
  var nuevoAtaqueDelEnemigo = document.createElement("p");
  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
  /*ataquesDelJugador.innerHTML = ataqueJugador
  ataquesDelEnemigo.innerHTML = ataqueEnemigo*/

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();
  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);
  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    revisarColision(mokepon);
  });
}

function enviarPosicion(x, y) {
  fetch("http://192.168.1.129:8080/mokepon/".concat(jugadorId, "/posicion"), {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      x: x,
      y: y
    })
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function (_ref2) {
        var enemigos = _ref2.enemigos;
        console.log(enemigos);
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          var mokeponEnemigo = null;
          var mokeponNombre = enemigo.mokepon.nombre || "";

          if (mokeponNombre === "Bombmi") {
            mokeponEnemigo = new Mokepon("Bombmi", "./assets/Ratigueya.png", 5, "./assets/ratigueyacara.png", enemigo.id);
          } else if (mokeponNombre === "Japlu") {
            mokeponEnemigo = new Mokepon("Japlu", "./assets/Hipodoge.png", 5, "./assets/hipodogecara.png", enemigo.id);
          } else if (mokeponNombre === "Jinasu") {
            mokeponEnemigo = new Mokepon("Jinasu", "./assets/Capipepo.png", 5, "./assets/capipepocara.png", enemigo.id);
          }

          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;
          return mokeponEnemigo;
        });
      });
    }
  });
}

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;

    case "w":
      moverArriba();
      break;

    case "ArrowDown":
      moverAbajo();
      break;

    case "s":
      moverAbajo();
      break;

    case "ArrowLeft":
      moverIzquierda();
      break;

    case "a":
      moverIzquierda();
      break;

    case "ArrowRight":
      moverDerecha();
      break;

    case "d":
      moverDerecha();
      break;

    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", sePresionoUnaTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMascota() {
  for (var i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  var arribaEnemigo = enemigo.y;
  var abajoEnemigo = enemigo.y + enemigo.alto;
  var derechaEnemigo = enemigo.x + enemigo.ancho;
  var izquierdaEnemigo = enemigo.x;
  var arribaMascota = mascotaJugadorObjeto.y;
  var abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  var derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  var izquierdaMascota = mascotaJugadorObjeto.x;

  if (abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo) {
    return;
  }

  detenerMovimiento();
  clearInterval(intervalo);
  console.log('Se detecto una colision');
  enemigoId = enemigo.id;
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = 'none';
  seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);