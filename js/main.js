let board = document.getElementById('board');
let a = 1, b = 30;
board.style.gridTemplateColumns = `repeat(${b}, 1fr)`
board.style.gridTemplateRows = `repeat(${b}, 1fr)`

let snakeArray = [{x: 7, y: 5}, {x:7,y:4}]
let food = {x:5,y:5}
let movingDirection = {x:0 , y: 1}
let score = 0;
let highScore = localStorage.getItem('highest-score') || 0;
let lastPaintTime = 0;
let speed = 05;
let requestId = null
let foodElem;
let snakePart

document.querySelector("#high").innerHTML = highScore
document.querySelector("#score").innerHTML = score

// Creating Animation
function loop(time) {
    requestId =  window.requestAnimationFrame(loop)
    if ((time - lastPaintTime) / 1000 < 1 / speed ) return;
    lastPaintTime = time
    gameEngine()
}

function gameEngine() {
    // PART 1:  Adding logic to eat food and move
    snakeArray.forEach((e , i)=> {
        if (i !== 0 && snakeArray[0].x === e.x && snakeArray[0].y === e.y) {
            alert(`Game over your score is ${score}`)
            snakeArray = [{x: 7, y: 5},{x:7,y:4}];
            food = {x : generateRandom(b,a), y: generateRandom(b,a)}
            movingDirection = {x:0,y:1} 
            setScore(0)
        }
    })

    // Snake eat food 

    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) snakeHaveEatenFood(snakeArray)

    // Move the snake 

    for (let index = snakeArray.length - 2; index >=0 ; index--) 
        {snakeArray[ index + 1] = {...snakeArray[index]}}

    // snake is moving

    snakeArray[0].x += movingDirection.x
    snakeArray[0].y += movingDirection.y

    // wraping the snake at wall

    if (snakeArray[0].x > b) snakeArray[0].x -= b
    if (snakeArray[0].x < a ) snakeArray[0].x = b - snakeArray[0].x
    if (snakeArray[0].y > b) snakeArray[0].y -= b
    if (snakeArray[0].y < a ) snakeArray[0].y = b - snakeArray[0].y

    // PART 2 : Creating snake and food
    drawSnakeAndFood()
    
}

function snakeHaveEatenFood(sarr) { 
    sarr.unshift({x : sarr[0].x + movingDirection.x, y: sarr[0].y + movingDirection.y})
    setScore(speed + 5)    
    food = {x: generateRandom(b,a), y: generateRandom(b,a)}
}

function generateRandom(max,min) { 
    return Math.round(min + (max - min ) * Math.random())
}

function setScore(sc) {
    score = sc === 0 ? sc : score + sc
    highScore = highScore >= score ? highScore : score 
    localStorage.setItem('highest-score',highScore)
    document.querySelector("#high").innerHTML = highScore
    document.querySelector("#score").innerHTML = score
}

// requestId =  window.requestAnimationFrame(loop)
drawSnakeAndFood()

// function to draw the snake and the food
function drawSnakeAndFood() {
    board.innerHTML = ''

    // creating snake 
    snakeArray.forEach((e,index) => {
        snakePart = document.createElement('div')
        snakePart.classList.add('snake')
        snakePart.style.gridRowStart = e.y
        snakePart.style.gridColumnStart = e.x
        if (index === 0) snakePart.classList.add('head')
        board.appendChild(snakePart)
    })

    // creating food

    foodElem = document.createElement('div')
    foodElem.style.gridRowStart = food.y
    foodElem.style.gridColumnStart = food.x
    foodElem.classList.add('food')
    board.appendChild(foodElem)
}

// Toogle gameplay

function playPauseGame(e) {
    if(requestId !== null && e==='p' ) {
        window.cancelAnimationFrame(requestId)
        requestId = null
    }
    else if(requestId === null) requestId = window.requestAnimationFrame(loop)
    else {}
}

window.addEventListener('keydown', e => {
    //Start the game
    //moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            movingDirection.x = 0;
            movingDirection.y = movingDirection.y === 1 ? 1 : -1;
            break;
        case "ArrowLeft":
            movingDirection.x = movingDirection.x === 1 ? 1 : -1;
            movingDirection.y = 0;
            break;
        case "ArrowDown":
            movingDirection.x = 0;
            movingDirection.y = movingDirection.y === -1 ? -1 : 1;
            break;
        case "ArrowRight":
            movingDirection.x = movingDirection.x === -1 ? -1 : 1;
            movingDirection.y = 0;
            break;
        case 'p': 
            playPauseGame(e.key)
            break;
        default:
            playPauseGame(null)
            break;
    }
})
