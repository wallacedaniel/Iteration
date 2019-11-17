

let canvas, W, H, c1, c2, dimensions, strokeW, newStroke, newFill, colorIndex, firstDraw, canvasButton, c, bgStyle, bg, shapes, dropImage, img, newFile, newImage, colorHolder, cellHolder, shapeFillHolder, randomQty, shapeStrokeHolder, randomQtyElement, square, r1, g1, b1, r2, g2, b2, palette, canvasBack, rows, columns, cells, playButton, lines;


            

function setup() {
    //noLoop();
    noStroke();
    noFill();
    firstDraw = 1;
    
    bgStyle = createRadio();
    bgStyle.option('background');
    bgStyle.option('rows');
    bgStyle.option('columns');
    bgStyle.option('cells');
    
    shapes = createRadio();
    shapes.option('stars');      
    shapes.option('roses');
    shapes.option('diamonds');
    shapes.option('polygons');
    shapes.option('supers');
    shapes.option('snowflakes');   
    
    
    c = createCanvas(800, 800);
    W = createInput(40);  
    H = createInput(40);
    strokeW = createInput(4);  
    
    randomQtyElement = select('#randomQty'); 
    randomQtyElement.input(updateRandomPoints);
    
    square = true;
    
    dimensions = randomDimensions(square); 
    canvas = new Canvas(40, 40);   
    
    updateCanvas = select('#updateCanvas');
    updateCanvas.mousePressed(getInput);
    selectCanvas = select('#selectCanvas');
    selectCanvas.mousePressed(saveImage);
    
    canvasButton = createButton("New Canvas");
    canvasButton.mousePressed(canvas.getCoordinates);
    
    r1 = select('#r1');
    g1 = select('#g1');
    b1 = select('#b1');
    r2 = select('#r2');
    g2 = select('#g2');
    b2 = select('#b2');
    
   strokeWeight(strokeW.value());
       
   c1 = color(random(255), random(255), random(255));
   c2 = color(random(255), random(255), random(255));
    
    r1.attribute('value', c1.levels[0]);
    g1.attribute('value', c1.levels[1]);
    b1.attribute('value', c1.levels[2]);
    r2.attribute('value', c2.levels[0]);
    g2.attribute('value', c2.levels[1]);
    b2.attribute('value', c2.levels[2]);
    
    palette = new Palette(c1, c2);
    colorHolder = 0;
    cellHolder = 0;
    shapeFillHolder = 0;
    shapeStrokeHolder = 0;
    
    bg = 'background'; 
    dropImage = select('#dropImage');
    newFile = dropImage.drop(gotFile);
    
            
    playButton = select('#play');
    playButton.mousePressed(loop);
    
    playButton = select('#stop');
    playButton.mousePressed(noLoop);

}

function playControl(){
    
}

function draw() {
    canvas.update();
    palette.update();
    canvas.display(); 
}

class Canvas {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    this.rows = []; 
    this.columns = [];                        
    this.cells = []; 
    this.coordinates = this.getCoordinates();
    this.hLines = this.getHLines();
    this.vLines = this.getVLines();
    this.randoms = randomPoints(100);
  }

    update() {   
    }

    display() {
        
        
        canvasBack = true;
        rows = false;
        columns = false;
        cells = false;
        lines = true;
            
        if(canvasBack == true){
            background(palette.colors[0]);

        }     
        console.log(this.hLines);
        if(lines == true){
            for(let i = 0; i < this.hLines.length; i++){
                

              strokeWeight(this.W/3);
              //strokeCap(SQUARE);
              //strokeCap(ROUND);
              strokeCap(PROJECT)

                //beginShape();
                                 //this.hLines[i].length 
                for(let j = 0; j < this.hLines[i].length; j++){
                    
                     colorIndex = int(random(2,palette.colors.length)); 
                      while(abs(colorIndex - colorHolder) < 2){
                         colorIndex = int(random(2,palette.colors.length));   
                       }  
                      newStroke = palette.colors[colorIndex];
                      colorHolder = colorIndex;
                      stroke(newStroke);
                    
                    //curveVertex(this.hLines[i][j][0],this.hLines[i][j][1]);
                    //curveVertex(this.hLines[i][j][0] + this.W/2 ,this.hLines[i][j][1] - this.H/2);
                    line(this.hLines[i][j][0],this.hLines[i][j][1], this.hLines[i][j][0] + this.W/2 ,this.hLines[i][j][1] - this.H/2);
                    if(j != this.hLines[i].length - 1){
                        line(this.hLines[i][j][0] + this.W/2 ,this.hLines[i][j][1] - this.H/2, this.hLines[i][j+1][0],this.hLines[i][j+1][1]);
                    }
                    else if (j == this.hLines[i].length - 1){
                        line(this.hLines[i][j][0] + this.W/2 ,this.hLines[i][j][1] - this.H/2, width,this.hLines[i][j][1]);
                    }
                }
               // endShape();
            }
        }
        
   
        if(rows == true){
            for(let i = 0; i < this.rows.length; i++){
          
                

            }
        }
        if(columns == true){
            for(let i = 0; i < this.columns.length; i++){
                
              // Enforces Contrast - between columns   
              colorIndex = int(random(0,palette.colors.length)); 
              while(abs(colorIndex - colorHolder) < 2){
                 colorIndex = int(random(0,palette.colors.length));   
               }  
              newFill = palette.colors[colorIndex];
              colorHolder = colorIndex;
              fill(newFill);
                
                

              rect(canvas.columns[i][0], canvas.columns[i][1], canvas.columns[i][2], canvas.columns[i][3]); 
                
                /*
                for(let j = 0; j < this.hLines.length; j++){
                    console.log(this.hLines[i][j]);
                }
                */
                
                
            }
        }
        
        if(cells == true){
            
            //console.log(palette.colors[0].levels);
            
            for(let i = 0; i < canvas.cells.length; i++){
                
                
                
                //background(random(255),random(255),random(255));
                //drawTarget(canvas.coordinates[i][2], canvas.coordinates[i][3], canvas.W/2, 3, palette.colors, floor(random(3,11))); 
                

                
                noFill();
                strokeWeight(10);   // variable stroke weight   1 to 40
                
                
                 // Enforces Contrast - against columns
                 let c = get(canvas.coordinates[i][2], canvas.coordinates[i][3]);
                 for(let i = 0; i < palette.colors.length; i++){
                     if(palette.colors[i].levels[0] == c[0] && palette.colors[i].levels[0] == c[0] && palette.colors[i].levels[0] == c[0] &&  palette.colors[i].levels[0] == c[0]){
                        colorHolder = i;     
                     }
                 }
                
                  colorIndex = int(random(0,palette.colors.length));  
                  while(abs(colorIndex - colorHolder) < 3){
                     colorIndex = int(random(0,palette.colors.length));   
                   }  
                  newStroke = palette.colors[colorIndex];
                  stroke(newStroke);
                
                   let d;
                   let n;
                   do {
                        d = int(random(1,10));
                        n = int((random(1,8)));
                   } while (d  == n || (d == 3 && n  == 1)  || (d == 6 && n  == 2)  || (d == 9 && n == 3)) ;

                    push(); 
                    //translate(int(random(canvas.coordinates[i][2] - (canvas.W * .04), canvas.coordinates[i][2] + (canvas.W * .04))),
                         //int(random(canvas.coordinates[i][3] - (canvas.H * .04), canvas.coordinates[i][3] + (canvas.H * .04))));
                    translate(canvas.coordinates[i][2], canvas.coordinates[i][3]);
                    let r = (canvas.W/2) * .7;
                    //let r = random(canvas.W/2 *.4 , canvas.W/2);
                    rose(d, n, r);
                    pop();
                
            }
        }
    }

    getCoordinates(){        

        let newCoordinates = [];
        
        if(canvas){
            canvas.W = int(W.value());
            canvas.H = int(H.value());
            this.W = int(W.value());
            this.H = int(H.value());
            canvas.coordinates = [];
            canvas.rows = [];
            canvas.columns = [];
            canvas.cells = [];
        }

        for (let x = 0; x <= width; x += this.W) {  
            for (let y = 0; y <= height; y += this.H) {
                
                let coords = [];
                coords[0] = x;
                coords[1] = y;
                if(canvas){
                    coords[2] = x + canvas.W/2; 
                    coords[3] = y + canvas.H/2;
                } else {
                    coords[2] = x + this.W/2; 
                    coords[3] = y + this.H/2;   
                }
                newCoordinates.push(coords);
                
                let newCell = [];
                newCell[0] = x;
                newCell[1] = y;
                if(canvas){
                    newCell[2] = canvas.W;
                    newCell[3] = canvas.H;                  
                    canvas.cells.push(newCell); 
                } else {
                    newCell[2] = this.W;
                    newCell[3] = this.H;
                    this.cells.push(newCell); 
                }   
                
                if(x == 0){
                    let newRow = [];
                    newRow[0] = x;
                    newRow[1] = y;
                    newRow[2] = width; 
                    if(canvas){
                        newRow[3] = canvas.H;
                        canvas.rows.push(newRow); 
                    } else {
                        newRow[3] = this.H;
                        this.rows.push(newRow); 
                    }  
                }
                if(y == 0){ 
                    let newColumn = [];
                    newColumn[0] = x;
                    newColumn[1] = y;
                    newColumn[3] = height;
                    if(canvas){ 
                        newColumn[2] = canvas.W;                      
                        canvas.columns.push(newColumn); 
                    } else {
                        newColumn[2] = this.W;
                        this.columns.push(newColumn); 
                    }
                }
            }
        }
        if(canvas){
            canvas.coordinates = newCoordinates;
            palette.update();
        } else {
            return newCoordinates;     
        }
         
    }
    
    getHLines(){
        let hLines = [];
        let hLine;
        let coords;
        for(let i = 0; i < this.rows.length; i++){
            hLine = [];
            for(let j = 0; j < width; j += this.W){
                coords = [];
                coords[0] = j;
                coords[1] = this.rows[i][1];
                hLine.push(coords);
            }
        hLines.push(hLine);
        }
        return hLines;
    }
    
    getVLines(){ 
        let vLines = [];
        let vLine;
        let coords;
        for(let i = 0; i < this.columns.length; i++){
            vLine = [];
            for(let j = 0; j < height; j += this.H){
                coords = [];
                coords[0] = this.columns[i][0];
                coords[1] = j;
                vLine.push(coords);
            }
        vLines.push(vLine);
        }
        return vLines;
    }
}

class Palette {  
    
    constructor(color1, color2) {
        this.colors = this.getColors(color1, color2);
    }

    getColors(color1, color2){ 
        let newColors = [];
        newColors[0] = color1;
        for(let i = 1; i < 10; i++){
            newColors[i] = lerpColor(color1, color2, i * .1);    
        }
        newColors[10] = color2;
        return newColors;             
    }  
    
    update(color1, color2){
        strokeWeight(strokeW.value());
    }
}

function randomDimensions(square){ 
    // if(square == true)    <<<<<<<<<<<<<    
    
    let wOptions = []
    let hOptions = []
     for(let i = 1; i <= width; i++){
      // && i >= (width * innerWBound) && i <= (width * outerWBound)
      if(width % i == 0){
        wOptions.push(i);
      }
    }
    for(let i = 1; i <= height; i++){
      if(height % i == 0){
        hOptions.push(i);
      }
    }
    let newDimensions = [];
    let newW = wOptions[int(random(wOptions.length))];
    let newH = hOptions[int(random(hOptions.length))]; 
    newDimensions[0] = newW;
    newDimensions[1] = newH;
        
    return newDimensions;
}

function drawTarget(xLoc, yLoc, size, numSteps, colors, polySides) {
  let alphaValues = 255/numSteps;
  let steps = size/numSteps;
  //let strokePicker = 2;

  for (let i = 0; i < numSteps; i++) {
    //stroke(colors[strokePicker]);                  
    fill(245, i * alphaValues * .17);    
    polygon(xLoc, yLoc, size - i*steps, polySides, numSteps);                                   
    //strokePicker += 1;                               
  }
  noFill();
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

function drawTiledTris(cells, H, W){
    triangle(cells[0], cells[1], cells[0] + W/2, cells[1] + H/2, cells[0], cells[1] + H);
    fill(palette.colors[int(random(0,palette.colors.length))]);
    triangle(cells[0] + W, cells[1], cells[0] + W/2, cells[1] + H/2, cells[0], cells[1]);
    fill(palette.colors[int(random(0,palette.colors.length))]);
    triangle(cells[0] + W, cells[1] + H, cells[0] + W/2, cells[1] + H/2, cells[0] + W, cells[1]);
    fill(palette.colors[int(random(0,palette.colors.length))]);
    triangle(cells[0], cells[1] + H, cells[0] + W/2, cells[1] + H/2, cells[0] + W, cells[1] + H);
}

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

function getInput(){
     bg = bgStyle.value();
     shape = shapes.value();
    if(r1.value() != undefined){
        c1 = color(r1.value(), g1.value(), b1.value());
        c2 = color(r2.value(), g2.value(), b2.value());
        palette.colors = palette.getColors(c1, c2);
    }
}
        
function saveImage(){
    saveCanvas(c, 'iteration-roses', 'jpg');
}

function randomPoints(){
    
    randomQty = int(randomQtyElement.value());
    
    let randPoints = [];
    for(let i = 0; i < randomQty; i++){
        let randPair = [];
        randPair[0] = int(random(width));
        randPair[1] = int(random(height));
        randPoints.push(randPair);
    }
    return randPoints;
};

function updateRandomPoints(){
    canvas.randoms = randomPoints();
}

function gotFile(file){
    //createP(file.name + " " + file.size);   
    //createP(file.type); 
    //createP(file.size); 
    //newImage = file;
    img = createImg(file.data);
    img.size(canvas.W,canvas.H);
    img.mouseClicked(insertImage);
}

function insertImage(){
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
        let divisorOptions = [3,4,6,8];
        this.divisor = divisorOptions[int(random(0,divisorOptions.length))]; 
    }
    
    drawSnowflake(){  
    translate(this.locX, this.locY);
    let x = 0;
    let y = 0;
    let angle = TWO_PI / this.divisor;
    //stroke(this.strokeColor);
    //strokeWeight(this.strokeWeight);
    //let fillColor;                                                                       
    let polyOptions = [3,4,6,8];
    let polySides = polyOptions[int(random(0,polyOptions.length))];    
    //PShape newShape;                                                                //??    <<<<
    let polarPicker = int(random(0, 10));


    while((this.divisor == 3 && polySides == 4) || (this.divisor == 4 && polySides == 3 )){
      polySides = polyOptions[int(random(0,polyOptions.length))];
      
    }
    
    if(polySides == 3 && this.levels == 2){
      this.levels = int(random(3,5));  
    }    
    
    //this.strokeColor = this.palette[int(random(0,palette.length-1))];
    //stroke(this.strokeColor);

    // Draws just the lines first
    for (let a = 0; a < TWO_PI * 6; a += angle) {  
      let sx = x + cos(a) * this.radius;
      let sy = y + sin(a) * this.radius;
      line(0, 0, sx, sy);
    }      
    //  SHAPES   
    let tempRadius = this.radius;
    
    for(let i = 0; i < this.levels; i++){
      this.radius = tempRadius;
      //stroke(this.strokeColor);                       
      //fillColor = this.strokeColor;                
      
      if(i != 0){
        this.radius = this.radius * (i * .25);
      }       
      
      //this.fillColor = this.palette[int(random(2,palette.length))];
      //this.strokeColor = this.palette[int(random(2,palette.length))];
      //stroke(this.strokeColor);
      
      for (let a = 0; a < TWO_PI * 6; a += angle) {  
        let sx = x + cos(a) * this.radius;
        let sy = y + sin(a) * this.radius;
        //noFill();
        //fill(this.fillColor);                       
        //ellipse(sx, sy, radius/4, radius/4); 
        
         if(polarPicker >= 0 && polarPicker < 7){
              //newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);    // <<<<<<<<<<<<<<<<<<<
              //shape(newShape); 
              noFill();
              //newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);           <<<<<<<<<<<<<<<<<<<<<,
              ///shape(newShape); 
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
              
          //stroke(this.strokeColor);
          for (let a = 0; a < TWO_PI * 6; a += angle) {  
            let sx = x + cos(a) * this.radius;
            let sy = y + sin(a) * this.radius;
            line(0, 0, sx, sy);
          }         
          
          for(let j = 0; j < this.levels; j++){
      
            this.radius = tempRadius;
            
            if(j != 0){
              this.radius = this.radius * (j * .25);
            }   

            //this.fillColor = this.palette[int(random(2,palette.length))]; 
            //this.strokeColor = this.palette[int(random(2,palette.length))];
            //stroke(this.strokeColor);
            
            for (let a = 0; a < TWO_PI * 6; a += angle) {  
              let sx = x + cos(a) * this.radius;
              let sy = y + sin(a) * this.radius;
              //fill(this.fillColor);                                        
             if(polarPicker >= 0 && polarPicker < 7){
                  ///newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);            <<<<<<<<<<<<<<<
                 // shape(newShape); 
                  noFill();
                  //newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);        <<<<<<<<<<<<<<<<<<<
                 /// shape(newShape); 
              } else {
                  ellipse(sx, sy, this.radius/2, this.radius/2);   
                  noFill();
                  ellipse(sx, sy, this.radius/4, this.radius/4); 
              }           
              //newShape = drawStar(sx, sy, radius/4, radius/2, polySides, this.palette);
              //shape(newShape);
              //newShape = drawStar(sx, sy, radius/10, radius/6,  polySides, this.palette);  
              //shape(newShape);      
            }           
          }      
        rotate(-1.05);
        //rotate(-.33);
        pop();      
      }

      if (this.divisor == 4 ){
        
        push();      
        rotate(.75);        
        scale(.75);       
        
          //stroke(this.strokeColor);
          for (let a = 0; a < TWO_PI * 6; a += angle) {  
            let sx = x + cos(a) * this.radius;
            let sy = y + sin(a) * this.radius;
            line(0, 0, sx, sy);
          }
                    
          for(let j = 0; j < this.levels; j++){    
            this.radius = tempRadius;
            if(j != 0){
              this.radius = this.radius * (j * .25);
            }      
            //stroke(this.strokeColor);
            //this.fillColor = this.palette[int(random(0,palette.length-1))]; 
            for (let a = 0; a < TWO_PI * 6; a += angle) {  
              let sx = x + cos(a) * this.radius;
              let sy = y + sin(a) * this.radius;              
              //fill(this.fillColor); 
              //   <<<<<<<<<<<<<<<<<
              if(polarPicker >= 0 && polarPicker < 7){
                  //newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);             <<<<<<<<<<<<<<<<
                  //shape(newShape); 
                  noFill();
                  //newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);             ,<<<<<<<<<<<<<<<<
                  //shape(newShape); 
              } else {
                  ellipse(sx, sy, this.radius/2, this.radius/2);   
                  noFill();
                  ellipse(sx, sy, this.radius/4, this.radius/4); 
              }               
              //newShape = drawStar(sx, sy, radius/2, radius/4, polySides, this.palette);
              //shape(newShape); 
              //newShape = drawStar(sx, sy, radius/10, radius/6, polySides, this.palette);
              //shape(newShape); 
            }           
          } 
        rotate(-.75);       
        pop(); 

      }
        
    }
        
}
    
}



/*


// RADIALS
function drawRadial(diameter, divisor, angle, x, y, colors) {
  
  let lastAngle = 0;
  let index = int(random(0, colors.length));
  let check = true;
  let step = 3;
  //PShape radial = createShape();
  //PShape radialGroup = createShape(GROUP);
  
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
    fill(radialColor, 50);
    //radial = createShape(ARC, x, y, diameter, diameter, lastAngle, lastAngle + radians(angle));
    //radialGroup.addChild(radial);
    lastAngle += radians(angle);
  }
  noFill();
  //return radialGroup;
} 

// Returns a list of angle / divisor pairs - constrained to usable values 
function radialOptions(innerBound, outerBound) { 

  radials = [];
  angles = [];
  divisors = [];

  for (let divisor = innerBound; divisor <= outerBound; divisor++) {
    if (360 % divisor == 0) {
      divisors.append(divisor);
      let angle = 360 / divisor;
      angles.append(angle);
    } 
    radials[0] = divisors;
    radials[1] = angles;
  }
  return radials;
}

*/
        







