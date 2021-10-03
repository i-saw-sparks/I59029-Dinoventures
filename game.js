
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
let redDino, blueDino;
let mainPlatform;
let platforms;
let score = 0;
let avocadosGr = 0;
let text;
let blueDinoDir = 'r';
let isRunning = true;

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
    this.load.spritesheet('blueDino',
        'assets/DinoSprites - doux.png',
        {
            frameWidth: 24,
            frameHeight: 24
        });
    this.load.spritesheet('blueDinoRev',
        'assets/DinoSprites - bluerev.png',
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

    blueDino = this.physics.add.sprite(1000, 450, 'blueDino');
    blueDino.setScale(3);
    blueDino.setCollideWorldBounds(true);

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

    this.anims.create({
        key: 'rightBlue',
        frames: this.anims.generateFrameNumbers('blueDino', {
            start: 4,
            end: 10
        }),
        frameRate: 5,
        reapeat: -1
    });

    this.anims.create({
        key: 'leftBlue',
        frames: this.anims.generateFrameNumbers('blueDinoRev', {
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
        if (isRunning) {
            avocado.body.stop();
            avocado.body.moves = false;
            avocado.alpha = 0;
            avocados.remove(avocado);
            score++;
            avocadosGr++;
            mainText.setText('Score: ' + score);
        }
    }, null, this);

    this.physics.add.collider(blueDino, avocados, (blueDino, avocado) => {
        if (isRunning) {
            avocado.body.stop();
            avocado.body.moves = false;
            avocado.alpha = 0;
            avocados.remove(avocado);
            score--;

            mainText.setText('Score: ' + score);
        }
    }, null, this);

    this.physics.add.collider(blueDino, redDino, (blueDino, redDino) => {
        isRunning = false;
        blueDino.body.stop();
        blueDino.body.moves = false;
        redDino.body.stop();
        redDino.body.moves = false;
        mainText.setText('GAME OVER    final score: ' + score);
    }, null, this);

    mainText = this.add.text(20, 20, 'Score: ' + score, {
        fontSize: '32px',
        fill: '#FFFFFF',
        font: 'bold 32px Consolas',
        align: 'center'
    });
}

let inProgress = false;
let isJumping = false;

function newAvocado(context, avocados) {
    if (isRunning) {
        let aleat = Math.random();

        if (aleat > 0.5) {
            let newAvoc = avocados.create((aleat * 8000) % 1280, 450, 'avocado');
            newAvoc.setScale(2);
            newAvoc.setCollideWorldBounds(true);
        }
    }
}


function update() {
    if(isRunning) {
        const cursors = this.input.keyboard.createCursorKeys();

        if (blueDinoDir == 'r') {
            blueDino.setVelocityX(60 + Math.abs(avocadosGr * 20));
            blueDino.anims.play('rightBlue', true);
            if (blueDino.x == 1244) {
                blueDinoDir = 'l'
            }
        }

        if (blueDinoDir == 'l') {
            blueDino.setVelocityX(-60 - Math.abs(avocadosGr * 20));
            blueDino.anims.play('leftBlue', true);
            if (blueDino.x == 36) {
                blueDinoDir = 'r'
            }
        }


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

}
