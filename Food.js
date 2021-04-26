class Food {
    constructor () {
      
        this.foodStock = 0;
        this.image = loadImage("Milk.png");
        this.lastFed;
    }

    updateFoodStock(foodStock) {
       this.foodStock = foodStock
    }

    getFedTime(lastFed) {
        this.lastFed = lastFed;
    }

    deductFood() {
        if (this.foodStock > 0) {
            this.foodStock = this.foodStock-1;
        }
    } 

    getFoodStock () {
       return this.foodStock; 
    }
    

    display(){
     var x=80, y=50;
     imageMode(CENTER);
     
     if(this.foodStock !=0){
         for (var i=0; i<this.foodStock; i++){
            
             if(i%10==0){
                 x=80
                 if(y<450)
                 y=y+100;
             }
             image(this.image,x,y, 75,75);
             x=x+40;
         }
     }
    }
}