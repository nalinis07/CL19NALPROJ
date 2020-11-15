var towerSprite, towerImage;

var doorImage, doorsGroup;

var railImage, railsGroup;

var ghostSprite, ghostImage;

var invisibleBlockGroup ; 

var PLAY = 0;
var END = 1;
var gameState = PLAY;

var score = 0 ;

function preload () {
  // load images
  towerImage = loadImage ("tower.png");
  doorImage = loadImage ("door.png");
  railImage = loadImage ("climber.png");
  ghostImage = loadImage ("ghost-standing.png");
}

function setup () {
  //canvas
  createCanvas (600,600);
  
  // scrolling background
  towerSprite = createSprite (300,300,600,600);
  towerSprite.addImage ("tower", towerImage);
  towerSprite.velocityY=1;
  // console.log ("Tower Img Height :" + towerSprite.height);
  
  
  // ghost 
  ghostSprite = createSprite (200,200,50,50);
  ghostSprite.addImage (ghostImage);
  ghostSprite.scale = 0.3;
  ghostSprite.debug = true;
  
  // create door group
  doorsGroup = new Group();
  // create railings group
  railsGroup = new Group();
  // create invisible block  group
  invisibleBlocksGroup = new Group();
  
}

function draw () {
  
  background (0);
  
  //displaying score
  stroke ("yellow");
  fill("yellow");
  textSize(30) ;

  text("Score: "+ score, 300,150);
  
  if (gameState == PLAY) {
    // scrolling background reset 
    if (towerSprite.y > 400) {
        towerSprite.y = 300;
    }
  
    // ghost movement with left and right keys
    if (keyDown(LEFT_ARROW)) {
      ghostSprite.x = ghostSprite.x - 2;
    }

    if (keyDown(RIGHT_ARROW)) {
      ghostSprite.x = ghostSprite.x + 2;
    }

    // Ghost jumps if space key pressed
    if (keyDown("space")) {
      ghostSprite.velocityY= -5;
    }
    ghostSprite.velocityY =   ghostSprite.velocityY + 0.8;

    // ghost rest on railings
    if (railsGroup.isTouching(ghostSprite)) {
      ghostSprite.velocityY = 0;
    }
    
    if (invisibleBlocksGroup.isTouching(ghostSprite) ||  ghostSprite.y > height) {
      ghostSprite.destroy ();
      gameState = END;
    } 
    // spawn the doors and railings
    spawnDoors ();
    drawSprites ();
    
  } else if (gameState == END) {
    stroke ("yellow");
    fill("yellow");
    textSize(30) ;
    text ("GAME OVER", 230,250);
  }
  
  
}


function spawnDoors () {
  
  // spawn doors at random x positions
  if (frameCount % 240 == 0) {
    var doorSprite = createSprite (200,-50,20,20);
    doorSprite.addImage(doorImage);
    doorSprite.velocityY = 1;
    doorSprite.x = Math.round (random (120,400));
    doorSprite.lifetime = 800;
    
    // adjust depths
    ghostSprite.depth = doorSprite.depth ;
    ghostSprite.depth = ghostSprite.depth + 1;
    
    var railSprite = createSprite (200,10,10,10);
    railSprite.addImage (railImage)  ;
    railSprite.x = doorSprite.x ;
    railSprite.velocityY = 1;
    railSprite.lifetime = 800 ;
    railSprite.debug=true;
    
    
    //invisible blocks
    var invisibleBlockSprite = createSprite (200,15,10,10);
    invisibleBlockSprite.width = railSprite.width;
    invisibleBlockSprite.height=2;
    invisibleBlockSprite.x = doorSprite.x;
    invisibleBlockSprite.velocityY = 1;
    invisibleBlockSprite.debug = true;
    
    // add to group
    doorsGroup.add (doorSprite);
    railsGroup.add (railSprite);
    invisibleBlocksGroup.add (invisibleBlockSprite);
    
  }
}

