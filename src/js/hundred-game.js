/**
 * HundredGame - A logic puzzle game on a configurable grid
 * Place numbers from 1 to N following specific movement rules
 */

class HundredGame {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    // Grid configuration (default 10x10)
    this.gridSize = options.gridSize || 10;
    this.totalCells = this.gridSize * this.gridSize;
    this.grid = this.initializeGrid();
    this.currentNumber = 1;
    this.currentPosition = null;
    this.validMoves = [];
    this.gameOver = false;
    this.won = false;

    this.render();
    this.setupEventListeners();
  }

  /**
   * Initialize an empty grid
   */
  initializeGrid() {
    return Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill(0));
  }

  /**
   * Calculate possible moves from current position
   */
  calculateValidMoves(row, col) {
    const moves = [];

    // Horizontal and vertical moves (skip 2, place on 3rd)
    const orthogonalDirections = [
      [-3, 0], [3, 0],  // vertical
      [0, -3], [0, 3]   // horizontal
    ];

    orthogonalDirections.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (this.isValidPosition(newRow, newCol) && this.grid[newRow][newCol] === 0) {
        moves.push({ row: newRow, col: newCol });
      }
    });

    // Diagonal moves (skip 1, place on 2nd)
    const diagonalDirections = [
      [-2, -2], [-2, 2],
      [2, -2], [2, 2]
    ];

    diagonalDirections.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (this.isValidPosition(newRow, newCol) && this.grid[newRow][newCol] === 0) {
        moves.push({ row: newRow, col: newCol });
      }
    });

    return moves;
  }

  /**
   * Check if a position is valid and empty
   */
  isValidPosition(row, col) {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
  }

  /**
   * Start the game by choosing an initial position
   */
  startGame(row = 0, col = 0) {
    if (!this.isValidPosition(row, col)) {
      throw new Error('Invalid initial position');
    }

    this.grid[row][col] = 1;
    this.currentNumber = 2;
    this.currentPosition = { row, col };
    this.validMoves = this.calculateValidMoves(row, col);
    this.gameOver = false;
    this.won = false;
    this.render();
  }

  /**
   * Play a move
   */
  playMove(row, col) {
    if (this.gameOver || this.won) {
      return false;
    }

    // Check if the move is valid
    const isValidMove = this.validMoves.some(m => m.row === row && m.col === col);
    if (!isValidMove) {
      return false;
    }

    // Place the number
    this.grid[row][col] = this.currentNumber;
    this.currentNumber++;
    this.currentPosition = { row, col };

    // Check if the game is won
    if (this.currentNumber > this.totalCells) {
      this.won = true;
      this.gameOver = true;
      this.render();
      return true;
    }

    // Calculate next valid moves
    this.validMoves = this.calculateValidMoves(row, col);

    // If there are no valid moves, the game ends
    if (this.validMoves.length === 0) {
      this.gameOver = true;
    }

    this.render();
    return true;
  }

  /**
   * Reset the game
   */
  reset() {
    this.grid = this.initializeGrid();
    this.currentNumber = 1;
    this.currentPosition = null;
    this.validMoves = [];
    this.gameOver = false;
    this.won = false;
    this.render();
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        // If the game hasn't started and the cell is empty, start the game
        if (this.currentPosition === null && this.grid[row][col] === 0) {
          this.startGame(row, col);
        } else if (this.currentPosition !== null) {
          this.playMove(row, col);
        }
      }

      // Reset button
      if (e.target.classList.contains('reset-btn')) {
        this.reset();
      }
    });
  }

  /**
   * Render the game
   */
  render() {
    this.container.innerHTML = '';

    // Info
    const info = document.createElement('div');
    info.className = 'game-info';
    info.innerHTML = `
      <div class="info-text">
        <span>Numbers placed: <strong>${this.currentNumber - 1}/${this.totalCells}</strong></span>
        ${this.currentPosition ? `<span>Current position: <strong>[${this.currentPosition.row}, ${this.currentPosition.col}]</strong></span>` : '<span>Click on a cell to start</span>'}
      </div>
      ${this.won ? '<div class="status won">🎉 YOU WIN! You filled all cells!</div>' : ''}
      ${this.gameOver && !this.won ? '<div class="status lost">❌ Game Over! No more valid moves.</div>' : ''}
      <button class="reset-btn">Restart</button>
    `;
    this.container.appendChild(info);

    // Grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    // Dynamically set the number of columns
    gridContainer.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;

        const value = this.grid[row][col];

        // CSS classes
        if (value > 0) {
          cell.classList.add('filled');
          cell.textContent = value;
        } else if (this.validMoves.some(m => m.row === row && m.col === col)) {
          cell.classList.add('valid-move');
          cell.innerHTML = '◆'; // Diamond indicator for valid moves
        }

        if (this.currentPosition && this.currentPosition.row === row && this.currentPosition.col === col) {
          cell.classList.add('current');
        }

        gridContainer.appendChild(cell);
      }
    }

    this.container.appendChild(gridContainer);
  }

  /**
   * Get the game state
   */
  getState() {
    return {
      grid: this.grid.map(row => [...row]),
      currentNumber: this.currentNumber,
      currentPosition: this.currentPosition ? { ...this.currentPosition } : null,
      gameOver: this.gameOver,
      won: this.won
    };
  }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HundredGame;
}
