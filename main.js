//Нахожу холст и получаю контекст для рисования
const canvas = document.getElementById('playground');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

//Хранение очков
let accountValues = {
  score: 0,
  level: 0,
  lines: 0
}


function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}


let account = new Proxy(accountValues, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  }
});


let requestId;


moves = {
  [KEY.LEFT]: p => ({ ...p, x: p.x - 1}),
  [KEY.RIGHT]: p => ({ ...p, x: p.x + 1}),
  [KEY.DOWN]: p => ({ ...p, y: p.y + 1}),
  [KEY.SPACE]: p => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: p => board.rotate(p)
}


let board = new Board(ctx, ctxNext);
addEventListener();
initNext();


function initNext() {
  // Инициализаия поля следующей фигуры
  ctxNext.canvas.width = 4 * BLOCK_SIZE;
  ctxNext.canvas.height = 4 * BLOCK_SIZE;
  ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}


function addEventListener() {
  document.addEventListener('keydown', event => {
    if (event.keyCode === KEY.P) {
      pause();
    }
    if (event.keyCode === KEY.ESC) {
      gameOver();
    } else if (moves[event.keyCode]) {  
      // отмена действий по умолчанию
      event.preventDefault();
      
      // получение новых координат фигурки
      let p = moves[event.keyCode](board.piece);
      
      if (event.keyCode === KEY.SPACE) {
        // Падение пробел
        while (board.valid(p)) {
          account.score += POINTS.HARD_DROP;
          board.piece.move(p);   
          p = moves[KEY.DOWN](board.piece);
        }
      } else if (board.valid(p)) {       
        // реальное перемещение фигурки, если новое положение допустимо
        board.piece.move(p);
        if (event.keyCode === KEY.DOWN) {
          account.score += POINTS.SOFT_DROP;         
        }
      }
    }
  });

}


function resetGame() {
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  board.reset();
  time = { start: 0, elapsed: 0, level: LEVEL[account.level] };
}


function play() {
  resetGame();
  time.start = performance.now();
  // Если запущена старая игра то выход из нее
  if (requestId) {
    cancelAnimationFrame(requestId);
  }
  animate();
}


function animate(now = 0) {
  // обновить истекшее время
  time.elapsed = now - time.start;
  
  // если время отображения текущего фрейма прошло 
  if (time.elapsed > time.level) {
    // начать отсчет сначала
    time.start = now;     
    if (!board.drop()) {
      gameOver();
      return;
    } 
  }
  // очистить холст для отрисовки нового фрейма
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); 
  // отрисовать игровое поле 
  board.draw();  
  requestId = requestAnimationFrame(animate);
}


function gameOver() {
  cancelAnimationFrame(requestId);
  ctx.fillStyle = 'rgb(44, 44, 44)';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('GAME OVER', 1.8, 4);
}


function pause() {
  if (!requestId) {
    animate();
    return;
  }

  cancelAnimationFrame(requestId);
  requestId = null;
  
  ctx.fillStyle = 'rgb(44, 44, 44)';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('PAUSED', 3, 4);
}







  