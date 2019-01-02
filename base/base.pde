// Re integrate all design into clean oop     -D Front End          Random Canvas     Divided Points    Landscape   <<<BoundsOver  Rose  Supershape1       remove all objects   multi canvas?
// Add significant new design elements
// finalize py script in
// Mult download sizes
// New uploads
// Instagram + ?
// Content


void setup(){
  size(6000,4000);   
}

int iterate = 1;
  
void draw(){
  
  //Remove an previous styles
  noStroke();
  noFill();
  
  String folder = "A";
  
  Iteration iteration = new Iteration();
  Designer design = new Designer(iteration.design);
  Composer composition = new Composer(design);
  Painter painter = new Painter(design, composition);
 
  iteration.saveTitle(folder, iterate); 
  iterate += 1;
  
  
 
  
  
}
