// Sets design canvas bounds - palette - selects options/shapes/elements

class Designer {
  
  String design;
  Palette palette;
  String[] designShapes;
  int[] options;
  float[] bounds;
  boolean square;
  boolean background;
  Canvas canvas;

  Designer(String design){
    
    this.design = design;

    Palette palette = new Palette();
    this.palette = palette;
    
    int randomQty = 0;
    
    // BRICK PATTERN
    if(design == "brick-pattern"){ 
      this.bounds = new float [] {.05, .4, .05, .4};
      this.square = false;
    }
    // CONCENTRIC 
    else if(design == "concentric"){ 
      this.background = true;
    }
     // CONCENTRIC PATTERN
    else if(design == "concentric-pattern"){ 
      this.bounds = new float [] {.05, .25, .05, .25};                   
      this.square = true;
      this.background = true;
    }
    
    
    
    
    
    // HARLEQUIN
    else if(design == "harlequin"){  
      this.bounds = new float [] {.05, .25, .05, .25};
      this.square = false;
      this.background = false;
    } 
    
    
    
    
    
    
    // RADIAL STARBURST
    else if(design == "radial-starburst"){ 
      this.bounds = new float[] {0, width, 0, height};  
      this.background = true;
      randomQty = 1;
    }
     // ROSE
    else if(design == "rose"){ 
      this.bounds = new float [] {.05, .33, .05, .33};
      this.square = true;
      this.background = true;
    }
     // SCALES
    else if(design == "scales"){ 
      this.bounds = new float [] {.1, .33, .1, .33};
      this.square = true;
      this.background = false;
    }
     // SUPER
    else if(design == "super"){ 
      this.bounds = new float [] {.1, .33, .1, .33};
      this.square = false;
      this.background = false;
    }
     // SNOWFLAKES
    else if(design == "snowflakes"){ 
      this.bounds = new float [] {.1, .33, .1, .33};
      this.square = true;
      this.background = false;
    }
    // STAINED GLASS
    else if(design == "stained-glass"){ 
      this.bounds = new float [] {.05, .33, .05, .33};
      this.square = true;
    }
    // STARRY LANDSCAPE
    else if(design == "landscape"){ 
      this.bounds = new float [] {.075, .2, .1, .25};
      this.background = false;
    } 
      // STARS
    else if(design == "stars"){ 
      this.bounds = new float [] {.05, .33, .05, .33};
      this.square = true;
      this.background = true;
    }
      // STRIPED
    else if(design == "striped"){  
      this.bounds = new float [] {.1, .33, .1, .33};
      this.square = false;
       
      // OPTIONS
      
      // [0] direction 0 = Horizonta(Rows) 1 = Vertical(Columns) ***
      
      // [1] stripeStyle 0 = 1 = 2 = 3 = 4 = 
      // [2] stripeBalance 0 = yes 1 = no
      // [3] borderStyle
      
      this.options = new int[4];
      
      // [0] direction horizontal/vertical
      int dirPick = int(random(0,2)); 
      this.options[0] = dirPick;
      // other 2 styles
      // Stripe style bg/solid stripe : 0  /  bg/alt stripe : 1 (paint solid first? > contrast alts away)  /  stripe controlled random : 2  /  stripes alternate random solid : 3  /  stripes reg alternate : 4       
      int stripeStyle = int(random(0,3)); 
      this.options[1] = stripeStyle;
      
      // Even or Varying stripes
      int stripeBalance = int(random(0,2));
      this.options[2] = stripeBalance;
      
      //currently no / yes
      // Border style  none : 0  /  stripe by standard percentage and palette : 1  /  stripe controlled random : 2  /  stripes alternate random solid : 3  /  stripes reg alternate : 4     
      int borderStyle = int(random(0,2));  
      this.options[3] = borderStyle;
      
      // SHAPES
      // how many shape elements
      int shapesQty = int(random(0,4));
      // shapes picker - **able to pick multiple same**
      String [] shapes = new String [] {"harlequin", "rings", "snowflakes", "polys", "stars", "cirlces",
      "radials"};
      
      this.designShapes = new String[shapesQty];
      
      for(int i = 0; i < shapesQty; i++){
          int shapePick = int(random(0,shapes.length));
          this.designShapes[i] = shapes[shapePick];
      }      
    } //<>// //<>//
        // TILED POLYGONS
    else if(design == "tiled-polygons"){ 
      this.bounds = new float [] {.05, .25, .05, .25};
      this.square = true;
    }
      // TILED TRIANGLE PATTERN
    else if(design == "tiled-triangle-pattern"){ 
      this.bounds = new float [] {.05, .25, .05, .25};
      this.square = true;
      this.background = true;
    }
    
      // TEST
    else if(design == "test"){ 
      this.bounds = new float [] {.05, .25, .05, .25};
      this.square = false;
      this.background = false;
    }
    
    // CREATE CANVAS OBJECTS
    
    if(design == "radial-starburst"){
      this.canvas = new Canvas(this.bounds, randomQty);
    }
    else if(design == "concentric"){
      this.canvas = new Canvas();
    }
    else {
      this.canvas = new Canvas(this.bounds, this.square);
    }
  }      
}
