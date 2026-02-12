/**
 * HundredGame - ES6 Module Export
 * 
 * Use this file if you want to import the game as an ES6 module:
 * import HundredGame from './hundred-game-es6.js';
 */

export default class HundredGame {
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

  initializeGrid() {
    return Array(this.gridSize)
      .fill(null)
      .map(() => Array(this.gridSize).fill(0));
  }

  calculateValidMoves(row, col) {
    const moves = [];

    const orthogonalDirections = [
      [-3, 0], [3, 0],
      [0, -3], [0, 3]
    ];

    orthogonalDirections.forEach(([dRow, dCol]) => {
      const newRow = row + dRow;
      const newCol = col + dCol;
      if (this.isValidPosition(newRow, newCol) && this.grid[newRow][newCol] === 0) {
        moves.push({ row: newRow, col: newCol });
      }
    });

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

  isValidPosition(row, col) {
    return row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize;
  }

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

  playMove(row, col) {
    if (this.gameOver || this.won) {
      return false;
    }

    const isValidMove = this.validMoves.some(m => m.row === row && m.col === col);
    if (!isValidMove) {
      return false;
    }

    this.grid[row][col] = this.currentNumber;
    this.currentNumber++;
    this.currentPosition = { row, col };

    if (this.currentNumber > this.totalCells) {
      this.won = true;
      this.gameOver = true;
      this.render();
      return true;
    }

    this.validMoves = this.calculateValidMoves(row, col);

    if (this.validMoves.length === 0) {
      this.gameOver = true;
    }

    this.render();
    return true;
  }

  reset() {
    this.grid = this.initializeGrid();
    this.currentNumber = 1;
    this.currentPosition = null;
    this.validMoves = [];
    this.gameOver = false;
    this.won = false;
    this.render();
  }

  setupEventListeners() {
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('cell')) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);

        if (this.currentPosition === null && this.grid[row][col] === 0) {
          this.startGame(row, col);
        } else if (this.currentPosition !== null) {
          this.playMove(row, col);
        }
      }

      if (e.target.classList.contains('reset-btn')) {
        this.reset();
      }
    });
  }

  render() {
    this.container.innerHTML = '';

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

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    // Assegna il numero di colonne dinamicamente
    gridContainer.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;

    for (let row = 0; row < this.gridSize; row++) {
      for (let col = 0; col < this.gridSize; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;

        const value = this.grid[row][col];

        if (value > 0) {
          cell.classList.add('filled');
          cell.textContent = value;
        } else if (this.validMoves.some(m => m.row === row && m.col === col)) {
          cell.classList.add('valid-move');
          cell.innerHTML = '◆';
        }

        if (this.currentPosition && this.currentPosition.row === row && this.currentPosition.col === col) {
          cell.classList.add('current');
        }

        gridContainer.appendChild(cell);
      }
    }

    this.container.appendChild(gridContainer);
  }

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
