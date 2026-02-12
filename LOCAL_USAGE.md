# 🔧 Using Hundred Game Without Publishing to NPM

This guide shows how to use the package in other projects **without publishing to npmjs.com**.

## Method 1: npm link (Development) ⭐ Best for Active Development

Perfect when you're actively developing the package and want changes reflected immediately.

### Setup (one time):

```bash
# In the hundred-game directory
cd /home/roberto/projects/hundred
npm link
```

### Use in your project:

```bash
# In your React/Vue/etc project
cd /path/to/your-project
npm link @echoes1971/hundred-game
```

### Usage in code:

```javascript
// Works exactly like a real npm package!
import HundredGame from '@echoes1971/hundred-game';
import '@echoes1971/hundred-game/css';

const game = new HundredGame('container', { gridSize: 10 });
```

### Unlink when done:

```bash
# In your project
npm unlink @echoes1971/hundred-game

# In hundred-game directory (optional)
npm unlink
```

**✅ Pros:**
- Changes in hundred-game are immediately reflected
- No need to reinstall after changes
- Works across multiple projects

**❌ Cons:**
- Only works on your local machine
- Symlinks can confuse some build tools

---

## Method 2: Install from Local Path

Install directly from the file system.

### Option A: Absolute Path

```bash
cd /path/to/your-project
npm install /home/roberto/projects/hundred
```

### Option B: Relative Path

```bash
cd /path/to/your-project
npm install ../hundred  # if projects are siblings
npm install ../../hundred  # adjust as needed
```

### Result in package.json:

```json
{
  "dependencies": {
    "@echoes1971/hundred-game": "file:../hundred"
  }
}
```

**✅ Pros:**
- Simple and straightforward
- Works in package.json
- Easy to understand

**❌ Cons:**
- Absolute paths break on other machines
- Need to `npm install` again after changes
- Paths must be maintained

---

## Method 3: Install from GitHub ⭐ Best for Sharing

If your repo is on GitHub (public or private with access), install directly from there.

### Public Repository:

```bash
# Install from GitHub
npm install github:echoes1971/hundred-game

# Or with specific branch
npm install github:echoes1971/hundred-game#main

# Or with specific commit/tag
npm install github:echoes1971/hundred-game#v1.0.0
```

### Private Repository (with SSH):

```bash
npm install git+ssh://git@github.com:echoes1971/hundred-game.git
```

### Result in package.json:

```json
{
  "dependencies": {
    "@echoes1971/hundred-game": "github:echoes1971/hundred-game"
  }
}
```

**✅ Pros:**
- Easy to share with team
- Works in CI/CD
- Can specify versions/branches/commits
- Updates with `npm update`

**❌ Cons:**
- Requires GitHub access
- Needs git installed

---

## Method 4: Create and Install Tarball

Create a package file and install from it.

### Create tarball:

```bash
cd /home/roberto/projects/hundred
npm pack
# Creates: echoes1971-hundred-game-1.0.0.tgz
```

### Install in your project:

```bash
cd /path/to/your-project
npm install /home/roberto/projects/hundred/echoes1971-hundred-game-1.0.0.tgz
```

### Or copy tarball and install:

```bash
cp /home/roberto/projects/hundred/echoes1971-hundred-game-1.0.0.tgz /tmp/
cd /path/to/your-project
npm install /tmp/echoes1971-hundred-game-1.0.0.tgz
```

**✅ Pros:**
- Portable (can email, share via Dropbox, etc.)
- Exact snapshot of version
- No git needed

**❌ Cons:**
- Manual updates required
- Need to recreate tarball after changes

---

## Method 5: Git Submodules (Advanced)

Use as a git submodule in your project.

### Add submodule:

```bash
cd /path/to/your-project
git submodule add https://github.com/echoes1971/hundred-game.git vendor/hundred-game
```

### Use in code:

```javascript
import HundredGame from './vendor/hundred-game/src/js/hundred-game-es6.js';
import './vendor/hundred-game/src/css/hundred-game.css';
```

### Update submodule:

```bash
git submodule update --remote
```

**✅ Pros:**
- Version controlled within your project
- Full source available
- No npm needed

**❌ Cons:**
- More complex git workflow
- Team needs to understand submodules
- Direct file imports (not npm-style)

---

## Method 6: Monorepo with Workspaces

If you have multiple related projects, use npm workspaces.

### Project structure:

```
my-workspace/
├── package.json
├── packages/
│   ├── hundred-game/      ← Your game package
│   └── my-app/            ← Your app using the game
```

### Root package.json:

```json
{
  "name": "my-workspace",
  "private": true,
  "workspaces": [
    "packages/*"
  ]
}
```

### Install dependencies:

```bash
cd my-workspace
npm install
```

### Use in my-app:

```javascript
import HundredGame from '@echoes1971/hundred-game';
import '@echoes1971/hundred-game/css';
```

**✅ Pros:**
- Professional setup
- Shared node_modules
- Easy cross-package development

**❌ Cons:**
- More complex initial setup
- Requires restructuring projects

---

## Comparison Table

| Method | Best For | Updates | Sharing | Complexity |
|--------|----------|---------|---------|------------|
| **npm link** | Active development | Instant | Local only | ⭐ Easy |
| **Local path** | Related projects | Manual | Local only | ⭐ Easy |
| **GitHub** | Team collaboration | `npm update` | Anyone with access | ⭐⭐ Medium |
| **Tarball** | Offline/portable | Recreate file | Anyone | ⭐ Easy |
| **Submodules** | Git-based workflow | `git submodule update` | Git users | ⭐⭐⭐ Complex |
| **Workspaces** | Monorepo setup | Automatic | Team | ⭐⭐⭐ Complex |

---

## Recommended Workflows

### Scenario 1: Solo Developer, Local Projects

```bash
# Use npm link
cd /home/roberto/projects/hundred
npm link

cd /home/roberto/projects/my-react-app
npm link @echoes1971/hundred-game
```

### Scenario 2: Team Project on GitHub

```bash
# Push to GitHub first, then in your team project:
npm install github:echoes1971/hundred-game
```

Update `package.json`:
```json
{
  "dependencies": {
    "@echoes1971/hundred-game": "github:echoes1971/hundred-game#v1.0.0"
  }
}
```

### Scenario 3: Quick Test in Another Project

```bash
cd /path/to/test-project
npm install ../hundred
```

### Scenario 4: Share with Client (No GitHub Access)

```bash
cd /home/roberto/projects/hundred
npm pack
# Send echoes1971-hundred-game-1.0.0.tgz to client

# Client installs:
npm install /path/to/echoes1971-hundred-game-1.0.0.tgz
```

---

## Quick Reference Commands

```bash
# Link for development
npm link                                    # In hundred dir
npm link @echoes1971/hundred-game          # In your project

# Install from local path
npm install /absolute/path/to/hundred
npm install ../relative/path/to/hundred

# Install from GitHub
npm install github:echoes1971/hundred-game
npm install github:echoes1971/hundred-game#main
npm install github:echoes1971/hundred-game#v1.0.0

# Create and install tarball
npm pack                                    # In hundred dir
npm install /path/to/package.tgz           # In your project

# Update from GitHub
npm update @echoes1971/hundred-game
```

---

## Testing Your Setup

After installing (any method), test with:

```javascript
// React example
import HundredGame from '@echoes1971/hundred-game';
import '@echoes1971/hundred-game/css';

console.log('HundredGame loaded:', typeof HundredGame);
// Should output: "HundredGame loaded: function"

const game = new HundredGame('test-container', { gridSize: 5 });
console.log('Game created:', game.gridSize);
// Should output: "Game created: 5"
```

---

## Troubleshooting

### "Cannot find module '@echoes1971/hundred-game'"

Check:
```bash
# Verify link exists
ls -la node_modules/@echoes1971/hundred-game

# Re-link if needed
npm unlink @echoes1971/hundred-game
npm link @echoes1971/hundred-game
```

### "Module not found: Can't resolve '@echoes1971/hundred-game/css'"

The package.json `exports` field might not be recognized. Use direct import:
```javascript
import '@echoes1971/hundred-game/src/css/hundred-game.css';
```

### Changes not reflecting (npm link)

Some build tools cache. Try:
```bash
# Clear cache and rebuild
rm -rf node_modules/.cache
npm run build  # or your build command
```

### Path issues with "file:" dependencies

Convert to relative path in package.json:
```json
{
  "dependencies": {
    "@echoes1971/hundred-game": "file:../hundred"
  }
}
```

---

## Summary

**🎯 For you right now (local development):**
```bash
cd /home/roberto/projects/hundred
npm link

cd /path/to/your-other-project
npm link @echoes1971/hundred-game
```

**🎯 For team collaboration (once on GitHub):**
```bash
npm install github:echoes1971/hundred-game
```

**🎯 For production (later):**
```bash
npm install @echoes1971/hundred-game  # After publishing to npm
```

---

**You're all set! No need to publish to npm to use your package! 🚀**
