class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket-1.png');
        this.load.image('spaceship', './assets/spaceship-1.png');
        this.load.image('spaceship2', './assets/spaceship-23.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion-2.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
  // add spaceships (x3)
  this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, game.settings.spaceshipSpeed).setOrigin(0, 0);
  this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship2', 0, 50,2+game.settings.spaceshipSpeed).setOrigin(0,0);
  this.ship02.setSize(32,24);
  this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10,game.settings.spaceshipSpeed).setOrigin(0,0);

  // define keys
  keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
  keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
  keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
  // animation config
this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
    frameRate: 30
});
// initialize score
this.p1Score = 0;
 // display score
 let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
  this.scoreRight = this.add.text(game.config.width - 100-2*(borderUISize - borderPadding), borderUISize + borderPadding*2, highScore, scoreConfig);
  this.fire = this.add.text(game.config.width/2, borderUISize + borderPadding*2, 'FIRE', scoreConfig);
  this.fire.text="";
  // 60-second play clock
    this.gameOver = false;
    scoreConfig.fixedWidth = 0;
    this.clock = this.time.delayedCall(30000, () => {
      game.settings.spaceshipSpeed+=3;
      this.ship01.moveSpeed=game.settings.spaceshipSpeed;
      this.ship02.moveSpeed=2*game.settings.spaceshipSpeed;
      this.ship03.moveSpeed=game.settings.spaceshipSpeed;
    }, null, this);
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
      this.clock = this.time.delayedCall(game.settings.gameTimer2, () => {
      this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      if(game.settings.turnCount!=1){
        if(game.settings.oldScore>this.p1Score){
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player 1 Wins!', scoreConfig).setOrigin(0.5);
          this.add.text(game.config.width/2, game.config.height/2 + 96, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        }else if(game.settings.oldScore<this.p1Score){
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Player 2 Wins!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 96, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        }else{
          this.add.text(game.config.width/2, game.config.height/2 + 64, 'DRAW!', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 96, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        }
      }else{
    
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 96, 'Press (T) for player 2', scoreConfig).setOrigin(0.5);
      }
    this.gameOver=true;
}, null, this);
}, null, this);

      }
    update() {
        this.starfield.tilePositionX -= 4;
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          if(this.p1Score>highScore){
          
            highScore = this.p1Score;
          }   
          game.settings.oldScore=0;
            this.scene.start("menuScene");
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyT)&&game.settings.turnCount==1) {
          game.settings.oldScore=this.p1Score;
          if(this.p1Score>highScore){
          
            highScore = this.p1Score;
          }
          game.settings.gameTimer2=0;
          this.scene.restart();
      }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          game.settings.oldScore=0;
          if(this.p1Score>highScore){
          
            highScore = this.p1Score;
          }
          game.settings.gameTimer2=0;
          this.scene.restart();
        }
        if (!this.gameOver) {      
        this.p1Rocket.update();
        if(this.p1Rocket.isFiring){
          this.fire.text="FIRE";
        }else{
          this.fire.text="";
        }
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();}
        // check collisions
if(this.checkCollision(this.p1Rocket, this.ship03)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship03);
    game.settings.gameTimer2+= 1000;   
  }
  if (this.checkCollision(this.p1Rocket, this.ship02)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship02);
    game.settings.gameTimer2+= 2000;
  }
  if (this.checkCollision(this.p1Rocket, this.ship01)) {
    this.p1Rocket.reset();
    this.shipExplode(this.ship01);
    game.settings.gameTimer2+= 500;  
  }
      }
      

      checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;  
        this.sound.play('sfx_explosion'); 
      }
}