/*



   for (int i = 0; i < coordSize; i++) {
         x = design.canvas.coordinates.get(i)[0];
         y = design.canvas.coordinates.get(i)[1]; 
         println(x + "  " + y);
         if(design.design == "brick-pattern") {
           
            stroke(firstColor);
            paletteLocation = int(random(1,design.palette.colors.length));  
            newFill = design.palette.colors[paletteLocation];
            fill(newFill);
            // alternating rows pattern
            if(i % 2 == 0){newCell = createShape(RECT, x, y, W, H);}
            else{newCell = createShape(RECT, x - W/2, y, W, H);}
            //if(i % 2 != 0){newCell = createShape(RECT, x - W/2, y, W, H);}
            //newCell = createShape(RECT, x, y, W, H);
         }
         if(design.design != "tiled-triangle-pattern"){ 
    
            newCells.add(newCell);
         }  
      }       
      this.cells = newCells;



    size(500,500)
background(255)
noFill()
x1 = 100
pair1 = 150
x2 = 140
pair2 = 190
x3 = 175
pair3 = 225
 
#Option 1: Individual curves
bezier(x1, 150, 100, 50, 200, 50, pair1, 150)
bezier(x2, 150, 100, 50, 200, 50, pair2, 150)
bezier(x3, 150, 100, 50, 200, 50, pair3, 150)
 
#Option 2: Continuous shape
pairs = createShape()
pairs.beginShape()
pairs.vertex(x1, 300)
pairs.bezierVertex(100, 200, 200, 200, pair1, 300)
pairs.vertex(x2, 300)
pairs.bezierVertex(100, 200, 200, 200, pair2, 300)
pairs.vertex(x3, 300)
pairs.bezierVertex(100, 200, 200, 200, pair3, 300)
pairs.endShape()
shape(pairs)
 
#Option 3: Group shapes
parent = createShape(GROUP)
parent.beginShape()
child = createShape()
child.beginShape()
child.vertex(x1, 450)
child.bezierVertex(100, 350, 200, 350, pair1, 450)
child.endShape()
parent.addChild(child)
 
child = createShape()
child.beginShape()
child.vertex(x2, 450)
child.bezierVertex(100, 350, 200, 350, pair2, 450)
child.endShape()
parent.addChild(child)
 
child = createShape()
child.beginShape()
child.vertex(x3, 450)
child.bezierVertex(100, 350, 200, 350, pair3, 450)
child.endShape()
parent.addChild(child)
 
shape(parent)




















// Constants
int Y_AXIS = 1;
int X_AXIS = 2;
color b1, b2, c1, c2;

void setup() {
  size(640, 360);

  // Define colors
  b1 = color(255);
  b2 = color(0);
  c1 = color(204, 102, 0);
  c2 = color(0, 102, 153);

  noLoop();
}

void draw() {
  // Background
  setGradient(0, 0, width/2, height, b1, b2, X_AXIS);
  setGradient(width/2, 0, width/2, height, b2, b1, X_AXIS);
  // Foreground
  setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
  setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
}




*/
