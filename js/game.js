class Game {
    constructor(){
      
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      car1 = createSprite(1000,200);
      car2 = createSprite(1000,400);
      car3  = createSprite(1000,600);
      car4 = createSprite(1000,800);
      cars = [car1, car2, car3, car4];
    }
  
    play(){
      form.hide();
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        //var display_position = 100;
        background(rgb(223, 178, 140));
        //image(backgroundImage,0,-displayHeight*4,displayWidth,displayHeight*6);
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var y = 150;
        var x;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          y = y + 200;
          //use data form the database to display the cars in x direction
          x = displayWidth - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
  
          if (index === player.index){
            cars[index - 1].shapeColor = "red";
            camera.position.y = displayHeight/2;
            camera.position.x = cars[index-1].x
            stroke(10);
            fill(rgb(252, 148, 148));
            ellipse(x,y,80,80);
          }
          
          
         /* if(gameState === end() && player.distance >4200){
            text("rank1:"+player1,displayWidth/2,displayHeight/2)
          }
          else{
            text("rank1:"+player2);
          }
          else{
            text("rank1:"+player3);
          }
          else{
            text("rank1:"+player4);
          }*/
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance>4200){
        gameState = 2;
      }
  
      drawSprites();
    }
  
    end(){
      console.log("game ended");
      rank();
    }
  
    rank(){
      if(player.distance>4200){
        player.rank = 1;
        text("rank1:"+player.rank,displayWidth/2,displayHeight/2);
      }
    }
  
  }
  