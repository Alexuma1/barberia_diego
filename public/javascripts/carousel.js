const marca = document.querySelector('.carousel_marca')
const diapositivas = Array.from(marca.children)
const botonSiguiente = document.querySelector('.boton_carousel_derecha')
const botonAtras = document.querySelector('.boton_carousel_izquierda')
const puntosNavegador = document.querySelector('.carousel_nav')
const puntos = Array.from(puntosNavegador.children)

const diapositivaAncho = diapositivas[0].getBoundingClientRect().width

// organizar las diapositivas una al lado de la otra

const colocarPosicionDiapositiva = (diapositiva,index)=>{
    diapositiva.style.left = diapositivaAncho * index + 'px'
}

diapositivas.forEach(colocarPosicionDiapositiva)

const moverParaDeslizar = (marca, activo,diapositivaObjetivo)=>{
    marca.style.transform = 'translateX(-' + diapositivaObjetivo.style.left + ')'
    activo.classList.remove('activo')
    diapositivaObjetivo.classList.add('activo')
}

const actualizarPuntos = (navActivo,puntosObjetivo) =>{
    navActivo.classList.remove('activo')
    puntosObjetivo.classList.add('activo')
}

const esconderMostrarFlechas = (diapositivas,botonAtras,botonSiguiente,indiceObjetivo) =>{  
    if(indiceObjetivo === 0){
        botonAtras.classList.add('esta_oculto')
        botonSiguiente.classList.remove('esta_oculto')
    }else if(indiceObjetivo === diapositivas.length - 1){
        botonAtras.classList.remove('esta_oculto')
        botonSiguiente.classList.add('esta_oculto')
    }else{
        botonAtras.classList.remove('esta_oculto')
        botonSiguiente.classList.remove('esta_oculto')
    }
}

// cuando hago click a la izquierda, el navegador se mueve a la izquierda
botonAtras.addEventListener('click', e =>{
    const activo = marca.querySelector('.activo')
    const activoAtras = activo.previousElementSibling
    const puntosObjetivo = puntosNavegador.querySelector('.activo')
    const anteriorPunto = puntosObjetivo.previousElementSibling
    const indiceAnterior = diapositivas.findIndex(diapositiva => diapositiva === activoAtras)
    // moviendo a la anterior diapositiva
    moverParaDeslizar(marca,activo,activoAtras)
    actualizarPuntos(puntosObjetivo,anteriorPunto)
    esconderMostrarFlechas(diapositivas,botonAtras,botonSiguiente,indiceAnterior)
})

// cuando hago click a la derecha, el navegador se mueve a la derecha

botonSiguiente.addEventListener('click' , e => {
    const activo = marca.querySelector('.activo')
    const activoSiguiente = activo.nextElementSibling
    const puntosObjetivo = puntosNavegador.querySelector('.activo')
    const siguientePunto = puntosObjetivo.nextElementSibling
    const indiceSiguiente = diapositivas.findIndex(diapositiva => diapositiva === activoSiguiente)
    // moviendo hacia la siguiente diapositiva
    moverParaDeslizar(marca,activo,activoSiguiente)
    actualizarPuntos(puntosObjetivo,siguientePunto)
    esconderMostrarFlechas(diapositivas,botonAtras,botonSiguiente,indiceSiguiente)
})

// cuando hago click a los navegadores, se mueve a ese indicador

puntosNavegador.addEventListener('click', e =>{
    // en qué indicador se hizo clic?
    const puntosObjetivo = e.target.closest('button')

    if(!puntosObjetivo) return

    const activo = marca.querySelector('.activo')
    const navActivo = puntosNavegador.querySelector('.activo')
    const indiceObjetivo = puntos.findIndex(punto => punto === puntosObjetivo)
    const diapositivaObjetivo = diapositivas[indiceObjetivo]

    moverParaDeslizar(marca,activo,diapositivaObjetivo)
    actualizarPuntos(navActivo,puntosObjetivo)
    esconderMostrarFlechas(diapositivas,botonAtras,botonSiguiente,indiceObjetivo)
})