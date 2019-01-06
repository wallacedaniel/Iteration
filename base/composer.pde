//Puts together the shapes strokes colors based on designer and canvas - creates objects for painter        composer glass lanscape polar

class Composer {
  
  PShape background;
  ArrayList<PShape> cells; 
  ArrayList<PShape> rows;
  ArrayList<PShape> columns;
  ArrayList<ArrayList<PShape[]>> elements;                                                 // Simplify via Shape Groups??
  
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
 
    // BACKGROUND  
    if(design.background == true){  
      fill(design.palette.colors[0]);
      PShape newBackground = createShape(RECT, 0, 0, width, height);
      this.background = newBackground;
    }
    
      int randomQty = 0;
      if(design.design == "starry-landscape"){randomQty = int(random(40,80));}

    // canvas.type == "grid"
    if(design.design == "harlequin" || design.design == "brick-pattern" || design.design == "tiled-triangle-pattern" || design.design == "tiled-polygons"  || design.design == "stained-glass"  || 
        design.design == "snowflakes"  || design.design == "concentric-pattern" || design.design == "stars" ||  design.design ==  "rose"){
          
      PShape newCell = createShape(RECT, 0, 0, width, height); // cells will never be null >>> what happens in painter if this paints? does it have no fill..so nothing?
      PShape[] newShape = new PShape[design.canvas.coordinates.size()];           
      int innerCount = 0;
      int outerCount = 0;   
      color newFill;
      color newStroke = 0;
      int strokePicker = 0; 
      //int coordSize = design.canvas.coordinates.size();
      //int x;
      //int y;
      
      if(design.design == "brick-pattern" || design.design == "tiled-triangle-pattern") {strokeWeight(random((W + H/2) * .02,(W + H/2) * .2));}
      if(design.design == "harlequin") {
        strokeWeight(random((W + H/2) * .02,(W + H/2) * .15));
        strokePicker = int(random(2,design.palette.colors.length));
        stroke(design.palette.colors[strokePicker]);   
      }
      if(design.design == "concentric-pattern"){newStroke = color(random(0,255), random(0,255), random(0,255));}
            
     // CELLS  AND SHAPES
      for (int y = 0; y <= height; y += H) {
       for (int x = 0; x <= width; x += W) {
         
         paletteLocation = int(random(2,design.palette.colors.length));
         while(abs(paletteLocation - locHolder) < 2){
           paletteLocation = int(random(2,design.palette.colors.length));   
         }  
         newFill = design.palette.colors[paletteLocation];
         locHolder = paletteLocation;
         fill(newFill);
         
         //  ********  DESIGN SHAPES  ********          <<< make all else ifs 
         
         //by canvas center coordinates Instead?   for coord : canvas.coordinates ??         <<<< can add concentrics and randoms into main loop
         
         //  BRICKS 
         if(design.design == "brick-pattern") {
           
            stroke(firstColor);
            paletteLocation = int(random(1,design.palette.colors.length));  
            newFill = design.palette.colors[paletteLocation];
            fill(newFill);
            // alternating rows pattern
            if(outerCount % 2 == 0){newCell = createShape(RECT, x, y, W, H);}
            if(outerCount % 2 != 0){newCell = createShape(RECT, x - W/2, y, W, H);}
         }
            
          // wtf innerCount > outerCount
         if(design.design == "rose"){
           if(innerCount % 2 == 0){
             float d = 8;
             float n = 5;
             newCell = drawRose(d, n);
             //newCell = drawStar(x + W/2, y + H/2, W/2, W/4, int(random(5,12)), design.palette.colors);
           }
            else{
             newCell = createShape(RECT, x, y, W, H);
           }
         }

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
                                                                    // better contrast enforcement
          //stroke(design.palette.colors[1]);                      // different stroke options in designer    - none  - colors in palette 1/last and/or all options then force alt fill
          paletteLocation = int(random(2,design.palette.colors.length));  
          while(paletteLocation == strokePicker){
           paletteLocation = int(random(2,design.palette.colors.length));   
          }
          
          newFill = design.palette.colors[paletteLocation];
          fill(newFill);
           
            newCell = createShape(QUAD, x + W/2, y, x + W, y + H/2, x + W/2, y + H, x, y + H/2);
          }
         
          // STAINED GLASS
         if(design.design == "stained-glass"){
           
           paletteLocation = int(random(0,design.palette.colors.length-2));
           while(abs(paletteLocation - locHolder) < 2){
             paletteLocation = int(random(1,design.palette.colors.length-2));   
           }  
           locHolder = paletteLocation;
           fill(design.palette.colors[paletteLocation]);        
           
           stroke(60);
           strokeWeight(20);
           
           newCell =  createShape(RECT, x, y, W, H);

           PShape shapeGroup = createShape(GROUP);
             //if not = to stroke
           fill(design.palette.colors[paletteLocation+2]);
           strokeWeight(15);
           PShape outerEllipse = createShape(ELLIPSE,x + W/2, y + H/2, W/1.25, H/1.25);
           shapeGroup.addChild(outerEllipse);
           
          // Gathers possible radials 
          IntList[] radials = radialOptions(18, 40);
          // Picks radial options
          int randomIndex = int(random(0,radials[0].maxIndex()));
          int divisor = radials[0].get(randomIndex);
          int angle = radials[1].get(randomIndex);
    
          PShape radial = drawRadial(W/2, divisor, angle, x + W/2,  y + H/2, design.palette.colors);
          shapeGroup.addChild(radial);
             
           fill(firstColor); 
           strokeWeight(10);                                                                              // should include smaller size cells
           PShape innerEllipse = createShape(ELLIPSE,x + W/2, y + H/2, W/4, H/4);                        // Theres a ton of variety available here with alternating circles /diamonds neg space w/ noc cells  w /background etc.
           shapeGroup.addChild(innerEllipse);
           fill(firstColor);  
          strokeWeight(20);
          PShape cornerQuad = createShape(QUAD,x, (y - H/2) + (H * .75), x + W/2 - (W * .75), y + H/2 - H/2, x, y + H/2 - (H * .75) , x - W/2 + (W * .75),  y );    //   even if right  weird and wrong   y + H/2 - H/2
          shapeGroup.addChild(cornerQuad);                               // top element
          fill(design.palette.colors[design.palette.colors.length-2]);  
          strokeWeight(15);
           PShape cornerEllipse  = createShape(ELLIPSE,x, y, W/5, H/5);  // bottom element
           shapeGroup.addChild(cornerEllipse);
           
           newShape[innerCount] = shapeGroup;
           layer.add(newShape);        
         }
         
         // SNOWFLAKES
          
         if(design.design == "snowflakes"){ 
          strokeWeight(20);
          Polar newPolar = new Polar(x + W/2, y + H/2, W/2, design.palette.colors);
          newPolar.drawPolar();
          
         }
    
         // STARS
         if(design.design == "stars"){
           
          newCell = drawStar(x + W/2, y + H/2, W/2, W/4, int(random(5,12)), design.palette.colors);
         }

         // TILED POLYGON
         if(design.design == "tiled-polygons"){     
           newCell =  createShape(RECT, x, y, W, H); 
           
           int numSteps = int(random(3,7));
           int[] possPoints = new int[]{3,4,6,8,10,12};                        //  increased options?
           int pointsIndex = int(random(0,6));
           int points = possPoints[pointsIndex];
           
           newShape = drawPolyTarget( x + W/2,  y + H/2, W/2, points, numSteps, design.palette.colors);
           layer.add(newShape);                                                                                      
         } 
         
         // TILED TRIANGLE PATTERN
         if(design.design == "tiled-triangle-pattern"){  
           
           stroke(design.palette.colors[design.palette.colors.length-1]);                                                           // in designer  stroke options  2 0r last color?  - none (or other alts?
           fill(design.palette.colors[2]);                                                                                          // Outer border enforce
           newCell = createShape(TRIANGLE, x + W/2, y + H/2, x + W/2, y, x, y);          
           newCells.add(newCell);
           fill(design.palette.colors[4]);
           newCell = createShape(TRIANGLE, x + W/2, y + H/2,x + W, y + H/2, x + W, y);
           newCells.add(newCell);
           fill(design.palette.colors[6]);
           newCell = createShape(TRIANGLE, x + W/2, y + H/2, x + W/2, y + H, x + W, y + H);
           newCells.add(newCell);
           fill(design.palette.colors[8]);
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
    
        // Gathers possible radials 
        IntList[] radials = radialOptions(18, 40);
        
        // Picks radial options
        int randomIndex = int(random(0,radials[0].maxIndex()));
        int divisor = radials[0].get(randomIndex);
        int angle = radials[1].get(randomIndex);
               
         int x = design.canvas.coordinates.get(0)[0];
         int y = design.canvas.coordinates.get(0)[1];
         
         PShape[] newShape = new PShape[1];       
         newShape[0] = drawRadial(width*3, divisor, angle, int(random(-600, width/1.1)), int(random(-400, height/1.1)), design.palette.colors);
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
              
           int numSteps = int(random(6,9));
           int[] possPoints = new int[]{3,4,6,8,10,12};          
           int pointsIndex = int(random(0,6));
           int points = possPoints[pointsIndex];
           
       for (int i = 0; i < arraySize; i++){
           newShape = drawPolyTarget(design.canvas.coordinates.get(i)[0], design.canvas.coordinates.get(i)[1],  int(random(width/2,width*1.25)), points, numSteps, design.palette.colors);
           layer.add(newShape);                                                                               
       } 
       newElements.add(layer); 
       this.elements = newElements;
    }
 
    if(design.design == "starry-landscape"){
        
        String axis = "Y";
        setGradient(0, 0, width, height, lastColor, firstColor, axis);
       /*
        PShape[] newShape = new PShape[1];
        
        int layers = 1;
        float horizonHigh = .2;
        float horizonLow = .6;
      
        while(layers > 0){
          int curveY = int(random(height * horizonHigh, height * horizonLow));
          int endY = curveY;
          int endX = 0;
        
        PShape horizon = createShape();
        horizon.beginShape();
        horizon.fill(200);
        horizon.stroke(0);
        horizon.strokeWeight(50);
        horizon.curveVertex(0, curveY); 
        
        for (int i = 0; i <= width; i += design.canvas.W) {   
          horizon.curveVertex(i, curveY);
        
          if (i != width){          
              curveY = int(random(height * horizonHigh, height * horizonLow));
          }  
          if (i == width){
              endX = i;
          } 
        }
        horizon.curveVertex(endX, curveY);  
        horizon.endShape();
        
        newShape[0] = horizon; 
              
        int x1 = 100;
        int pair1 = 150;
        int x2 = 140;
        int pair2 = 190;
        int x3 = 175;
        int pair3 = 225;
      
        PShape pairs = createShape();
        pairs.beginShape();
        pairs.stroke(0);
        pairs.strokeWeight(10);
        pairs.vertex(x1, 300);
        pairs.bezierVertex(100, 200, 200, 200, pair1, 300);
        pairs.vertex(x2, 300);
        pairs.bezierVertex(100, 200, 200, 200, pair2, 300);
        pairs.vertex(x3, 300);
        pairs.bezierVertex(100, 200, 200, 200, pair3, 300);
        pairs.endShape();
        newShape[0] = pairs; 
      
        int x1 = 100;
        int pair1 = 150;
        int x2 = 140;
        int pair2 = 190;
        int x3 = 175;
        int pair3 = 225;
        
        PShape parent = createShape(GROUP);
        parent.beginShape();
        PShape child = createShape();
        child.beginShape();
        child.strokeWeight(10);
        child.stroke(0);
        child.vertex(x1, 450);
        child.bezierVertex(100, 350, 200, 350, pair1, 450);
        child.endShape();
        parent.addChild(child);
         
        child = createShape();
        child.beginShape();
        child.strokeWeight(10);
        child.stroke(0);
        child.vertex(x2, 450);
        child.bezierVertex(100, 350, 200, 350, pair2, 450);
        child.endShape();
        parent.addChild(child);
         
        child = createShape();
        child.beginShape();
        child.strokeWeight(10);
        child.stroke(0);
        child.vertex(x3, 450);
        child.bezierVertex(100, 350, 200, 350, pair3, 450);
        child.endShape();
        parent.addChild(child);
         
        shape(parent);
        
         */
        //layer.add(newShape);
        //shape(pairs);
        //newElements.add(layer); 
        //this.elements = newElements;
        
        
        
        
        
        
        
        
        /*
         // Gathers possible radials 
        IntList[] radials = radialOptions(18, 40);
        
        // Picks radial options
        int randomIndex = int(random(0,radials[0].maxIndex()));
        int divisor = radials[0].get(randomIndex);
        int angle = radials[1].get(randomIndex);
               
         int x = design.canvas.coordinates.get(0)[0];
         int y = design.canvas.coordinates.get(0)[1];
         
         PShape[] newShape = new PShape[1];       
         newShape[0] = drawRadial(width*3, divisor, angle, int(random(-600, width/1.1)), int(random(-400, height/1.1)), design.palette.colors);
         
         shape(newShape[0]);
         
         */
        
      PShape newStar = new PShape(); 
      for (int i = 0; i < randomQty; i++){
           newStar = drawStar(random(0, width), random(0, height/2), random(75,55), random(40,20), int(random(5,12)), design.palette.colors);
           shape(newStar);                                                                               
       } 
   
      int layers = 5;
      float horizonHigh = .2;
      float horizonLow = .6;
      int strokeWeight = 20;
      
      while(layers > 0){
        int curveY = int(random(height * horizonHigh, height * horizonLow));
        int endY = curveY;
        int endX = 0;
    
       smooth();
        //PShape horizon = createShape();
        //PShape land = createShape();
        //PShape landscape = createShape(GROUP);

        beginShape();
        fill(design.palette.colors[2 * layers]);
        stroke(design.palette.colors[2 * layers - 1]);
        strokeWeight(strokeWeight);
        curveVertex(0, curveY); 
        
        for (int i = 0; i <= width; i += design.canvas.W) {   
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
        
        horizonHigh += .16;
        horizonLow += .1;
        strokeWeight += 15;
        
        layers--; 
      }
    }
  }
}
