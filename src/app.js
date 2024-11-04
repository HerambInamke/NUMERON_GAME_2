document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const gameContainer = document.querySelector('.game');
    const gameOverContainer = document.querySelector('.gameover');
    const timer = document.getElementById('timer');
    let score = 0;
    let timerId;
    let correctOperator;
  
    playButton.onclick = () => {
      playButton.style.display = 'none';
      gameContainer.style.display = 'flex';
      startGame();
    };
  
    function generateRandomNumbers() {
      const number1 = Math.round(Math.random() * 100);
      const number2 = Math.round(Math.random() * 100);
      document.getElementById('number1').innerHTML = number1;
      document.getElementById('number2').innerHTML = number2;
      return { number1, number2 };
    }
  
    function startTimer() {
      let time = 20;
      timer.innerHTML = time;
      timerId = setInterval(() => {
        time--;
        if (time === 0) {
          endGame();
        }
        timer.innerHTML = time;
      }, 1000);
    }
  
    function startGame() {
      window.score = 0;
      resetGame();
    }
  
    function resetGame() {
      const { number1, number2 } = generateRandomNumbers();
      window.correctOperator = randomise(number1, number2);
      resetTime(timerId);
    }
  
    function endGame() {
      clearInterval(timerId);
      localStorage.setItem('score', score);
      gameContainer.style.display = 'none';
      gameOverContainer.style.display = 'flex';
      document.getElementById('score-board').innerHTML = window.score;
    }
  
    function randomise(number1, number2) {
      let result;
      const operator = Math.floor(Math.random() * 5) + 1;
  
      switch (operator) {
        case 1:
          result = number1 + number2;
          document.getElementById('number3').innerHTML = result;
          return 'plus';
          break;
        case 2:
          result = number1 - number2;
          document.getElementById('number3').innerHTML = result;
          return 'minus';
          break;
        case 3:
          result = number1 * number2;
          document.getElementById('number3').innerHTML = result;
          return 'mul';
          break;
        case 4:
          result = Math.floor(number1 / number2); // Use Math.floor for integer division
          document.getElementById('number3').innerHTML = result;
          return 'divide';
          break;
        case 5:
          result = number1 % number2;
          document.getElementById('number3').innerHTML = result;
          return 'modulus';
          break;
      }
  
      return correctOperator;
    }
  
    function resetTime(intervalId) {
      clearInterval(intervalId);
      startTimer();
    }
    // Complete the logic for HandleOperatorClick function
    function handleOperatorClick(selectedOperator) {
      // To increment score, add the window object to increment score and reset.
      if (selectedOperator === window.correctOperator) {
        window.score++;
        window.resetGame();
      } else {
        window.endGame();
      }
    }
  
    document.getElementById('plus').onclick = () => handleOperatorClick('plus');
    document.getElementById('minus').onclick = () => handleOperatorClick('minus');
    document.getElementById('mul').onclick = () => handleOperatorClick('mul');
    document.getElementById('modulus').onclick = () =>
      handleOperatorClick('modulus');
    document.getElementById('divide').onclick = () =>
      handleOperatorClick('divide');
  
    function playAgainHandler() {
      gameOverContainer.style.display = 'none';
      gameContainer.style.display = 'flex';
      startGame();
    }
  
    const playAgainButton = document.getElementById('play-again-button');
    if (playAgainButton) {
      playAgainButton.onclick = playAgainHandler;
    }
  
    // Expose functions for testing
    window.startGame = startGame;
    window.endGame = endGame;
    window.resetGame = resetGame;
    window.generateRandomNumbers = generateRandomNumbers; // Expose for testing
    window.startTimer = startTimer; // Expose for testing
    window.playAgainHandler = playAgainHandler; // Expose for testing
    window.handleOperatorClick = handleOperatorClick; // Expose for testing
  
    window.score = score; // Expose score to the global window object
    window.correctOperator = correctOperator;
  });
  