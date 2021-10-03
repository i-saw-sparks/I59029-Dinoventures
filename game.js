
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
let score = 0;

function preload() {
    this.load.image('backGr', 'assets/parallax-mountain-bg.png');
    this.load.image('foreTrees', 'assets/parallax-mountain-foreground-trees.png');
    this.load.image('mountainFar', 'assets/parallax-mountain-montain-far.png');
    this.load.image('mountains', 'assets/parallax-mountain-mountains.png');
    this.load.image('mouintainTrees', 'assets/parallax-mountain-trees.png');
    this.load.image('platform', 'assets/plat.png')
    this.load.image('avocado', 'assets/Avocado.png')
    this.load.spritesheet('redDino',
        'assets/DinoSprites - mort.png',
        {
            frameWidth: 24,
            frameHeight: 24
        });
    this.load.spritesheet('redDinoRev',
        'assets/DinoSprites - rev.png',
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

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('redDino', {
            start: 0,
            end: 3
        }),
        frameRate: 5,
        reapeat: -1
    });

    this.anims.create({
        key: 'jumping',
        frames: this.anims.generateFrameNumbers('redDino', {
            start: 17,
            end: 18
        }),
        frameRate: 5,
        reapeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('redDino', {
            start: 4,
            end: 10
        }),
        frameRate: 5,
        reapeat: -1
    });

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('redDinoRev', {
            start: 13,
            end: 19
        }),
        frameRate: 5,
        reapeat: -1
    });

    avocados = this.physics.add.group();

    setInterval(() => {
        newAvocado(this, avocados);
    }, 1000);

   

    this.physics.add.collider(redDino, avocados, (redDino, avocado) => {
            avocado.body.stop();
            avocado.body.moves = false;
            avocado.alpha = 0;
            avocados.remove(avocado);
            console.log(score);
            score++;
    }, null, this);
}

let inProgress = false;
let isJumping = false;

function newAvocado(context, avocados){
    let aleat = Math.random();

    if(aleat>0.5){

        console.log(aleat)
        let newAvoc = avocados.create((aleat*8000)%1280, 450, 'avocado');
        //let newAvoc = context.physics.add.sprite((aleat*8000)%1280, 450, 'avocado');
        newAvoc.setScale(2);
        newAvoc.setCollideWorldBounds(true);
    }

}


function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    

    if (redDino.y == 684) {
        isJumping = false
    }

    if (cursors.left.isDown) {
        redDino.setVelocityX(-160);
        if (!isJumping)
            redDino.anims.play('left', true);

    } else if (cursors.right.isDown) {
        redDino.setVelocityX(160);
        if (!isJumping)
            redDino.anims.play('right', true);

    } else {
        redDino.setVelocityX(0);
        if (!isJumping)
            redDino.anims.play('idle', true);
    }

    if (isJumping) {
        redDino.anims.play('jumping', true);
    }

    if (cursors.up.isDown && !isJumping) {
        redDino.setVelocityY(-300);
        isJumping = true;
    }

}
