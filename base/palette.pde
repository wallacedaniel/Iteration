/*
//Returns an array containing a lerp color gradient 
private color[] getLerps(color color1, color color2){           //int steps
  color[] colorSteps = new color[]{color1, lerpColor(color1, color2, .1), lerpColor(color1, color2, .2), lerpColor(color1, color2, .3), lerpColor(color1, color2, .4), 
    lerpColor(color1, color2, .5), lerpColor(color1, color2, .6), lerpColor(color1, color2, .7), lerpColor(color1, color2, .8), lerpColor(color1, color2, .9), 
    color2};  
  return colorSteps;
}

private color[] getLerps2(color color1, color color2){           //int steps //<>// //<>// //<>//
  color[] colorSteps = new color[]{color1, lerpColor(color1, color2, .2), lerpColor(color1, color2, .4), lerpColor(color1, color2, .6), lerpColor(color1, color2, .8), 
    color2};  
  return colorSteps;
}

*/




class Palette {

  String type;
  int steps;
  color[] colors;
  
  Palette(){
    
    //palette function
    color color1 = color(random(0,255), random(0,255), random(0,255));
    color color2 = color(random(0,255), random(0,255), random(0,255));
    color[] colorSteps = getLerps(color1, color2);
    
    this.colors = getLerps(color1, color2);
    
    }
    
    private color[] getLerps(color color1, color color2){           //int steps
      color[] colorSteps = new color[]{color1, lerpColor(color1, color2, .1), lerpColor(color1, color2, .2), lerpColor(color1, color2, .3), lerpColor(color1, color2, .4), 
        lerpColor(color1, color2, .5), lerpColor(color1, color2, .6), lerpColor(color1, color2, .7), lerpColor(color1, color2, .8), lerpColor(color1, color2, .9), 
        color2};  
      return colorSteps;
    }
    
   /*
    private color[] getColors(int steps, color color1, color color2){         
    
    color[] colors = new color[steps];
    colors[0] = color1;
    
    for(int i = 1; 1 < colors.length; i++){
      colors[i] = lerpColor(color1, color2, .1);  
    }
    return colors;
  }
  
  */
}
