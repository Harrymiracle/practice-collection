// forked from kyo_ago's "from 万有引力(wonderfl)" http://jsdo.it/kyo_ago/rwwV
var canvas = document.getElementById('canvas');
var WIDTH = canvas.width;
var HEIGHT = canvas.height;
var cc = canvas.getContext('2d');
//getImageData() 复制画布上指定矩形的像素数据，然后通过 putImageData() 将图像数据放回画布
var clear_id = cc.getImageData(0, 0, WIDTH, HEIGHT);  

var fps = FPS(30);

var Particles = [];
var numParticles = 50;
var bound = 0.5;
var maxSize = 10;
for(var i = 0; i < numParticles; i++){
  Particles.push(Ball());
};

setTimeout(function () {
  fps.check();
  cc.beginPath();
  cc.clearRect(0, 0, WIDTH, HEIGHT);

  var space = maxSize * 5;
  for(var i = 0; i < numParticles; i++) {
    var ptcl = Particles[i];
    if (!ptcl) continue;
    ptcl.x += ptcl.vx;
    ptcl.y += ptcl.vy;
    if ((ptcl.x - ptcl.radius) < -space || (ptcl.x + ptcl.radius) > WIDTH + space) {
      Particles[i] = Ball();
    } else if ((ptcl.y - ptcl.radius) < -space || (ptcl.y + ptcl.radius) > HEIGHT + space) {
      Particles[i] = Ball();
    };
  };

  for(i = 0; i < numParticles - 1; i++) {
    for(var j = i + 1; j < numParticles; j++){
      gravitate(Particles[i], Particles[j]);
    };
  };

  for(i = 0, l = Particles.length; i < l; i++){
    var ptcl = Particles[i];
    cc.beginPath();
    cc.fillStyle = ptcl.color;
    cc.arc(ptcl.x, ptcl.y, ptcl.radius, 0, Math.PI*2, false);
    cc.fill();
  };

  function gravitate (PartA, PartB) {
    var dx = PartB.x - PartA.x;
    var dy = PartB.y - PartA.y;
    var distSQ = dx * dx + dy * dy;
    var dist = Math.sqrt(distSQ);
    var force = PartA.mass * PartB.mass / distSQ;
    var ax = force * dx / dist;
    var ay = force * dy / dist;
    PartA.vx += ax / PartA.mass;
    PartA.vy += ay / PartA.mass;
    PartB.vx += ax / PartB.mass;
    PartB.vy += ay / PartB.mass;
  };

  cc.fillStyle = '#000000';
  cc.fillText('FPS : ' + fps.getFPS(), 10, 20);

  setTimeout(arguments.callee, fps.getInterval());
}, fps.getInterval());

function Ball (color) {
  radius = Math.random() * maxSize || 40;
  color = '#'+((~~(Math.random() * 40)).toString(16)+'FFF').match(/^.{3}/).pop();
  return {
    'radius' : radius,
    'color' : color,
    'grav' : 0,
    'x' : Math.random() * WIDTH,
    'y' : Math.random() * HEIGHT,
    'vx' : 0,
    'vy' : 0,
    'mass' : 3
  };
};

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
};
