
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
let bg;
let mountainFar;
let trees;
let redDino;
let mainPlatform;
let platforms;

function preload() {
    this.load.image('backGr', 'assets/parallax-mountain-bg.png');
    this.load.image('foreTrees', 'assets/parallax-mountain-foreground-trees.png');
    this.load.image('mountainFar', 'assets/parallax-mountain-montain-far.png');
    this.load.image('mountains', 'assets/parallax-mountain-mountains.png');
    this.load.image('mouintainTrees', 'assets/parallax-mountain-trees.png');
    this.load.image('platform', 'assets/plat.png')
    this.load.spritesheet('redDino',
        'assets/DinoSprites - mort.png',
        {
            frameWidth: 24,
            frameHeight: 24
        });
}

function create() {
    bg = this.add.image(640, 360, 'backGr');
    bg.setScale(4.7);
    mountainFar = this.add.image(640, 360, 'mountainFar');
    mountainFar.setScale(6);
    trees = this.add.image(100, 270, 'foreTrees');
    trees.setScale(5);
    mainPlatform = this.add.image(700, 700, 'platform');
    mainPlatform.setScale(5)

    platforms = this.physics.add.staticGroup();

    redDino = this.physics.add.sprite(100, 450, 'redDino');
    redDino.setScale(3);
    redDino.setCollideWorldBounds(true);
}

let inProgress = false;


function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
        redDino.setVelocityX(-160);

    } else if (cursors.right.isDown) {
        redDino.setVelocityX(160);

    } else {
        redDino.setVelocityX(0);
        // redDino.anims.play(inProgress ? 'down' : 'idle', true);
    }

}
