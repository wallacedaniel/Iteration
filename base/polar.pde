
class Polar{
  
  // two color types   full palette w/ random back     -     back as part of palette contrast enforced
  // 70/30 poly/ellipse
  
  int levels;
  int divisor;
  float radius;
  int locX;
  int locY;
  int strokeWeight;
  color strokeColor;
  color[] palette;
  
  Polar(int locX, int locY, float radius, color[] colors){           //    3,palette.length - 1
    
    this.radius = radius;
    this.strokeWeight = int(this.radius * .04);
    this.locX = locX;
    this.locY = locY;
    int[] divisorOptions = new int[]{3,4,6,8};
    this.divisor = divisorOptions[int(random(0,divisorOptions.length))];     
    this.levels = int(random(2,5));
    this.strokeColor = 0;
    this.palette = colors;   
  }  
  
  void drawPolar() {
    
    
    
        
    translate(locX, locY);
    float x = 0;
    float y = 0;
    float angle = TWO_PI / divisor;
    stroke(this.strokeColor);
    strokeWeight(this.strokeWeight);
    color fillColor;    
    int[] polyOptions = new int[]{3,4,6,8};
    int polySides = polyOptions[int(random(0,polyOptions.length))];    
    PShape newShape;
    int polarPicker = int(random(0, 10));


    while((this.divisor == 3 && polySides == 4) || (this.divisor == 4 && polySides == 3 )){
      polySides = polyOptions[int(random(0,polyOptions.length))];
      
    }
    
    if(polySides == 3 && this.levels == 2){
      this.levels = int(random(3,5));  
    }    
    
    strokeColor = this.palette[int(random(0,palette.length-1))];
    stroke(strokeColor);

    // Draws just the lines first
    for (float a = 0; a < TWO_PI * 6; a += angle) {  
      float sx = x + cos(a) * radius;
      float sy = y + sin(a) * radius;
      line(0, 0, sx, sy);
    }
       
       
       
    //  SHAPES  
       
       
    float tempRadius = radius;
    
    for(int i = 0; i < this.levels; i++){
      radius = tempRadius;
      //stroke(this.strokeColor);                       // <<<<<
      //fillColor = this.strokeColor;                // <<<<<<
      
      if(i != 0){
        radius = radius * (i * .25);
      }       
      
      fillColor = this.palette[int(random(2,palette.length))];
      strokeColor = this.palette[int(random(2,palette.length))];
      stroke(strokeColor);
      
      for (float a = 0; a < TWO_PI * 6; a += angle) {  
        float sx = x + cos(a) * radius;
        float sy = y + sin(a) * radius;
        //noFill();
        fill(fillColor);                     // <<<<<<<<<<<<<<<<<<<<
        
             
        //ellipse(sx, sy, radius/4, radius/4); 
        
         if(polarPicker >= 0 && polarPicker < 7){
              newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);
              shape(newShape); 
              noFill();
              newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);
              shape(newShape); 
          } else {
              ellipse(sx, sy, radius/2, radius/2);   
              noFill();
              ellipse(sx, sy, radius/4, radius/4); 
          }
      }
         
      if (this.divisor == 3){
        
        pushMatrix();        
        rotate(1.05);        
        scale(.75);
              
          stroke(this.strokeColor);
          for (float a = 0; a < TWO_PI * 6; a += angle) {  
            float sx = x + cos(a) * radius;
            float sy = y + sin(a) * radius;
            line(0, 0, sx, sy);
          }         
          
          for(int j = 0; j < this.levels; j++){
      
            radius = tempRadius;
            
            if(j != 0){
              radius = radius * (j * .25);
            }   

            fillColor = this.palette[int(random(2,palette.length))]; 
            strokeColor = this.palette[int(random(2,palette.length))];
            stroke(strokeColor);
            
            for (float a = 0; a < TWO_PI * 6; a += angle) {  
              float sx = x + cos(a) * radius;
              float sy = y + sin(a) * radius;
              fill(fillColor);                                        


             if(polarPicker >= 0 && polarPicker < 7){
                  newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);
                  shape(newShape); 
                  noFill();
                  newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);
                  shape(newShape); 
              } else {
                  ellipse(sx, sy, radius/2, radius/2);   
                  noFill();
                  ellipse(sx, sy, radius/4, radius/4); 
              }
              

              //newShape = drawStar(sx, sy, radius/4, radius/2, polySides, this.palette);
              //shape(newShape);
              //newShape = drawStar(sx, sy, radius/10, radius/6,  polySides, this.palette);  
              //shape(newShape);
              
            }           
          }      
        rotate(-1.05);
        //rotate(-.33);
        popMatrix();      
      }

      if (this.divisor == 4 ){
        
        pushMatrix();      
        rotate(.75);        
        scale(.75);       
        
          stroke(this.strokeColor);
          for (float a = 0; a < TWO_PI * 6; a += angle) {  
            float sx = x + cos(a) * radius;
            float sy = y + sin(a) * radius;
            line(0, 0, sx, sy);
          }
                    
          for(int j = 0; j < this.levels; j++){
      
            radius = tempRadius;
            
            if(j != 0){
              radius = radius * (j * .25);
            }      
                          // <<<<<<<<<<<<<<<<<
            stroke(this.strokeColor);
            fillColor = this.palette[int(random(0,palette.length-1))]; 
            for (float a = 0; a < TWO_PI * 6; a += angle) {  
              float sx = x + cos(a) * radius;
              float sy = y + sin(a) * radius;              
              fill(fillColor); 
              //   <<<<<<<<<<<<<<<<<
              
              
              if(polarPicker >= 0 && polarPicker < 7){
                  newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);
                  shape(newShape); 
                  noFill();
                  newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);
                  shape(newShape); 
              } else {
                  ellipse(sx, sy, radius/2, radius/2);   
                  noFill();
                  ellipse(sx, sy, radius/4, radius/4); 
              }
              
              
            
                                
              //newShape = drawStar(sx, sy, radius/2, radius/4, polySides, this.palette);
              //shape(newShape); 
              //newShape = drawStar(sx, sy, radius/10, radius/6, polySides, this.palette);
              //shape(newShape); 
            }           
          } 
        rotate(-.75);       
        popMatrix(); 
      }     
    } 
  }
} 
