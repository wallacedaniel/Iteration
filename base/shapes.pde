// Every Shape should be Target


// ELLIPSE TARGET
public PShape drawTarget(float xloc, float yloc, int size, int numSteps) {
  PShape target = createShape(GROUP);
  float grayvalues = 255/numSteps;
  float steps = size/numSteps;
  for (int i = 0; i < numSteps; i++) {
    //fill(245, i*grayvalues*.12);
    //noStroke();
    stroke(125);
    PShape ellipse = createShape(ELLIPSE, xloc, yloc, size - i*steps, size - i*steps);
    target.addChild(ellipse);                                                              //  <<<<<<<<  instead of arrays below??
  }
  noFill();
  return target;
}

// POLY TARGET
public PShape[] drawPolyTarget(float xloc, float yloc, int size, int polySides, int numSteps, color[] colors) {
  float alphaValues = 255/numSteps;
  float steps = size/numSteps;
  int strokePicker = 2;
  PShape[] polyTarget = new PShape[numSteps];
  for (int i = 0; i < numSteps; i++) {
    
    stroke(colors[strokePicker]);                        // tying to color picker really** limits qty of layers to 10
    fill(245, i * alphaValues * .17);    //  fill transfered ??? to shape ?
    PShape poly = drawPolygon(xloc, yloc, size - i*steps, polySides, 12);                                              // <<<<<<<   re implement randoms   not  12
    polyTarget[i] = poly;
    strokePicker += 1;                                // get the color of this square < if same as strokePicker   strokePicker +=1
  }
  noFill();
  return polyTarget;
}

// Draws polygons with variables sides  
public PShape drawPolygon(float x, float y, float radius, int npoints, int strokeWeight) {
  float angle = TWO_PI / npoints;
  PShape polygon = createShape();
  
  polygon.beginShape();  
  polygon.strokeWeight(strokeWeight);                                  // stroke as a % of  H / W           Smaller size in cell
  
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius;
    float sy = y + sin(a) * radius;
    polygon.vertex(sx, sy);
  }
  polygon.endShape(CLOSE);
  return polygon;
}

// RADIALS
public PShape drawRadial(float diameter, int divisor, int angle, int x, int y, color[] colors) {
  
  float lastAngle = 0;
  int index = int(random(0, colors.length));
  Boolean check = true;
  int step = 3;
  PShape radial = createShape();
  PShape radialGroup = createShape(GROUP);
  
  for (int i = 0; i < divisor; i++) {
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
    color radialColor = colors[index];
    fill(radialColor, 50);
    radial = createShape(ARC, x, y, diameter, diameter, lastAngle, lastAngle + radians(angle));
    radialGroup.addChild(radial);
    lastAngle += radians(angle);
  }
  noFill();
  return radialGroup;
} 

// Returns a list of angle / divisor pairs - constrained to usable values 
IntList[] radialOptions(int innerBound, int outerBound) { 

  IntList[] radials = new IntList[2];
  IntList angles = new IntList();
  IntList divisors = new IntList();

  for (int divisor = innerBound; divisor <= outerBound; divisor++) {
    if (360 % divisor == 0) {
      divisors.append(divisor);
      int angle = 360 / divisor;
      angles.append(angle);
    } 
    radials[0] = divisors;
    radials[1] = angles;
  }
  return radials;
}

// STARS
public PShape drawStar(float x, float y, float radius1, float radius2, int npoints, color[] colors) {
  
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0; 
  PShape star = createShape();  
  //int strokePicker = int(random(3,11));
  //int paletteLocation = int(random(2,11));  //set stroke  relative to starsize
  
  int strokePicker = int(random(0,colors.length));
  int fillPicker = int(random(0,colors.length));
  
  while(fillPicker  == strokePicker){                   //  contrast enforce / abs value <3 or 4 to avoid blurriness  > additional element layers
   fillPicker  = int(random(0,colors.length));                     // and or less contrast means smaller star    just a litte more star space   and or some rotation
  }                                                           // no 4  stars
  color newFill = colors[fillPicker] ;
  
  star.beginShape(); 
  star.stroke(colors[strokePicker]);
  star.strokeWeight(random(int(height * .001),int(height * .003)));                       // relative vs hard coded ?            <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,
  star.fill(newFill);
  
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius2;
    float sy = y + sin(a) * radius2;
    star.vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    star.vertex(sx, sy);
  }
  star.endShape(CLOSE);
  return star;
}

/*

paletteLocation = int(random(2,design.palette.colors.length));
         
          while(paletteLocation == strokePicker){
            paletteLocation = int(random(2,design.palette.colors.length));   
          }
         

          while(abs(paletteLocation - locHolder) < 2){
             paletteLocation = int(random(2,design.palette.colors.length));   
           }  
          newFill = design.palette.colors[paletteLocation];
          locHolder = paletteLocation;
          fill(newFill);

*/


// ROSE
public PShape drawRose( int locX, int locY, float d, float n, int radius, color[] colors) {
  
  float k = n / d;
  translate(locX, locY);
  
  PShape rose = createShape();
  rose.beginShape();
  
  int paletteLocation = int(random(4,colors.length - 1));
         
  color newFill = colors[paletteLocation];

  
  //rose.stroke(colors[int(random(6,colors.length))]);
  rose.stroke(colors[colors.length-1]);
  rose.noFill();
  //rose.fill(newFill);
  rose.strokeWeight(radius/15);
  
  for (float a = 0; a < TWO_PI * d; a += 0.02) {
    float r = radius * cos(k * a);
    float x = r * cos(a);
    float y = r * sin(a);
    rose.vertex(x, y);
  }
  rose.endShape(CLOSE);
  return rose;
}

public int[] randomRose(){
  int[] roseOptions = new int[2];
  
  do {
    roseOptions[0] = int(random(1,10));
    roseOptions[1] = int((random(1,8)));
  } while (roseOptions[0]  == roseOptions[1] || (roseOptions[0] == 3 && roseOptions[1]  == 1)  || (roseOptions[0] == 6 && roseOptions[1]  == 2)  || (roseOptions[0] == 9 && roseOptions[1]  == 3)) ;
  
  return roseOptions;
}


/*
// CIRCLES
class Circle{
  
  float locX;
  float locY;
  int sizeX;
  int sizeY;
  int steps;
  
  ArrayList<PShape> circles = new ArrayList<PShape>(3){};
  
  
  //float grayvalues; //= 255/steps;
  
 //steps = size/steps;   <<<<
  

  // array of the individual ellipses  -fill -strokeColor -strokeWeight  -transp

  int stroke;
  int strokeWeight;
  color strokeColor;
  color fillColor;
  
  // In design for through Canvas > add to arrayList[] then draw
  //Circle newCircle = new Circle(3.4, 5.7, 3, 3, 7);   <<  newCircle.drawCircle();           for newCircle.circles shape(circle , locX, locY)    var circlele = circles.get(i)
  
  Circle(float locX, float locY, int sizeX, int sizeY, int steps){    
    
    this.locX = locX;
    this.locY = locY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.steps = steps;
    
    //always makes concentric   <introduce random 
    for (int i = 0; i < this.steps; i++) {        
         PShape circle = createShape(ELLIPSE, locX, locY, sizeX - i*steps, sizeY - i*steps);
         //print("circle");
         this.circles.add(circle);        
    }
    
    //this.circles.Add();
    
  }
 
  //palette info
  
  
  void drawCircle(){
    
    PShape thisCircle;
   
      for(int i = 0; i < this.circles.size(); i++){
        thisCircle = this.circles.get(i);
        shape(thisCircle, this.locX, this.locY);
      }
 
     //for (int i = 0; i < circles.size(); i++) {
       
        //if
        //fill(245, i*grayvalues*.2);
      
       // draw circle at iteration <<<<
       //shape(circle, 10, 10);        << just call the shape in the design
        
   // }
  }

}



*/










public PShape superEllispe(int locX, int locY, color[] colors) {          //  translate value??
  translate(locX, locY);

  float a = 100;
  float b = 100;
  float n = 2;
 
  PShape superEllipse = createShape();
  int strokePicker = int(random(2,11));
  int paletteLocation = int(random(2,11));                       //set stroke  relative to starsize
  
  while(paletteLocation == strokePicker){                   //  contrast enforce / abs value <3 or 4 to avoid blurriness  > additional element layers
   paletteLocation = int(random(2,11));                     // and or less contrast means smaller star    just a litte more star space   and or some rotation
  } 
                                                             // no 4  stars
  color newFill = colors[paletteLocation]; 
  superEllipse.beginShape();
  superEllipse.stroke(colors[strokePicker]);
  superEllipse.strokeWeight(random(0));                       // relative vs hard coded ?
  superEllipse.fill(newFill);
  
  for (float angle = 0; angle < TWO_PI; angle += 0.1) {

    // Superellipse
    float na = 2 / n;
    float x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    float y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    superEllipse.vertex(x, y);
  }
  superEllipse.endShape(CLOSE);
  return superEllipse;
}




public PShape drawSuperTarget(int xLoc, int yLoc,  color[] colors, int numSteps, float a, float b, float n) {
  
  strokeWeight(10);  //  a or b %
  translate(xLoc, yLoc);
  PShape superTarget = createShape(GROUP);

  for (int i = 0; i < numSteps; i++) {
    
    PShape superShape = createShape();  
      
    superShape.beginShape();
    superShape.stroke(colors[colors.length-1]);
    superShape.fill(colors[int(random(1,colors.length-3))]);    
    for (float angle = 0; angle < TWO_PI; angle += 0.1) {
      float na = 2 / n;
      float x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
      float y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
      superShape.vertex(x, y);
    }
    a *= .5;
    b *= .5;
    superShape.endShape(CLOSE);
    superTarget.addChild(superShape);
  }
  return superTarget;
}

float sgn(float val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}
