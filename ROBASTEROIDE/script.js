// Inicialización de canvas y contexto
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let lastTime = 0;
let gamePaused = false;
let gameOver = false;

const sonidoMisil = new Audio('assets/misil.mp3'); // Ajustada ruta relativa para misil
const sonidoAsteroide = new Audio('assets/asteroide.mp3'); // Cargar el sonido del asteroide

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Rutas de las imágenes para la nave y otros elementos
const naveImgs1 = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
];
naveImgs1[0].src = 'assets/nave1/1.png'; // Nave en reposo
naveImgs1[1].src = 'assets/nave1/2.png'; // Nave en movimiento
naveImgs1[2].src = 'assets/nave1/3.png'; // Nave deteniéndose (1)
naveImgs1[3].src = 'assets/nave1/4.png'; // Nave deteniéndose (2)
naveImgs1[4].src = 'assets/nave1/5.png'; // Nave deteniéndose (3)

const naveImgs2 = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
];
naveImgs2[0].src = 'assets/nave2/1.png'; // Nave2 en reposo
naveImgs2[1].src = 'assets/nave2/2.png'; // Nave2 en movimiento
naveImgs2[2].src = 'assets/nave2/3.png'; // Nave2 deteniéndose (1)
naveImgs2[3].src = 'assets/nave2/4.png'; // Nave2 deteniéndose (2)
naveImgs2[4].src = 'assets/nave2/5.png'; // Nave2 deteniéndose (3)

const naveImgs3 = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
];
naveImgs3[0].src = 'assets/nave3/1.png'; // Nave3 en reposo
naveImgs3[1].src = 'assets/nave3/2.png'; // Nave3 en movimiento
naveImgs3[2].src = 'assets/nave3/3.png'; // Nave3 deteniéndose (1)
naveImgs3[3].src = 'assets/nave3/4.png'; // Nave3 deteniéndose (2)
naveImgs3[4].src = 'assets/nave3/5.png'; // Nave3 deteniéndose (3)

const naveImgs4 = [
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image()
];
naveImgs4[0].src = 'assets/nave4/1.png'; // Nave4 en reposo
naveImgs4[1].src = 'assets/nave4/2.png'; // Nave4 en movimiento
naveImgs4[2].src = 'assets/nave4/3.png'; // Nave4 deteniéndose (1)
naveImgs4[3].src = 'assets/nave4/4.png'; // Nave4 deteniéndose (2)
naveImgs4[4].src = 'assets/nave4/5.png'; // Nave4 deteniéndose (3)

let naveImgs = naveImgs1; // Empezamos con las imágenes de "nave1"

const asteroide = new Image();
asteroide.src = 'assets/asteroide1.png';

const impactoImg = new Image();
impactoImg.src = 'assets/impacto.png'; // Cargar la imagen de impacto

const misil = new Image();
misil.src = 'assets/misil.png';

const naveWidth = 150;
const naveHeight = 150;
let naveX = canvas.width / 2 - naveWidth / 2;
let naveY = canvas.height - naveHeight - 10;

let derecha = false;
let izquierda = false;
let arriba = false;
let abajo = false;

const asteroides = [];
const misiles = [];
let puntos = 0;
let asteroidesEliminados = 0;
let recordAsteriode = localStorage.getItem("recordAsteriode") || 0;

let naveAnimIndex = 0; // Índice de la imagen de la nave
let naveMoving = false; // Indica si la nave se está moviendo
let stopTimer = 0; // Temporizador para la animación de frenado

document.getElementById("record").textContent = recordAsteriode;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') derecha = true;
  if (e.key === 'ArrowLeft') izquierda = true;
  if (e.key === 'ArrowUp') arriba = true;
  if (e.key === 'ArrowDown') abajo = true;
  if (e.key === ' ') dispararMisil();
  if (e.key === 'p' || e.key === 'Escape') {
    gamePaused = !gamePaused;
    if (gamePaused) {
      document.querySelector('.pause-message').style.display = 'block';
    } else {
      document.querySelector('.pause-message').style.display = 'none';
      lastTime = 0;
      updateGame();
    }
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') derecha = false;
  if (e.key === 'ArrowLeft') izquierda = false;
  if (e.key === 'ArrowUp') arriba = false;
  if (e.key === 'ArrowDown') abajo = false;
});

class Asteroide {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -50;
    this.width = 100;
    this.height = 100;
    this.speed = 2 + Math.random() * 3;
    this.impactado = false; // Estado de impacto
    this.impactoTimer = 0; // Temporizador para la desaparición

    // Asignar dirección aleatoria (incluyendo la nueva dirección de arriba a abajo)
    const randomDirection = Math.random();
    if (randomDirection < 0.33) {
      this.direccion = 'izquierda-abajo';
    } else if (randomDirection < 0.66) {
      this.direccion = 'derecha-abajo';
    } else {
      this.direccion = 'arriba-abajo';
    }

    // Ángulo de rotación (45 grados en radianes)
    this.rotation = Math.PI / 4; // 45 grados
    this.rotationDirection = this.direccion === 'arriba-abajo' ? 0 : (this.direccion === 'izquierda-abajo' ? -1 : 1);
  }

  draw() {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    if (this.impactado) {
      ctx.drawImage(impactoImg, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      if (this.rotationDirection !== 0) {
        ctx.rotate(this.rotation * this.rotationDirection);
      }
      ctx.drawImage(asteroide, -this.width / 2, -this.height / 2, this.width, this.height);
    }
    ctx.restore();
  }

  update(deltaTime) {
    if (this.impactado) {
      this.impactoTimer += deltaTime;
      if (this.impactoTimer > 500) { // 500 ms
        return; // No dibujar el asteroide después de medio segundo
      }
    } else {
      if (this.direccion === 'izquierda-abajo') {
        this.x += this.speed * (deltaTime / 16);
        this.y += this.speed * (deltaTime / 16);
      } else if (this.direccion === 'derecha-abajo') {
        this.x -= this.speed * (deltaTime / 16);
        this.y += this.speed * (deltaTime / 16);
      } else if (this.direccion === 'arriba-abajo') {
        this.y += this.speed * (deltaTime / 16);
      }

      if (this.y > canvas.height || this.x < 0 || this.x > canvas.width) {
        this.y = -this.height;
        this.x = Math.random() * canvas.width;
      }
    }

    this.draw();
  }

  checkCollision() {
    const dx = this.x + this.width / 4 - naveX - naveWidth / 4;
    const dy = this.y + this.height / 3 - naveY - naveHeight / 3;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < (this.width / 3 + naveWidth / 3)) {
      gameOver = true;
      setTimeout(() => {
        window.location.href = 'perder.html';
      }, 2000);
    }
  }

  hit() {
    this.impactado = true; // Cambiar el estado a impactado
    this.impactoTimer = 0; // Reiniciar el temporizador
  }
}

class Misil {
  constructor(x, y) {
    this.x = x + naveWidth / 2 - 30;
    this.y = y;
    this.width = 60;
    this.height = 120;
    this.speed = 5;
  }

  draw() {
    ctx.drawImage(misil, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }

  checkCollision(asteroides) {
    asteroides.forEach((asteroide, index) => {
      const dx = this.x + this.width / 2 - asteroide.x - asteroide.width / 2;
      const dy = this.y + this.height / 2 - asteroide.y - asteroide.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (this.width / 2 + asteroide.width / 2)) {
        sonidoAsteroide.pause();
        sonidoAsteroide.currentTime = 0;
        sonidoAsteroide.play();

        asteroide.hit(); // Marcar el asteroide como impactado
        misiles.splice(misiles.indexOf(this), 1);
        puntos += 10;
        document.getElementById("score").textContent = puntos;
        asteroidesEliminados++;

        // Eliminar el asteroide de la lista
        asteroides.splice(index, 1); // Eliminar el asteroide impactado
      }
    });
  }
}

function dispararMisil() {
  if (!gameOver && !gamePaused) {
    sonidoMisil.pause();
    sonidoMisil.currentTime = 0;
    sonidoMisil.play();
    const nuevoMisil = new Misil(naveX, naveY);
    misiles.push(nuevoMisil);
  }
}

function spawnAsteroides() {
  if (!gameOver && !gamePaused && Math.random() < 0.02) {
    asteroides.push(new Asteroide());
  }
}

function drawNave() {
  if (derecha || izquierda || arriba || abajo) {
    naveMoving = true; // Nave en movimiento
    naveAnimIndex = 1; // Nave en movimiento
    stopTimer = 0; // Reiniciar el temporizador de frenado
  } else if (naveMoving) {
    stopTimer++;
    if (stopTimer < 10) {
      naveAnimIndex = 2; // Primera imagen de frenado
    } else if (stopTimer < 20) {
      naveAnimIndex = 3; // Segunda imagen de frenado
    } else if (stopTimer < 30) {
      naveMoving = false; // Nave completamente detenida
      naveAnimIndex = 0; // Regresa a imagen de reposo
    }
  } else {
    naveAnimIndex = 0; // Nave en reposo
  }

  ctx.drawImage(naveImgs[naveAnimIndex], naveX, naveY, naveWidth, naveHeight);
}

function moveNave() {
  if (derecha && naveX + naveWidth < canvas.width) naveX += 5;
  if (izquierda && naveX > 0) naveX -= 5;
  if (arriba && naveY > 0) naveY -= 5;
  if (abajo && naveY + naveHeight < canvas.height) naveY += 5;
}

function updateGame(currentTime) {
  if (gameOver) {
    if (puntos > recordAsteriode) {
      recordAsteriode = puntos;
      localStorage.setItem("recordAsteriode", recordAsteriode);
      document.getElementById("record").textContent = recordAsteriode;
    }
    document.querySelector('.game-over').style.display = 'block';
    return;
  }

  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spawnAsteroides();
  asteroides.forEach(asteroide => {
    asteroide.update(deltaTime);
    asteroide.checkCollision();
  });

  misiles.forEach(misil => {
    misil.update();
    misil.checkCollision(asteroides);
  });

  // Cambiar la nave según los asteroides eliminados
  if (asteroidesEliminados === 50) {
    naveImgs = naveImgs2; // Cambia a nave2
  } else if (asteroidesEliminados === 100) {
    naveImgs = naveImgs3; // Cambia a nave3
  } else if (asteroidesEliminados === 150) {
    naveImgs = naveImgs4; // Cambia a nave4
  }

  moveNave();
  drawNave();

  if (!gamePaused) {
    requestAnimationFrame(updateGame);
  }
}

naveImgs1[0].onload = () => {
  asteroide.onload = () => {
    misil.onload = () => {
      requestAnimationFrame(updateGame);
    };
  };
};