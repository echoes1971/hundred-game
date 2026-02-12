/**
 * TypeScript definitions for HundredGame
 * Provides type safety for TypeScript projects
 */

export interface HundredGameOptions {
  /** Grid size (default: 10) */
  gridSize?: number;
}

export interface GameState {
  /** Current grid state */
  grid: number[][];
  /** Current number to place */
  currentNumber: number;
  /** Current position [row, col] or null */
  currentPosition: [number, number] | null;
  /** Valid move positions [[row, col], ...] */
  validMoves: [number, number][];
  /** Whether game is over */
  gameOver: boolean;
  /** Whether player won */
  won: boolean;
  /** Grid size */
  gridSize: number;
  /** Total cells */
  totalCells: number;
}

export default class HundredGame {
  /**
   * Creates a new HundredGame instance
   * @param containerId - ID of the container DOM element
   * @param options - Configuration options
   */
  constructor(containerId: string, options?: HundredGameOptions);

  /**
   * Initialize empty grid
   * @returns Empty grid array
   */
  initializeGrid(): number[][];

  /**
   * Calculate valid moves from a position
   * @param row - Row index
   * @param col - Column index
   * @returns Array of valid move positions
   */
  calculateValidMoves(row: number, col: number): [number, number][];

  /**
   * Check if position is valid
   * @param row - Row index
   * @param col - Column index
   * @returns True if position is within grid bounds
   */
  isValidPosition(row: number, col: number): boolean;

  /**
   * Start the game from a position
   * @param row - Starting row
   * @param col - Starting column
   */
  startGame(row: number, col: number): void;

  /**
   * Play a move at position
   * @param row - Row index
   * @param col - Column index
   */
  playMove(row: number, col: number): void;

  /**
   * Reset the game
   */
  reset(): void;

  /**
   * Setup event listeners
   */
  setupEventListeners(): void;

  /**
   * Render the game UI
   */
  render(): void;

  /**
   * Get current game state
   * @returns Current game state object
   */
  getState(): GameState;
}
