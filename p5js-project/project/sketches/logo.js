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
    //selectCanvas.mousePressed(saveImage);
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
