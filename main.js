import { msn } from "./src/cupons.js"


const cursor = document.querySelector('.cursor')
const btStart = document.querySelector('.bt-start')
const modalStart = document.querySelector('.modal-start')
const cModal = document.querySelector('.container-modal')
const body = document.querySelector('.body')
const time = document.querySelector('.time')
const score = document.querySelector('.score')
const modalGameOver = document.querySelector('.modal-gameover')
const btAgain = document.querySelector('.bt-again')
const contentMsn = document.querySelector('.content-msn')
const cupon = document.querySelector('.cupon')
const contentCupon = document.querySelector('.content-cupon')
const pCheck = document.querySelector('.pCheck')



let holes = [...document.querySelectorAll('.hole')]
let mole = null
let hole = null
let timer = null
let timeGame = 25
let timerGame = null
let scoreGame = 0
let speedMole = 1500
let handleClick = true

contentCupon.addEventListener('click', copy)

btStart.addEventListener('click', start)
btAgain.addEventListener('click', again)
function run() {
    handleClick = true
    const i = Math.floor(Math.random() * holes.length)
    hole = holes[i]
    mole = document.createElement('img')
    mole.setAttribute('draggable', false);
    mole.classList.add('mole')
    mole.src = 'assets/smileysad.png'

    mole.addEventListener('click', () => handleClickMole())

    hole.appendChild(mole)
    timer = setTimeout(() => {
        if (hole.contains(mole)) {
            hole.removeChild(mole);
        }

        run()
    }, speedMole)
    console.log(speedMole);
}


function handleClickMole() {
    if(!handleClick){
        return
    }
    clearTimeout(timer)
    
    scoreGame++
    score.innerHTML = scoreGame.toString()
    let paint = document.createElement('img')
    paint.src = 'assets/paint.png'
    paint.classList.add('paint')
    hole.appendChild(paint)
    handleClick = false
    setTimeout(() => {
        if(hole.contains(paint)){

            hole.removeChild(paint)
        }
        mole.src = 'assets/smileyhappy.png'
    }, 500)
    setTimeout(() => {
        if (hole.contains(mole)) {
            hole.removeChild(mole);
        }

        run()
    
    }, 800);

}
function setMsnCupons(){
    if(scoreGame>=16){
        contentMsn.innerHTML = msn.tenExtra.mensaje
        cupon.innerHTML = msn.tenExtra.cupon
    }else if(scoreGame >= 12){
        contentMsn.innerHTML = msn.freeShipping.mensaje
        cupon.innerHTML = msn.freeShipping.cupon
    }else if(scoreGame >= 8){
        contentMsn.innerHTML = msn.fiveExtra.mensaje
        cupon.innerHTML = msn.fiveExtra.cupon
    }else{
        contentMsn.innerHTML = msn.nothing.mensaje
        cupon.innerHTML = msn.nothing.cupon
        contentCupon.style.display = 'none'


        
    }
}

function copy() {
    let text = cupon.innerHTML;

    const tempInput = document.createElement('input');
    tempInput.setAttribute("value", text);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    pCheck.style.display = 'block'
}

function gameOver() {
    if (timeGame === 0) {
        cModal.style.display = 'flex'
        modalGameOver.style.display = 'flex'
        cursor.style.display = 'none'
        body.style.cursor = 'auto'

        setMsnCupons()
    }
}

function countTimeGame(){
    timerGame = setInterval(() => {
        if (timeGame === 0) {
            gameOver()

            clearInterval(timerGame)
        }
        time.innerHTML = timeGame.toString()
        timeGame--
        speedMole -= 40
    }, 1000);
}
function again() {
    clearTimeout(timer)
    timer = null
    timeGame = 25
    timerGame = null
    scoreGame = 0
    speedMole = 1500
    cModal.style.display = 'none'
    modalGameOver.style.display = 'none'
    cursor.style.display = 'block'
    body.style.cursor = 'none'
    contentCupon.style.display="flex"
    pCheck.style.display = 'none'
    score.innerHTML = scoreGame.toString()
    time.innerHTML = timeGame.toString()

    hole.removeChild(mole)
    countTimeGame()
    run()

}

function start() {
    cModal.style.display = 'none'
    modalStart.style.display = 'none'
    cursor.style.backgroundImage = 'url("assets/hammer.png")'
    body.style.cursor = 'none'
    countTimeGame()
run()

    
}


window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('touchstart', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})
window.addEventListener('touchend', () => {
    cursor.classList.remove('active')
})


