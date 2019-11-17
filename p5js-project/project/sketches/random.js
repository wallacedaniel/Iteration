







//
//quantity  bounds or specific
//
//radius of object  bounds or specific
//
//clumping/overlap distance relative to radius and/or just bounds over all
//
//add shapes and give qty ratio weights
//
//each has scale bounds or specific / handles type variety 
//
//palette to all random or by types or by scale
//





























let shapes = [];

let counter = 0;

class Shape {

  constructor() {
    this.x = random(width);
    this.y = random(height); 
      
      
    this.r = random(18, 48);       // relative to canvas  < input paramteter
    this.radius1 = this.r/2 ;
    this.radius2 = this.r ;
      
      
    this.npoints = floor(random(4,11));  
  }
}

function setup() {
  createCanvas(600, 600);

  while (shapes.length < 1000) {
    let overlapping = false;
    let proposalShape = new Shape;
      
    for (let i = 0; i < shapes.length; i++) {
      let existingShape = shapes[i];
      let d = dist(proposalShape.x, proposalShape.y, existingShape.x, existingShape.y);

      if (d < (proposalShape.r + existingShape.r) * .9) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      shapes.push(proposalShape);
      noStroke();
      fill(0, 255, 250, 100);
      star(proposalShape.x, proposalShape.y, proposalShape.radius1, proposalShape.radius2, proposalShape.npoints); 
    }

    counter++;
    if (counter > 100000) {
      break;
    }
  }
}

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













/*
#controls-container
#controls-main{}
#canvas-panel       
#canvas-types{}                                                                                                
#canvas-size{}              
#layer-drop{}                                                        
#shapes=container{}                                                               
#shapes{}                                                              
#layers=container{}              
#grid-layer{}               
#random-layer{}                            
#random-qty{}
#random-bounds{}                                        
#horizon-layer{}                             
#simple-layer{}            
#controls-sidebar{}
#palette-controls{}                                                    
#palette-steps{}                                                                                  
#palette-types{}                                                                             
#color-1{}
#color-1-display{}                                                         
#color-2{}
#color-2-display{}                                                                           
#color-3{}
#color-3-display{}
#create-palette{}
#saved-palettes{}                                                                                                    
#saved-images{}            
#saved-designs{}                                                          
#app-controls{}                                   
#rate{}
#name{}
#data{}
#design{}
#canvas-container

for ins 
 canvas type
 shape types
 grid type?
 palette type?
*/

/*let c;

function preload(){
 
}

function setup() {
    noLoop();    
    c = createCanvas(800, 800);   
    let playButton = select('#play');
    playButton.mousePressed(loop);
    let stopButton = select('#stop');
    stopButton.mousePressed(noLoop);
    let saveButton = select('#save');
    saveButton.mousePressed(save);
}
    
function draw() {   
    background(125); 
}

function save(){
    console.log('didja do it?');
    saveCanvas(c, 'iteration', 'jpg');
}*/

/*
// FRONT PAGE SKETCH
function setup() {
    createCanvas(800, 800);
}
    
function draw() {
    
}
*/

/*
   // ICONS
let x;
let y;
let color1;
let color2;
let colors;

function setup() {
    noLoop();
    c = createCanvas(800, 800);
    color1 = color(164,247,191);
    color4 = color(0,176,185);
    color2 = lerpColor(color1, color4, 0.33);
    color3 = lerpColor(color1, color4, 0.66);
    colors = [];
    
    selectCanvas = select('#selectCanvas');
    selectCanvas.mousePressed(saveImage);
    colors[0] = color1;
    colors[1] = color2;
    colors[2] = color3;
    colors[3] = color4;
    
    //colors[0] = color4;
    //colors[1] = color3;
    //colors[2] = color2;
   // colors[3] = color1;

    strokeWeight(1);
    noFill();
    x = width/2;
    y = height/2;
}
    
function draw() {
    //polygon(x, y, height/4, 5);
    drawTarget(width * .25, height * .33, height/20, 4,4, colors);
    drawTarget(width * .50,  height * .33, height/20, 4,5, colors);
    //stroke(color2);
    drawTarget(width * .75,  height * .33, height/20, 4,6, colors);
    //stroke(color3);
    drawTarget(width * .25,  height * .66, height/20, 4,4, colors);
    //stroke(color4);
    drawTarget(width * .50,  height * .66, height/20, 4,8, colors);
    drawTarget(width * .75,  height * .66, height/20, 4,10, colors);
}

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

function drawTarget(xLoc, yLoc, size, numSteps, polySides, colors) {
  let alphaValues = 255/numSteps;
  let steps = size/numSteps;
  //let strokePicker = 2;

  for (let i = 0; i < numSteps; i++) {
    //stroke(colors[strokePicker]);                  
    //fill(245, i * alphaValues * .17);     
    stroke(colors[i]);
    polygon(xLoc, yLoc, size - i*steps, polySides, numSteps);                                   
    //strokePicker += 1;                               
  }
 // noFill();
}

function saveImage(){
    saveCanvas(c, 'iteration-icons', 'png');
}
*/

// LOGO
/*
let c, raleway;

function preload() {
  raleway = loadFont('Raleway/Raleway-Regular.ttf');
}

function setup() {
    noLoop();
    //stroke(0);
    strokeWeight(20);
    c = createCanvas(1350, 220);
    textFont(raleway);
    selectCanvas = select('#selectCanvas');
    selectCanvas.mousePressed(saveImage);
}
    
function draw() {
    let radius = 20;    
    let angle = TWO_PI / 16;
    //let x = width/2;
    let y = height/2;
    let x = (width * .1) + (width * .1);
    let  counter = 1;
    
// BACKGROUND  
    background(163,247,191);
    noStroke();
    fill(255);
    rect(width * .1, 0, width * .1, height);
  
// BACK ELEMENT
    //translate(width/0, height/0);
    //push();    
    let sxHolder;
    let syHolder;
    
    for(let a = 0; a < TWO_PI * 3; a += angle) {  
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        sxHolder = sx;
        syHolder = sy; 
        
        if(counter %2 != 0){  
  
        }
    
        strokeWeight(5);  
        stroke(3,37,63);
        //line(x, y, sx, sy);  
        noStroke();  
        fill(1,173,181);
        let ellipseSize = random(4,9);
        ellipse(sx, sy, ellipseSize, ellipseSize);  
        counter++;
        radius += 2.8;         
    }
    //fill(163,247,191);
    //ellipse(sxHolder, syHolder, 9, 9)

// FRONT ELEMENT    
   counter = 1;
    radius = 45;
      for(let a = 0; a < TWO_PI; a += angle) {  
        
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        
        if(counter %2 != 0){  
            sx = x + cos(a) * (radius * 1.9);
            sy = y + sin(a) * (radius * 1.9);    
        }
            
        strokeWeight(5);  
        stroke(3,37,63);
        line(x, y, sx, sy);  
        noStroke();  
        fill(1,173,181);
          
        if(counter %2 != 0){  
            ellipse(sx, sy, 20, 20);     
        }  
        else{
            ellipse(sx, sy, 15, 15);   
        }  
        counter++; 
      }
             
// TEXT
    strokeWeight(0);
    fill(255);
    textSize(150);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text('iteration', width/2 , height/2.5);
    //pop(); 
}
       
function saveImage(){
    saveCanvas(c, 'iteration-logo', 'jpg');
}

*/
