'use strict'

const gameCanvas = document.querySelector('#gameCanvas');
const ctx = gameCanvas.getContext('2d');
let changeDirection1 = false ;
let attack = document.querySelector('.attack')

document.addEventListener('keydown',changeDirection);
function changeDirection(event){
    let LEFT_KEY=37;
    let RIGHT_KEY=39;
    let UP_KEY=38;
    let DOWN_KEY=40;
    if(changeDirection1) return ;
    changeDirection1 = true;
    
    const keyPressed = event.keyCode;
    if(keyPressed == LEFT_KEY && dx !== 10){ dx = -10 , dy = 0 };
    if(keyPressed == RIGHT_KEY && dx !== -10){ dx = 10 , dy=0};
    if(keyPressed == UP_KEY && dy !== 10){dx=0 , dy = -10};
    if(keyPressed == DOWN_KEY && dy !== -10){dx=0 , dy=10};
}


let snake = [
    {x:200 , y:200},
    {x:190 , y:200},
    {x:180 , y:200},
    {x:170 , y:200},
    {x:160 , y:200}
];
let foodX;
let foodY
let dx = 10 ;
let dy = 0;
let score = 0 ;
let startGamebutton = document.querySelector('.buttonStart')
let boxEnd = document.querySelector('.box-end')


startGamebutton.addEventListener('click',()=>{
    main();
    startGamebutton.style = 'display : none'
    document.querySelector('#score').style = 'display : block'
})

document.querySelector('.try-button').addEventListener('click',function(e){
    boxEnd.style='display:none'
    snake = [
        {x:200 , y:200},
        {x:190 , y:200},
        {x:180 , y:200},
        {x:170 , y:200},
        {x:160 , y:200}
    ]
    main()
})

function main(){
    if(didGameEnd()) return boxEnd.style= 'display : flex' ;
    setTimeout(()=>{
        changeDirection1 = false ;
        clearCanvas()
        drawFood()
        advanceSnake()
        drawSnake()
        
        main()
    },100)  
}


function didGameEnd(){
    for(let i = 1 ; i<snake.length ; i++ ){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) return true
    }
   const  hitLeftWall = snake[0].x <= 0;
   const  hitRighWall = snake[0].x >= gameCanvas.width - 10 ;
   const  hitTopWall = snake[0].y <= 0;
   const  hitBottomWall = snake[0].y >= gameCanvas.height - 10

   return hitTopWall || hitBottomWall || hitLeftWall || hitRighWall
}


let clearCanvas = ()=>{
    ctx.fillStyle = 'Grey';
    ctx.strokeStyle = 'purple';
    ctx.fillRect(0,0,gameCanvas.width , gameCanvas.height);
    ctx.strokeRect(0,0,gameCanvas.width , gameCanvas.height);
}


let randomNumber = (max,min) => Math.round((Math.random() * (max - min)+min)/10)* 10 
let createFood = ()=>{
    foodX = randomNumber(0,gameCanvas.width - 10);
    foodY = randomNumber(0,gameCanvas.height - 10);
    snake.forEach(snakePart =>{
        if(snakePart.x == foodX && snakePart.y == foodY ){
        createFood()
       }
    })
}


let advanceSnake = ()=>{
    const head ={ x : snake[0].x + dx  , y : snake[0].y + dy} 

    snake.unshift(head)
    if(head.x == foodX && head.y == foodY){
     score += 1 ;

     document.querySelector('#score').innerHTML = score ; 
     attack.play()
     createFood()
    }else{
        snake.pop()
    }  
}


let drawSnake =()=> snake.forEach(drawSnakePart)
let drawSnakePart =   snakePart =>{
    ctx.fillStyle ='rgb(0, 134, 134)';
    ctx.strokeStyle = 'black';
    ctx.fillRect(snakePart.x , snakePart.y , 10 , 10);
    ctx.strokeRect(snakePart.x , snakePart.y , 10 , 10);
}


let drawFood = ()=>{
    ctx.fillStyle = 'yellow'
    ctx.fillRect(foodX,foodY,10,10);
}

createFood();
