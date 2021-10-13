var population = 409;
let popArray = [];
let strain = 1111;
var numTotalCases = [];
var currentCases = 0;
var positivityRate;
let arrCurrentCases = [];
let numSus = [];
let numRecovered = [];
let casesdata = [];
let totalRecovered = 0; 
var deaths = 0;
var totalInfected = 0; //total infections in the sim


var isSocialDist = new Boolean(false);
let start;


let totalInfectorsArr = [];
let totalSecondInfs = [];

var myChart = document.getElementById("myChart");
casesChart = new Chart(myChart,{
 
    type: 'line',
    data: {
        labels: ['Time'],
        datasets: [{
            label: 'Active Cases',
            backgroundColor: 'rgba(133, 31, 64, 0.2)',
            borderColor: 'rgba(133, 31, 64, 1)',
            data: [],
            fill: true
        },
      {
        label: 'Recovered',
        backgroundColor: 'rgba(128,128,128,0.2',
        borderColor: 'rgba(128,128,128,1',
        data: [],
        fill: true,
        hidden: true
      },
      {
      label: 'Never Infected',
        backgroundColor: 'rgba(0,128,0,0.2)',
        borderColor: 'rgba(0,128,0,1)',
        data: [],
        fill: true,
        hidden: true
      }
    ]

    },
    options: {
     responsive: true,
     maintainAspectRatio: false,
     scales: {
      yAxes: [{
        ticks:{
          beginAtZero: true
          
        }
      }]
     },
      layout: {
        padding: 0
    }
    }
});

let resetSim;
let socialDistance;
var cnv
function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  
}

  function setup(){

   cnv  = createCanvas(400,400)
    cnv.parent('sketch');
 
   centerCanvas();


   
    textFont('Helvetica Medium')
    
    resetSimulation();
    infect(3)
    start = Date.now();
   
  }
  function windowResized() {
    centerCanvas();
    //resetSimulation();

  }
 let interval = 2;
  function draw(){
    document.getElementById("output").innerHTML= rnaught;
      if(isSocialDist){
        background('white') 
        //background('rgba(133, 31, 64, 0.2)')

      } else {
        background('white') 

      }
      display();
      heal();  
      setInterval(updateStats(), 0);
      textSize(18)
      showStats()

      //calculate R
      if((frameCount % (interval * 30) == 0)){
        calcR()
      }
    
    
    }

  function person(xin,yin, id, state, strain, infTime, secondInfs){
    //xin, yin - xpos and ypos
    //dir - direction
    //id keep track of each instance
    //state - infected, healthy, suseptible
    //strain - virus strain, 4bit integer
   //_ _ _ _ Infectivity rate and hue,
   

    this.x = xin;
    this.y = yin;

    this.id = id;
    this.state = state;

    this.vx = random(-1,1);
    this.vy = random(-1,1);
    this.diameter = 5;

    this.xdir = random(0,1);
    this.ydir = random(0,1);

    this.infTime = infTime;

    this.secondInfs = secondInfs // number of secondary infections from this person
  }

  function display(){
    noStroke();
      for(let i = 0; i < popArray.length; i++){
     
          spread(popArray[i]);
          if(popArray[i].state == 'Infected'){
            fill('crimson')
          } else if (popArray[i].state == 'Healthy') { fill('green') } else 
          if (popArray[i].state == 'Sus') {fill('gray')}
          ellipse(popArray[i].x, popArray[i].y, popArray[i].diameter, popArray[i].diameter)
       // fill('rgba(133, 31, 64,.75)')
       fill('crimson')
        if(isSocialDist == true && (popArray[i].id%10 != 0)){
          popArray[i].vx = random(-1,1);
          popArray[i].vy = random(-1,1);
        } else if(popArray[i].vx == 0){
          popArray[i].vx = random(-1,1);
          popArray[i].vy = random(-1,1);
        }

          popArray[i].x += popArray[i].vx * popArray[i].xdir;
          popArray[i].y += popArray[i].vy * popArray[i].ydir;

          if(popArray[i].x > width + popArray[i].diameter -10 || popArray[i].x < popArray[i].diameter){
            popArray[i].xdir *= -1;
          }
          if(popArray[i].y > height + popArray[i].diameter -10 || popArray[i].y < popArray[i].diameter){
            popArray[i].ydir *= -1;
          }


      }
  }
  function spread(idin){
    if(idin.state == 'Infected'){ 
      for(let i = 0; i < popArray.length; i++){
          if(popArray.id == idin.id){
              continue;
          }

          let dx = popArray[i].x - idin.x;
          let dy = popArray[i].y - idin.y;
          let distance = sqrt(dx*dx + dy*dy)

          if(distance < 3 && random(1,2)>1 && popArray[i].state == 'Healthy'){
           infect(popArray[i].id);
           idin.secondInfs+= 1
          }
        }
      }
  }

  function infect(id){
     
    for(let i = 0; i < popArray.length; i++){
        if(popArray[i].id == id){
            if(popArray[i].state == 'Healthy'){
            popArray[i].infTime = Date.now();
            popArray[i].state = 'Infected';
            numTotalCases[numTotalCases.length] = numTotalCases.length;
            currentCases++;
           
            
        } else {
            continue;
        }
    }
  }
}
var infperiod;
function heal(){
    for(let i = 0; i < popArray.length; i++){
      infperiod =  width*15
        if(Date.now() - popArray[i].infTime > width*15 && popArray[i].state == 'Infected'){
          if(this.id == 3){
           
          }
            popArray[i].state = 'Sus';
            currentCases--;
            totalRecovered++
            if(random(0,100) == 1){
              popArray[i].splice(i,1);
            }
        }
    }

}

function updateStats(){
    if(currentCases > 0){
        positivityRate = currentCases / population;
        numRecovered.push(totalRecovered);
        arrCurrentCases.push(currentCases);
        numSus.push(population-currentCases);
       
        
    }
}

function updateChart(chart,active, recovered, healthy){
 chart.data.labels.push("");
 chart.data.datasets[0].data.push(active);
 chart.data.datasets[1].data.push(recovered);
 chart.data.datasets[2].data.push(healthy);
chart.update();

}

function resetChart(chart,data){
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
 });

 
 chart.update();
}

setInterval(function(){
  updateChart(casesChart,currentCases, totalRecovered, population - currentCases - totalRecovered );
 // popArray.push(new person(random(500),random(height-100),popArray.length,'Healthy', strain));
  ;
  //population++;
},500)

function resetSimulation(){

  totalInfectorsArr = [];
 totalSecondInfs = [];
 popArray = [];
 strain = 1111;
 numTotalCases = [];
 currentCases = 0;
 positivityRate;
 arrCurrentCases = [];
 numSus = [];
 numRecovered = [];
 totalRecovered = 0; 
isSocialDist = false;
totalInfected = 0
resetChart(casesChart)

  for(let i = 0; i < population; i++){
    popArray[i] = new person(random(10,width-10),random(10,height-10),i,'Healthy', 0, 0, 0)
}
infect(3)


}

//button functions
function doSocialDist(){
  if(isSocialDist == true){
    isSocialDist = false
  } else {
    isSocialDist = true;
  }
}

function ligma(num){
  if(currentCases > num){
    isSocialDist = true

    
  } else {
    if(currentCases < num - 15){
      isSocialDist = false;
    }
  }
} 

function vax(){
  //num is the percent of population to vaccinate
  let num = prompt("What percentage of the population would you like to vaccinate. Enter a number between 0 and 100.");
  num = num/25
  for(let i = 0; i < popArray.length; i+=num){
    
    if(popArray[i].state == 'Infected'){
      currentCases--;
    } 
    popArray[i].state = 'Sus';
  }
}

var rnaught;
function showStats(){
  var totalx = 0;
  var totaly = 0;
  var totalcounted = 0;
  for(var i = 0; i <popArray.length; i++){
    if(popArray[i].state == 'Infected'){
      totalx+=popArray[i].x
      totaly+=popArray[i].y
      totalcounted++;
    } else {
      continue;
    }

  }
  var avgx = totalx/totalcounted;
  var avgy = totaly/totalcounted;
  noStroke()
  fill(255,0,0,10)
  ellipse(avgx, avgy, (15+currentCases), ( 15+currentCases));
  fill(255,0,0)
 
}

function calcR (){
  let totalSecs = 0; //total number of second infections from our infectors
  let totalInfectors = 0; // number of currently infeFcted people


  for(let i = 0; i < popArray.length; i++){
    if(popArray[i].state == 'Infected'){
       
        totalInfectors++;
        
        totalSecs+= popArray[i].secondInfs;


    } else {
      continue;
    }
  }
  totalInfectorsArr.push(totalInfectors)
  totalSecondInfs.push(totalSecs)

for(let i = 0 ; i < totalInfectorsArr.length; i++){
 rnaught = round(totalInfectorsArr.reduce(add,0) / numTotalCases[numTotalCases.length-1], 2);
}
}

function add(accumulator, a) {
  return accumulator + a;
}