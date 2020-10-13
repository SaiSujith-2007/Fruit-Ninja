var PLAY=1;
var END=0;
var gameState=1;
var sword, fruit, alien, swordImage, fruitImage, alienImage, edges;
var fruit1, fruit2, fruit3, fruit4;
var fruitGroup, enemyGroup, fruit2Group;
var gameover, gameoverSound, swordSound;
var score=0;

function preload(){
   
   fruit1=loadImage("fruit1.png");
   fruit2=loadImage("fruit2.png");
   fruit3=loadImage("fruit3.png");
   fruit4=loadImage("fruit4.png");
   gameover=loadImage("gameover.png");
   gameoverSound=loadSound("gameover.mp3");
   swordImage=loadImage("sword.png");
   swordSound=loadSound("knifeSwooshSound.mp3");
   alienImage=loadAnimation("alien1.png","alien2.png");
}

function setup(){
  createCanvas(400,400);
  sword=createSprite(200,200,10,10);
  sword.addImage(swordImage);
  sword.scale=0.5
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  fruit2Group=createGroup();
}

function draw(){
  background(900);
  if (gameState===PLAY){
    sword.x=mouseX;
    sword.y=mouseY;
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      swordSound.play();
      score=score+1;
    }
   
    if (fruit2Group.isTouching(sword)){
      fruit2Group.destroyEach();
      swordSound.play();
      score=score+1;
    }
     if (enemyGroup.isTouching(sword)){
      gameState=END;
    }
    enemy();
    fruits();
    fruits2();
  }
  
  else if (gameState===END){
   enemyGroup.destroyEach();
   sword.addImage(gameover);
   fruitGroup.destroyEach();
   fruitGroup.setVelocityXEach(0);
   enemyGroup.setVelocityXEach(0);
   gameoverSound.play();
   
  }
  drawSprites();
  text("score:"+ score,270,30);
}

function fruits(){
  if (frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.velocityX=-(7+score/4);
  var rand=Math.round(random(1,4));
  switch(rand){
      case 1:fruit.addImage(fruit1);
      break;
      case 2:fruit.addImage(fruit2);
      break;
      case 3:fruit.addImage(fruit3);
      break;
      case 4:fruit.addImage(fruit4);
      break;
      default:break;
  }
    fruit.scale=0.2;
  fruit.y=Math.round(random(10,300))
  fruit.setLifetime=100;
  fruitGroup.add(fruit);
 
 }

}


function enemy(){
  if (frameCount%100===0){
  alien=createSprite(400,200,20,20);
  alien.addAnimation("run",alienImage);
  alien.scale=0.7;
  alien.velocityX=-(8+score/10);
  alien.lifeTime=50;
  alien.y=Math.round(random(10,300))
  enemyGroup.add(alien);
 }
  
}

function fruits2(){
  if (frameCount%80===0){
    fruit=createSprite(0,200,20,20);
    fruit.velocityX=(7+score/4);
  var rand=Math.round(random(1,4));
  switch(rand){
      case 1:fruit.addImage(fruit1);
      break;
      case 2:fruit.addImage(fruit2);
      break;
      case 3:fruit.addImage(fruit3);
      break;
      case 4:fruit.addImage(fruit4);
      break;
      default:break;
  }
  fruit.scale=0.2;
  fruit.setlifetime=100;
  fruit.y=Math.round(random(10,300))
  fruit2Group.add(fruit);
  }
}