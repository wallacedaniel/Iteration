 //<>// //<>//

class Palette {

  String type;
  int steps;
  color[] colors;
  
  Palette(){
   
    color color1 = color(random(0,255), random(0,255), random(0,255));
    color color2 = color(random(0,255), random(0,255), random(0,255));
     /*
    //color color1 = color(210, 242, 142);  //mountain
    //
    //indian poink orange yellow
    color color1 = color(228, 187, 20);
    color color2 = color(241, 50, 161); 
    //red orange
    color color2 = color(176, 15, 53); 
    color color1 = color(242, 153, 31); 

    color color2 = color(216, 60, 42);
    color color1 = color(236, 166, 39);//mountain
       
     //turq orange
     color color1 = color(245, 162, 39);
    color color2 = color(80, 239, 219);
     
     color color2 = color(166, 45, 95);
    color color1 = color(239, 216, 25);
    
    color color2 = color(68, 8, 58);
    color color1 = color(233, 228, 80);
    
    color color2 = color(13, 4, 153);
    color color1 = color(56, 241, 138);
     
    //color color2 = color(230, 4, 133);
    //color color2 = color(64, 162, 96);
    //color color2 = color(18, 190, 214);
    
    //color color1 = color(232, 224, 238);
    
    color color2 = color(42, 171, 164);
    color color1 = color(232, 250, 45);
        
    color color2 = color(62, 21, 90);
    color color1 = color(55, 203, 171);
           
    color color2 = color(170, 242, 184);
    color color1 = color(94, 34, 194);
          
    color color2 = color(22, 56, 230);
    color color1 = color(66, 219, 241);
    color color2 = color(233, 246, 237);
    color color1 = color(132, 33, 189);
   
         color color2 = color(173,207,223);
    color color1 = color(40, 60, 156);
    
   */
  
    color[] colorSteps = getLerps(color1, color2);
    
    this.colors = getLerps(color1, color2);
    
    }
    
    private color[] getLerps(color color1, color color2){          
      color[] colorSteps = new color[]{color1, lerpColor(color1, color2, .1), lerpColor(color1, color2, .2), lerpColor(color1, color2, .3), lerpColor(color1, color2, .4), 
        lerpColor(color1, color2, .5), lerpColor(color1, color2, .6), lerpColor(color1, color2, .7), lerpColor(color1, color2, .8), lerpColor(color1, color2, .9), 
        color2};  
      return colorSteps;
    }
}


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








void radialGradient(float x, float y, int radius, float color1) {
  ellipseMode(RADIUS);  
  colorMode(HSB, 360, 100, 100);
  //colorMode(RGB, 255, 255, 255);

  for (int r = radius; r > 0; --r) {
    fill(color1,90,90);
    ellipse(x, y, r, r);
    color1 = (color1 + 1) % 360;
  }
  colorMode(RGB, 255, 255, 255);
  ellipseMode(CENTER);
}
