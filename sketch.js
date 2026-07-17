let bird;
let birdPic;
let lose = false;
let walls = [];
let wallCoords = [];


function setup() {
    createCanvas(1000, 1000);
    birdPic = loadImage('assets/bird.png');
    bird = new Bird();
}

function draw() {
    background(0, 0, 0);
    if (!lose) {
        bird.update();

        if (frameCount % 100 === 0) {
            walls.push(new Wall(width));
        }
    }
    bird.display();

    for (let i = 0; i < walls.length; i++) {
        fill(128, 230, 61);
        rect(walls[i].xPos, 0, walls[i].width, walls[i].bottom);
        wallCoords.push(new WallCoord(0, walls[i].xPos + walls[i].width, walls[i].bottom, walls[i].xPos));
        rect(walls[i].xPos, walls[i].top, walls[i].width, 1000);
        wallCoords.push(new WallCoord(walls[i].top, walls[i].xPos + walls[i].width, 1000, walls[i].xPos));
        walls[i].xPos -= 3;
    }
    for (let j = 0; j < wallCoords.length; j++) {
        let myLeft = bird.x - bird.radius;
        let myRight = bird.x + bird.radius;
        let myTop = bird.y - bird.radius;
        let myBottom = bird.y + bird.radius;

        let enemyLeft = wallCoords[j].left;
        let enemyRight = wallCoords[j].right;
        let enemyTop = wallCoords[j].top;
        let enemyBottom = wallCoords[j].bottom;

        if (!(myLeft > enemyRight || myRight < enemyLeft || myTop > enemyBottom || myBottom < enemyTop)) {
            lose = true;
        }
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW || keyCode === 32) {
        bird.flap();
    }
}


class Bird {
    constructor() {
        this.x = width / 4;
        this.y = height / 2;
        this.radius = 45;

        this.velocity = 0;
        this.gravity = 0.15;
        this.jumpForce = -4;
        this.maxVelocity = 4.5;
    }

    flap() {
        this.velocity = this.jumpForce;
    }

    update() {
        this.velocity += this.gravity;

        if (this.velocity > this.maxVelocity) {
            this.velocity = this.maxVelocity;
        }

        this.y += this.velocity;

        if (this.y > height - this.radius) {
            this.y = height - this.radius;
            this.velocity = 0;
            lose = true;
        }

        if (this.y < this.radius) {
            this.y = this.radius;
            this.velocity = 0;
        }
    }

    display() {
        imageMode(CENTER);
        image(birdPic, this.x, this.y, this.radius * 2, this.radius * 2);
    }
}


class Wall {
    constructor(x) {
        this.width = 100;
        this.bottom = random(50, 250);
        this.distance = random(200, 300);
        this.top = this.bottom + this.distance;
        this.xPos = x;
    }
}

class WallCoord {
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
}