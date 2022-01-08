// forked from kyo_ago's "from 万有引力(wonderfl)" http://jsdo.it/kyo_ago/rwwV

/*　画像の色を取得したいです。。 */

var canvas = document.getElementById('canvas');
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var cc = canvas.getContext('2d');
var clear_id = cc.getImageData(0, 0, WIDTH, HEIGHT);

var fps = FPS(30);

var Particles = [];
var numParticles = 10;
var bound = 0.5;
var maxSize = 10;

var mapListX = [];
var mapListY = [];

for (var xx = 0 ; xx < WIDTH ; xx++) {
  mapListX[xx] = [];
  mapListY[xx] = [];
  for (var yy = 0 ; yy < HEIGHT ; yy++) {
    mapListX[xx][yy] = Math.random() - 0.5;
    mapListY[xx][yy] = Math.random() - 0.5;
  }
}  


cc.drawImage(flckr_image, 0, 0);
//var imgvvvvv = cc.getImageData(1, 1, 10, 10);
cc.clearRect(0, 0, WIDTH, HEIGHT);




for(var i = 0; i < numParticles; i++){
  Particles.push(Ball());
}

setTimeout(function () {
  fps.check();
  cc.beginPath();
  //cc.clearRect(0, 0, WIDTH, HEIGHT);
  
  cc.globalAlpha = 0.1;
  
  cc.fillStyle = '#000000';
  cc.fillRect(0,0,400,300);
  
  cc.globalAlpha = 1.0;
  
  //cc.putImageData(img, 0, 0);

  //var space = maxSize * 5;
  
  for(var i = 0; i < numParticles; ++i) {
    var ptcl = Particles[i];
    if (!ptcl) continue;
    ptcl.x += ptcl.vx;
    ptcl.y += ptcl.vy;
    var ax = mapListX[Math.floor(ptcl.x)][Math.floor(ptcl.y)];
    var ay = mapListY[Math.floor(ptcl.x)][Math.floor(ptcl.y)];
    ptcl.ax += ax;
    ptcl.ay += ay;
    ptcl.vx += ptcl.ax;
    ptcl.vy += ptcl.ay;
    
    ptcl.vx *= 0.94;
    ptcl.vy *= 0.94;
    ptcl.ax *= 0.91;
    ptcl.ay *= 0.91;
    
   
    if (ptcl.x < 20) {
      ptcl.x = WIDTH-20;
    } else if (ptcl.x > WIDTH-20) {
      ptcl.x = 20;
    }
    if (ptcl.y < 20) {
      ptcl.y = HEIGHT-20;
    } else if (ptcl.y > HEIGHT-20) {
      ptcl.y = 20;
    }
  }
  
  cc.shadowBlur = 8;
  cc.shadowColor = "#FFCC00";
  for(i = 0, l = Particles.length; i < l; ++i) {
    var ptcl = Particles[i];
    cc.beginPath();
   // var clr = img.data[Math.floor(ptcl.x)];
    cc.fillStyle = ptcl.color;
    cc.arc(ptcl.x, ptcl.y, ptcl.radius, 0, Math.PI*2, false);
    cc.fill();
  }
  cc.shadowBlur = 0;

  cc.fillStyle = '#FF0000';
  cc.fillText('FPS : ' + fps.getFPS(), 10, 20);
  

  setTimeout(arguments.callee, fps.getInterval());
}, fps.getInterval());

function Ball (color) {
  radius = Math.random() * maxSize || 40;
  //color = '#'+((~~(Math.random() * 40)).toString(16)+'000').match(/^.{3}/).pop();
  color = '#FFFFCC';
  return {
    'radius' : radius,
    'color' : color,
    'grav' : 0,
    'x' : Math.random() * WIDTH,
    'y' : Math.random() * HEIGHT,
    'vx' : 0,
    'vy' : 0,
    'ax' : 0,
    'ay' : 0,
    'mass' : 1
  };
}

function FPS (target) {
  return {
    'target' : target,
    'interval' : 1000 / target,
    'checkpoint' : new Date(),
    'fps' : 0,
    check: function() {
      var now = new Date();
      this.fps = 1000 / (now - this.checkpoint);
      this.checkpoint = new Date();
    },
    getFPS: function() {
      return this.fps.toFixed(2);
    },
    getInterval: function() {
      var elapsed = new Date() - this.checkpoint;
      return this.interval - elapsed > 10 ? this.interval - elapsed : 10;
    }
  };
}
