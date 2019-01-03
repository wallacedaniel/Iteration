//Puts together the shapes strokes colors based on designer and canvas - creates objects for painter


class Composer {
  
  PShape background;
  
  ArrayList<PShape> cells; 
  ArrayList<PShape> rows;
  ArrayList<PShape> columns;
  
  ArrayList<ArrayList<PShape[]>> elements;                
  
  Composer(Designer design){ 
       
  color firstColor = design.palette.colors[0];
  color lastColor = design.palette.colors[design.palette.colors.length-1];
  int paletteLocation; 
  int locHolder = 0;
  
  ArrayList<PShape> newCells =  new ArrayList<PShape>();
  
  ArrayList<ArrayList<PShape[]>> newElements =  new ArrayList<ArrayList<PShape[]>>();              
  ArrayList<PShape[]> layer =  new ArrayList<PShape[]>();
  
  int H = design.canvas.H;
  int W = design.canvas.W;
  
  //String [] collection = new String [] {, "stained-glass", "striped", "snowflakes"};
 
    // BACKGROUND  
    if(design.background == true){  
      fill(design.palette.colors[0]);
      PShape newBackground = createShape(RECT, 0, 0, width, height);
      this.background = newBackground;
    }

    // canvas.type == "pattern"
    if(design.design == "harlequin" || design.design == "brick-pattern" || design.design == "tiled-triangle-pattern" || design.design == "tiled-polygons"  || design.design == "stained-glass"  || 
        design.design == "snowflakes"  || design.design == "concentric-pattern" || design.design == "stars"){
          
      PShape newCell = createShape(RECT, 0, 0, width, height); // cells will never be null >>> what happens in painter if this paints? does it have no fill..so nothing?
      PShape[] newShape;    
          
      int innerCount = 0;
      int outerCount = 0;
      
      color newFill;
      color newStroke = 0;
      int strokePicker = 0;
      
      
      if(design.design == "brick-pattern") {strokeWeight(random((W + H/2) * .02,(W + H/2) * .2));}
      if(design.design == "concentric-pattern"){newStroke = color(random(0,255), random(0,255), random(0,255));}
                                                                         
      // CELLS  AND SHAPES
      for (int y = 0; y <= height; y += H) {
       for (int x = 0; x <= width; x += W) {
         
         // palette filter >  - stripes finished - cells not
         paletteLocation = int(random(2,design.palette.colors.length));
         while(abs(paletteLocation - locHolder) < 2){
           paletteLocation = int(random(2,design.palette.colors.length));   
         }  
         newFill = design.palette.colors[paletteLocation];
         locHolder = paletteLocation;
         fill(newFill);
         
         //  ********  DESIGN SHAPES  ********          <<< make all else ifs 
         
         //by canvas center coordinates Instead?   for coord : canvas.coordinates ??
         
         //  BRICKS    
         
         // Alt Rows

         if(design.design == "brick-pattern") {
           
            stroke(design.palette.colors[0]);
            paletteLocation = int(random(1,design.palette.colors.length));  
            newFill = design.palette.colors[paletteLocation];
            fill(newFill);
           
            if(outerCount % 2 == 0){newCell = createShape(RECT, x, y, W, H);}
            if(outerCount % 2 != 0){newCell = createShape(RECT, x - W/2, y, W, H);}
         }
            
         /*  
         
         Explore new styles
         
         // Alt Check Boards
         if(design.design == "brick-pattern" &&  innerCount % 2 == 0){            
            newCell = createShape(RECT, x, y, W, H);
         }
         if(design.design == "brick-pattern" &&  innerCount % 2 != 0){
            newCell = createShape(RECT, x, y, W, H);
         }
         
         // Concentric-pattern With fill >> scale style
         
         */

         //
         if(design.design == "concentric-pattern"){
          noFill();
          stroke(newStroke, random(80,200));
          strokeWeight(15);
          newShape = new PShape[3];
     
          newShape[0] = createShape(ELLIPSE, x, y, W, H); 
          newShape[1] = createShape(ELLIPSE, x, y, W/2, H/2);
          newShape[2] = createShape(ELLIPSE, x, y, W * 2,H * 2);
  
         layer.add(newShape);    
         }


         // HARLEQUIN
         if(design.design == "harlequin"){

           stroke(125);
           strokeWeight(25);
           
           newCell = createShape(QUAD, x + W/2, y, x + W, y + H/2, x + W/2, y + H, x, y + H/2);
         }
         

          // STAINED GLASS
         if(design.design == "stained-glass"){newCell =  createShape(RECT, x, y, W, H);}
         
        
         
         // STARS
         if(design.design == "stars"){newCell = drawStar(x + W/2, y + H/2, W/2, W/4, int(random(4,12)));}



         // TILED POLYGON
         if(design.design == "tiled-polygons"){     
           newCell =  createShape(RECT, x, y, W, H); 
           
           //int numSteps = int(random(6,16));
           int[] possPoints = new int[]{3,4,6,8,10,12};
           int pointsIndex = int(random(0,6));
           int points = possPoints[pointsIndex];
           
           newShape = drawPolyTarget( x + W/2,  y + H/2, W/2, points, int(random(6,16)));
           layer.add(newShape);                                                                                      
         } 
         
         
         // TILED TRIANGLE PATTERN
         if(design.design == "tiled-triangle-pattern"){  
           
           stroke(125);
           strokeWeight(25);
           
           paletteLocation = int(random(2,design.palette.colors.length));
           newFill = design.palette.colors[paletteLocation];
           fill(newFill);
           newCell = createShape(TRIANGLE, x + W/2, y + H/2, x + W/2, y, x, y);          
           newCells.add(newCell);
           paletteLocation = int(random(2,design.palette.colors.length));
            newFill = design.palette.colors[paletteLocation];
            fill(newFill);
           newCell = createShape(TRIANGLE, x + W/2, y + H/2,x + W, y + H/2, x + W, y);
           newCells.add(newCell);
           paletteLocation = int(random(2,design.palette.colors.length));
            newFill = design.palette.colors[paletteLocation];
            fill(newFill);
           newCell = createShape(TRIANGLE, x + W/2, y + H/2, x + W/2, y + H, x + W, y + H);
           newCells.add(newCell);
           paletteLocation = int(random(2,design.palette.colors.length));
            newFill = design.palette.colors[paletteLocation];
            fill(newFill);
           newCell = createShape(TRIANGLE, x + W/2, y + H/2, x, y + H/2, x, y + H);
           newCells.add(newCell);
         }
     
     
     
     
     
     
     
     
         //elements.add(newShape);
       if(design.design != "tiled-triangle-pattern"){ 

         newCells.add(newCell);
       }
       
       
       
       innerCount += 1;
       }
     outerCount += 1;
     }
     this.cells = newCells; 
     
     newElements.add(layer); 
     this.elements = newElements;
    }
    
    
    
    
    
    
    
    // RANDOM CANVAS
    
    
    
      // RADIAL STARBURST
       if(design.design == "radial-starburst"){

         noFill();
         stroke(0);
         strokeWeight(50);
         
         int x = design.canvas.coordinates.get(0)[0];
         int y = design.canvas.coordinates.get(0)[1];
         
         PShape[] newShape = new PShape[1];       
         newShape[0] = createShape(ELLIPSE, x, y, 300, 300);
         layer.add(newShape);  
         newElements.add(layer); 
         this.elements = newElements;
         
       }
  
    
    
    
    
    
    
    
    
    
    
    
    // STRIPES                Or Rows and Columns   or all in one w/ above?
  
    if(design.design == "striped"){
      if(design.options[0] == 0){
        // Create row objects
        ArrayList<PShape> newRows =  new ArrayList<PShape>();
        for (int y = 0; y <= height; y += H) {
          
          
 
         // palette filter
         paletteLocation = int(random(0,design.palette.colors.length));
         while(abs(paletteLocation - locHolder) < 2){
           paletteLocation = int(random(0,design.palette.colors.length));   
         }  
         color newFill = design.palette.colors[paletteLocation];
         locHolder = paletteLocation; 
         fill(newFill);  // << filteredFill
          
          
          
          
          PShape newRow = createShape(RECT, 0, y, width, H); 
          newRows.add(newRow);  
        }
        this.rows = newRows;
      }
      
      else if(design.options[0] == 1){
        // Create column objects
        ArrayList<PShape> newColumns =  new ArrayList<PShape>();
        for (int x = 0; x <= width; x += H) {
          

          
          
         // palette filter
         paletteLocation = int(random(0,design.palette.colors.length));
         while(abs(paletteLocation - locHolder) < 2){
           paletteLocation = int(random(0,design.palette.colors.length));   
         }  
         color newFill = design.palette.colors[paletteLocation];
         locHolder = paletteLocation; 
         fill(newFill);  // << filteredFill
         
         
         
         
          
           PShape newColumn = createShape(RECT, x, 0, W, height); 
           newColumns.add(newColumn); 
        }
        this.columns = newColumns;  
      }      
    }
    
  
    if(design.design == "concentric"){
      
       PShape[] newShape;  
    
       int arraySize = design.canvas.coordinates.size();
         
         
           int numSteps = int(random(6,16));
           int[] possPoints = new int[]{3,4,6,8,10,12};
           int pointsIndex = int(random(0,6));
           int points = possPoints[pointsIndex];
           
       for (int i = 0; i < arraySize; i++){
          
           newShape = drawPolyTarget(design.canvas.coordinates.get(i)[0], design.canvas.coordinates.get(i)[1],  int(random(width/2 ,width * 1.25)), points, numSteps);
           layer.add(newShape);                                                                     
          
       }
      
    }
    
   
    
    if(design.design == "starry-landscape"){
      
      int layers = 5;
      float horizonHigh = .2;
      float horizonLow = .6;
      int colorCount = 1;
      
      stroke(0);
      strokeWeight(50);
      
      while(layers > 0){
        int curveY = int(random(height * horizonHigh, height * horizonLow));
        int endY = curveY;
        int endX = 0;
        /*
        smooth();
        PShape horizon = createShape();
        horizon.beginShape();    
        horizon.curveVertex(0, curveY); 
        for (int i = 0; i <= width; i += design.canvas.W) {
          fill(125);
          horizon.curveVertex(i, curveY);
        
          if (i != width){          
              curveY = int(random(height * horizonHigh, height * horizonLow));
          }  
          if (i == width){
              endX = i;
          } 
        }
        horizon.curveVertex(endX, curveY);  
        horizon.vertex(width, height);
        horizon.vertex(0, height);
        horizon.vertex(0, endY);
        horizon.endShape();
        shape(horizon);
        */
        
        smooth();
        beginShape();    
        curveVertex(0, curveY); 
        for (int i = 0; i <= width; i += design.canvas.W) {
          fill(125);
          curveVertex(i, curveY);
        
          if (i != width){          
              curveY = int(random(height * horizonHigh, height * horizonLow));
          }  
          if (i == width){
              endX = i;
          } 
        }
        curveVertex(endX, curveY);  
        vertex(width, height);
        vertex(0, height);
        vertex(0, endY);
        endShape();

        
        
        
        colorCount += 1;      
        horizonHigh += .16;
        horizonLow += .1;
        layers--;
          
      }
    }
  }
}
