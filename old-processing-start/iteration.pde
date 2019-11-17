// Chooses design type - names - saves file

class Iteration {
  
  String design; 
  
  Iteration(){
    
    //String [] collection = new String [] {"harlequin", "stained-glass", "landscape", "radial-starburst", "striped", "stars", "tiled-triangle-pattern",
    //"tiled-polygons", "concentric-pattern", "concentric", "brick-pattern", "snowflakes"};
    
    String [] collection = new String [] {"test"};
    int randomIndex = int(random(0, collection.length));
    this.design = collection[randomIndex];    
  }
  
  void saveTitle(String folder, int iteration){
     save(folder + "/iteration-" + this.design + iteration + ".png");  
  } 
  
}

// Saves an image with an inverted palette
void outputInverse(String folder, String design, int iteration) {
  PImage img = loadImage(folder + "/iteration-" + design + iteration + ".png");
  image(img, 0, 0);
  filter(INVERT);  
  save(folder + "/iteration-" + design + iteration + "0002.png"); 
}
