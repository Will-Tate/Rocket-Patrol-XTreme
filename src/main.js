let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]

  }
  let game = new Phaser.Game(config);
  let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let highScore=0;
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, keyT, keyUP;
//Will Tate, Rocket Patrol- XTreme, finished on 4/20/2022
//Took 12 hours
//Looked up phaser documentation to scale the small ship

//Points Breakdown!
//5 Track High Score
//5 Implement Fire UI
//5 Speed increase after 30s
//5 Player has (slight) control of rocket after firing
//20 Create New spaceship
//20 Implemented Alternating two player mode
//20 Update all assets
//20 Adds time depending on point value of ship
//100 Total