
// ELLIPSE TARGET
public PShape drawTarget(float xloc, float yloc, int size, int numSteps) {
  PShape target = createShape(GROUP);
  float grayvalues = 255/numSteps;
  float steps = size/numSteps;
  for (int i = 0; i < numSteps; i++) {
    fill(245, i*grayvalues*.2);
    noStroke();
    PShape ellipse = createShape(ELLIPSE, xloc, yloc, size - i*steps, size - i*steps);
    target.addChild(ellipse);
  }
  noFill();
  return target;
}

// POLY TARGET
public PShape[] drawPolyTarget(float xloc, float yloc, int size, int polySides, int numSteps, color[] colors) {
  float alphaValues = 255/numSteps;
  float steps = size/numSteps;
  int strokePicker = 1;
  PShape[] polyTarget = new PShape[numSteps];
  for (int i = 0; i < numSteps; i++) {
    
    stroke(colors[strokePicker]);                        // tying to color picker really** limits qty of layers to 10
    fill(245, i * alphaValues * .2);    //  fill transfered ??? to shape ?
    PShape poly = drawPolygon(xloc, yloc, size - i*steps, polySides);
    polyTarget[i] = poly;
    strokePicker += 1;                                // get the color of this square < if same as strokePicker   strokePicker +=1
  }
  noFill();
  return polyTarget;
}

// Draws polygons with variables sides  
public PShape drawPolygon(float x, float y, float radius, int npoints) {
  float angle = TWO_PI / npoints;
  PShape polygon = createShape();
  
  polygon.beginShape();  
  polygon.strokeWeight(random(10,15));                                  // stroke as a % of  H / W           Smaller size in cell
  
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
    fill(radialColor);
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
  int strokePicker = int(random(3,11));
  int paletteLocation = int(random(2,11));                       //set stroke  relative to starsize
  
  while(paletteLocation == strokePicker){                   //  contrast enforce / abs value <3 or 4 to avoid blurriness  > additional element layers
   paletteLocation = int(random(2,11));                     // and or less contrast means smaller star    just a litte more star space   and or some rotation
  }                                                           // no 4  stars
  color newFill = colors[paletteLocation];
  
  star.beginShape(); 
  star.stroke(colors[strokePicker]);
  star.strokeWeight(random(5,15));                       // relative vs hard coded ?
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

// ROSE
public PShape drawRose(float d, float n) {
  
  float k = n / d;
  //translate(x, y);
  
  PShape rose = createShape();
  rose.beginShape();
  rose.stroke(0);
  rose.strokeWeight(20);
  
  for (float a = 0; a < TWO_PI * d; a += 0.02) {
    float r = 800 * cos(k * a);
    float x = r * cos(a);
    float y = r * sin(a);
    rose.vertex(x, y);
  }
  rose.endShape(CLOSE);
  return rose;
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


void setGradient(int x, int y, float w, float h, color c1, color c2, String axis ) {

  noFill();

  if (axis == "Y") {  // Top to bottom gradient
    for (int i = y; i <= y+h; i++) {
      float inter = map(i, y, y+h, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == "X") {  // Left to right gradient
    for (int i = x; i <= x+w; i++) {
      float inter = map(i, x, x+w, 0, 1);
      color c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

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

float sgn(float val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}
