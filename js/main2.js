let thingsToLoad = [
  "https://meowjump.kdnanmaga.me/assets/cat.png",
  "https://meowjump.kdnanmaga.me/assets/robotomono.ttf",
  "https://meowjump.kdnanmaga.me/assets/smallroll.png",
  "https://meowjump.kdnanmaga.me/assets/bigroll.png",
  "https://meowjump.kdnanmaga.me/assets/over.png"
];

let g; 
let cat;
let message;
let score;
let upArrow;
let smallRoll;
let bigRoll;
let catTexture 
let catBearers; 
  
function init(){
  g = hexi(512, 512, setup, thingsToLoad, load);
  g.scaleToWindow();
  g.start();
}

function load(){
  g.loadingBar()
}

function setup(){
  catTexture = g.frames(
    "https://meowjump.kdnanmaga.me/assets/cat.png",
    [[0,0],[80,0],[160,0]],
    80,64
  );
  
  g.backgroundColor = 0xff5020;
  g.scaleToWindow();
  cat = g.sprite(catTexture);
  smallRoll = g.sprite("https://meowjump.kdnanmaga.me/assets/smallroll.png");
  bigRoll = g.sprite("https://meowjump.kdnanmaga.me/assets/bigroll.png");
  cat.pivotY = 1;
  smallRoll.pivotY = 1;
  bigRoll.pivotY = 1;
  
  catBearers = g.sprite("https://meowjump.kdnanmaga.me/assets/over.png");
  catBearers.pivotY = 0.5;
  catBearers.pivotX = 0.5;
  
  
  cat.setPosition(32,400);
  bigRoll.setPosition(-300,400);
  smallRoll.setPosition(512,400);
  catBearers.setPosition(256,-256);
  smallRoll.vx = -3;
  bigRoll.vx = -3;
  
  
  cat.flyT = -1;
  message = g.text("Tap to start","25px robotomono","#401408");
  
  message.pivotX = 0.5;
  message.pivotY = 0.5;  
  message.x = 256;
  message.y = 450;
  
  score = g.text(0,"35px robotomono","#401408");
  score.pivotX = 0.5;
  score.x = 256;
  score.y = 50;
   
  upArrow = g.keyboard(38);
  upArrow.press = jump;
  g.spaceBar.press = jump;
  g.pointer.tap = jump;
}

function jump(){
  if(g.state){
    if(cat.y>350){
      cat.flyT = 0;
      cat.vy = -0.5;
    }
    message.content = "MeowJump";
  }
  else{
    g.state = play;
    message.content = "Tap to jump";
    cat.playAnimation();
    bigRoll.setPosition(-300,400);
    smallRoll.setPosition(512,400);
    catBearers.setPosition(256,-256); 
    cat.y = 400;
    cat.flyT = -1;
    cat.x = 32;
    score.content = 0;   
  }
}


function play(){
  if(cat.flyT>=0){  
    g.move(cat);
    cat.flyT++;
    cat.vy = (0 -0.5 + 0.007*cat.flyT)*15;
    if(cat.y>400){
      cat.y=400;
    }
    
  }
  score.content++;
    
  if(cat.y<390){
    if(!cat.playing) cat.playAnimation();
  }
  else{
    if(cat.playing) cat.stopAnimation();
  }
  if(smallRoll.x>-512){
    g.move(smallRoll);
  }
  if(bigRoll.x>-512){
    g.move(bigRoll);
  }
  if(smallRoll.x<-256 && bigRoll.x<-256){
    if(Math.random()<0.35){
      bigRoll.x = 512;
    }
    else{
      smallRoll.x = 512;
    }
  }
  if(g.hitTestRectangle(cat,smallRoll)){
    g.state = null;
    catBearers.setPosition(256,256);
    cat.stopAnimation();
    message.content = "Tap to restart";
    bigRoll.setPosition(-300,400);
    smallRoll.setPosition(512,400);
    cat.y = 400;
    cat.flyT = -1;
    cat.x = -512;
  }
  if(g.hitTestRectangle(cat,bigRoll)){
    g.state = null;
    catBearers.setPosition(256,256);
    cat.stopAnimation();
    message.content = "Tap to restart";
    bigRoll.setPosition(-300,400);
    smallRoll.setPosition(512,400);
    cat.y = 400;
    cat.flyT = -1;
    cat.x = -512;
  }
}
