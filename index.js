
function setup() {
  createCanvas(200, 200, WEBGL);
 
}

function draw() {
  
  background(255);
  rotateX( mouseY * -0.01);
  rotateY(mouseX * 0.01);
  box(100);
  fill('gray')
}