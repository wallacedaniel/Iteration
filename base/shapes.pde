
public PShape drawStar(float x, float y, float radius1, float radius2, int npoints, color[] colors) {
  float angle = TWO_PI / npoints;
  float halfAngle = angle/2.0;
  
  PShape star = createShape();
  

  int strokePicker = int(random(2,11));
   
   
  int paletteLocation = int(random(2,11));  
  while(paletteLocation == strokePicker){                   //  contrast enforce / abs value <3 or 4 to avoid blurriness  > additional element layers
   paletteLocation = int(random(2,11));                     // and or less contrast means smaller star    just a litte more star space   and or some rotation
  }                                                           // no 4  stars
  
  color newFill = colors[paletteLocation];
  

  star.beginShape();
  
  star.stroke(colors[strokePicker]);
  star.strokeWeight(random(5 , 80));                       // relative vs hard coded ?
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


// Draws concentric stepped polygons with variables sides, with stepped gray values and opacity
public PShape[] drawPolyTarget(float xloc, float yloc, int size, int polySides, int numSteps) {
  float alphaValues = 255/numSteps;
  float steps = size/numSteps;
  PShape[] polyTarget = new PShape[numSteps];
  for (int i = 0; i < numSteps; i++) {
    fill(245, i * alphaValues * .2);
    PShape poly = drawPolygon(xloc, yloc, size - i*steps, polySides);
    polyTarget[i] = poly;
  }
  noFill();
  return polyTarget;
}

// Draws polygons with variables sides
public PShape drawPolygon(float x, float y, float radius, int npoints) {
  float angle = TWO_PI / npoints;
  PShape polygon = createShape();
  
  polygon.beginShape();
  
  polygon.stroke(0);
  polygon.strokeWeight(50);
  //polygon.fill(125);
  
  for (float a = 0; a < TWO_PI; a += angle) {
    float sx = x + cos(a) * radius;
    float sy = y + sin(a) * radius;
    polygon.vertex(sx, sy);
  }
  polygon.endShape(CLOSE);
  return polygon;
}


public PShape drawPolar(int locX, int locY, float r, int divisor ) {
  //translate(width/2, height/2);
  translate(locX, locY);
  PShape polar = createShape();
  //r = 1000;
  float x = 0;
  float y = 0;
  //float angle = TWO_PI / 12;
  float angle = TWO_PI / divisor;
  
  //int ellipseSize = 350;
  polar.beginShape();
  for (float a = 0; a < TWO_PI * 6; a += angle) {  
    float sx = x + cos(a) * r;
    float sy = y + sin(a) * r;
    line(0, 0, sx, sy);
    //ellipse(sx, sy, ellipseSize, ellipseSize);  
    //r += 100;
  }
  polar.endShape();
  return polar;
}


/*

// RADIALS
void drawRadial(float diameter, int divisor, int angle, int x, int y, color elementColor, color elementColor2) {
  float lastAngle = 0;
  color[] radialSteps = getLerps(elementColor, elementColor2);
  int index = int(random(0, radialSteps.length));

  Boolean check = true;
  int step = 3;

  for (int i = 0; i < divisor; i++) {
    if (index + step < radialSteps.length && check == true) {
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
    color radialColor = radialSteps[index];   
    stroke(125);
    strokeWeight(25);
    noFill();
    PShape radial = createShape(ARC, x, y, diameter, diameter, lastAngle, lastAngle + radians(angle));
    shape(radial);
    lastAngle += radians(angle);
  }
   noFill();
} 









// RADIALS
void drawRadial(float diameter, int divisor, int angle, int x, int y, color elementColor, color elementColor2) {
  float lastAngle = 0;
  color[] radialSteps = getLerps(elementColor, elementColor2);
  int index = int(random(0, radialSteps.length));

  Boolean check = true;
  int step = 3;

  for (int i = 0; i < divisor; i++) {
    if (index + step < radialSteps.length && check == true) {
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
    color radialColor = radialSteps[index];   
    arc(x, y, diameter, diameter, lastAngle, lastAngle + radians(angle));
    lastAngle += radians(angle);
  }
   noFill();
} 
*/















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




/*

// Draws concentric circle "target" with stepped gray values and opacity
void drawTarget(float xloc, float yloc, int size, int numSteps) {
  float grayvalues = 255/numSteps;
  float steps = size/numSteps;
  for (int i = 0; i < numSteps; i++) {
    fill(245, i*grayvalues*.2);
    ellipse(xloc, yloc, size - i*steps, size - i*steps);
  }
  noFill();
}



// RADIALS

















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
