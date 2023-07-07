var PLAY;
var END;
var gameState = PLAY;
var score = 0

var plane, planeGroup, planeImage
var ground, ground1, groundImage
var obstacle, obstacleGroup, obstacleImage

var gameOver, gameOverImage
var restart, restartImage


function preload(){
    groundImage = loadImage("ground.png")

    planeImage = loadImage("airplane.png")

    obstacleImage = loadImage('bird.png')

    gameOverImage = loadImage('gameOver.png')

    restartImage = loadImage('restart.png')

}

function setup() {
    createCanvas(1920,1080)
    
    ground = createSprite(950,475)
    ground.addImage('ground',groundImage);
    ground.velocityX = -3;

    ground1 = createSprite(1900,475)
    ground1.addImage('ground1',groundImage);
    ground1.velocityX = -3;
    

    plane = createSprite(200)
    plane.addImage('plane',planeImage);
    plane.scale = 0.4
    plane.debug = false

    restart = createSprite(300,140);
    restart.addImage(restartImage);
    restart.visible = true

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImage);

    score = 0

    gameState = PLAY

    obstacleGroup=createGroup();

    planeGroup=createGroup();


}

function draw() {
    background(200)

    text("Score: "+ score, 500,50);
    
      plane.y= World.mouseY

    if(gameState === PLAY){
        gameOver.visible = false;
        restart.visible = false;

        score = score + Math.round(getFrameRate()/60)

        if(ground.x < 0){
            ground.x = 950
          }
    
          if(ground1.x < 950){
            ground1.x = 1900
          }

        if(obstacleGroup.isTouching(plane)){
            gameState = END
            plane.visible = false
            obstacle.visible = false
            obstacleGroup.visible = false
            
        }
    }
    else if (gameState === END){
        gameOver.visible = true
        restart.visible = true  

    if(gameState === END){
        gameOver.visible = true
        restart.visible = True
        plane.visible = false
        obstacleGroup.visible = false
    }


        if(mousePressedOver(restart)){
            reset()
        }
    }



    spawnObstacles()

    drawSprites()
}

function spawnObstacles(){
    if(frameCount % 60 === 0 ){
      obstacle = createSprite(1918,0)
      obstacle.scale = 0.2
      obstacle.addImage('obstacle',obstacleImage)
      obstacle.y = Math.round(random(100,1000))
      console.log(obstacle.y)
      obstacle.velocityX = -4  

      obstacle.lifetime = 700;
      obstacleGroup.add(obstacle);



      

    }
}

function reset(){
    gameState = PLAY
    restart.visible = false
    gameOver.visible = false
    obstacle.destroyEach();
    score = 0
}
