// Chooses design type - names - saves file

class Iteration {
  
  String design; 
  
  Iteration(){
    
    //String [] collection = new String [] {"harlequin", "stained-glass", "starry-landscape", "radial-starburst", "striped", "stars", "tiled-triangle-pattern",
    //"tiled-polygons", "concentric-pattern", "concentric", "brick-pattern", "snowflakes"};
    
    String [] collection = new String [] {"starry-landscape"};
    int randomIndex = int(random(0, collection.length));
    this.design = collection[randomIndex];    
  }
  
  void saveTitle(String folder, int iteration){
     save(folder + "/" + "iteration-" + this.design + iteration + ".png");  
  } 
  
}
