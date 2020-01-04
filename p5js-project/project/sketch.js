
class Iteration {
  constructor(width, height, c) {                   
    this.width = width;
    this.height = height;
    this.canvas = c;
    this.layers = []; 
  }
    
  get iterationCanvas(){
    return this.canvas;   
  }
    
  set iterationCanvas(c){
    this.canvas = c;   
  }
    
  updateCanvasSize() {                                       //  updating canvas size does not update stroke size relative to the canvas    
    canvasW = select('#canvas-w');   
    canvasH = select('#canvas-h');
    if(canvasW.value() && canvasW.value()){
        c.remove();
        let canvasContainer = select('#canvas-container');                          
        c = createCanvas(int(canvasW.value()), int(canvasH.value()));    //  and update iteraiton width and height    need getters and setters 
        c.parent(canvasContainer);
        this.iterationCanvas = c;
    }
    else{
        alert('enter a value between 100 and 12k');    
    }
  }
      
  paint(){
      
  }
    
  removeLayer(index){
    this.layers.splice(index, 1);    
  }

}


function addLayer() {     //  when adding the layer the ui should appear first before the draw?
  let layer;
  switch(this.elt.textContent) {
      case 'grid':
        layer = new GridLayer(width, height, i.layers.length);
        i.layers.push(layer); 
        i.layers[i.layers.length - 1].newCoordinates(width * .1, height * .1, width, height);
        break;
      case 'random':
        layer = new RandomLayer(width, height, i.layers.length);
        i.layers.push(layer); 
        //i.layers[i.layers.length - 1].newCoordinates(100, width * .05);
          i.layers[i.layers.length - 1].newCoordinates(400, 25, 10, 1.2);
        break;
      case 'simple':
        layer = new SimpleLayer(width, height, i.layers.length);
        i.layers.push(layer);
        i.layers[i.layers.length - 1].newCoordinates();
        break;
      case 'horizon':
        layer = new HorizonLayer(width, height, i.layers.length);
        i.layers.push(layer); 
  }
  i.layers[i.layers.length - 1].settingsUI();
}



class Layer { 
  constructor(type, canvasW, canvasH, index) {
    this.type = type;
    this.W = canvasW;
    this.H = canvasH;
    this.index = index;
    this.shapes = [];
    this.palette = [];
    this.add(this.type);
  }
  
  add(type) {  
      // adds layer panel to layer container
      let layersContainer = select('#layers-container'); 
      
      let layerPanel = createElement('div').id('layer-' + this.index).addClass('layer-panel'); 
      layerPanel.elt.setAttribute('draggable', 'true');
      layerPanel.elt.setAttribute('ondragstart', 'drag(event)');
      layerPanel.parent(layersContainer);
      
      let layerTitle = createElement('h3', this.type);
      layerTitle.parent(layerPanel);
      
      let layerSettings = createElement('div').id('settings-container-' + this.index).addClass('settings-container'); 
      layerSettings.parent(layerPanel);
      
      // creates remove button-' + this.index
      let removeButton = createElement('button', 'Remove').id(this.index).addClass('layer-remove');                        // <<<< this id should be better ..just a number .. should label layer-# and regex remove on other end
      removeButton.parent(layerPanel);
      removeButton.mousePressed(this.remove);   
  }
    
  remove() {  
      this.parent().remove();
      let buttons = selectAll('.layer-remove');
      for(let [index, button] of buttons.entries()){
          button.id(index);
      }
      i.removeLayer(this.elt.id);
      
      let layers = selectAll('.layer-panel');
      for(let [index, layer] of layers.entries()){
          layer.id('layer-' + index);
      }
      
      let settings = selectAll('.settings-container');
      for(let [index, setting] of settings.entries()){
          setting.id('settings-container-' + index);
      }
  }
}


class RandomLayer extends Layer {                                                //  what if anything can migrate up to layer?   ... settings UI  anything UI
    constructor(canvasW, canvasH, index) {
        super('random', canvasW, canvasH, index); 
        this.qty;                               
        this.coordinates = [];                       
        this.scalesArray = []; 
    }
    
    get randomLayerQty() {   
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
    get randomLayerScalesArray() {
        return this.scalesArray;
    }
    set randomLayerScalesArray(scalesArray) {   
        this.scalesArray = scalesArray;
    }
    
    newCoordinates(qty, shapeScale, scaleVariation, spread){ 
        
        this.randomLayerQty = qty;
        let scalesArray = [];
        
        for (let i = 0; i < qty; i++) {
            
            if(scaleVariation){
                scalesArray.push(int(random(shapeScale - scaleVariation, shapeScale + scaleVariation)));         
            }
            else {
                scalesArray.push(shapeScale);    
            } 
        }
        this.randomLayerScalesArray = scalesArray;  
        
        let coordinates = [];
        
        for (let i = 0; i < qty; i++) {
            
             if(spread){
 
                let counter = 0; 

                while(counter < 10000){ 

                    let overlapping = false;
                    let coords = createVector(int(random(0, this.W + 1)), int(random(0, this.H + 1)));  //  

                    for (let j = 0; j < coordinates.length; j++) {

                          let existingCoord = coordinates[j];
                          let d = dist(coords.x, coords.y, existingCoord.x, existingCoord.y);

                          if (d < (scalesArray[i] + scalesArray[j]) * spread) {
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
    
    settingsUI(){
        
        let settingsContainer = select('#settings-container-' + this.index);
        
        let shapeDrop = createElement('div').id('shape-drop-' + this.index);
        shapeDrop.elt.setAttribute("style", "background:#FFF; height:40px; width:40px;");
        shapeDrop.parent(settingsContainer)
        
        let coordsQty = createInput(this.qty);
        coordsQty.input(inputEvent);
        coordsQty.parent(settingsContainer);
        
        let coordsScale = createSlider(0, this.W, this.W * .05); 
        coordsScale.input(inputEvent);
        coordsScale.parent(settingsContainer);
        
        let coordsScaleVariation = createInput('0');
        coordsScaleVariation.input(inputEvent);
        coordsScaleVariation.parent(settingsContainer);
        
        let coordsSpread = createInput('0');
        coordsSpread.input(inputEvent);
        coordsSpread.parent(settingsContainer);
        
        let updateButton = createButton('Update');
        updateButton.parent(settingsContainer);
        updateButton.mousePressed(updateEvent);       //   << not creating these in class? 
    }
}


function inputEvent(){
    console.log(this.elt.value);
}

function updateEvent(){
    console.log('updated');
}


class GridLayer extends Layer {
    constructor( canvasW, canvasH, index) {
        super('grid', canvasW, canvasH, index); 
        this.W;
        this.H;
        this.coordinates = []       
        this.rows; 
        this.columns;                        
        this.cells; 
        this.horizontals;
        this.verticals;
        this.diagonalsA;
        this.diagonalsB;           
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
    
    newCoordinates(W, H, canvasW, canvasH){
        
        let coordinates = [];
        for (let i = 0; i <= canvasW; i += W) {  
            for (let j = 0; j <= canvasH; j += H) {
                 let coords = createVector(i, j);
                 coordinates.push(coords);
            }
        }
        this.gridW = W;
        this.gridH = H;
        this.gridCoordinates = coordinates;
        if(this.gridRows){this.newRows(H, canvasW, canvasH);}
        if(this.gridColumns){this.newColumns(W, canvasW, canvasH);}               ///   not doing the getters setters here
        if(this.gridCells){this.newCells(W, H, canvasW, canvasH);}
        if(this.gridHorizontals){this.newHorizontals(W, H, canvasW, canvasH);}
        if(this.gridVerticals){this.newVerticals(W, H, canvasW, canvasH);}
        if(this.gridDiagonalsA){this.newDiagonalsA(W, H, canvasW, canvasH);}
        if(this.gridDiagonalsB){this.newDiagonalsB(W, H, canvasW, canvasH);}
    }
    
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
    
    newDiagonalsA(W, H, canvasW, canvasH){                           //   Consolidate      <<<<<<<<<<<<
        
        let diagonals = [];
        let hCount = 1;
        for (let i = height - H; i >= 0; i -= H) {
             let diagonal = [];
             let startCoord = createVector(0, i);        
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
             let startCoord = createVector(i, 0);        
             diagonal.push(startCoord);
            
             for(let j = 0; j < wCount; j++){  
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
             let startCoord = createVector(width, i);        
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
             let startCoord = createVector(i, 0);       
             diagonal.push(startCoord);
            
             for(let j = 0; j < wCount; j++){   
                 let coord = createVector(startCoord.x - ((j + 1) * W), startCoord.y + ((j + 1) * H));
                 diagonal.push(coord);
             }
             diagonals.push(diagonal);
             wCount+=1;  
        }
        this.gridDiagonalsB = diagonals;     
    }
    
    settingsUI(){                                          //  repeating ourself ... plus index stuff within the    
        console.log('grid layer');
    }
}

class SimpleLayer extends Layer {                                                
    constructor(canvasW, canvasH, index) {
        super('simple', canvasW, canvasH, index);                          
        this.coordinates = [];                       
    }
    
    get simpleCoordinates() {
        return this.coordinates;
    }
    set simpleCoordinates(coordinates) {
        this.coordinates = coordinates;
    }
    
    newCoordinates(canvasW, canvasH){
        
        let coordinates = [];
        let coordinate;
        
        coordinate = createVector(width/2, height/2);
        coordinates.push(coordinate);
        coordinate = createVector(0, 0);
        coordinates.push(coordinate);
        coordinate = createVector(width, 0);
        coordinates.push(coordinate);
        coordinate = createVector(width, height);
        coordinates.push(coordinate);
        coordinate = createVector(0, height);
        coordinates.push(coordinate);
        coordinate = createVector(width/2, 0);
        coordinates.push(coordinate);
        coordinate = createVector(width, height/2);
        coordinates.push(coordinate);
        coordinate = createVector(width/2, height);
        coordinates.push(coordinate);
        coordinate = createVector(0, height/2);
        coordinates.push(coordinate);
        coordinate = createVector(width * .25, height * .25);
        coordinates.push(coordinate);
        coordinate = createVector(width * .75, height * .25);
        coordinates.push(coordinate);
        coordinate = createVector(width * .25, height * .75);
        coordinates.push(coordinate);
        coordinate = createVector(width * .75, height * .75);
        coordinates.push(coordinate);
        
        this.simpleCoordinates = coordinates;
    }
    
    settingsUI(){                                          
        console.log('simple layer');
    }
}

class HorizonLayer extends Layer {                                               
    constructor(canvasW, canvasH, index) {
        super('horizon', canvasW, canvasH, index); 
        this.levels;                               
    }
}

class Palette {
//    constructor(color1, color2, color3) {
//        this.colors = [color1, color2, color3];
     constructor() {
        this.colors = []; 
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
           
        // for each color
        for(let i = 0; i < colors.length; i++){
            // for each color following
            for(let j = i + 1; j < colors.length; j++){
                
                console.log(i + "   " + j);
                
                let swatch = []
                // color 1
                swatch[0] = colors[i]
                
                // add interpolated colors
                for(let k = 1; k < 10; k++){
                    swatch[k] = lerpColor(colors[i], colors[j], k * .1);    
                }
                // color 2
                swatch[10] = colors[j];
                swatches.push(swatch);
            }   
            
        }
        
        
//        let swatch = [colors[0]];
//        
//        for(let i = 1; i < 10; i++){
////        if(this.type == 'custom'){}
//            swatch[i] = lerpColor(colors[0], colors[1], i * .1);    
//        }
//        swatch[10] = colors[1];
//        swatches.push(swatch);
//        if(colors[2]){
//            let swatch2 = [colors[1]];                 //   Cleaner ?    could be more multiple colors / custom qty steps / tints / shades / types
//            let swatch3 = [colors[2]];
//            
//            for(let i = 1; i < 10; i++){
//    //        if(this.type == 'custom'){}
//                swatch2[i] = lerpColor(colors[1], colors[2], i * .1);
//                swatch3[i] = lerpColor(colors[2], colors[0], i * .1);
//            }
//            swatch2[10] = colors[2]
//            swatch3[10] = colors[0]
//            swatches.push(swatch2);
//            swatches.push(swatch3);    
//        }
        

        this.paletteSwatches = swatches;
    } 
}


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



let layerCount,     canvas, W, H, c1, c2, dimensions, strokeW, newStroke, newFill, colorIndex, firstDraw, canvasButton, bgStyle, bg, shapes, dropImage, img, newFile, newImage, colorHolder, cellHolder, shapeFillHolder, randomQty, shapeStrokeHolder, randomQtyElement, square, r1, g1, b1, r2, g2, b2;  //, palette iteration,
   

let i;
let grid;
let palette;
let  c, canvasW, canvasH;
let testRandom;

function setup() {
    
    // ******  DATA  ******
    
    // UI Data Options
    let layerTypeOptions = ['grid','random','simple','horizon']; 
    let shapeTypeOptions = ['polys','stars','supers','polars','roses','radials']; 
    
    //noLoop();
    noStroke();
    noFill();
    

    // ******  UI CREATION ******
    
    // Creates Canvas
    let canvasContainer = select('#canvas-container');
    c = createCanvas(800, 800);
    c.parent(canvasContainer);
    
     i = new Iteration(width, height, c);
    
    // Canvas Size Input
    canvasW = select('#canvas-w');                 // constrain and optimize interface on options
    canvasH = select('#canvas-h');
    canvasW.value(width);
    canvasH.value(height);
    let canvasSize = select('#canvas-size');
    canvasSize.mousePressed(i.updateCanvasSize);  
    
    
     // Display layer type options
    let layerTypeUl = select('#layer-types');  
    layerTypeOptions.forEach(function(element) {
        let layerType = createElement('li', element).addClass('col-3');
        //layerType.classList.add("col-3");
        layerType.parent(layerTypeUl);
        layerType.mousePressed(addLayer);          
    });
    

    
    let shapeTypeUl = select('#shape-types');  
    shapeTypeOptions.forEach(function(element) {
        let shapeType = createElement('li', element).addClass('col-2');
        //layerType.classList.add("col-3");
        shapeType.parent(shapeTypeUl);
        shapeType.mousePressed(addShape);          
    }); 
    
    
    
   
    
    
        //  **********        TEMP    ***********
    
    let color1 = color(135,190,155);
    let color2 = color(194,218,201);
    let color3 = color(254,223,206);
    let color4 = color(225,129,103);
    let color5 = color(235,81,76);
    let color6 = color(142,47,22);
    let color7 = color(220,26,22);
    let color8 = color(255,245,240);
    let color9 = color(16,221,229);
    // 
    let palette1 = [color1, color2, color3, color4, color5, color6, color7, color8, color9];

    palette = new Palette();
    palette = new Palette();
    //palette.newSwatches(palette.colors);
    palette.newSwatches(palette1);
    
    let saveButton = select('#save')
    saveButton.mousePressed(saveImage);


    let playButton = select('#play');
    let stopButton = select('#stop');
    let rateSlider = select('#rate');
    
    playButton.mousePressed(play);
    stopButton.mousePressed(stop);
    let rate = rateSlider.value();
    rateSlider.input(frames);
   
    

    
    //   *******  PREVIOUS  ********
    
    
//    
//    layerCount = 0;

//    
//    let gridTypeOptions = ['cells'];
//    let shapeOptions = ['ellipses','polys', 'stars', 'diamonds' ,'snowflakes', 'radials', 'roses', 'supers'];
//    
//    // SHAPES LAYER 
//    let shapeTypeUl = select('#shape-types');
//    shapeOptions.forEach(function(element) {
//      let shapeType = createElement('li', element);
//      //shapeType.parent(shapeTypeUl);
//      //shapeType.mousePressed(addShapeType);
//    });
     
/*    // GRID 
    let gridTypeUl = select('#grid-types');
    gridTypeOptions.forEach(function(element) {
      let gridType = createElement('li', element);
      gridType.parent(gridTypeUl);
      gridType.mousePressed(setGridType);
    });*/
    
//    
//    firstDraw = 1;
//    
//    bgStyle = createRadio();
//    bgStyle.option('background');
//    bgStyle.option('rows');
//    bgStyle.option('columns');
//    bgStyle.option('cells');
//    
//    shapes = createRadio();
//    shapes.option('stars');      // this needs to be selected or ability to step frames   ....
//    shapes.option('roses');
//    shapes.option('diamonds');
//    shapes.option('polygons');
//    shapes.option('supers');
//    shapes.option('snowflakes');   

    //createCanvas(800, 800, WEBGL);
    
//    W = createInput(40);  // as % of starting canvas
//    H = createInput(40);
//    strokeW = createInput(4);  // H * .05                                                          // <<<<<<<<<<<<<???????????????
    
    //randomQtyElement = select('#randomQty'); 
    //randomQtyElement.input(updateRandomPoints);
//    
//    square = true;
    
    //dimensions = randomDimensions(square); 
    //canvas = new Canvas(40, 40);   
    
    //updateCanvas = select('#updateCanvas');
    //updateCanvas.mousePressed(getInput);
    //selectCanvas = select('#selectCanvas');
    //selectCanvas.mousePressed(saveImage);
    
//    canvasButton = createButton("New Canvas");
    //canvasButton.mousePressed(canvas.getCoordinates);
//    
//    r1 = select('#r1');
//    g1 = select('#g1');
//    b1 = select('#b1');
//    r2 = select('#r2');
//    g2 = select('#g2');
//    b2 = select('#b2');
//    
//    strokeWeight(strokeW.value());

//   c1 = color(random(255), random(255), random(255));
//   c2 = color(random(255), random(255), random(255));
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
//    colorHolder = 0;
//    cellHolder = 0;
//    shapeFillHolder = 0;
//    shapeStrokeHolder = 0;
//    
//    bg = 'background'; 
//    dropImagedropImage = select('#dropImage');
//    //newFile = dropImage.drop(gotFile);
// 
    
 
    
// End of Setup    
} 




 
function frames(){
    frameRate(this.value());
}

function  play(){
    loop();    
}
    
function stop(){
    noLoop();    
}
    
function saveImage(){
    let name = select('#name').value();
    if(name != ''){                                           //   change to ternary operator
        saveCanvas(c, 'iteration-' + name, 'jpg');
    }else{
        saveCanvas(c, 'iteration', 'jpg');   
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function addShape() { 
    console.log('shape added');
}





class Shape {
    constructor() {
      
    }
}















let roseShapes = [
    {'d':59, 'n':6},{'d':83, 'n':4},{'d':83, 'n':6},{'d':95, 'n':6},{'d':14, 'n':4},{'d':97, 'n':8},{'d':79, 'n':4},{'d':79, 'n':5},{'d':79, 'n':8},{'d':51, 'n':4},{'d':46, 'n':6},{'d':87, 'n':6},{'d':23, 'n':8},{'d':71, 'n':4},{'d':25, 'n':4},{'d':91, 'n':7},{'d':38, 'n':4},{'d':49, 'n':5},{'d':87, 'n':4},{'d':70, 'n':8},{'d':71, 'n':5},{'d':19, 'n':6},{'d':67, 'n':5},{'d':57, 'n':6},{'d':13, 'n':6},{'d':47, 'n':8},{'d':39, 'n':8},{'d':41, 'n':4}
]; 



function draw() {
    
    
    //i.paint();
    
    let swatchIndex = int(random(0, palette.swatches.length));
    let colorIndex = int(random(0, palette.swatches[0].length ));
    let bgColor = palette.swatches[swatchIndex][colorIndex];
    let theColor = bgColor;
  
    background(bgColor);

    //adjustable spirals     layered/even polars w variable radius spread   
    
//    let divisors = 20;
//    let radius = 30;
//    let loops = 3;
//    let spiral = 3;
//    let layers = 2;
//
//    let shapes = [];// function calls?
//    
//
//    let x = width/2;
//    let y = height/2;
//    let angle = TWO_PI / divisors;
//    
//    for (let a = 0; a < TWO_PI * loops; a += angle) {  
//        let sx = x + cos(a) * radius;
//        let sy = y + sin(a) * radius;
//        
//        point(sx, sy);
//        
//        if(spiral > 0){
//            radius += spiral;    
//        }
//        
//        
//    } 
    
    
    //    enforced contrast    < better palette to accept any quantity
    
    if(i.layers.length > 0){
    for(let [index1, layer] of i.layers.entries()){
    for(let [index2, coord] of i.layers[index1].coordinates.entries()){
        
//        strokeWeight(testRandom.randomLayerRadius[index]);
        
        if(layer.type == 'random'){

            // STARS
            // variable: levels(1 or 2, 50% or greater of 2)   points(4 - 12)    strokeScale/variation(strokeScale variable)   inner/outerRadiusVariation(radiusVariation variable applied to either star radius      could also vary inner star points vs outer)    contrast enforced manual adjustment in colorCheck function w out breaking
            let levelPicker = int(random(0,4));  
            let starPoints = int((random(4,12)));
            let shapeScale = layer.scalesArray[index2];
            let strokeScale = layer.scalesArray[index2] * .1;
            //let radiusVariation = random(.3, .8);  
            let radiusVariation = .5;
            
            strokeScale = int(random(strokeScale * .5, strokeScale * 2));
            strokeWeight(strokeScale); 
            

            function colorCheck(previousColor){
                
                let newColor = previousColor;   
                let colorCheck = false;
                let count = 0;
                while(newColor == previousColor || colorCheck == false){                                           
                    swatchIndex = int(random(0, palette.swatches.length));
                    colorIndex = int(random(0, palette.swatches[0].length ));
                    newColor = palette.swatches[swatchIndex][colorIndex];
                    let bright1 = brightness(previousColor);
                    let bright2 = brightness(newColor);
                    let light1 = lightness(previousColor);
                    let light2 = lightness(newColor);
                    if(abs(bright1 - bright2) > 15 && abs(light1 - light2) > 15){           //  adjust these values for contrast enforce
                        colorCheck = true;
                    }
                       
                }
                
                return newColor;
                
            }
            

            
            theColor = colorCheck(bgColor);
            stroke(theColor);
            
            theColor = colorCheck(theColor);
            fill(theColor);
            
            star(coord.x, coord.y, shapeScale * radiusVariation, shapeScale, starPoints);
            
            if(levelPicker > 0){ 
                
                strokeScale *= .5;
                strokeScale = int(random(strokeScale * radiusVariation, strokeScale * 2));
                strokeWeight(strokeScale);
                
                theColor = colorCheck(theColor);
                stroke(theColor);
                
                theColor = colorCheck(theColor);
                fill(theColor);
                
                star(coord.x, coord.y, (shapeScale * .5) * radiusVariation, shapeScale * .5, starPoints);   
            
            }
        }
        else {
            strokeWeight(10);    
        }
        
        
        
        //point(coord.x, coord.y);
        
        
          
        
          
        
         
        
//            let d;
//            let n;
//            do {
//                d = int(random(1,10));
//                n = int((random(1,8)));
//            } while (d  == n || (d == 3 && n  == 1)  || (d == 6 && n  == 2)  || (d == 9 && n == 3)) ;
//            push();
//            translate(coord.x, coord.y);
//            rose(d, n, testRandom.randomLayerRadius[index]);
//            pop();  
//        
//        
//        
//        
//        
        
        
        
        
//            let roseIndex = int(random(0,roseShapes.length));
//            
////            let d = int(random(10,100));
////            let n = int(random(2,9));    
//            
//            push();
//            translate(coord.x, coord.y);
//            roseM(roseShapes[roseIndex].d, roseShapes[roseIndex].n, testRandom.randomLayerRadius[index]);
//            pop();
//    


        
        
        
    }
    }
    }

//    
//  
    
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
    
    
// End of Draw   
    
    
    
    //saveImage();
    
    
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









//
//
//function setup() {
//  let c = createCanvas(100, 100);
//  background(200);
//  textAlign(CENTER);
//  text('drop file', width / 2, height / 2);
//  c.drop(gotFile);
//}
//
//function gotFile(file) {
//  background(200);
//  text('received file:', width / 2, height / 2);
//  text(file.name, width / 2, height / 2 + 50);
//}Canvas turns into whatever image is dragged/dropped onto it.buttons
//edit
//reset
//copy
//drop example 1let img;
//
//function setup() {
//  let c = createCanvas(100, 100);
//  background(200);
//  textAlign(CENTER);
//  text('drop image', width / 2, height / 2);
//  c.drop(gotFile);
//}
//
//function draw() {
//  if (img) {
//    image(img, 0, 0, width, height);
//  }
//}
//
//function gotFile(file) {
//  img = createImg(file.data, '').hide();
//}


// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

//var dragging = false; // Is the object being dragged?
//var rollover = false; // Is the mouse over the ellipse?
//
//var x, y, w, h;          // Location and size
//var offsetX, offsetY;    // Mouseclick offset
//
//function setup() {
//  createCanvas(640, 360);
//  
//  // Starting location
//  x = 100;
//  y = 100;
//  // Dimensions
//  w = 75;
//  h = 50;
//}
//
//function draw() {
//  background(255);
//  
//  
//  // Is mouse over object
//  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
//    rollover = true;
//  } 
//  else {
//    rollover = false;
//  }
//  
//  // Adjust location if being dragged
//  if (dragging) {
//    x = mouseX + offsetX;
//    y = mouseY + offsetY;
//  }
//
//  stroke(0);
//  // Different fill based on state
//  if (dragging) {
//    fill (50);
//  } else if (rollover) {
//    fill(100);
//  } else {
//    fill(175, 200);
//  }
//  rect(x, y, w, h);
//}
//
//function mousePressed() {
//  // Did I click on the rectangle?
//  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
//    dragging = true;
//    // If so, keep track of relative location of click to corner of rectangle
//    offsetX = x-mouseX;
//    offsetY = y-mouseY;
//  }
//}
//
//function mouseReleased() {
//  // Quit dragging
//  dragging = false;
//}








//
//
//if(design.design == "starry-landscape"){
//        
//        String axis = "Y";
//        setGradient(0, 0, width, height, lastColor, firstColor, axis);
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
         newShape[0] = drawRadial(width*3, divisor, angle, int(skyX), int(skyY), design.palette.colors);
         
         shape(newShape[0]);
         */
          
//       float skyX = random(-600, width/1.1);
//       float skyY = random(-400, height/1.1);
//       PShape target = drawTarget(skyX, skyY, width*2, int(random(6,12)));
//       shape(target);
//
//      //filter(INVERT);  
//      PShape newStar = new PShape(); 
//      for (int i = 0; i < randomQty; i++){
//        
//           newStar = drawStar(random(0, width), random(0, height/2), random(15,25), random(45,55), int(random(5,12)), design.palette.colors);
//           shape(newStar);                                                                               
//       } 
//       //filter(INVERT); 
//      int layers = 5;
//      float horizonHigh = .2;
//      float horizonLow = .6;
//      int strokeWeight = 20;
//      
//      while(layers > 0){
//        int curveY = int(random(height * horizonHigh, height * horizonLow));
//        int endY = curveY;
//        int endX = 0;
//    
//       smooth();
//        //PShape horizon = createShape();
//        //PShape land = createShape();
//        //PShape landscape = createShape(GROUP);
//
//        beginShape();
//        fill(design.palette.colors[2 * layers]);
//        stroke(design.palette.colors[2 * layers - 1]);
//        strokeWeight(strokeWeight);
//        curveVertex(0, curveY); 
//        
//        for (int i = 0; i <= width; i += design.canvas.W) {   
//          curveVertex(i, curveY);
//        
//          if (i != width){          
//              curveY = int(random(height * horizonHigh, height * horizonLow));
//          }  
//          if (i == width){
//              endX = i;
//          } 
//        }
//        curveVertex(endX, curveY);  
//        vertex(width, height);
//        vertex(0, height);
//        vertex(0, endY);
//        endShape();
//        
//        horizonHigh += .16;
//        horizonLow += .1;
//        strokeWeight += 15;
//        
//        layers--; 





// adjust setting container id to index ... random ui w drop area ... shape drop and reaction  .. work backwards from i.paint() 





//dropImagedropImage = select('#dropImage');
    //newFile = dropImage.drop(gotFile);


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





