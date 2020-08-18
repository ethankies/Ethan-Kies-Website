var population = [];

let populationSlider, movementSlider;
var infected;
var totalInfections = 1;

function setup() {

  var numInitialSick = 1;
  createCanvas(600, 600);

  populationSlider = createSlider(50, 200, 200, 10);
  movementSlider = createSlider(1, 5, 1, 0.1);
  
 
  
  for (let i = 0; i < populationSlider.value(); i++) {

    population.push(new Person());

    var tmp = new Person(); //creates sick person(s)

    if(i < numInitialSick) {
      tmp.infected = true;
    } else {
      tmp.infected = false;
    } 
    
   population.push(tmp);
   //Thanks Blake :)
  }
}


function draw() {

  background(50);

  for (let citizen of population) {

    citizen.detectCollision(population);
    citizen.edges();
    citizen.getHealthy();
    citizen.update();
    citizen.show();
  
   // console.log(Date.now())
  }
}