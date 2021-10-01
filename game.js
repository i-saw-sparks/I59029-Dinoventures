
const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: 'game',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('backGr', 'assets/parallax-mountain-bg.png');
    this.load.image('foreTrees', 'assets/parallax-mountain-foreground-trees.png');
    this.load.image('mountainFar', 'assets/parallax-mountain-far.png');
    this.load.image('mountains', 'assets/parallax-mountain-mountains.png');
    this.load.image('mouintainTrees', 'assets/parallax-mountain-trees.png');
}

function create() {
    let bg = this.add.image(640, 360, 'backGr');
    bg.setScale(4.7);
  
}

let inProgress = false;

function update() {
  
}
