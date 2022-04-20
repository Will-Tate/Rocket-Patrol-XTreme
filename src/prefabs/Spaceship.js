//const { Phaser } = require("../../lib/phaser");

class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue, speed){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        this.points=pointValue;
        this.moveSpeed=speed;
    }

    update(){
        this.x-=this.moveSpeed;
        if(this.x<=0-this.width){
            this.reset();
        }
    }

    reset(){
        this.x=game.config.width;
    }
}