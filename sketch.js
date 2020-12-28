var monkey , monkeyrunning;
var banana ,bananaimage;
var obstacle, obstacleimage;
var foodgroup, obstaclegroup;
var ground,ground_moving;

var PLAY = 1;
var END = 0;
var gameState = 1;

var survivalTime = 0;

function preload(){
  
  
  monkeyrunning =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaimage = loadImage("banana.png");
  obstaceimage = loadImage("obstacle.png");
 
}



function setup() {

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkeyrunning);
  monkey.scale=0.1
 
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-12;
  ground.x=ground.width/2;
  console.log(ground.x)

  foodgroup = new Group();
  obstaclesgroup = new Group();

  
 }


function draw() {
  
  background("white");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount/10);
  text("survivalTime: "+survivalTime,100,50);
   
  
  if(gameState === PLAY){   
  if(ground.x<0) {
     ground.x=ground.width/2;
   }
   
  if(keyDown("space") && monkey.y>=100 ) {
     monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  }
  
  
      monkey.collide(ground);

      spawnfood();
      spawnobstacles();

  drawSprites();
  
  
  if(obstaclesgroup.isTouching(monkey)){
    
   
    
    ground.velocityX = 0;
    monkey.velocityY = 0 ;
    
    obstaclesgroup.setVelocityXEach(0);
    obstaclesgroup.setLifetimeEach(-1);
    
    foodgroup.setVelocityXEach(0); 
    foodgroup.setLifetimeEach(-1);
    }
    
  
  
}



function spawnfood() {
  
  if (frameCount % 80 === 0) {

      banana = createSprite(600,250,40,10);
      banana.y = random(120,200);    
      banana.velocityX = -6;

      banana.lifetime = 300;
      monkey.depth = banana.depth + 1;

      banana.addImage(bananaimage);
      banana.scale=0.07;

      foodgroup.add(banana);
   }
  
}

function spawnobstacles() {
  
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.setCollider("circle",0,0,200);
    obstacle.debug = false; 
    
    obstacle.addImage(obstaceimage);
    obstacle.scale=0.13;
         
    obstacle.lifetime = 300;
    
    obstaclesgroup.add(obstacle);
    }
  
}
