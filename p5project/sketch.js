
let canvas;
let slider;
let W;
let H;

function setup() {
    //noStroke();
    //noFill();
    strokeWeight(20);
    stroke(255);
    createCanvas(600, 400);
    
    
    W = 10;
    H = 10;
    
    
    sliderX = createSlider(0, 100, W, W);     //  <<<< 2 of the same args
    sliderY = createSlider(0, 100, H, H);
    
    canvas = new Canvas(W, H);   //  <<< Naming ? canvas? grid?
    
    // canvas height / width variables  
    // sliders and grid to initial values
 
}


function draw() {
    canvas.update();
    canvas.display();  
}


// Canvas class
class Canvas {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    this.coordinates = getCoordinates(this.W, this.H);   
       
    this.rows = [];
    this.columns = []; 
    this.cells = [];
  }

  update() {
    let tempW = this.W; 
    let tempH = this.H; 
      
    this.W = sliderX.value(); // this -  needs to be out of  the loop >>  up into htlm input >> interactive?   different
    this.H = sliderY.value(); 
      
    if(tempW != this.W || tempH != this.H){
        this.coordinates = getCoordinates(this.W, this.H);      
    }  
  }

  display() {
    background(255);
    for(let i = 0; i < this.coordinates.length; i++){
        point(this.coordinates[i][0], this.coordinates[i][1]);         
    }
      
      
   }
    
}

function getCoordinates(W, H){        // need canvas size
 
    let newCoordinates = [];
    
    
    for (let x = 0; x <= 600; x += W) {
        
        for (let y = 0; y <= 400; y += H) { 
            let coordPair = [];
            coordPair[0] = x;
            coordPair[1] = y;
            newCoordinates.push(coordPair);  
        }
    }
    return newCoordinates;   // can I just do all at once and return all 4?
  }


//Create 
    
    /*
    // Create objects
    for (let i = 0; i < 50; i++) {
        bugs.push(new Jitter());
    }    
    // Create objects
    for (let i = 0; i < 50; i++) {
        bugs.push(new Jitter());
    }  
    // Create objects
    for (let i = 0; i < 50; i++) {
        bugs.push(new Jitter());
    } 
    */
























