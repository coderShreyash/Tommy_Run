var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  pointer = loadImage("mouse.png")
  trex_running = loadAnimation("dog.png","running.png");
  trex_collided = loadAnimation("dog.png");
  
  groundImage = loadImage("forest.jfif");
  highestScore=0;
  localStorage=highestScore;
  
  cloudImage = loadImage("cloudd.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg= loadImage("gameOver.png")
}

function setup() {
  createCanvas(displayWidth-950,displayHeight-600);
  PLAY=1;
  END=0;
  gameState=PLAY;
  trex = createSprite(displayWidth-1450,displayHeight-600,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.1;
  m=createSprite(200,200,0,0);
  m.addImage(pointer);
  m.scale=0.05
  
 

  gameOver = createSprite(displayWidth-1200,displayHeight-770);
  gameOver.addImage(gameOverImg);
  restart = createSprite(displayWidth-1200,displayHeight-730);
 
  restart.addImage(restartImg)
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible=false;
  restart.visible = false;
  
  invisibleGround = createSprite(displayWidth/2,displayHeight-600,4000,10);
  invisibleGround.visible = false;

  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  bg=0;
  ground = createSprite(500,displayHeight-800,400,20);
  ground.addImage("ground",groundImage);
  ground1 = createSprite(300,displayHeight-800,400,20);
  ground1.addImage("ground",groundImage);

 
 
 
  

  
  
}

function draw() {
  
 
  background(255);
  stroke("black")
  strokeWeight(5)
  
  fill("white")
  textSize(30)
 
  
  if(gameState==PLAY){
  
  ground.depth=ground1.depth-1;
  gameOver.depth=ground.depth-1;
  gameOver.depth=restart.depth;
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX= -(6 + 2*score/100);
  ground1.velocityX= ground.velocityX
  if(keyDown("space") &&trex.y>200) {
    trex.velocityY = -15;
  }
  
  trex.velocityY = trex.velocityY + 0.8;
  
  if (ground.x < 280){
    ground.x = 450;
  }
  if (ground1.x < 200){
    ground1.x = 300;
  }
  
  if(score>highestScore){
    highestScore=score
  }
  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
}
}
else if (gameState === END) {
  gameOver.depth=ground.depth-1;
  gameOver.depth=ground1.depth-1;
  gameOver.depth=restart.depth;
  gameOver.visible = true;
  restart.visible = true;
  
  ground.velocityX = 0;
  ground1.velocityX = 0;
  trex.velocityY = 0;
  obstaclesGroup.setVelocityXEach(0);                     
   cloudsGroup.setVelocityXEach(0);
  trex.addAnimation("running",trex_collided);
  
  //set lifetime of the game objects so that they are never destroyed
  obstaclesGroup.setLifetimeEach(-1);
  cloudsGroup.setLifetimeEach(-1);

  

   if(mousePressedOver() || keyDown("space"))
   { 
     reset();
   }
  
}
  trex.depth=ground.depth+1
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
 
  drawSprites();
  text("Highest Score: "+ highestScore, displayWidth-1500,displayHeight-820);
  text("Score: "+ score, displayWidth-1150,displayHeight-820);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.addAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    var cloud = createSprite(displayWidth-900,120,40,10);
    cloud.y = Math.round(random(displayHeight-816,displayHeight-776));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 50 === 0 ) {
    var obstacle = createSprite(displayWidth-900,displayHeight-640,10,40);
    obstacle.velocityX = -(6 + 2*score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
        
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
// <iframe src="https://assets.pinterest.com/ext/embed.html?id=618189486343793888" height="713" width="345" frameborder="0" scrolling="no" ></iframe>

       
