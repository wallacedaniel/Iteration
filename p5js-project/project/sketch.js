// selected canvas size should always be even ... canvas size selection interface ... add grid layer interface and add grid obj to iteration obj

// Layers and  layer types would be good for learning inheritence in JS





class Iteration {
  constructor(width, height) {
    this.width;
    this.height;
    this.layers = []; 
  }
    
  paint(){
      
  }

}

















// starts w default 100 total random coords w uniform default radius scale canvasW * .05  

class RandomLayer {
  constructor(canvasW, canvasH) {
    this.W = canvasW;                     ///   START OVER WIDTH HEIGHT CONVERSION W THIS.W AND H
    this.H = canvasH;
    this.type = 'random';
    this.qty = 100;

    this.coordinates = this.newCoordinates(this.qty);    
  
    this.radiusScale = canvasW * .05;
    this.coordsRadius = [];
      
    this.shapes = [];
    this.bounds;
  }
    
    
    
    
    get randomLayerQty() {   // badly named?..shouldnt include random .. unclear as to function
        return this.qty;
    }
    set randomLayerQty(qty) {
        this.qty = qty;
    }
    get randomLayerCoords() {
        return this.coordinates;
    }
    set randomLayerCoords(coordinates) {
        this.coordinates = coordinates;
    } 
    get randomLayerSpread() {
        return this.spread;
    }
    set randomLayerSpread(spread) {
        this.spread = spread;
    }
    get randomLayerBounds() {
        return this.bounds;
    }
    set randomLayerBounds(bounds) {   
        this.bounds = bounds;
    }  
    
    get randomLayerRadius() {
        return this.radiusScale;
    }
    set randomLayerRadius(radius) {   
        this.radiusScale = radius;
    } 
    
    get randomLayerRadiusScale() {
        return this.radiusScale;
    }
    set randomLayerRadiusScale(scale) {   
        this.radiusScale = scale;
    }  
    
    
    
    
    
    
    
    
    
    newCoordinates(qty, radiusScale, radiusVariation, spread, bounds){   // figure out easy default radiusScale then pass in multiplier
        
        this.randomLayerQty = qty;
        this.randomLayerRadiusScale = radiusScale;
        
        let radiusCoords = [];
        
        for (let i = 0; i < qty; i++) {
            
            if(radiusVariation){
                radiusCoords.push(int(random(radiusScale - radiusVariation, radiusScale + radiusVariation)));         
            }
            else {
                radiusCoords.push(radiusScale);    
            } 
        }
        this.randomLayerRadius = radiusCoords;                         
        
        
    
        
        let coordinates = [];
        
        for (let i = 0; i < qty; i++) {          // for  the quantity  .. if spread ..  we have empty coords array like shape in ex.  ... 
            
             if(spread){
                 
                
                let counter = 0; 

                while(counter < 10000){ 


                    let overlapping = false;
                    let coords = createVector(int(random(0, this.W + 1)), int(random(0, this.H + 1)));    

                    for (let j = 0; j < coordinates.length; j++) {

                          let existingCoord = coordinates[j];

                          let d = dist(coords.x, coords.y, existingCoord.x, existingCoord.y);

                          if (d < (radiusCoords[i] + radiusCoords[j]) * spread) {
                            overlapping = true;
                            break;
                          }
                        }

                        if (!overlapping) {
                          coordinates.push(coords);
                          break;
                        }

                        counter++; 

                    }

             } else {
                let coords = createVector(int(random(0, this.W + 1)), int(random(0, this.H + 1)));
                coordinates.push(coords);
             }
             
        }
        
        this.randomLayerCoords = coordinates;
    }
    
 
}
    
    



class GridLayer {
  constructor(W, H, canvasW, canvasH) {
    this.type = 'grid';
    this.W = W;
    this.H = H;
    this.coordinates = this.newCoordinates(this.W, this.H, canvasW, canvasH);
      
    this.rows; 
    this.columns;                        
    this.cells; 
    this.horizontals;
    this.verticals;
    this.diagonalsA;
    this.diagonalsB;           //  ********  WANT EVERYTHING BESIDES NEW COORDINATES AS PRIVATE TO THE CLASS *****
  }
    
    get gridW() {
        return this.W;
    }
    set gridW(W) {
        this.W = W;
    }
    
    get gridH() {
        return this.H;
    }
    set gridH(H) {
        this.H = H;
    }
    
    get gridCoordinates() {
        return this.coordinates;
    }
    set gridCoordinates(coordinates) {
        
        this.coordinates = coordinates;
    }   
    
    get gridRows() {
        return this.rows;
    }
    set gridRows(rows) {
        this.rows = rows;
    }
    
    get gridColumns() {
        return this.columns;
    }
    set gridColumns(columns) {
        this.columns = columns;
    }
    
    get gridCells() {
        return this.cells;
    }
    set gridCells(cells) {
        this.cells = cells;
    }
    
    get gridHorizontals() {
        return this.horizontals;
    }
    set gridHorizontals(horizontals) {
        this.horizontals = horizontals;
    }
    
    get gridVerticals() {
        return this.verticals;
    }
    set gridVerticals(verticals) {
        this.verticals = verticals;
    }
    
    get gridDiagonalsA() {
        return this.diagonalsA;
    }
    set gridDiagonalsA(diagonalsA) {
        this.diagonalsA = diagonalsA;
    }
    
    get gridDiagonalsB() {
        return this.diagonalsB;
    }
    set gridDiagonalsB(diagonalsB) {
        this.diagonalsB = diagonalsB;
    }


    newCoordinates(W, H, width, height){
        
        let coordinates = [];
        for (let i = 0; i <= canvasW; i += W) {  
            for (let j = 0; j <= height; j += H) {
                 let coords = createVector(i, j);
                 coordinates.push(coords);
            }
        }
        this.W = W;
        this.H = H;
        this.gridCoordinates = coordinates;
        if(this.rows){this.newRows(H, canvasW, canvasH);}
        if(this.columns){this.newColumns(W, canvasW, canvasH);}
        
        if(this.cells){this.newCells(W, H, canvasW, canvasH);}
        if(this.horizontals){this.newHorizontals(W, H, canvasW, canvasH);}
        if(this.verticals){this.newVerticals(W, H, canvasW, canvasH);}
        if(this.diagonalsA){this.newDiagonalsA(W, H, canvasW, canvasH);}
        if(this.diagonalsB){this.newDiagonalsB(W, H, canvasW, canvasH);}
    }
    
    
    // how and or why to get rows .... from coords ..  
    
    newRows(H, canvasW, canvasH){
        
        let rows = [];
        
        for (let i = 0; i <= canvasH; i += H) {        
             let coords = createVector(0, i);
             let row = [];
             row.push(coords);
             row.push(canvasW);
             row.push(H); 
             rows.push(row);
        }
        this.gridRows = rows;      
    }   
    
    newColumns(W, canvasW, canvasH){
        
        let columns = [];
        
        for (let i = 0; i <= canvasW; i += W) {        
             let coords = createVector(i, 0);
             let column = [];
             column.push(coords);
             column.push(W);
             column.push(canvasH); 
             columns.push(column);
        }
        this.gridColumns = columns;      
    }
    
    newCells(W, H, canvasW, canvasH){
        
        let cells = [];
        
        for (let i = 0; i <= canvasW; i += W) {  
            for (let j = 0; j <= canvasW; j += H) {  
                let cell = {};
                let coordinates = createVector(i, j);
                cell.coords = coordinates;
                cell.W = W;
                cell.H = H;
                cell.center = createVector(i + W/2, j + H/2);
                cells.push(cell);
            }
        }
        this.gridCells = cells;
    }
    
    newHorizontals(W, H, canvasW, canvasH){
        
        let horizontals = [];
        
        for (let i = 0; i <= canvasH; i += H) { 
             let wIterator = 0;   
             let horizontal = [];
             while(wIterator <= width){
                 let coords = createVector(wIterator, i);
                 horizontal.push(coords);
                 wIterator += W;
             }
             horizontals.push(horizontal);
        }
        this.gridHorizontals = horizontals;  
        
    }
    
    newVerticals(W, H, canvasW, canvasH){
        
        let verticals = [];

        for (let i = 0; i <= canvasW; i += W) { 
             let hIterator = 0;  
             let vertical = [];
             while(hIterator <= canvasH){
                 let coords = createVector(i, hIterator);
                 vertical.push(coords);
                 hIterator += H;
             }
             verticals.push(vertical);
        }
        this.gridVerticals = verticals;    
   
    }
    
    // seems like diagonals can be condensed
    
    newDiagonalsA(W, H, canvasW, canvasH){                        ///             FINISH WIDTH HEIGHT CONVERSION  
        
        let diagonals = [];
        let hCount = 1;
        for (let i = height - H; i >= 0; i -= H) {
             let diagonal = [];
             let startCoord = createVector(0, i);        // Can I just delcare one variable and not do some potential strange overwrite i don't understand?
             diagonal.push(startCoord);
             for(let j = 0; j < hCount; j++){
                 let coord = createVector(startCoord.x + ((j + 1) * W), startCoord.y + ((j + 1) * H));
                 diagonal.push(coord);
             }
             diagonals.push(diagonal);
             hCount+=1;
        }
        
        let wCount = 1;
        for (let i = width - W; i >= W; i -= W) {
             let diagonal = [];
             let startCoord = createVector(i, 0);        // Can I just delcare one variable and not do some potential strange overwrite i don't understand?
             diagonal.push(startCoord);
            
             for(let j = 0; j < wCount; j++){   // this will be incorrect
                 let coord = createVector(startCoord.x + ((j + 1) * W), startCoord.y + ((j + 1) * H));
                 diagonal.push(coord);
             }
             diagonals.push(diagonal);
             wCount+=1;  
        }
        
        this.gridDiagonalsA = diagonals;
    }
    
    newDiagonalsB(W, H, width, height){
        
        let diagonals = [];
        let hCount = 1;
        for (let i = height - H; i >= 0; i -= H) {
             
             let diagonal = [];
             let startCoord = createVector(width, i);        // Can I just delcare one variable and not do some potential strange overwrite i don't understand?
             diagonal.push(startCoord);
             for(let j = 0; j < hCount; j++){
                 let coord = createVector(startCoord.x - ((j + 1) * W), startCoord.y + ((j + 1) * H));
                 diagonal.push(coord);
             }
             diagonals.push(diagonal);
             hCount+=1;  
        }
        
        let wCount = 1;
        for (let i = W; i <= width - W; i += W) {
             let diagonal = [];
             let startCoord = createVector(i, 0);        // Can I just delcare one variable and not do some potential strange overwrite i don't understand?
             diagonal.push(startCoord);
            
             for(let j = 0; j < wCount; j++){   // this will be incorrect
                 let coord = createVector(startCoord.x - ((j + 1) * W), startCoord.y + ((j + 1) * H));
                 diagonal.push(coord);
             }
             diagonals.push(diagonal);
             wCount+=1;  
        }
        this.gridDiagonalsB = diagonals;     
    }
    
    settingsUI(){
        
        // do this the better way the string intefacy tick mark thingy new style
        let htmlString = '<p>' + this.H + this.W + '<p>'
        
        return htmlString;
    }
}

class Palette {
    constructor(color1, color2, color3) {
        this.colors = [color1, color2, color3]; 
        this.swatches;
        //this.swatches = this.newSwatches(this.colors);
    }
    
    get paletteColors() {
        return this.colors;
    }
    set paletteColors(colors) {
        this.colors = colors;
        this.newSwatches(this.colors);
    }
    
    get paletteSwatches() {
        return this.swatches;
    }
    set paletteSwatches(swatches) {
        this.swatches = swatches;
    }
    
    newSwatches(colors){
        
        let swatches = [];
        
        let swatch = [colors[0]];
        
        for(let i = 1; i < 10; i++){
//        if(this.type == 'custom'){}
            swatch[i] = lerpColor(colors[0], colors[1], i * .1);    
        }
        swatch[10] = colors[1];
        swatches.push(swatch);
        if(colors[2]){
            let swatch2 = [colors[1]];                 //   Cleaner ?    could be more multiple colors / custom qty steps / tints / shades / types
            let swatch3 = [colors[2]];
            
            for(let i = 1; i < 10; i++){
    //        if(this.type == 'custom'){}
                swatch2[i] = lerpColor(colors[1], colors[2], i * .1);
                swatch3[i] = lerpColor(colors[2], colors[0], i * .1);
            }
            swatch2[10] = colors[2]
            swatch3[10] = colors[0]
            swatches.push(swatch2);
            swatches.push(swatch3);    
        }
        this.paletteSwatches = swatches;
    } 
}






//class Layer {
//  constructor(type, position) {
//    this.type = type; 
//    this.position = position;
//    //this.coords = getCoords(this.type);
//  }
//}
//
//
//







// too much canvas canvas canvas in the naming -- differentiate

//   x1 x2 x3 x4 vars
//re orient diamonds
//contrast enforcement  >   function

//curve lines  for these we could use all the points of  the hor/vert lines  -- ....
// get Goordinates out of canvas

//reset canvas size
// option to enforce eveness
// random within bounds

//change palette
//shapes+
//gradient

//really fix diamonds

//3d city  -  random camera

//CE320F
//DDC58D

// String axis = "Y";
   //setGradient(0, 0, width, height, lastColor, firstColor, axis);

/*
void setGradient(int x, int y, float w, float h, color c1, color c2, String axis) {

function setGradient(x, y, fw, h, c1, c2, axis) {

  noFill();

  if (axis == "Y") {  // Top to bottom gradient
    for (let i = y; i <= y+h; i++) {
      let inter = map(i, y, y+h, 0, 1);
      let c = lerpColor(c1, c2, inter);                  <<<<<<<leprColor ?
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == "X") {  // Left to right gradient
    for (let i = x; i <= x+w; i++) {
      let inter = map(i, x, x+w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
*/


/*

DrawController Object

    drawControls   play pause frameRateControl w/wOutUpdate

Iteration Object - all input
    Canvas Object
    Style Object
    Shapes
    Images
    
    shape class

    gridControls   W H randomW/H randomPoints w/quantity    bg  rows  columns  cells  lines  diagonals  alt rows/columns/cells
    styleControls  palette(s) strokeC's strokeW's  
    shapeSelectors w/gridPlacement w/randomPlacement sizeSelectors
    
    
    
    
    
    ********* THIS IS THE NEW INTERFACE ********
    Top to bottom > (unless to facilitate new art) Translate the HTML sketch into P5 created controls > straight to functionality > position/style next pass 



*/

let layerCount,     canvas, W, H, c1, c2, dimensions, strokeW, newStroke, newFill, colorIndex, firstDraw, canvasButton, bgStyle, bg, shapes, dropImage, img, newFile, newImage, colorHolder, cellHolder, shapeFillHolder, randomQty, shapeStrokeHolder, randomQtyElement, square, r1, g1, b1, r2, g2, b2;  //, palette iteration,




//    find layer position of seleceted for removal and remove associated layer at that position from iteration data structure

//   return coordinates of various types using

// with position selection method > revisit desired interface for canvas and layers





//          grid - W H dropDown(presentsDivisibleCoords) ***setButton(setBased on) squareCheck###(on change(resets options in W H drop)) 


// mmaybe not? just in drawing > rowsCheck### columnsCheck### cellsCheck## (returnRowsBasedOncurrentHW if checked calcOn setButton unChecked Remove) 
            
            //  when you do coords you have to do data vectorss!
            
//          grid - W H square rows rowsA rowsB columns columnsA columnsB cells cellsA cellsB cellsX     
//          random - coords qty bounds cluster
//          simple - coords(4corners/center/thirdsLines 
//          horizon - qty frequency(uniform/individual) elevation lineEffects spread  
//
//        later: re arrange layers in Canvas and Layers
//                 
//          later later: an initial random state
//
//    



let i;
let grid;
let palette;
let  c, canvasW, canvasH;
let testRandom;


function setup() {
    noLoop();
    noStroke();
    noFill();
    
    // final result of set up will be complete ui tied to random iteration on screen relative canvas

    // ffd771,ff71bf,71ffee
    
    let color1 = color(255,215,113);
    let color2 = color(255,113,191);
    let color3 = color(113,255,238);

    palette = new Palette(color1, color2, color3);
    palette.newSwatches(palette.colors);
    
    grid = new GridLayer(200,200,800,800);
    grid = new GridLayer();
    grid.newCoordinates(200,200,800,800);
    grid.newRows(200,800,800);
    grid.newColumns(200,800,800);
    grid.newCells(200,200,800,800);
    grid.newHorizontals(200,200,800,800);
    grid.newVerticals(200,200,800,800);
    grid.newDiagonalsA(200,200,800,800);
    grid.newDiagonalsB(200,200,800,800);
    

    
    
    // Creates Canvas
    let canvasContainer = select('#canvas-container');
    c = createCanvas(800, 800);
    c.parent(canvasContainer);
    
    
    testRandom = new RandomLayer(800, 800);
    testRandom.newCoordinates(200, width * .05, 20, 1.2);
//    testRandom.newSpread(10);
//    testRandom.newCoordsRadius(40, 15);
    
    
    // Canvas Size Input
    canvasW = select('#canvas-w');                 // constrain and optimize interface on options
    canvasH = select('#canvas-h');
    canvasW.value(width);
    canvasH.value(height);
    let canvasSize = select('#canvas-size');
    canvasSize.mousePressed(updateCanvasSize);     
    
    // UI Data Options
    let layerTypeOptions = ['grid','random','simple','horizon'];
    
     // Display layer type options
    let layerTypeUl = select('#layer-types');  
    layerTypeOptions.forEach(function(element) {
        let layerType = createElement('li', element);   
        layerType.parent(layerTypeUl);
        layerType.mousePressed(addLayer);          
    });
    
    
    
    
    
    i = new Iteration();
    
    
    
    
    
    
    
    
    
    layerCount = 0;

    
    let gridTypeOptions = ['cells'];
    let shapeOptions = ['ellipses','polys', 'stars', 'diamonds' ,'snowflakes', 'radials', 'roses', 'supers'];
    
    // SHAPES LAYER 
    let shapeTypeUl = select('#shape-types');
    shapeOptions.forEach(function(element) {
      let shapeType = createElement('li', element);
      //shapeType.parent(shapeTypeUl);
      //shapeType.mousePressed(addShapeType);
    });
     
/*    // GRID 
    let gridTypeUl = select('#grid-types');
    gridTypeOptions.forEach(function(element) {
      let gridType = createElement('li', element);
      gridType.parent(gridTypeUl);
      gridType.mousePressed(setGridType);
    });*/
    
    
    firstDraw = 1;
    
    bgStyle = createRadio();
    bgStyle.option('background');
    bgStyle.option('rows');
    bgStyle.option('columns');
    bgStyle.option('cells');
    
    shapes = createRadio();
    shapes.option('stars');      // this needs to be selected or ability to step frames   ....
    shapes.option('roses');
    shapes.option('diamonds');
    shapes.option('polygons');
    shapes.option('supers');
    shapes.option('snowflakes');   

    //createCanvas(800, 800, WEBGL);
    
    W = createInput(40);  // as % of starting canvas
    H = createInput(40);
    strokeW = createInput(4);  // H * .05                                                          // <<<<<<<<<<<<<???????????????
    
    //randomQtyElement = select('#randomQty'); 
    //randomQtyElement.input(updateRandomPoints);
    
    square = true;
    
    //dimensions = randomDimensions(square); 
    //canvas = new Canvas(40, 40);   
    
    //updateCanvas = select('#updateCanvas');
    //updateCanvas.mousePressed(getInput);
    //selectCanvas = select('#selectCanvas');
    //selectCanvas.mousePressed(saveImage);
    
    canvasButton = createButton("New Canvas");
    //canvasButton.mousePressed(canvas.getCoordinates);
    
    r1 = select('#r1');
    g1 = select('#g1');
    b1 = select('#b1');
    r2 = select('#r2');
    g2 = select('#g2');
    b2 = select('#b2');
    
    strokeWeight(strokeW.value());

   c1 = color(random(255), random(255), random(255));
   c2 = color(random(255), random(255), random(255));
   //c1 = color(255,250,245);
   //c2 = color(255, 125, 20); 
    
  /*  
    r1.attribute('value', c1.levels[0]);
    g1.attribute('value', c1.levels[1]);
    b1.attribute('value', c1.levels[2]);
    r2.attribute('value', c2.levels[0]);
    g2.attribute('value', c2.levels[1]);
    b2.attribute('value', c2.levels[2]);*/
    
    //palette = new Palette(c1, c2);
    colorHolder = 0;
    cellHolder = 0;
    shapeFillHolder = 0;
    shapeStrokeHolder = 0;
    
    bg = 'background'; 
    dropImagedropImage = select('#dropImage');
    //newFile = dropImage.drop(gotFile);
    
} 








//        *****         UI FUNCTIONS          *****




function updateCanvasSize() {                
    canvasW = select('#canvas-w');   
    canvasH = select('#canvas-h');
    if(canvasW.value() && canvasW.value()){
        c.remove();
        let canvasContainer = select('#canvas-container');                          
        c = createCanvas(int(canvasW.value()), int(canvasH.value()));
        c.parent(canvasContainer);  
    }
    else{
        alert('enter a value between 100 and 12k');    
    }
}

function addLayer() {  

      // clear the layers then for each layer in layers > add the layer
    
//      adds layer name to canvas panel                          
//      let canvasLayers = select('#layer-drop');                                               
//      let layerSelect = createElement('p', this.elt.textContent);  
//      layerSelect.parent(canvasLayers);
//      layerSelect.mousePressed(layerToggle); 
      
      //creates new layer

      //    this.elt.textContent
    
    //let layer = new Layer(this.elt.textContent, iteration.layers.length);
    
      let layer = new GridLayer();
      layer.newCoordinates(40,40,600,400);
    
//    layer.newRows(40,600,400);
//    layer.newColumns(40,600,400);
//    layer.newCells(40,40,600,400);
//    layer.newHorizontals(40,40,600,400);
//    layer.newVerticals(40,40,600,400);
//    layer.newDiagonalsA(40,40,600,400);
//    layer.newDiagonalsB(40,40,600,400);
  
      i.layers.push(layer);

      // adds layer panel to layer container
      let layersContainer = select('#layers-container');                               
      let layerPanel = createElement('div'); 
      layerPanel.parent(layersContainer);
      let layerTitle = createElement('h3', layer.type);
      layerTitle.parent(layerPanel);
      //layerTitle.mousePressed(layerToggle);
      let settings = layer.settingsUI();   
      let settingsContainer = createDiv(settings);
      settingsContainer.parent(layerPanel);
      
    
                   //   in grid class construct the html in the ui function ...then add to ui .. then this ui updates this layer ...
          
     // setting Containers inner HTML is  settings
    
    
//      let layerTest = createElement('p', settings);
//      layerTest.parent(settingsContainer);
      
    
      // creates remove button
      let removeButton = createElement('button', 'Remove'); 
      removeButton.parent(layerPanel);
      removeButton.mousePressed(removeLayer);   
}

function removeLayer() { 
    let layerPanel = this.parent();
    this.parent().remove();
}



let roseShapes = [
    {'d':59, 'n':6},{'d':83, 'n':4},{'d':83, 'n':6},{'d':95, 'n':6},{'d':14, 'n':4},{'d':97, 'n':8},{'d':79, 'n':4},{'d':79, 'n':5},{'d':79, 'n':8},{'d':51, 'n':4},{'d':46, 'n':6},{'d':87, 'n':6},{'d':23, 'n':8},{'d':71, 'n':4},{'d':25, 'n':4},{'d':91, 'n':7},{'d':38, 'n':4},{'d':49, 'n':5},{'d':87, 'n':4},{'d':70, 'n':8},{'d':71, 'n':5},{'d':19, 'n':6},{'d':67, 'n':5},{'d':57, 'n':6},{'d':13, 'n':6},{'d':47, 'n':8},{'d':39, 'n':8},{'d':41, 'n':4}
]; 



function draw() {
    
    stroke(0);
    
    strokeWeight(2);
    
    for(let [index, coord] of testRandom.coordinates.entries()){
        
//        strokeWeight(testRandom.randomLayerRadius[index]);
//        point(coord.x, coord.y);
        
        
          fill(palette.swatches[int(random(0, palette.swatches.length - 1))][int(random(0, palette.swatches[0].length - 1))]);
        
           stroke(palette.swatches[int(random(0, palette.swatches.length - 1))][int(random(0, palette.swatches[0].length - 1))]);
        
        
        
            let d;
            let n;
            do {
                d = int(random(1,10));
                n = int((random(1,8)));
            } while (d  == n || (d == 3 && n  == 1)  || (d == 6 && n  == 2)  || (d == 9 && n == 3)) ;
            push();
            translate(coord.x, coord.y);
            rose(d, n, testRandom.randomLayerRadius[index]);
            pop();  
        
        
        
        
        
        
        
        
        
        
        
    }
    
  
    
//    grid.rows.forEach(function(el){
//        fill(random(0,255), random(0,255), random(0,255)); 
//        rect();   
//    });
//    grid.columns.forEach(function(el){
//        fill(random(0,255), random(0,255), random(0,255)); 
//        rect(); 
//    });
    
    //grid.cells.forEach(function(el){  
        
//        
//       
////                                   
////        strokeWeight(el.W * .33);
////        stroke(random(0,255), random(0,255), random(0,255)); 
////        point(el.coords.x, el.coords.y); 
//        
//        
////        strokeWeight(el.W * .16);
////        stroke(random(0,255), random(0,255), random(0,255)); 
////        point(el.coords.x, el.coords.y); 
//        
//        strokeWeight(1);
//        //stroke(125);
//        
//        //console.log(palette);
//        
//        
 //       stroke(palette.swatches[int(random(0, palette.swatches.length - 1))][int(random(0, palette.swatches[0].length - 1))]);
//        //stroke(palette.swatches[2][int(random(0, palette.swatches[0].length - 1))]);
//        //stroke(palette.swatches[2][0]);
//        
//// Polygons
//        
//        //polygon(el.center.x, el.center.y, el.W * .4, int(random(3,13)));
//        
//// Super Ellipses   
////        let n = random(0.3,5);
////        push();
////        translate(el.center.x, el.center.y);
////        superEllipse(el.W * .9, el.W * .9, 1);
////        //stroke(palette.swatches[int(random(0, palette.swatches.length - 1))][int(random(0, palette.swatches[0].length - 1))]);
////        //stroke(palette.swatches[2][int(random(0, palette.swatches[0].length - 1))]);
////        //stroke(palette.swatches[0][0]);
//////        strokeWeight(2);
////        superEllipse(el.W * .5, el.W * .3, 1.2);
////        pop();
////        
////        
//        
//// Roses
////        let d;
////        let n;
////        do {
////            d = int(random(1,10));
////            n = int((random(1,8)));
////        } while (d  == n || (d == 3 && n  == 1)  || (d == 6 && n  == 2)  || (d == 9 && n == 3)) ;
////        push();
////        translate(el.center.x, el.center.y);
////        rose(d, n, el.W * .4);
////        pop();  
////        
//        let roseIndex = int(random(0,roseShapes.length));
//        
//        let d = int(random(10,100));
//        let n = int(random(2,9));    
//        
//        push();
//        translate(el.center.x, el.center.y);
//       //roseM(d, n, el.W * .5);
////roseM(79, 4, el.W * .5);
//        roseM(roseShapes[roseIndex].d, roseShapes[roseIndex].n, el.W * .5);
//        console.log('d = ' + d + ' and n = ' + n);
//        pop();
//
//        
        
//        
//        // STARS
//        //star(el.center.x, el.center.y, el.W * .2, el.W * .4, int((random(4,24)))); 
    
//    });
    
    
//  
}


// SHAPES
//function radial(diameter, divisor, angle, x, y, colors) { 
//  let lastAngle = 0;
//  let index = int(random(0, colors.length));
//  let check = true;
//  let step = 3;
//  for (let i = 0; i < divisor; i++) {
//    if (index + step < colors.length && check == true) {
//      index = index + step;
//      check = true;
//    } else if (index - step >= 0) {
//      index = index - step;
//      if (index - step >= 0) {
//        check = false;
//      } else {
//        check = true;
//      }
//    }
//    radialColor = colors[index];
//    fill(radialColor);
//    arc(x, y, diameter, diameter,  lastAngle, lastAngle + radians(angle));
//    lastAngle += radians(angle);
//  }
//  noFill();
//} 
//
//// Returns a list of angle / divisor pairs - constrained to usable values 
//function radialOptions(innerBound, outerBound) { 
//  radials = [];
//  angles = [];
//  divisors = [];
//  for (let divisor = innerBound; divisor <= outerBound; divisor++) {
//    if (360 % divisor == 0) {
//      divisors.push(divisor);
//      let angle = 360 / divisor;
//      angles.push(angle);
//    } 
//    radials[0] = divisors;
//    radials[1] = angles;
//  }
//  return radials;
//}




//  ********   SHAPE FUNCTIONS   *********



function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function rose(d, n, radius){
 angleMode(RADIANS);
 var k = n / d;
  beginShape();
  for (var a = 0; a < TWO_PI * reduceDenominator(n, d); a += 0.02) {
    var r = radius * cos(k * a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape(CLOSE);
}

//let d;
//let n;
//do {
//    d = int(random(1,10));
//    n = int((random(1,8)));
//} while (d  == n || (d == 3 && n  == 1)  || (d == 6 && n  == 2)  || (d == 9 && n == 3)) ;


// diff so far .. set canvas to angle mode degrees

function roseM(d, n, radius){
  angleMode(DEGREES);
  beginShape();
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = radius * sin(n*k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function reduceDenominator(numerator, denominator) {
    function rec(a, b) {
        return b ? rec(b, a % b) : a;
    }
    return denominator / rec(numerator, denominator);
}









function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function superEllipse(a, b, n){    
    
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.1) {
    let na = 2 / n;
    let x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
    let y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
    vertex(x, y);
  }
  endShape(CLOSE);
}

function sgn(val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}

//let n = random(0.3,5);















// remove style ?  or what's the deal with these?



function drawTarget(xLoc, yLoc, size, numSteps, colors, polySides) {
  let alphaValues = 255/numSteps;
  let steps = size/numSteps;
  let strokePicker = 2;

  for (let i = 0; i < numSteps; i++) {
    stroke(colors[strokePicker]);                  
    fill(245, i * alphaValues * .17);    
    polygon(xloc, yloc, size - i*steps, polySides, numSteps);                                   
    strokePicker += 1;                               
  }
  noFill();
}


function drawTiledTris(cells, H, W){
    triangle(cells[0], cells[1], cells[0] + W/2, cells[1] + H/2, cells[0], cells[1] + H);
    fill(palette.colors[int(random(0,palette.colors.length))]);
    triangle(cells[0] + W, cells[1], cells[0] + W/2, cells[1] + H/2, cells[0], cells[1]);
    fill(palette.colors[int(random(0,palette.colors.length))]);
    triangle(cells[0] + W, cells[1] + H, cells[0] + W/2, cells[1] + H/2, cells[0] + W, cells[1]);
    fill(palette.colors[int(random(0,palette.colors.length))]);
    triangle(cells[0], cells[1] + H, cells[0] + W/2, cells[1] + H/2, cells[0] + W, cells[1] + H);
}



















































// hide layer settings
//function layerToggle() {  
    //let test = this.parent();                                        //  hide this not that .. then specifically
    //console.log(this.nextElementSibling);
//    if(layer.className != 'hide'){
//        layer.className = 'hide';    
//    } else {
//        layer.removeClass('hide');
//    }     
//}
//
//



//
//
//
//

//
//
//
//
//
//
//
//// adds shapes 
//function addShapeType() {                
//    console.log('shape added');
//}
//
//function setGridType() {                 
//    console.log('Grid Set');
//}





//canvasH.input(myInputEvent);
//function myInputEvent() {
//  console.log('you are typing: ', this.value());
//}
//

















































//
//
//class Canvas {
//  constructor(W, H) {
//    this.W = W;
//    this.H = H;
//    this.rows = []; 
//    this.columns = [];                        
//    this.cells = []; 
//    this.coordinates = this.getCoordinates();                      //    should not use canvas / palette vars in Canvas Palette Class correct?
//    this.randoms = randomPoints(100);
//  }
//
//    update() {   
//    }
//
//    display() {
//        //background(255);    
//        //stroke(palette.colors[int(random(0,palette.colors.length))]);     
//        /*
//        for(let i = 0; i < this.coordinates.length; i++){
//            //stroke(random(255), random(255), random(255));
//            //point(this.coordinates[i][0], this.coordinates[i][1]);
//        }
//        */
//        
//            
//        if(bg == 'background'){
// 
//            background(palette.colors[0]);
//            
//            for(let i = 0; i < canvas.randoms.length; i++){
//                                         
//              newStroke = int(random(4,palette.colors.length));
//              stroke(palette.colors[newStroke]);
//              strokeWeight(  random(   ((canvas.W + canvas.H)/2) * .03 ,  ((canvas.W + canvas.H)/2) * .07         ));
//                //strokeWidth variety
//                
//              colorIndex = int(random(2,palette.colors.length)); 
//              while(abs(colorIndex - newStroke) < 2){
//                 colorIndex = int(random(2,palette.colors.length));   
//               }  
//              newFill = palette.colors[colorIndex];
//              shapeFillHolder = colorIndex;
//                
//              fill(newFill);    
//            
//                 /*
//                //let d = int(dist(canvas.randoms[i][0], canvas.randoms[i][1], x2 compared against each of the others , y2 compared against each of the others ));
//                    let newFlake = new Snowflake(40, canvas.coordinates[i][2], canvas.coordinates[i][3], palette); 
//                    newFlake.drawSnowflake();
//           
//                //ellipse(canvas.randoms[i][0], canvas.randoms[i][1], random(20,100),  random(20,100));  
//                */
//                
//              let starPoints = floor(random(4,11));
//                
//              star(canvas.randoms[i][0], 
//              canvas.randoms[i][1], 
//              random((canvas.W/4), canvas.W/4),
//              random((canvas.W/2), canvas.W/2), 
//              starPoints);
//            
//                push();
//                scale(0.5);
//                translate(canvas.randoms[i][0], canvas.randoms[i][1]);
//
//                star(canvas.randoms[i][0], 
//                      canvas.randoms[i][1], 
//                      random((canvas.W/4), canvas.W/4),
//                      random((canvas.W/2), canvas.W/2), 
//                      floor(random(4,11)));
//                pop();     
//
//            }
//        }     
//   
//        else if(bg == 'rows'){
//
//            for(let i = 0; i < this.rows.length; i++){
//            
//              colorIndex = int(random(0,palette.colors.length)); 
//              while(abs(colorIndex - colorHolder) < 2){
//                 colorIndex = int(random(0,palette.colors.length));   
//               }  
//              newFill = palette.colors[colorIndex];
//              colorHolder = colorIndex;
//              fill(newFill);
//              
//               rect(canvas.rows[i][0], canvas.rows[i][1], canvas.rows[i][2], canvas.rows[i][3]);
//
//                // horizontal line           
//                //stroke(2);
//                //stroke(random(255), random(255), random(255));
//                //line(this.rows[i][0], this.rows[i][1], width, this.rows[i][1]);
//            }
//        }
//        else if(bg == 'columns'){
//            for(let i = 0; i < this.columns.length; i++){
//          
//              colorIndex = int(random(0,palette.colors.length)); 
//              while(abs(colorIndex - colorHolder) < 2){
//                 colorIndex = int(random(0,palette.colors.length));   
//               }  
//              newFill = palette.colors[colorIndex];
//              colorHolder = colorIndex;
//              fill(newFill);
//
//              rect(canvas.columns[i][0], canvas.columns[i][1], canvas.columns[i][2], canvas.columns[i][3]); 
//
//                // vertical line
//                //stroke(2);
//                //stroke(random(255), random(255), random(255));
//                //line(this.columns[i][0], this.columns[i][1], this.columns[i][0], height);
//
//
//                //line(this.columns[i][0], this.columns[i][1], this.columns[i][1], height);
//
//            }
//        }
//        
//        else if(bg == 'cells'){
//            
//            //  ****************  STARS ***********
//            
//            /*
//            colorIndex = int(random(0,palette.colors.length)); 
//              while(abs(colorIndex - cellHolder) < 2){
//                 colorIndex = int(random(0,palette.colors.length));   
//               }  
//              newFill = palette.colors[colorIndex];
//              //cellHolder = colorIndex;    ///  <<<<<<<<<<<
//            cellHolder = 0;                //    <<<<<<<<<<<<<<<<<<<<!!!!!!!
//              
//            */
//
//            //background(palette.colors[0]);    
//            
//            let lineCount = 1;
//            let lineCount2 = height/canvas.H;
//            for(let i = 0; i < canvas.cells.length; i++){
//
//
//            //point(this.coordinates[i][2], this.coordinates[i][3]);
//               /* 
//             colorIndex = int(random(0,palette.colors.length)); 
//              while(abs(colorIndex - cellHolder) < 2){
//                 colorIndex = int(random(0,palette.colors.length));   
//               }  
//              newFill = palette.colors[colorIndex];
//              cellHolder = colorIndex;     //   don' t overwrite
//              fill(newFill);
//
//              noStroke();
//                
//                rect(canvas.cells[i][0], canvas.cells[i][1], canvas.cells[i][2], canvas.cells[i][3]);  
//                //drawTiledTris(canvas.cells[i], canvas.W, canvas.H);          
//                */
//                /*
//             colorIndex = ); 
//              while(abs(colorIndex - cellHolder) < 2){
//                 colorIndex = int(random(0,palette.colors.length));   
//               }  
//              newStroke = palette.colors[colorIndex];
//              shapeStrokeHolder = colorIndex;
//               */ 
//                
//              newStroke = int(random(4,palette.colors.length));
//              stroke(palette.colors[newStroke]);
//                
//                strokeWeight(  random(   ((canvas.W + canvas.H)/2) * .03 ,  ((canvas.W + canvas.H)/2) * .07         ));
//             
//                //strokeWidth variety
//                
//              colorIndex = int(random(2,palette.colors.length)); 
//              while(abs(colorIndex - newStroke) < 2){
//                 colorIndex = int(random(2,palette.colors.length));   
//               }  
//              newFill = palette.colors[colorIndex];
//              shapeFillHolder = colorIndex;
//                
//              fill(newFill);     
//                
//                //let shape = 'roses';
//
//                if(shape == 'diamonds'){
//                    quad(canvas.cells[i][0] + canvas.cells[i][2]/2, canvas.cells[i][1], canvas.cells[i][0] + canvas.cells[i][2], canvas.cells[i][1] + canvas.cells[i][3]/2, canvas.cells[i][0] + canvas.cells[i][2]/2, canvas.cells[i][1] + canvas.cells[i][3],  canvas.cells[i][0], canvas.cells[i][1] + canvas.cells[i][3]/2);  
//                }
//                else if(shape == 'polygons'){
//                    drawTarget(canvas.coordinates[i][2], canvas.coordinates[i][3], canvas.W/2, floor(random(3,11))); 
//                }
//                else if(shape == 'snowflakes'){
//                    let newFlake = new Snowflake(40, canvas.coordinates[i][2], canvas.coordinates[i][3], palette); 
//                    newFlake.drawSnowflake();
//                }
//                
//                        
//                
//                else if(shape == 'stars'){
//                    star(int(random(canvas.coordinates[i][2] - (canvas.W * .04), canvas.coordinates[i][2] + (canvas.W * .04))),
//                         int(random(canvas.coordinates[i][3] - (canvas.H * .04), canvas.coordinates[i][3] + (canvas.H * .04))), 
//                         random((canvas.W/4) * .55, canvas.W/4 * .75),
//                         random((canvas.W/2) * .65, canvas.W/2 * .85), 
//                         floor(random(4,11)));
//                    /*
//                    push();
//                    scale(0.5);
//                    translate(int(random(canvas.coordinates[i][2] - (canvas.W * .04), canvas.coordinates[i][2] + (canvas.W * .04))),
//                         int(random(canvas.coordinates[i][3] - (canvas.H * .04), canvas.coordinates[i][3] + (canvas.H * .04))));
//                    star(int(random(canvas.coordinates[i][2] - (canvas.W * .04), canvas.coordinates[i][2] + (canvas.W * .04))),
//                         int(random(canvas.coordinates[i][3] - (canvas.H * .04), canvas.coordinates[i][3] + (canvas.H * .04))), 
//                         random((canvas.W/4) * .55, canvas.W/4 * .75),
//                         random((canvas.W/2) * .65, canvas.W/2 * .85), 
//                          floor(random(4,11)));
//                    pop(); 
//                    */
//             
//                }
//                
//                else if(shape == 'roses'){
//                   let d;
//                   let n;
//                   do {
//                        d = int(random(1,10));
//                        n = int((random(1,8)));
//                   } while (d  == n || (d == 3 && n  == 1)  || (d == 6 && n  == 2)  || (d == 9 && n == 3)) ;
//
//                    push(); 
//                    translate(canvas.coordinates[i][2], canvas.coordinates[i][3]);
//                    let r = (canvas.W/2) * .9;
//                    rose(d, n, r);
//                    pop();
//                }
//                
//                else if(shape == 'supers'){
//                    let a = canvas.W/2;
//                    let b = canvas.H/2;
//                    let n = random(0.3,5);
//
//                    push();
//                    translate(canvas.coordinates[i][2], canvas.coordinates[i][3]);
//                    superEllipse(a, b, n);  
//
//                    a = canvas.W/2;
//                    b = canvas.H/2;
//                    n = random(0.3,5);
//
//                    superEllipse(a, b, n); 
//                    pop();
//                }
//
//                if(img != undefined){
//                    image(img, canvas.coordinates[i][0], canvas.coordinates[i][1], canvas.W, canvas.H);
//                }
//
//
//
//                
//                
//                
//                
//                
//                
//                
//                
//                
//             /*
//                // Diagonals(alt)
//                if(canvas.cells[i][1] == 0){
//                    line(canvas.cells[i][0], canvas.cells[i][1], canvas.cells[i][0] + (canvas.W * (height/canvas.H)), height);
//                    line(canvas.cells[i][0], canvas.cells[i][1], canvas.cells[i][0] - (canvas.W * (height/canvas.H)), height);
//                }
//                if(canvas.cells[i][0] == 0 && !(canvas.cells[i][0] == 0 && canvas.cells[i][1] == 0)){
//                    line(canvas.cells[i][0], canvas.cells[i][1], canvas.W * ((height/canvas.H) - lineCount), height);
//                    lineCount += 1;
//                } 
//                // theres a doubled up line in here 
//                if(canvas.cells[i][0] == width &&){ 
//                    line(canvas.cells[i][0], canvas.cells[i][1], width - (canvas.W * lineCount2), height);
//                    lineCount2--; 
//                }
//
//                // Diagonals
//                if(canvas.cells[i][1] == 0){
//                    line(canvas.cells[i][0], canvas.cells[i][1], canvas.cells[i][0] + (canvas.W * (height/canvas.H)), height);
//                    line(canvas.cells[i][0], canvas.cells[i][1], canvas.cells[i][0] - (canvas.W * (height/canvas.H)), height);
//                }
//                if(canvas.cells[i][0] == 0 && !(canvas.cells[i][0] == 0 && canvas.cells[i][1] == 0)){
//                    line(canvas.cells[i][0], canvas.cells[i][1], canvas.W * ((height/canvas.H) - lineCount), height);
//                    lineCount += 1;
//                } 
//                // theres a doubled up line in here 
//                if(canvas.cells[i][0] == width){ 
//                    line(canvas.cells[i][0], canvas.cells[i][1], width - (canvas.W * lineCount2), height);
//                    lineCount2--; 
//                } 
//
//                */
//
//                //sphere and cubes
//                /*
//                  //noStroke();
//                  //fill(50);
//                  noFill();
//                  push();
//                  translate(canvas.coordinates[i][2], canvas.coordinates[i][3]);
//                  //rotateY(1.25);
//                  //rotateX(-0.9);
//                  box(canvas.W * .9);
//                  pop();
//
//                  noFill();
//                  push();
//                  translate(canvas.coordinates[i][2], canvas.coordinates[i][3]);
//                  sphere(canvas.W/2);
//                  pop();
//
//                */
//
//            }  
//        }
//    }
//
//    getCoordinates(){        
//
//        let newCoordinates = [];
//        
//        if(canvas){
//            canvas.W = int(W.value());
//            canvas.H = int(H.value());
//            this.W = int(W.value());
//            this.H = int(H.value());
//            canvas.coordinates = [];
//            canvas.rows = [];
//            canvas.columns = [];
//            canvas.cells = [];
//        }
//
//        for (let x = 0; x <= width; x += this.W) {  
//            for (let y = 0; y <= height; y += this.H) {
//                
//                let coords = [];
//                coords[0] = x;
//                coords[1] = y;
//                if(canvas){
//                    coords[2] = x + canvas.W/2; 
//                    coords[3] = y + canvas.H/2;
//                } else {
//                    coords[2] = x + this.W/2; 
//                    coords[3] = y + this.H/2;   
//                }
//                newCoordinates.push(coords);
//                
//                let newCell = [];
//                newCell[0] = x;
//                newCell[1] = y;
//                if(canvas){
//                    newCell[2] = canvas.W;
//                    newCell[3] = canvas.H;                  
//                    canvas.cells.push(newCell); 
//                } else {
//                    newCell[2] = this.W;
//                    newCell[3] = this.H;
//                    this.cells.push(newCell); 
//                }   
//                
//                if(x == 0){
//                    let newRow = [];
//                    newRow[0] = x;
//                    newRow[1] = y;
//                    newRow[2] = width; 
//                    if(canvas){
//                        newRow[3] = canvas.H;
//                        canvas.rows.push(newRow); 
//                    } else {
//                        newRow[3] = this.H;
//                        this.rows.push(newRow); 
//                    }
//                }
//                if(y == 0){ 
//                    let newColumn = [];
//                    newColumn[0] = x;
//                    newColumn[1] = y;
//                    newColumn[3] = height;
//                    if(canvas){ 
//                        newColumn[2] = canvas.W;                      
//                        canvas.columns.push(newColumn); 
//                    } else {
//                        newColumn[2] = this.W;
//                        this.columns.push(newColumn); 
//                    }
//                }
//            }
//        }
//        if(canvas){
//            canvas.coordinates = newCoordinates;
//            palette.update();
//        } else {
//            return newCoordinates;     
//        }
//         
//    }   
//}
//
//class Palette {  
//    
//    constructor(color1, color2) {
//        this.colors = this.getColors(color1, color2);
//    }
//
//    getColors(color1, color2){ 
//        let newColors = [];
//        newColors[0] = color1;
//        for(let i = 1; i < 10; i++){
//            newColors[i] = lerpColor(color1, color2, i * .1);    
//        }
//        newColors[10] = color2;
//        return newColors;             
//    }  
//    
//    update(color1, color2){
//        strokeWeight(strokeW.value());
//    }
//}



/*
// ELLIPSE TARGET
public PShape drawTarget(float xloc, float yloc, int size, int numSteps) {
  PShape target = createShape(GROUP);
  float grayvalues = 255/numSteps;
  float steps = size/numSteps;
  for (int i = 0; i < numSteps; i++) {
    //fill(245, i*grayvalues*.12);
    //noStroke();
    stroke(125);
    PShape ellipse = createShape(ELLIPSE, xloc, yloc, size - i*steps, size - i*steps);
    target.addChild(ellipse);                                                              //  <<<<<<<<  instead of arrays below??
  }
  noFill();
  return target;
}

*/
//
//
//
//
//
//class Snowflake{
//  
//    constructor(radius, locX, locY, palette) {
//        this.levels = int(random(2,5));
//        this.radius = radius;
//        this.locX = locX;
//        this.locY = locY;
//        this.strokeWeight = int(this.radius * .04);  
//        this.strokeColor = 0;
//        this.palette = palette;
//        let divisorOptions = [3,4,6,8];
//        this.divisor = divisorOptions[int(random(0,divisorOptions.length))]; 
//    }
//    
//    drawSnowflake(){
//        
//        
//    translate(this.locX, this.locY);
//    let x = 0;
//    let y = 0;
//    let angle = TWO_PI / this.divisor;
//    //stroke(this.strokeColor);
//    //strokeWeight(this.strokeWeight);
//    //let fillColor;                                                                       
//    let polyOptions = [3,4,6,8];
//    let polySides = polyOptions[int(random(0,polyOptions.length))];    
//    //PShape newShape;                                                                //??    <<<<
//    let polarPicker = int(random(0, 10));
//
//
//    while((this.divisor == 3 && polySides == 4) || (this.divisor == 4 && polySides == 3 )){
//      polySides = polyOptions[int(random(0,polyOptions.length))];
//      
//    }
//    
//    if(polySides == 3 && this.levels == 2){
//      this.levels = int(random(3,5));  
//    }    
//    
//    //this.strokeColor = this.palette[int(random(0,palette.length-1))];
//    //stroke(this.strokeColor);
//
//    // Draws just the lines first
//    for (let a = 0; a < TWO_PI * 6; a += angle) {  
//      let sx = x + cos(a) * this.radius;
//      let sy = y + sin(a) * this.radius;
//      line(0, 0, sx, sy);
//    }
//       
//       
//       
//    //  SHAPES  
//       
//       
//    let tempRadius = this.radius;
//    
//    for(let i = 0; i < this.levels; i++){
//      this.radius = tempRadius;
//      //stroke(this.strokeColor);                       
//      //fillColor = this.strokeColor;                
//      
//      if(i != 0){
//        this.radius = this.radius * (i * .25);
//      }       
//      
//      //this.fillColor = this.palette[int(random(2,palette.length))];
//      //this.strokeColor = this.palette[int(random(2,palette.length))];
//      //stroke(this.strokeColor);
//      
//      for (let a = 0; a < TWO_PI * 6; a += angle) {  
//        let sx = x + cos(a) * this.radius;
//        let sy = y + sin(a) * this.radius;
//        //noFill();
//        //fill(this.fillColor);                     
//        
//             
//        //ellipse(sx, sy, radius/4, radius/4); 
//        
//         if(polarPicker >= 0 && polarPicker < 7){
//              //newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);    // <<<<<<<<<<<<<<<<<<<
//              //shape(newShape); 
//              noFill();
//              //newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);           <<<<<<<<<<<<<<<<<<<<<,
//              ///shape(newShape); 
//          } else {
//              ellipse(sx, sy, this.radius/2, this.radius/2);   
//              noFill();
//              ellipse(sx, sy, this.radius/4, this.radius/4); 
//          }
//      }
//         
//      if (this.divisor == 3){
//        
//        push();        
//        rotate(1.05);        
//        scale(.75);
//              
//          //stroke(this.strokeColor);
//          for (let a = 0; a < TWO_PI * 6; a += angle) {  
//            let sx = x + cos(a) * this.radius;
//            let sy = y + sin(a) * this.radius;
//            line(0, 0, sx, sy);
//          }         
//          
//          for(let j = 0; j < this.levels; j++){
//      
//            this.radius = tempRadius;
//            
//            if(j != 0){
//              this.radius = this.radius * (j * .25);
//            }   
//
//            //this.fillColor = this.palette[int(random(2,palette.length))]; 
//            //this.strokeColor = this.palette[int(random(2,palette.length))];
//            //stroke(this.strokeColor);
//            
//            for (let a = 0; a < TWO_PI * 6; a += angle) {  
//              let sx = x + cos(a) * this.radius;
//              let sy = y + sin(a) * this.radius;
//              //fill(this.fillColor);                                        
//
//
//             if(polarPicker >= 0 && polarPicker < 7){
//                  ///newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);            <<<<<<<<<<<<<<<
//                 // shape(newShape); 
//                  noFill();
//                  //newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);        <<<<<<<<<<<<<<<<<<<
//                 /// shape(newShape); 
//              } else {
//                  ellipse(sx, sy, this.radius/2, this.radius/2);   
//                  noFill();
//                  ellipse(sx, sy, this.radius/4, this.radius/4); 
//              }
//              
//
//              //newShape = drawStar(sx, sy, radius/4, radius/2, polySides, this.palette);
//              //shape(newShape);
//              //newShape = drawStar(sx, sy, radius/10, radius/6,  polySides, this.palette);  
//              //shape(newShape);
//              
//            }           
//          }      
//        rotate(-1.05);
//        //rotate(-.33);
//        pop();      
//      }
//
//      if (this.divisor == 4 ){
//        
//        push();      
//        rotate(.75);        
//        scale(.75);       
//        
//          //stroke(this.strokeColor);
//          for (let a = 0; a < TWO_PI * 6; a += angle) {  
//            let sx = x + cos(a) * this.radius;
//            let sy = y + sin(a) * this.radius;
//            line(0, 0, sx, sy);
//          }
//                    
//          for(let j = 0; j < this.levels; j++){
//      
//            this.radius = tempRadius;
//            
//            if(j != 0){
//              this.radius = this.radius * (j * .25);
//            }      
//                          // <<<<<<<<<<<<<<<<<
//            //stroke(this.strokeColor);
//            //this.fillColor = this.palette[int(random(0,palette.length-1))]; 
//            for (let a = 0; a < TWO_PI * 6; a += angle) {  
//              let sx = x + cos(a) * this.radius;
//              let sy = y + sin(a) * this.radius;              
//              //fill(this.fillColor); 
//              //   <<<<<<<<<<<<<<<<<
//              
//              
//              if(polarPicker >= 0 && polarPicker < 7){
//                  //newShape = drawPolygon(sx, sy, radius/4, polySides, this.strokeWeight);             <<<<<<<<<<<<<<<<
//                  //shape(newShape); 
//                  noFill();
//                  //newShape = drawPolygon(sx, sy, radius/2, polySides, this.strokeWeight);             ,<<<<<<<<<<<<<<<<
//                  //shape(newShape); 
//              } else {
//                  ellipse(sx, sy, this.radius/2, this.radius/2);   
//                  noFill();
//                  ellipse(sx, sy, this.radius/4, this.radius/4); 
//              }
//              
//              
//            
//                                
//              //newShape = drawStar(sx, sy, radius/2, radius/4, polySides, this.palette);
//              //shape(newShape); 
//              //newShape = drawStar(sx, sy, radius/10, radius/6, polySides, this.palette);
//              //shape(newShape); 
//            }           
//          } 
//        rotate(-.75);       
//        pop(); 
//
//      }
//        
//    }
//        
//}
//    
//}
//        
//
//
//
//
//
//
//function randomDimensions(square){ 
//    
//    
//    // if(square == true)    <<<<<<<<<<<<<    
//    
//    let wOptions = []
//    let hOptions = []
//     for(let i = 1; i <= width; i++){
//      // && i >= (width * innerWBound) && i <= (width * outerWBound)
//      if(width % i == 0){
//        wOptions.push(i);
//      }
//    }
//    for(let i = 1; i <= height; i++){
//      if(height % i == 0){
//        hOptions.push(i);
//      }
//    }
//    let newDimensions = [];
//    let newW = wOptions[int(random(wOptions.length))];
//    let newH = hOptions[int(random(hOptions.length))]; 
//    newDimensions[0] = newW;
//    newDimensions[1] = newH;
//        
//    return newDimensions;
//}
//

//
//function getInput(){
//     bg = bgStyle.value();
//     shape = shapes.value();
//    if(r1.value() != undefined){
//        c1 = color(r1.value(), g1.value(), b1.value());
//        c2 = color(r2.value(), g2.value(), b2.value());
//        palette.colors = palette.getColors(c1, c2);
//    }
//}
//        
//function saveImage(){
//    saveCanvas(c, 'iteration', 'jpg');
//}
//
//
//function randomPoints(){
//    
//    //randomQty = int(randomQtyElement.value());
//    
//    let randPoints = [];
//   /* for(let i = 0; i < randomQty; i++){
//        let randPair = [];
//        randPair[0] = int(random(width));
//        randPair[1] = int(random(height));
//        randPoints.push(randPair);
//    }*/
//    return randPoints;
//};
//
//function updateRandomPoints(){
//    canvas.randoms = randomPoints();
//}
//
//
//function gotFile(file){
//    //createP(file.name + " " + file.size);   
//    //createP(file.type); 
//    //createP(file.size); 
//    //newImage = file;
//    img = createImg(file.data);
//    img.size(canvas.W,canvas.H);
//    img.mouseClicked(insertImage);
//}
//
//function insertImage(){
//}
//
//
//
//











/*


    
    
    
    
    
    
    
    
    
        
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
        
        push();        
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
        pop();      
      }

      if (this.divisor == 4 ){
        
        push();      
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
        pop(); 
      }     
    } 
  }
} 


*





















































/*
    















// tri strip




let x;
let y;
let outsideRadius = 150;
let insideRadius = 100;

function setup() {
  createCanvas(720, 400);
  background(204);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(204);

  let numPoints = int(map(mouseX, 0, width, 6, 60));
  let angle = 0;
  let angleStep = 180.0 / numPoints;

  beginShape(TRIANGLE_STRIP);
  for (let i = 0; i <= numPoints; i++) {
    let px = x + cos(radians(angle)) * outsideRadius;
    let py = y + sin(radians(angle)) * outsideRadius;
    angle += angleStep;
    vertex(px, py);
    px = x + cos(radians(angle)) * insideRadius;
    py = y + sin(radians(angle)) * insideRadius;
    vertex(px, py);
    angle += angleStep;
  }
  endShape();
}






// recursive circles

function setup() {
  createCanvas(720, 400);
  noStroke();
  noLoop();
}

function draw() {
  drawCircle(width / 2, 280, 6);
}

function drawCircle(x, radius, level) {
  const tt = (126 * level) / 4.0;
  fill(tt);
  ellipse(x, height / 2, radius * 2, radius * 2);
  if (level > 1) {
    level = level - 1;
    drawCircle(x - radius / 2, radius / 2, level);
    drawCircle(x + radius / 2, radius / 2, level);
  }
}





arc(479, 300, 280, 280, PI, TWO_PI);
























  beginShape();
  vertex(sx, sy);
  endShape(CLOSE);















public PShape drawSuperTarget(int xLoc, int yLoc,  color[] colors, int numSteps, float a, float b, float n) {
  
  strokeWeight(10);  //  a or b %
  translate(xLoc, yLoc);
  PShape superTarget = createShape(GROUP);

  for (int i = 0; i < numSteps; i++) {
    
    PShape superShape = createShape();  
      
    superShape.beginShape();
    superShape.stroke(colors[colors.length-1]);
    superShape.fill(colors[int(random(1,colors.length-3))]);    
    for (float angle = 0; angle < TWO_PI; angle += 0.1) {
      float na = 2 / n;
      float x = pow(abs(cos(angle)), na) * a * sgn(cos(angle));
      float y = pow(abs(sin(angle)), na) * b * sgn(sin(angle));
      superShape.vertex(x, y);
    }
    a *= .5;
    b *= .5;
    superShape.endShape(CLOSE);
    superTarget.addChild(superShape);
  }
  return superTarget;
}

float sgn(float val) {
  if (val == 0) {
    return 0;
  }
  return val / abs(val);
}



*/






