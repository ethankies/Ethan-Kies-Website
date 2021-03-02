
function preload(){
  rImg = loadImage('assets/rock.png');
  pImg = loadImage('assets/paper.jpg');
  sImg = loadImage('assets/scissors.png');

 // soundFormat('mp3');
  snip = loadSound('assets/snip.mp3');
  thump = loadSound('assets/thump.mp3');
  crinkle = loadSound('assets/crinkle.mp3');
}

let hands = [];
let diameter = 20;
let speed = 0.02
let speeds = [speed,-speed];

function setup(){

    createCanvas(400,400)

    //instance
    for(let i = 0; i < 10; i++){
        hands[i] = new Hand('Rock',i,random(width),random(height),random(0,360));
    }
    for(let i = 10; i < 20; i++){
        hands[i] = new Hand('Paper',i,random(width),random(height),random(0,360));
    }
    for(let i = 20; i < 30; i++){
        hands[i] = new Hand('Scissors',i,random(width),random(height),random(0,360));
    }

    for (let i = 0; i < hands.length; i++){
        console.log(hands[i]);
      }
    
}

function draw(){
    background(175)
    //Hand();
    for (let i = 0; i < hands.length; i++){

        if(hands[i].type == 'Rock'){
            
            image(rImg, hands[i].x, hands[i].y, diameter,diameter)

        } else if(hands[i].type == 'Paper'){

            image(pImg, hands[i].x, hands[i].y, diameter, diameter)

        } else if(hands[i].type == 'Scissors'){

            image(sImg, hands[i].x, hands[i].y, diameter, diameter)
        }


        checkCollision(hands[i].x,hands[i].y,hands[i].id,hands[i].type);
        move(hands[i],hands[i].type,hands[i].id)
     }

}

function Hand(type,id,xin,yin,dir){
    this.type = type;
    this.id = id;
    this.x = xin;
    this.y = yin;
    this.dir = dir;

    this.vx = random(speeds);
    this.vy = random(speeds);
 }

 function checkCollision(aX,aY,id,type){
    
    for(let i = 0; i < hands.length; i++){
        if(hands[i].id == id){
            continue; //dont collide with itself
        }
        if(Math.abs(hands[i].x - aX) < diameter && Math.abs(hands[i].y - aY) < diameter){
           // console.log(id + ' collided with ' + hands[i].id)
            if(type == 'Rock' && hands[i].type == 'Paper'){
            hands[id].type = 'Paper';
            crinkle.play();
           }
            if(type == 'Paper' && hands[i].type == 'Scissors'){
            hands[id].type = 'Scissors';
            snip.play()
            }
            if(type == 'Scissors' && hands[i].type == 'Rock'){
            hands[id].type = 'Rock';
            thump.play()
            }
        }
    }
 }

function move(hand,type,id){
    //move x and y
    for(let i = 0; i < hands.length; i++){
        if(hands[i].id == id){
            continue; 
        }

        //this scis
        if(hands[i].type == 'Scissors' && hands[id].type == 'Paper' && hands[i].x - hands[id].x < 25){
            hands[i].x += speed;
        } else if(hands[i].type == 'Scissors' &&hands[id].type == 'Paper' && hands[i].x - hands[id].x > 25){
            hands[i].x -= speed;
        } else if(hands[i].type == 'Scissors' &&hands[id].type == 'Paper' && hands[i].y - hands[id].y < 25){
            hands[i].y += speed;
        } else if(hands[i].type == 'Scissors' &&hands[id].type == 'Paper' && hands[i].y - hands[id].y > 25){
            hands[i].y -= speed;
        } else {

        //this paper
        if(hands[i].type == 'Paper' &&hands[id].type == 'Rock' && hands[i].x - hands[id].x <25){
            hands[i].x += speed;
        } else if(hands[i].type == 'Paper' &&hands[id].type == 'Rock' && hands[i].x - hands[id].x > 25){
            hands[i].x -=speed;
        } else
        if(hands[i].type == 'Paper' &&hands[id].type == 'Rock' && hands[i].x - hands[id].y < 25){
            hands[i].y + speed;
        } else if(hands[i].type == 'Paper' &&hands[id].type == 'Rock' && hands[i].x - hands[id].y > 25){
            hands[i].y + speed;
        } else {
        //this rock
        if(hands[i].type == 'Rock' &&hands[id].type == 'Scissors' && hands[i].x - hands[id].x < 25){
            hands[i].x += speed;
        } else if(hands[i].type == 'Rock' &&hands[id].type == 'Scissors' && hands[i].x - hands[id].x > 25){
            hands[i].x -=speed;
        } else
        if(hands[i].type == 'Rock' &&hands[id].type == 'Scissors' && hands[i].x - hands[id].y < 25){
            hands[i].y + speed;
        } else if(hands[i].type == 'Rock' &&hands[id].type == 'Scissors' && hands[i].x - hands[id].y > 25){
            hands[i].y -= speed;
        }
        else { 
           hands[i].x += hands[i].vx;
           hands[i].y += hands[i].vy;
        }
        
    }
      

       //bounce
        if ( hands[i].x > 400 - diameter || hands[i].x < diameter){
            hands[i].vx = -hands[i].vx;
          }
          if ( hands[i].y > height -  diameter ||  hands[i].y <  diameter){
            hands[i].vy = -hands[i].vx;
          }
          
    }
    
}
}
