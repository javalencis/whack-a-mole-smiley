const cursor = document.querySelector('.cursor')


const holes = [...document.querySelectorAll('.hole')]
let timer = null

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


