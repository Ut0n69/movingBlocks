const block_width = 5;
const block_height = 5;
const block_num = 150;
const min_speed = 1;
const max_speed = 10;

const width = document.body.clientWidth;
const height = document.body.clientHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0x000000, 1);
renderer.domElement.id = 'console';
document.body.appendChild(renderer.domElement);
renderer.clear();

const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
camera.position.z = height / 2;

const scene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry(block_width, block_height);

var rect = [];
for (var i = 0; i < block_num; i++) {
  // var color = "0x" + Math.floor(Math.random() * 16777215).toString(16);
  var color = "0xffffff";
  var material = new THREE.MeshBasicMaterial({
    color: Number(color)
  });

  rect.push(new THREE.Mesh(geometry, material));
}

var x = [];
var y = [];
var dx = [];
var dy = [];

const min_pos_x = -(Number(width) / 2);
const max_pos_x = (Number(width) / 2);
const min_pos_y = -(Number(height) / 2);
const max_pos_y = (Number(height) / 2);

for (var i = 0; i < block_num; i++) {
  x.push(Math.floor(Math.random() * (max_pos_x + 1 - min_pos_x)) + min_pos_x);
  y.push(Math.floor(Math.random() * (max_pos_y + 1 - min_pos_y)) + min_pos_y);
  dx.push(Math.floor(Math.random() * (max_speed + 1 - min_speed)) + min_speed);
  dy.push(Math.floor(Math.random() * (max_speed + 1 - min_speed)) + min_speed);
}


for (var i in rect) scene.add(rect[i]);


(function render() {

  requestAnimationFrame(render);
  renderer.render(scene, camera);

  for (var i in rect) {
    x[i] += dx[i];
    y[i] += dy[i];
    if (x[i] > (width / 2) || x[i] < (-width / 2)) {
      dx[i] = -dx[i];
      // if (dx[i] < 0) dx[i] = dx[i] - 1;
      // else dx[i] = dx[i] + 1;
      x[i] += dx[i];
    }
    if (y[i] > (height / 2) || y[i] < (-height / 2)) {
      dy[i] = -dy[i];
      // if (dy[i] < 0) dy[i] = dy[i] - 1;
      // else dy[i] = dy[i] + 1;
      y[i] += dy[i];
    }

    rect[i].position.x = x[i];
    rect[i].position.y = y[i];
  }

})();