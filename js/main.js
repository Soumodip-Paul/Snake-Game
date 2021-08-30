//constants
let inputDir= {x:0 , y:0};
let food ={x:12,y:13}
let lastPaintTime = 0;
let snakeArr = [{x :13,y:15}]; 
const speed =06;
let score = 0;
let a=0,b=50;
// const board = document.querySelector("#board"); 
// let foodSound = new Audio('assets/food.mp3');
// let gameoverSound = new Audio('assets/gameover.mp3');
// let moveSound = new Audio('assets/move.mp3');
// let backSound = new Audio('assets/backGround.mp3');

//functions
function main(ctime){

    window.requestAnimationFrame(main);
    
    if((ctime - lastPaintTime)/1000 < 1/speed) return;
    // console.log(ctime);
    lastPaintTime = ctime;
    gameEngine();
    
}

function gameEngine(){
    //Part 1: Updating snake array
    if(isCollide(snakeArr)){
        //gameOver.play()
        //music.pause()
        inputDir= {x:0 , y:0};
        alert("Game Over"+score);
        snakeArr = [{x :13,y:15}]; 
        //music.play
        score =0;

    }
    //if you eat food

    if(snakeArr[0].x===food.x&&snakeArr[0].y===food.y){
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        
    }
    // move the sanke
    for (let index = snakeArr.length -2; index >=0 ; index--) {
        const element = snakeArr[index];
        snakeArr[index+1] ={...snakeArr[index]};
        
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Part 2: Display snake array and food
    board.innerHTML = '';
    snakeArr.forEach((e,index)=>{

        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        if(index === 0) snakeElement.classList.add('head');
        board.appendChild(snakeElement);
    });

    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

function isCollide(sarr){
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
            return true;
        }

        
    }
}


window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir= {x:0,y:1}//Start the game
    //moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowLeft":
            console.log(e.key);
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowDown":
            console.log(e.key);
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log(e.key);
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
