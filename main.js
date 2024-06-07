const cursor = document.querySelector('.cursor')
const btStart = document.querySelector('.bt-start')
const modalStart = document.querySelector('.modal-start')
const cModal = document.querySelector('.container-modal')
const body = document.querySelector('.body')
const time = document.querySelector('.time')
const score = document.querySelector('.score')
const modalGameOver = document.querySelector('.modal-gameover')
const btAgain = document.querySelector('.bt-again')

let holes = [...document.querySelectorAll('.hole')]
let mole = null
let hole = null
let timer = null
let timeGame = 5
let timerGame = null
let scoreGame = 0
let speedMole = 1500



btStart.addEventListener('click', start)
btAgain.addEventListener('click', again)
function run() {
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
}


function handleClickMole() {
    clearTimeout(timer)
    
    scoreGame++
    score.innerHTML = scoreGame.toString()
    let paint = document.createElement('img')
    paint.src = 'assets/paint.png'
    paint.classList.add('paint')
    hole.appendChild(paint)
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

function gameOver() {
    if (timeGame === 0) {
        cModal.style.display = 'flex'
        modalGameOver.style.display = 'flex'
        cursor.style.display = 'none'
        body.style.cursor = 'auto'


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
        speedMole -= 20
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


