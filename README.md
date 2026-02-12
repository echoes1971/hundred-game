# 🎮 Hundred Game

<p>
  <img alt="GitHub License" src="https://img.shields.io/badge/license-MIT-green">
  <img alt="GitHub Stars" src="https://img.shields.io/badge/⭐-give%20a%20star-brightgreen">
  <img alt="JavaScript" src="https://img.shields.io/badge/javascript-ES6%2B-yellow">
  <img alt="Size" src="https://img.shields.io/badge/size-~20KB-blue">
  <img alt="Status" src="https://img.shields.io/badge/status-active-success">
  <img alt="Mobile" src="https://img.shields.io/badge/mobile-friendly-brightgreen">
</p>

A logic puzzle game based on a configurable grid (5×5, 10×10, 20×20, etc.) where you need to place numbers following specific movement rules.

**🎯 No dependencies | 📦 Pure JavaScript, HTML, CSS | 🎨 Responsive Design | 📱 Mobile-Friendly**

**[Live Demo](./index.html)** • **[Configuration Demo](./config.html)** • **[Advanced Examples](./demo.html)**

## 📚 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [API](#-api)
- [Customization](#-customization)
- [Mathematical Theory](#-mathematical-theory)
- [Compatibility](#-compatibility)
- [License](#-license)

## ✨ Features

- ⚡ **Zero Dependencies**: Pure Vanilla JavaScript
- 📱 **Mobile Friendly**: Fully responsive design
- 🎮 **Configurable Grid**: 5×5 → 20×20 and beyond
- 🧩 **Reusable Component**: Import and use anywhere
- 🎨 **Modern UI**: Beautiful gradient design
- 📊 **Game State Management**: Access and control game state
- 🔄 **Save/Load Support**: Easily extensible for persistence
- 🧮 **Mathematical Basis**: Recursive/fractal patterns

## 🚀 Getting Started

### Quick Start (30 seconds)

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="hundred-game.css">
</head>
<body>
    <div id="game"></div>
    <script src="hundred-game.js"></script>
    <script>
        new HundredGame('game');  // That's it!
    </script>
</body>
</html>
```

### Live Demos

- **Basic Game**: Open `index.html` in your browser
- **With Configuration**: Open `config.html` to choose grid size
- **Advanced Demo**: Open `demo.html` with code examples

## 🎯 How to Play

1. **Start**: Click on any cell to place number 1
2. **Moves**:
   - **Horizontal/Vertical**: Skip 2 cells and place number on 3rd
   - **Diagonal**: Skip 1 cell and place number on 2nd
3. **Win**: Fill all cells in the grid

## 📦 Usage

### As a Standalone Component

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="hundred-game.css">
</head>
<body>
    <div id="game"></div>
    
    <script src="hundred-game.js"></script>
    <script>
        // Create a 10×10 game (default)
        const game = new HundredGame('game');
        
        // Or configure the size
        const game = new HundredGame('game', { gridSize: 5 });  // 5×5
    </script>
</body>
</html>
```

### With Modern JavaScript (ES6 modules)

```javascript
import HundredGame from './hundred-game-es6.js';

const game = new HundredGame('game-container', { gridSize: 10 });
```

### Programmatic Control

```javascript
const game = new HundredGame('game-container', { gridSize: 10 });

// Start the game from a specific position
game.startGame(0, 0);

// Play a move
game.playMove(3, 0);

// Get the game state
const state = game.getState();
console.log(state.currentNumber);  // Current number
console.log(state.won);             // Won?

// Reset the game
game.reset();
```

## 📋 API

### `HundredGame(containerId, options)`
Create a new game instance.

**Parameters:**
- `containerId` (string): ID of the HTML container element
- `options` (object, optional): Configuration
  - `gridSize` (number): Grid size (default: 10)
    - Supported values: 5, 8, 10, 15, 20, etc.
    - Total cells = gridSize × gridSize

**Example:**
```javascript
new HundredGame('game', { gridSize: 5 });   // 5×5 (25 cells)
new HundredGame('game', { gridSize: 10 });  // 10×10 (100 cells)
new HundredGame('game', { gridSize: 20 });  // 20×20 (400 cells)
```

### `startGame(row, col)`
Start the game from a specified position.

**Parameters:**
- `row` (number): Row (0-N)
- `col` (number): Column (0-N)

### `playMove(row, col)`
Execute a move.

**Parameters:**
- `row` (number): Row (0-N)
- `col` (number): Column (0-N)

**Returns:** `boolean` - true if the move is valid

### `reset()`
Reset the game.

### `getState()`
Get the current game state.

**Returns:** Object with properties:
- `grid`: Grid array with numbers
- `currentNumber`: Number to place
- `currentPosition`: Current position {row, col}
- `gameOver`: Game ended?
- `won`: Game won?

## 🎨 Customization

### Colors
Modify CSS variables in `hundred-game.css`:

```css
.cell.filled {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change colors here */
}
```

### Grid Size
Configure at creation time:

```javascript
// In configuration
new HundredGame('game', { gridSize: 15 });

// Or modify hundred-game.js:
// this.gridSize = 15;  // Default 10
```

## 🧮 Mathematical Theory

**Curious about the math?** Read the complete document on how solutions scale:

📖 [Mathematical Theory](./Mathematical_Theory.md)

**TL;DR**: 
- Grids **5×5**, **10×10**, **20×20** are all solvable ✅
- They follow a **recursive/fractal pattern** 
- Odd grids are much more difficult ⚠️

## 📁 File Structure

```
hundred/
├── index.html              # Basic HTML demo
├── config.html             # Demo with grid size selection
├── demo.html               # Advanced demo with examples
├── hundred-game.js         # Game logic (component)
├── hundred-game-es6.js     # ES6 module version
├── hundred-game.css        # Styles
├── examples.js             # 10 usage examples
├── TEORIA_MATEMATICA.md    # Mathematical deep dive
├── README.md               # This file
└── package.json            # Project metadata
```

## 🚀 Compatibility

- ✅ Vanilla JavaScript (ES6+)
- ✅ No external dependencies
- ✅ Works in all modern browsers
- ✅ Mobile-friendly
- ✅ Importable as a component

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest 2 versions |
| Firefox | ✅ Latest 2 versions |
| Safari | ✅ Latest 2 versions |
| Edge | ✅ Latest 2 versions |
| Mobile Chrome | ✅ Yes |
| Mobile Safari | ✅ Yes |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution

- 🎨 Accessibility improvements
- 🌍 Internationalization (i18n)
- 📊 Solution solver algorithm
- 🧪 Unit tests
- 📚 Documentation improvements

## 🐛 Known Issues

- Very large grids (50×50+) may have performance implications
- Odd-sized grids (3×3, 7×7, 9×9) may not be solvable

## 📝 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file for details.

## 👤 Author

Developed by **Roberto** - Feel free to reach out with questions or suggestions!

---

<div align="center">

**[⬆ Back to Top](#-hundred-game)**

Made with ❤️ for puzzle lovers

</div>
