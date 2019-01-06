// Creates canvas coordinates and dimensions

class Canvas {

  int W;
  int H;
  ArrayList<int[]> coordinates;
  
  // Random Grid Canvas constrained by bounds square option
  Canvas(float[] bounds, boolean square){
    // Gets all possible grid ratios
    IntList[] canvasD = createGrids(bounds[0], bounds[1], bounds[2], bounds[3]);
    int[] gridD = new int[2];
    //...selects random pair...    
    if(square == true) {
      gridD = getSquares(canvasD);
    }
    else {
      gridD = getDimensions(canvasD);      
    }  
    //... sets W and H
    this.W = gridD[0];
    this.H = gridD[1];
    
    // Creates array of grid coordinates
    ArrayList<int[]> coordinatesArray = new ArrayList<int[]>();
    
    for (int x = 0; x <= width; x += W) {
      for (int y = 0; y < height + H; y += H) {
        
        //creates cell coordinates [top L x, top L y, center x, center y]
        int[] newCoordinates = new int[4];
        newCoordinates[0] = x;
        newCoordinates[1] = y;
        newCoordinates[2] = x + W/2;
        newCoordinates[3] = y + H/2;
        coordinatesArray.add(newCoordinates);
      }
    }
    this.coordinates = coordinatesArray;
  }
  
   // random point between where and where - [4]xMin xMax yMin yMax
   Canvas(float[] coordBounds, int qty){
     
     ArrayList<int[]> coordinatesArray = new ArrayList<int[]>();
     
     for(int i = 0; i < qty; i++){
       int[] newCoordinates = new int[2];
       int x = int(random(coordBounds[0],coordBounds[1]+1));
       int y = int(random(coordBounds[2],coordBounds[3]+1));
        newCoordinates[0] = x;
        newCoordinates[1] = y;
        coordinatesArray.add(newCoordinates);
     }
     this.coordinates = coordinatesArray;
   }
   
   Canvas(){
       
     ArrayList<int[]> coordinatesArray = new ArrayList<int[]>();
     
       int[] newCoordinates = new int[]{0,0}; 
       coordinatesArray.add(newCoordinates);
       newCoordinates = new int[]{0,width};
       coordinatesArray.add(newCoordinates);
       newCoordinates = new int[]{width,height};
       coordinatesArray.add(newCoordinates);
       newCoordinates = new int[]{0,height};
       coordinatesArray.add(newCoordinates);
       newCoordinates = new int[]{width/2,height/2};
       coordinatesArray.add(newCoordinates);// levels * + ?        
       this.coordinates = coordinatesArray; 
   }
   
// returns two IntList[]'s of all evenly divisible Widths and Heights for Canvas - constrained by Upper and Lower Bounds
  IntList[] createGrids(float innerWBound, float outerWBound, float innerHBound, float outerHBound) {
    IntList[] canvasD = new IntList[2];
    IntList widthDivs = new IntList();
    for(int i = 1;i <= width;i++){
      
      if(width%i == 0 && i >= (width * innerWBound) && i <= (width * outerWBound)){
        widthDivs.append(i);
      }
    }
    IntList heightDivs = new IntList();
    for(int i = 1;i <= height;i++){
      if(height%i == 0 && i >= (height * innerHBound) && i <= (height * outerHBound)){
        heightDivs.append(i);
      }
    }
    canvasD[0] = widthDivs;
    canvasD[1] = heightDivs;
    return canvasD;
  }
  
  // Returns random W and H values for grid                 
  int[] getDimensions(IntList[] canvasD){
    int[] gridD = new int[2];
    int indexW = floor(random(0,canvasD[0].maxIndex()));
    int indexH = floor(random(0,canvasD[1].maxIndex()));
    gridD[0] = canvasD[0].get(indexW);
    gridD[1] = canvasD[1].get(indexH);
    return gridD;
  }
  
  // Returns random W and H values for grid - constrained to squares
  int[] getSquares(IntList[] canvasD){
  
    IntList commonDimensions = new IntList();  
    int[] gridD = new int[2];  
    
    for(int i = 0; i < canvasD[0].size(); i++){      
      if(canvasD[1].hasValue(canvasD[0].get(i))){ 
        
        commonDimensions.append(canvasD[0].get(i));
      }     
    }
    int squareIndex = int(random(0, commonDimensions.size()));
    gridD[0] = commonDimensions.get(squareIndex);
    gridD[1] = gridD[0];
    return gridD;
  }
}
