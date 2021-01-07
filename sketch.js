let numBalls; //starting population
let spring = 0.02; //bounciness
let gravity = 0.0;
let friction = -1; //wall bounciness
let balls = [];
let healThreshold = 0;//3.5; //number of seconds before healing

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var slider; // pop slider
var spreadVect; 

function setup() {
  createCanvas(640, 640);


  slider = createSlider(50, 500, 250); //min max value step
  //spreadVect = createSlider(1,10,1)

  slider.style('background', 'red');
  //spreadVect.style('background', 'red');
  
  numBalls = slider.value();

  //button = createButton('Reset');
  //button.mousePressed(resetSim);

  textSize('32')
  text('Choose population size', 1200, 550)
  fill(0, 102, 153, 51);
 
  slider.position(window.width * 2,300);
  //button.position(1200, 400);

  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(10,10),
      i,
      balls
    );
   noStroke(); //no outline
  // console.log(balls[i].col)
  }
}

function myInputEvent(){
  inp.input(myInputEvent);
}

function resetSim(){
  newArr = [];
  balls = [];
  numBalls = slider.value();
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(10, 10),
      i,
      balls
    );
   noStroke(); //no outline
  // console.log(balls[i].col)
  }
}

function draw() {
  background(50);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.doImmuneSystem();
    ball.display();
  });

}

function mousePressed(){
  var whichBall;
 var closest = balls[0];
   for(var i = 0; i < balls.length; i++){
    if(dist(mouseX, mouseY, balls[i].x, balls[i].y)<dist(mouseX, mouseY, closest.x, closest.y)){
        closest = balls[i];
    } //on click, finds the closest dot
   }
   
  closest.clicked(whichBall);
  closest = balls[0];
}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = randomInteger(-0.5,0.5);
    this.vy = randomInteger(-0.5,0.5);
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    this.health = "healthy";// = "healthy"
    this.col = color(255, 204);
  }
  infect(){
    this.health = "infected";
    this.col = 'red';
    //console.log("Ball #" + this.id + " was pressed");
  }
  recover(){
    this.health = "recover";
    this.col = color(255,104);
  }
  collide() {
    for (let i = 0; i < balls.length; i++) { //this.id + 1
      if(balls[i] == this){
      continue;
      }
      let dx = balls[i].x - this.x;
      let dy = balls[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = balls[i].diameter / 2 + this.diameter / 2;
      if (distance < minDist) {
       let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - balls[i].x) * spring;
        let ay = (targetY - balls[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        balls[i].vx += ax;
        balls[i].vy += ay;
        
        if(balls[i].health == "infected" && this.health == "healthy"){
          this.infect();
          this.healWait = randomInteger(1,60)
          
        }
      }
  }
}

clicked(ball){
  let d = dist(mouseX, mouseY, this.x, this.y);
  console.log( ball);
      if (d < 15){
        this.infect();
        this.healWait = randomInteger(1,60)
        this.doImmuneSystem();
        //this.recover();
    }
}
  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
   
  }

  display() {
    fill(this.col)
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  doImmuneSystem(){
    if(second()+1 > this.healWait && this.health == "infected"){
      this.recover();
     }
  }
}

  
