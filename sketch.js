var dog,sadDog,happyDog;
var foodStock;
var lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  milk = new Food();

  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  
  

}

function draw() {
  background(46,139,87);
     
  milk.display();

  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
  lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
     text("Last Feed : "+ lastFed%12 + " PM" , 350,30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM" ,350,30);
  }else {
    text("Last Feed : "+ lastFed + " AM" , 350,30)
  }

  drawSprites();
}
function feedDog(){
  dog.addImage(happyDog);

  if(milk.getFoodStock()<=0){
    milk.updateFoodStock(milk.getFoodStock()*0);
  }
  else{
    milk.updateFoodStock(milk.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:milk.getFoodStock(),
    FeedTime:hour()
  })
}
function readStock(data){
    foods=data.val();
    milk.updateFoodStock(foods);  
}
function addFoods(){
    foods++;
    database.ref('/').update({
      Food:foods
    })

}

//function to read food Stock


//function to update food stock and last fed time


//function to add food in stock
