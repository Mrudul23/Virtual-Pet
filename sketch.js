
var dog,hungryDog,happyDog;
var foodObj;
var foodS, foodStock;
var fedTime, lastFed, feed, addFood;    

function preload(){
  sitdog =loadImage("Dogs/dog (1).png");
  pawdog =loadImage("Dogs/dog (2).png");
  doglay = loadImage("Dogs/dog (3).png");
  dogStanding = loadImage("Dogs/dog (4).png");
  hungryDog=loadImage("Dogs/dog (5).png");
  sleepyDog = loadImage("Dogs/dog (6).png");
  happyDog=loadImage("Dogs/dog (7).png");

  milkimage = loadImage("Milk.png");

  backgroundImg = loadImage("background.jpg");
  barkSound  = loadSound("deepbark.mp3");




}

function setup() {
  database = firebase.database();
  createCanvas(1200,550);
  
  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog=createSprite(800,320,150,150);
  dog.addImage(hungryDog);
  dog.scale=0.75;

  var input = createInput().attribute("placeholder","Enter your name");
  input.position(1030,90);
  
  var doginput = createInput().attribute("placeholder","Enter your dog's name");
  doginput.position(1200,90);
   
  var greeting = createElement("h1");
  greeting.position(600,570);
   
  var button = createButton("Play");
  button.position(1325,115);

  feed = createButton("Give milk");
  feed.position(400,90);
  feed.mousePressed(feedDog);

  addMilk = createButton("Add milk");
  addMilk.position(480,90);
  addMilk.mousePressed(addFoods); 
   
  sleep = createButton("Make the dog sleep");
  sleep.position(555,90);

  bark = createButton("Make the dog Bark");
  bark.position(695,90);

  laydown = createButton("Make the dog lay down")
  laydown.position(830,90);

  paw = createButton("Ask for a paw");
  paw.position(525,120);

  sit = createButton("Make the dog sit");
  sit.position(630,120);

  jump = createButton("Make the dog jump");
  jump.position(750,120);

  milk = createSprite(680,420,50,50);
  milk.scale = 0.15;
  milk.addImage(milkimage);
  milk.visible = false;

  ground = createSprite(800,440,150,20);
  ground.visible = false;  

   
  button.mousePressed(()=>{
    input.hide();
    button.hide();
    doginput.hide();
    var name = input.value();
    var dogname = doginput.value();
    greeting.html("Hello, "+name + " this is "+dogname +" your new pet !!")
    })


  sleep.mousePressed(()=>{
     ground.y=540
      dog.addImage(sleepyDog)
      dog.y = 385
      dog.scale = 0.85
      milk.visible = false

    })
  
  bark.mousePressed(()=>{
    barkSound.play()
    ground.y=540
    dog.addImage(dogStanding)
    dog.y = 385
    dog.scale = 0.85
  })

  paw.mousePressed(()=>{
    dog.addImage(pawdog)
    ground.y=540
    dog.y = 385
    dog.scale = 0.85
  })

  laydown.mousePressed(()=>{
    dog.addImage(doglay)
    ground.y=540
    dog.y = 385
    dog.scale = 0.85
  })
  
  sit.mousePressed(()=>{
    ground.y=540
    dog.addImage(sitdog)
    dog.y = 385
    dog.scale = 0.85
  })
    


}

function draw() {
  background(backgroundImg);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill("black");
  textFont("cooper")
  stroke("black")
  strokeWeight(1)
  textSize(25);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + " PM", 10, 20);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12 AM ", 350, 30);
  }
  else if((lastFed < 12)) {
    text("Last Feed:  " + lastFed + " AM", 10, 20);
  }
  else {
    text("Last Feed:  " + lastFed , 10, 20);
  }

  jump.mousePressed(()=>{
    dog.addImage(dogStanding)
    dog.velocityY = -12;
  })
  dog.velocityY = dog.velocityY + 0.8
  dog.collide(ground)





  drawSprites();

}

//function to read Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
  function feedDog() {
    dog.addImage(happyDog);
    dog.scale = 0.85
    dog.y = 385

    ground.y=540


    milk.visible = true

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }


//function to add food in stock
function addFoods(){
  if(foodS < 40){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
}


