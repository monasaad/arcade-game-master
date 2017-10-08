'use strict';

var score = 0;
document.getElementById('Score').innerHTML = score;

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 256);
    }

     if( this.x < player.x + 30 
      && this.x + 60 > player.x 
      && this.y < player.y + 60 
      && this.y + 40 > player.y){
        score=0;// Player lose
        alert("The bugs ate the princess 💀");
        document.getElementById('Score').innerHTML = score;
        player.reset(); 
     }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update = function() {
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    // Player win
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;

        score++;
        if(score==1){
        alert("The princess needs to pass more 4 fields🏃");
        document.getElementById('Score').innerHTML = score;
        player.reset();
        }
        else if  (score==2){
        alert("The princess needs to pass more 3 fields🏃");
            document.getElementById('Score').innerHTML = score;
            player.reset();
        } 
         else if  (score==3){
        alert("The princess needs to pass more 2 fields🏃");
            document.getElementById('Score').innerHTML = score;
            player.reset();
        } 
        else if  (score==4){
        alert("The princess needs to pass more 1 field🏃");
            document.getElementById('Score').innerHTML = score;
            player.reset();
        } 
        else if  (score==5){
            alert("King🤴: Thanks for helping my gurl!");
            document.getElementById('Score').innerHTML = score;
            player.reset();
        }   
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};

var allEnemies = [];
var enemyPosition = [60, 140, 220];

var player = new Player(200, 380, 50);

var enemy;       
enemyPosition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
