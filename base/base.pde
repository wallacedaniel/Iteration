// All Values coded relative to canvas

 // Bricks  >  Add superEllipse  
 // Harlequin isCurrent(strokeWeight / strokeColor / background)  - gradient back (in diamonds?) - alt/additional back layers - additional elements in diamonds - no stoke option - add line/cirlce elements

//    -D Front End     Supershape1   remove all objects  Concentric-pattern With fill >> scale style       

// finalize py script in
// Mult download sizes
// New uploads
// Instagram + ?
// Content


void setup(){
  //size(8000,8000);
  size(6000,4000);
}

int iterate = 1;
  
void draw(){
  
  noStroke();
  noFill();
  
  String folder = "A";
  
  Iteration iteration = new Iteration();
  Designer design = new Designer(iteration.design);
  Composer composition = new Composer(design);
  //Painter painter = new Painter(design, composition);

  iteration.saveTitle(folder, iterate); 
  if(design.design == "stained-glass"){outputInverse(folder, design.design, iterate);}
  iterate += 1;
  
}
