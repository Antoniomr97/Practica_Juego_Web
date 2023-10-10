

const sectionSeleccionarAtaque = document.getElementById("Seleccionar-Ataque")
const sectionReiniciar = document.getElementById("Reiniciar")
const botonMascotaJugador = document.getElementById("boton-siervo")
const botonReiniciar = document.getElementById("boton-reiniciar")


const sectionSeleccionarSiervo = document.getElementById("Seleccionar-Siervo")

const spanMascotaJugador = document.getElementById("siervo-jugador")

const spanMascotaEnemigo = document.getElementById("siervo-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-del-jugador")
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones= []
let mokeponesEnemigos= []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua 
let botonPlanta
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src= "./assets/mokemap.png"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 500

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida 
        this. ataques = []
        this.ancho = 60
        this.alto = 60
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let Bombmi = new Mokepon("Bombmi", "./assets/Ratigueya.png", 5, "./assets/ratigueyacara.png")

let Japlu = new Mokepon("Japlu", "./assets/Hipodoge.png", 5, "./assets/hipodogecara.png")

let Jinasu= new Mokepon("Jinasu", "./assets/Capipepo.png", 5, "./assets/capipepocara.png")


const JAPLU_ATAQUES= [
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "☘️", id: "boton-planta"},
]

const BOMBMI_ATAQUES = [
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "☘️", id: "boton-planta"},
]

const JINASU_ATAQUES = [
    {nombre: "☘️", id: "boton-planta"},
    {nombre: "☘️", id: "boton-planta"},
    {nombre: "☘️", id: "boton-planta"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
]
Bombmi.ataques.push(...BOMBMI_ATAQUES)

Japlu.ataques.push(...JAPLU_ATAQUES)

Jinasu.ataques.push(...JINASU_ATAQUES)

mokepones.push(Bombmi, Japlu, Jinasu)



function iniciarJuego() {
    
    sectionSeleccionarAtaque.style.display = "none"  
    sectionVerMapa.style.display = "none"

    mokepones.forEach((Mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="siervo" id = ${Mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${Mokepon.nombre}>
                <p>${Mokepon.nombre}</p>
                <img src=${Mokepon.foto} alt=${Mokepon.nombre}>
        </label>
        `

    contenedorTarjetas.innerHTML += opcionDeMokepones

        inputHipodoge = document.getElementById("Bombmi")
        inputCapipepo = document.getElementById("Japlu")
        inputRatigueya = document.getElementById("Jinasu")



    })

    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()

}

function unirseAlJuego() {
    fetch("http://192.168.1.129:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    
    if (inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id

    } 
    else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
        
    } 
    else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
        
    } 

    else{
        alert("Elige un siervo, no seas timido")
        return
    }

    sectionSeleccionarSiervo.style.display = "none"

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.1.129:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon:mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        }
        

    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre} </button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonPlanta = document.getElementById("boton-planta")
    botones = document.querySelectorAll(".BAtaque")
    
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥 ") {
                ataqueJugador.push("🔥")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }

            else if (e.target.textContent === "💧 "){
                ataqueJugador.push("💧")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else {
                ataqueJugador.push("☘️")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
            
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.1.129:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.1.129:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    
    /*let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)
    
    if (ataqueAleatorio == 0 || ataqueAleatorio ==1) {
        ataqueEnemigo.push('FUEGO')
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }*/
    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1);
    let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre
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
        console.log(ataqueEnemigo)
        iniciarPelea()
   
}

function iniciarPelea(){
    if (ataqueJugador.length === 5) {
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("¡EMPATE! 😐")
        }
        else if (ataqueJugador[index] === "🔥" && ataqueEnemigo[index] === "☘️"){
            indexAmbosOponentes(index, index)
            crearMensaje("¡GANASTE! ✌️")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador + "🏆"
        }
        else if (ataqueJugador[index] === "💧" && ataqueEnemigo[index] === "🔥") {
            indexAmbosOponentes(index, index)
            crearMensaje("¡GANASTE! ✌️")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador + "🏆"
        }
        else if (ataqueJugador[index] === "☘️" && ataqueEnemigo[index] === "💧"){
            indexAmbosOponentes(index, index)
            crearMensaje("¡GANASTE! ✌️")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador + "🏆"
        }
        else{
            indexAmbosOponentes(index, index)
            crearMensaje("¡PERDISTE! 😫")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo + "🏆"
        }
    }

    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("¡Te alzaste con la victoria! 🏆GG🏆")
    }
    else if (victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("Tu siervo fue masacrado...💀☠️ ")
        }
    else if (victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("😱 ¡DOBLE K.O! 😱")
    }
}

function crearMensaje(resultado){
    
    let nuevoAtaqueDelJugador = document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    /*ataquesDelJugador.innerHTML = ataqueJugador
    ataquesDelEnemigo.innerHTML = ataqueEnemigo*/

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    
    sectionMensajes.innerHTML = resultadoFinal

    sectionReiniciar.style.display = "block"
}
function reiniciarJuego(){
    location.reload()
}
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min )
}

function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })

}

function enviarPosicion(x,y){
    fetch(`http://192.168.1.129:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            x: x,
            y: y
        })
    })
    .then(function(res){
        if (res.ok){
            res.json()
                .then(function ({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre === "Bombmi"){
                            mokeponEnemigo = new Mokepon("Bombmi", "./assets/Ratigueya.png", 5, "./assets/ratigueyacara.png", enemigo.id)
                        }
                        else if (mokeponNombre === "Japlu"){
                            mokeponEnemigo = new Mokepon("Japlu", "./assets/Hipodoge.png", 5, "./assets/hipodogecara.png", enemigo.id)
                        }
                        else if (mokeponNombre === "Jinasu"){
                            mokeponEnemigo= new Mokepon("Jinasu", "./assets/Capipepo.png", 5, "./assets/capipepocara.png", enemigo.id)
                        }
                        
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                    
                    
                    
                })
        }
    })
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
    
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
    
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
    
}

function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5 
    
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break
        case "w":
            moverArriba()
            break
        case "ArrowDown":
            moverAbajo()
            break
        case "s":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "a":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
        case "d":
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa(){
    
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    
    window.addEventListener("keydown",sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    console.log('Se detecto una colision');

    enemigoId = enemigo.id

    sectionSeleccionarAtaque.style.display = "flex" 
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    

}

window.addEventListener("load", iniciarJuego)