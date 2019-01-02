
class Painter {
  
  Painter(Designer design, Composer composition){
    
    //background(design.palette.colors[0]);
    //background(0);
   
    if((design.background == true)){ 
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

  } 
}
