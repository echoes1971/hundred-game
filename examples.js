/**
 * USAGE EXAMPLES - Hundred Game
 * 
 * This file shows different ways to use the HundredGame component
 */

// ====== EXAMPLE 1: BASIC USAGE ======
// Create and initialize the game in the browser
function example1_basic() {
  const game = new HundredGame('game-container');
  // Done! The game is ready to use
}


// ====== EXAMPLE 2: AUTO-START ======
// Start the game automatically from a specific position
function example2_autostart() {
  const game = new HundredGame('game-container');
  game.startGame(5, 5);  // Start from center
}


// ====== EXAMPLE 3: PROGRAMMED GAME ======
// Move the game programmatically
function example3_programmed() {
  const game = new HundredGame('game-container');
  game.startGame(0, 0);     // Start from (0,0)
  
  // Play some moves automatically
  game.playMove(3, 0);      // Vertical move
  game.playMove(3, 3);      // Diagonal move
  game.playMove(0, 3);      // Vertical move
}


// ====== EXAMPLE 4: STATE MONITORING ======
// Track game state
function example4_monitoring() {
  const game = new HundredGame('game-container');
  
  // Add a script that monitors the game
  const originalPlayMove = game.playMove.bind(game);
  game.playMove = function(row, col) {
    const success = originalPlayMove(row, col);
    
    if (success) {
      const state = game.getState();
      console.log(`Move to [${row}, ${col}] - Numbers: ${state.currentNumber - 1}/${state.gameOver ? 'GAME OVER' : '...'}`);
      
      if (state.won) {
        console.log('🎉 You won!');
      }
    }
    
    return success;
  };
  
  // Now every move will be logged
  window.game = game;  // Make accessible from console
}


// ====== EXAMPLE 5: MULTIPLE CANVASES ======
// Initialize multiple game instances
function example5_multiple() {
  const game1 = new HundredGame('game1');
  const game2 = new HundredGame('game2');
  
  game1.startGame(0, 0);
  game2.startGame(5, 5);
  
  window.games = [game1, game2];
}


// ====== EXAMPLE 6: AUTO-RESET ======
// Reset the game after N seconds
function example6_autoreset() {
  const game = new HundredGame('game-container');
  const RESET_INTERVAL = 30000;  // 30 seconds
  
  const resetTimer = setInterval(() => {
    game.reset();
  }, RESET_INTERVAL);
  
  // To stop: clearInterval(resetTimer);
  window.stopAutoReset = () => clearInterval(resetTimer);
}


// ====== EXAMPLE 7: SOLVER SIMULATION ======
// Simulate the game with random moves (won't solve the puzzle!)
function example7_randomSolver() {
  const game = new HundredGame('game-container');
  game.startGame(0, 0);
  
  const solveStep = setInterval(() => {
    const state = game.getState();
    
    if (state.won) {
      console.log('Game won!');
      clearInterval(solveStep);
      return;
    }
    
    if (state.gameOver) {
      console.log('Game Over - no available moves');
      clearInterval(solveStep);
      return;
    }
    
    // Make a random move from valid moves
    if (game.validMoves && game.validMoves.length > 0) {
      const move = game.validMoves[Math.floor(Math.random() * game.validMoves.length)];
      game.playMove(move.row, move.col);
    }
  }, 100);
  
  window.stopSolver = () => clearInterval(solveStep);
}


// ====== EXAMPLE 8: SAVE/LOAD STATE ======
// Save and reload game state
function example8_saveload() {
  const game = new HundredGame('game-container');
  
  // Function to save
  window.saveGame = () => {
    const state = game.getState();
    localStorage.setItem('hundredGameState', JSON.stringify(state));
    console.log('Game saved');
  };
  
  // Function to load
  window.loadGame = () => {
    const saved = localStorage.getItem('hundredGameState');
    if (saved) {
      const state = JSON.parse(saved);
      // Rebuild the game from state
      game.grid = state.grid;
      game.currentNumber = state.currentNumber;
      game.currentPosition = state.currentPosition;
      game.gameOver = state.gameOver;
      game.won = state.won;
      if (game.currentPosition) {
        game.validMoves = game.calculateValidMoves(
          game.currentPosition.row,
          game.currentPosition.col
        );
      }
      game.render();
      console.log('Game loaded');
    }
  };
}


// ====== EXAMPLE 9: HARD MODE ======
// Version that doesn't show valid moves
function example9_hardMode() {
  const game = new HundredGame('game-container');
  
  // Override rendering to hide moves
  const originalRender = game.render.bind(game);
  game.render = function() {
    // Temporarily empty valid moves for render
    const validMoves = this.validMoves;
    this.validMoves = [];  // Hide indicators
    
    originalRender();
    
    this.validMoves = validMoves;  // Restore
  };
  
  console.log('Hard mode: valid moves are not visible');
}


// ====== EXAMPLE 10: STATISTICS AND ANALYSIS ======
// Collect statistics on the game
function example10_statistics() {
  const game = new HundredGame('game-container');
  
  const stats = {
    totalMoves: 0,
    startPosition: null,
    moves: [],
    startTime: null,
    endTime: null
  };
  
  stats.startTime = Date.now();
  
  const originalPlayMove = game.playMove.bind(game);
  game.playMove = function(row, col) {
    const state = game.getState();
    const success = originalPlayMove(row, col);
    
    if (success) {
      stats.totalMoves++;
      stats.moves.push({ row, col, number: state.currentNumber - 1 });
      
      if (state.won) {
        stats.endTime = Date.now();
        stats.duration = stats.endTime - stats.startTime;
        console.log('Statistics:', stats);
      }
    }
    
    return success;
  };
  
  const originalStartGame = game.startGame.bind(game);
  game.startGame = function(row, col) {
    stats.startPosition = { row, col };
    return originalStartGame(row, col);
  };
  
  window.gameStats = stats;
}
