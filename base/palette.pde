 //<>//

class Palette {

  String type;
  int steps;
  color[] colors;
  
  Palette(){
    
    color color1 = color(random(0,255), random(0,255), random(0,255));
    color color2 = color(random(0,255), random(0,255), random(0,255));
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
