


// ***************   SHAPES    ****************** 

let x;
let y;
let color1;
let color2;
let colors = [];


function setup() {
    noLoop();
    c = createCanvas(800, 800);

 

    colors[0] = color(210,10,210);
    colors[1] = color(20,202,20);
    colors[2] = color(140,30,30);
    colors[3] = color(104,106,9);
    colors[4] = color(40,100,90);
    colors[5] = color(54,10,10);
    colors[6] = color(67,49,123);
    colors[7] = color(85,156,98);
    colors[8] = color(234,165,9);
    colors[9] = color(109,22,9);
    colors[10] = color(192,220,10);
    colors[11] = color(100,10,120);
        



    strokeWeight(10);
    noFill();

    x = width/2;
    y = height/2;
}

function draw() {
    
    
    
    
    
    
    
//    
//    let flake = new Snowflake(height/4, width/2, height/2, colors);
//    flake.drawSnowflake();
//    
//    

    // Single

    //polygon(x, y, height/4, 5);
    //polyShape(x, y, height/4, 4, 6, colors);
    
//    push();
//    translate(width/2, height/2);
//    rose(4, 5, height/4);
//    pop();
    
/*    push();
    translate(width/2, height/2);
    superEllipse(a, b, n);
    pop();*/
    
    //star(x, y, height/6, height/2, 8);
    
    //random radial first
//    let radials = radialOptions(30,90);    // should be all one line
//    let index = int(random(0,divisors.length));
//    radial(height/2, radials[0][index], radials[1][index], width/2, height/2, colors); 
    
    // Set of 6
/*  polyShape(width * .25, height * .33, height/20, 4,4, colors);
    polyShape(width * .50,  height * .33, height/20, 4,5, colors);
    polyShape(width * .75,  height * .33, height/20, 4,6, colors);
    polyShape(width * .25,  height * .66, height/20, 4,4, colors);
    polyShape(width * .50,  height * .66, height/20, 4,8, colors);
    polyShape(width * .75,  height * .66, height/20, 4,10, colors);*/
}


class Snowflake{
  
    constructor(radius, locX, locY, palette) {
        this.levels = int(random(2,5));
        this.radius = radius;
        this.locX = locX;
        this.locY = locY;
        this.strokeWeight = int(this.radius * .04);  
        this.strokeColor = 0;
        this.palette = palette;
        
        let divisorOptions = [3,4,6,8]; // should be a function
        this.divisor = divisorOptions[int(random(0,divisorOptions.length))]; 
    }
    
    drawSnowflake(){   
    translate(this.locX, this.locY); 
    let x = 0;
    let y = 0;  
    let angle = TWO_PI / this.divisor; 
    let polyOptions = [3,4,6,8];
    let polySides = polyOptions[int(random(0,polyOptions.length))];                                                              
    let polarPicker = int(random(0, 10));
    
    while((this.divisor == 3 && polySides == 4) || (this.divisor == 4 && polySides == 3 )){
      polySides = polyOptions[int(random(0,polyOptions.length))];
    }
    if(polySides == 3 && this.levels == 2){
      this.levels = int(random(3,5));  
    } 
        
    this.strokeColor = this.palette[int(random(0,this.palette.length))];
    stroke(this.strokeColor);
        
    // Draws the lines
    for (let a = 0; a < TWO_PI * 6; a += angle) {  
      let sx = x + cos(a) * this.radius;
      let sy = y + sin(a) * this.radius;
      line(0, 0, sx, sy);
    }
        
    //  SHAPES      
    let tempRadius = this.radius;
    
    this.fillColor = this.palette[int(random(0,this.palette.length))]; 
        
    for(let i = 0; i < this.levels; i++){
      this.radius = tempRadius;
      if(i != 0){
        this.radius = this.radius * (i * .25);
      } 
    
     
      
      for (let a = 0; a < TWO_PI * 6; a += angle) {  
        let sx = x + cos(a) * this.radius;
        let sy = y + sin(a) * this.radius;
          
        fill(this.fillColor);

         if(polarPicker >= 0 && polarPicker < 7){
              polygon(sx, sy, this.radius/4, polySides); 
              noFill();
              polygon(sx, sy, this.radius/2, polySides);      
          } else {
              ellipse(sx, sy, this.radius/2, this.radius/2);   
              noFill();
              ellipse(sx, sy, this.radius/4, this.radius/4); 
          }
      }
         
      if (this.divisor == 3){
        push();        
        rotate(1.05);        
        scale(.75);
          
          for (let a = 0; a < TWO_PI * 6; a += angle) {  
            let sx = x + cos(a) * this.radius;
            let sy = y + sin(a) * this.radius;
            line(0, 0, sx, sy);
          }  
          
          this.fillColor = this.palette[int(random(0,this.palette.length))];
            
          for(let j = 0; j < this.levels; j++){
      
            this.radius = tempRadius;
            if(j != 0){
              this.radius = this.radius * (j * .25);
            }  
              
            for (let a = 0; a < TWO_PI * 6; a += angle) {  
              let sx = x + cos(a) * this.radius;
              let sy = y + sin(a) * this.radius;
                
            fill(this.fillColor);
                
             if(polarPicker >= 0 && polarPicker < 7){
                 polygon(sx, sy, this.radius/4, polySides);            
                  noFill();
                  polygon(sx, sy, this.radius/2, polySides);       ; 
              } else {
                  ellipse(sx, sy, this.radius/2, this.radius/2);   
                  noFill();
                  ellipse(sx, sy, this.radius/4, this.radius/4); 
              } 
            }           
          }      
        rotate(-1.05);
        pop();      
      }
      if (this.divisor == 4 ){ 
        push();      
        rotate(.75);        
        scale(.75);       
          for (let a = 0; a < TWO_PI * 6; a += angle) {  
            let sx = x + cos(a) * this.radius;
            let sy = y + sin(a) * this.radius;
            line(0, 0, sx, sy);
          }
          
          this.fillColor = this.palette[int(random(0,this.palette.length))];
                    
          for(let j = 0; j < this.levels; j++){
            this.radius = tempRadius;  
            if(j != 0){
              this.radius = this.radius * (j * .25);
            }      
        
            for (let a = 0; a < TWO_PI * 6; a += angle) {  
              let sx = x + cos(a) * this.radius;
              let sy = y + sin(a) * this.radius;  
                
             fill(this.fillColor);
                
              if(polarPicker >= 0 && polarPicker < 7){
                  polygon(sx, sy, this.radius/4, polySides);            
                  noFill();
                  polygon(sx, sy, this.radius/2, polySides);         
              } else {
                  ellipse(sx, sy, this.radius/2, this.radius/2);   
                  noFill();
                  ellipse(sx, sy, this.radius/4, this.radius/4); 
              }
            }           
          } 
        rotate(-.75);       
        pop(); 
      }       
    }       
  }  
}
        

function saveImage(){
    saveCanvas(c, 'iteration-icons', 'png');
}

// POLYGON
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// POLYGON TARGET
function polyShape(xLoc, yLoc, size, numSteps, polySides, colors) {
  let alphaValues = 255/numSteps;
  let steps = size/numSteps;
  for (let i = 0; i < numSteps; i++) {   
    stroke(colors[i]);
    polygon(xLoc, yLoc, size - i*steps, polySides, numSteps);                                                              
  }
}

// RADIALS
function radial(diameter, divisor, angle, x, y, colors) { 
  let lastAngle = 0;
  let index = int(random(0, colors.length));
  let check = true;
  let step = 3;
  for (let i = 0; i < divisor; i++) {
    if (index + step < colors.length && check == true) {
      index = index + step;
      check = true;
    } else if (index - step >= 0) {
      index = index - step;
      if (index - step >= 0) {
        check = false;
      } else {
        check = true;
      }
    }
    radialColor = colors[index];
    fill(radialColor);
    arc(x, y, diameter, diameter,  lastAngle, lastAngle + radians(angle));
    lastAngle += radians(angle);
  }
  noFill();
} 


// Returns a list of angle / divisor pairs - constrained to usable values 
function radialOptions(innerBound, outerBound) { 
  radials = [];
  angles = [];
  divisors = [];
  for (let divisor = innerBound; divisor <= outerBound; divisor++) {
    if (360 % divisor == 0) {
      divisors.push(divisor);
      let angle = 360 / divisor;
      angles.push(angle);
    } 
    radials[0] = divisors;
    radials[1] = angles;
  }
  return radials;
}

// ROSE
function rose(d, n, radius){
 var k = n / d;
  beginShape();
  for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
    var r = radius * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}

// STAR
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// SUPERELLIPSE
function superEllipse(a, b, n){    
    
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}










