
class Painter {
  
  Painter(Designer design, Composer composition){
    
    if((design.background == true)){       // remove objects here?  for now? 
     
     /*
      if(design.design == "harlequin"){
         setGradient(0, 0, width, height, design.palette.colors[0], design.palette.colors[design.palette.colors.length-1], "Y");
      } else {
        shape(composition.background);
      }
      */
      shape(composition.background);
    } 
   
    if((composition.rows != null)){    
      for(PShape row : composition.rows){
        shape(row);
      }
    } 
    
    if(composition.columns != null){
       for(PShape column : composition.columns){
       shape(column);
      }
    }
  
    if((composition.cells != null)){ 
      for(PShape cell : composition.cells){
        shape(cell);
      }
    }
    
    if((composition.elements != null)){ 
      for(ArrayList<PShape[]> layer : composition.elements){
        for(PShape[] shape : layer){
          for(int i=0;i<shape.length;i++){
            shape(shape[i]);
          }  
        }
      }
    }
    
    if(design.design == "tiled-triangle-pattern"){
      line(0, 0, 0, height);
      line(0, 0, width, 0);
    }
  } 
}
