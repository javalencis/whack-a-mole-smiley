const cursor = document.querySelector('.cursor')
const btStart = document.querySelector('.bt-start')
const cModal = document.querySelector('.container-modal')
const body = document.querySelector('.body')
const holes = [...document.querySelectorAll('.hole')]
let timer = null
btStart.addEventListener('click',start)

function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let mole = document.createElement('img')
    mole.classList.add('mole')
    mole.src = 'assets/mole.png'
    
    mole.addEventListener('click',()=>handleClickMole(mole,hole))

    hole.appendChild(mole)
    timer = setTimeout(() => {
        hole.removeChild(mole)
        run()
    }, 1500)
}


function handleClickMole(mole,hole){
    clearTimeout(timer)
    mole.src = 'assets/mole-whacked.png'
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


