class Person {

    constructor() {
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(movementSlider.value()-1, movementSlider.value()));
      this.acceleration = createVector();
      this.maxForce = 1;
      this.maxSpeed = 5;
      this.infected;
    }
  
    edges() {
      if (this.position.x > width) {
        this.position.x = 0;
      } else if (this.position.x < 0) {
        this.position.x = width;
      }
      if (this.position.y > height) {
        this.position.y = 0;
      } else if (this.position.y < 0) {
        this.position.y = height;
      }
    }

    detectCollision(persons){
      let gottenSick;
      if(this.infected){
         gottenSick = true;
      } else gottenSick = false;
      
      let perceptionRadius = 10;
      let nearby = createVector;
      let total = 0;

      for(let other of persons){
      let d = dist(
        this.position.x, 
        this.position.y,
        other.position.x,
        other.position.y
        );
      if(other != this && d < perceptionRadius && other.infected){
        //nearby.add(other.velocity)
        total++
        }

      }
        if(total > 0 && !gottenSick){

          this.infected = true;
          this.totalInfections++;
        
      }
      //console.log(total);
    }

    getHealthy(){

      
      }
    
    
  
  
    update() {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);
    }
  
    show() {

      
      strokeWeight(8);

      if(this.infected){
        stroke(200, 100, 200)
        
      } else {
      stroke(200)
    }
      point(this.position.x, this.position.y);
    }
  }