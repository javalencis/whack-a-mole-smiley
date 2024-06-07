const cursor = document.querySelector('.cursor')
const btStart = document.querySelector('.bt-start')
const cModal = document.querySelector('.container-modal')
const body = document.querySelector('.body')
const time = document.querySelector('.time')
const score = document.querySelector('.score')
const holes = [...document.querySelectorAll('.hole')]
let timer = null
let timeGame = 25
let timerGame = null
let scoreGame = 0
let speedMole = 1500



btStart.addEventListener('click',start)

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let mole = document.createElement('img')
    mole.setAttribute('draggable', false);
    mole.classList.add('mole')
    mole.src = 'assets/smileysad.png'
    
    mole.addEventListener('click',()=>handleClickMole(mole,hole))

    hole.appendChild(mole)
    timer = setTimeout(() => {
        hole.removeChild(mole)
        run()
    }, speedMole)
}


function handleClickMole(mole,hole){
    clearTimeout(timer)
    scoreGame++
    score.innerHTML = scoreGame.toString()
    mole.src = 'assets/smileyhappy.png'
    mole.removeEventListener('click', handleClickMole);
    
    setTimeout(() => {
        hole.removeChild(mole)
        run()
    }, 500);
}

function start(){
    cModal.style.display = 'none'
    cursor.style.backgroundImage = 'url("assets/hammer.png")'
    body.style.cursor = 'none'

    timerGame = setInterval(() => {
        if(timeGame === 0){
            clearInterval(timerGame)
        }
        time.innerHTML= timeGame.toString()
        timeGame--
        speedMole-=20
        console.log(speedMole);
    }, 1000);
}

run()

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


