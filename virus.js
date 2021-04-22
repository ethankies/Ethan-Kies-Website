

var population = 500;
let popArray = [];
let strain = 1111;
var numTotalCases = [];
var currentCases = 0;
var positivityRate;
let arrCurrentCases = [];
let numSus = [];
let numRecovered = [];
let totalRecovered = 0; 
var deaths = 0;

var isSocialDist = new Boolean(false);
const start = Date.now();

let fontSize = (18);

var myChart = document.getElementById("myChart");
casesChart = new Chart(myChart,{
 
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Active Cases',
            backgroundColor: 'rgba(133, 31, 64, 0.2)',
            borderColor: 'rgba(133, 31, 64, 1)',
            data: [],
            fill: true
        }]

    },
    options: {
      responsive: false
    }
});

let resetSim;
let socialDistance;

  function setup(){

    let cnv = createCanvas(660,550)
    cnv.position(500,-500,'relative');
    //textSize(25)
    
    textFont('Helvetica Medium')
    updateChart(casesChart,currentCases);
    text('Virus Spread', 175, 430)
    console.log('Wdith: ', width, 'Height: ', height)
    
    t1 = createDiv();
    t2 = createDiv();
    t3 = createDiv();
    t4 = createDiv();

    //style
    t1.position(1020,175)
    t1.style('font-size',fontSize + 'px')

    t2.position(1020,195)
    t2.style('font-size',fontSize + 'px')

    t3.position(1020,215)
    t3.style('font-size',fontSize + 'px')

    t4.position(1020,235)
    t4.style('font-size',fontSize + 'px')

  //buttons
    resetSim = createButton('Reset Simulation');
    socialDistance = createButton('Social Distance');

    resetSim.position(1048,500)
    socialDistance.position(1050,450)

    resetSim.mousePressed(resetSimulation)
    socialDistance.mousePressed(doSocialDist)

    //button style
    resetSim.style('background-color',('Crimson'))
    socialDistance.style('background-color',('LightSkyBlue'))

    //create people
    for(let i = 0; i < population; i++){
        popArray[i] = new person(random(500),random(height-100),i,'Healthy', strain)
    }
    infect(3)
    for(let i = 0; i < popArray.length; i++){
    }
/*
    slider = createSlider(0, 255, 100);
    slider.position(10, 10);
    slider.style('width', '80px');

  */
  }
  function draw(){

    background('white') 
 
      display();
      heal();
      
        setInterval(updateStats(), 1000);
      
      
      textSize(18)
      fill('Black')

    //  text(, 635, 40)
    //  text(+'%', 635, 60)
      //text(, 635, 80);

      t1.html('Total cases: '+ String(numTotalCases.length))
      t2.html('Active Cases: ' + String(currentCases));
      t3.html('Positivity rate: '+String(Math.round(positivityRate*100)));
      t4.html('Total Recovered '+String(totalRecovered));
     
    }

  function person(xin,yin, id, state, strain, infTime){
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
  }

  function display(){
    noStroke();
      for(let i = 0; i < popArray.length; i++){
          spread(popArray[i]);
          if(popArray[i].state == 'Infected'){
              fill('Crimson')
          } else if (popArray[i].state == 'Healthy') { fill('green') } else 
          if (popArray[i].state == 'Sus') {fill('gray')}
          ellipse(popArray[i].x, popArray[i].y, popArray[i].diameter, popArray[i].diameter)
        fill('Crimson')
        if(isSocialDist == true && (popArray[i].id%10 != 0)){
          popArray[i].vx = random(-1,1);
          popArray[i].vy = random(-1,1);
        } else if(popArray[i].vx == 0){
          popArray[i].vx = random(-1,1);
          popArray[i].vy = random(-1,1);
        }

          popArray[i].x += popArray[i].vx * popArray[i].xdir;
          popArray[i].y += popArray[i].vy * popArray[i].ydir;

          if(popArray[i].x > 500 + popArray[i].diameter || popArray[i].x < popArray[i].diameter){
            popArray[i].xdir *= -1;
          }
          if(popArray[i].y > height - 100 + popArray[i].diameter || popArray[i].y < popArray[i].diameter){
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
          if(distance < 5 && random(1,2)>1.5){
           infect(popArray[i].id);
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

function heal(){
    for(let i = 0; i < popArray.length; i++){
        if(Date.now() - popArray[i].infTime > 6000 && popArray[i].state == 'Infected'){
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

function updateChart(chart,data,day){
 // chart.data.labels.push("Day " + ((Date.now()-start)/1000));
 chart.data.labels.push("");
 chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
});
//  myChart.data.datasets[0].data = arrCurrentCases;
 
chart.update();

}

function resetChart(chart,data){
  chart.data.labels = [];
  chart.data.datasets.forEach((dataset) => {
    dataset.data = [];
 });
 //  myChart.data.datasets[0].data = arrCurrentCases;
 
 chart.update();
}

setInterval(function(){
  updateChart(casesChart,currentCases);
 // popArray.push(new person(random(500),random(height-100),popArray.length,'Healthy', strain));
  ;
  //population++;
},500)

setInterval(function(){
  
  popArray.push(new person(random(500),random(height-100),popArray.length,'Healthy', strain));
  ;
  population++;
},1000)


function resetSimulation(){

population = 500;
 popArray = [];
 strain = 1111;
 numTotalCases = [];
 currentCases = 0;
 positivityRate;
 arrCurrentCases = [];
 numSus = [];
 numRecovered = [];
 totalRecovered = 0; 

resetChart(casesChart)

  for(let i = 0; i < population; i++){
    popArray[i] = new person(random(500),random(height-100),i,'Healthy', strain)
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

  console.log('Social distance is ' + isSocialDist);
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
