document.addEventListener('DOMContentLoaded', function () {
    const catIcon = document.getElementById('catIcon');
    const gameJeu = document.getElementById('gameJeu');
    const scoreElement = document.getElementById('score');
  
    let score = 0;
    let isGameStarted = false;
    let isGameOver = false;
    let catJumpTimer = null;
    let obstacleTimer = null;
  
    function moveCatUp() {
      let catPosition = parseFloat(catIcon.style.bottom) || 0;
      if (catPosition < 250) {
        catPosition += 10;
        catIcon.style.bottom = catPosition + 'px';
        catJumpTimer = setTimeout(moveCatUp, 20);
      } else {
        clearTimeout(catJumpTimer);
        catJumpTimer = null;
        moveCatDown();
      }
    }
  
    function moveCatDown() {
      let catPosition = parseFloat(catIcon.style.bottom) || 0;
      if (catPosition > 0) {
        catPosition -= 10;
        catIcon.style.bottom = catPosition + 'px';
        catJumpTimer = setTimeout(moveCatDown, 20);
      } else {
        clearTimeout(catJumpTimer);
        catJumpTimer = null;
      }
    }
  
    function createObstacle() {
      const obstacle = document.createElement('div');
      obstacle.classList.add('obstacle');
      gameJeu.appendChild(obstacle);
  
      let obstaclePosition = 1000;
      let isPassed = false;
  
      function moveObstacle() {
        if (!isGameOver) {
          obstaclePosition -= 10;
          obstacle.style.left = obstaclePosition + 'px';
  
          const catTop = parseFloat(catIcon.style.bottom) || 0;
          const catBottom = catTop + parseFloat(catIcon.style.height);
          const obstacleTop = parseFloat(obstacle.style.top) || 0;
          const obstacleBottom = obstacleTop + parseFloat(obstacle.style.height);
  
          if (
            obstaclePosition <= 0 &&
            catTop <= obstacleTop &&
            catBottom >= obstacleBottom &&
            !isPassed
          ) {
            score++;
            scoreElement.textContent = score;
            isPassed = true;
          }
  
          if (obstaclePosition > -50) {
            requestAnimationFrame(moveObstacle);
          } else {
            gameJeu.removeChild(obstacle);
          }
  
          if (
            obstaclePosition <= 0 &&
            (catTop > obstacleTop || catBottom < obstacleBottom)
          ) {
            score--;
            scoreElement.textContent = score;
  
            if (score < 0) {
              gameOver();
            }
          }
        }
      }
  
      requestAnimationFrame(moveObstacle);
      obstacleTimer = setTimeout(createObstacle, Math.random() * 3000 + 2000);
    }
  
    function startGame() {
      if (!isGameStarted) {
        isGameStarted = true;
        score = 0;
        scoreElement.textContent = score;
        isGameOver = false;
        catIcon.style.bottom = '0';
        gameJeu.innerHTML = '';
        createObstacle();
      }
    }
  
    function gameOver() {
      isGameOver = true;
      clearTimeout(obstacleTimer);
      alert('Game Over!');
    }
  
    document.addEventListener('keydown', function (event) {
      if (event.code === 'Space') {
        event.preventDefault();
        if (!catJumpTimer && !isGameOver) {
          let isSpacePressed = false;
          let spacePressStartTime = null;
  
          document.addEventListener('keydown', function (event) {
            if (event.code === 'Space' && !isSpacePressed && !isGameOver) {
              event.preventDefault();
              isSpacePressed = true;
              spacePressStartTime = Date.now();
              moveCatUp();
            }
          });
  
          document.addEventListener('keyup', function (event) {
            if (event.code === 'Space' && isSpacePressed && !isGameOver) {
              event.preventDefault();
              isSpacePressed = false;
              const spacePressDuration = Date.now() - spacePressStartTime;
  
              if (catJumpTimer) {
                clearTimeout(catJumpTimer);
                catJumpTimer = null;
              }
  
              if (spacePressDuration <= 2000) {
                moveCatDown();
              }
            }
          });
  
          const btnOpen = document.querySelector('#btnOpen');
          btnOpen.addEventListener('click', startGame);
        }
      }
    });
  });
  