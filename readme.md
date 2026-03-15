# desktop-wallpaper

A Node.js native addon for managing Windows desktop wallpaper settings via COM APIs (`IDesktopWallpaper` on Win8+, `IActiveDesktop` fallback on Win7).

---

## Features

- Set wallpaper for a specific monitor or all monitors
- Get current wallpaper path
- Set/Get wallpaper display mode (center/tile/stretch/fit/fill/span)
- Set/Get desktop background color (`r,g,b`)
- Enable/disable wallpaper rendering
- Query monitor count and monitor device id

> Note: slideshow APIs are **not exposed** in the current public API.

---

## Requirements

- Windows OS
  - Win8+ uses `IDesktopWallpaper`
  - Win7 (`6.1`) uses compatibility fallback for selected APIs
- Node.js with native addon build toolchain
- Windows SDK / MSVC build environment (for native addon compilation)

---

## Installation

```bash
npm install desktop-wallpaper --save
```

---

## Usage

### Import

```ts
import {
  setWallpaper,
  getWallpaper,
  setPosition,
  getPosition,
  setBackgroundColor,
  getBackgroundColor,
  getMonitorCount,
  getMonitorId,
  enableWallpaper,
  disableWallpaper,
} from "desktop-wallpaper";
```

Or CommonJS:

```js
const {
  setWallpaper,
  getWallpaper,
  setPosition,
  getPosition,
  setBackgroundColor,
  getBackgroundColor,
  getMonitorCount,
  getMonitorId,
  enableWallpaper,
  disableWallpaper,
} = require("desktop-wallpaper");
```

### Basic example

```js
const path = require("path");
const {
  setWallpaper,
  getWallpaper,
  setPosition,
  getPosition,
  setBackgroundColor,
  getBackgroundColor,
} = require("desktop-wallpaper");

const imagePath = path.resolve(__dirname, "./assets/demo.jpg");

setWallpaper(0, imagePath);    // 0 = first monitor, -1 = all monitors
console.log(getWallpaper(0));

setPosition(3);                // FIT
console.log(getPosition());

setBackgroundColor(255, 255, 255);
console.log(getBackgroundColor()); // e.g. "255,255,255"
```

### API notes

#### `setWallpaper(screenIndex, imagePath)`

- `screenIndex: number`
  - `-1` means all monitors
  - `0...n-1` means a specific monitor index
- `imagePath: string`
  - must exist, otherwise throws `Error`

#### `setPosition(fillMode)`

`fillMode` supports:

- `0`: CENTER
- `1`: TILE
- `2`: STRETCH
- `3`: FIT
- `4`: FILL
- `5`: SPAN

Invalid values throw `RangeError`.

#### `setBackgroundColor(r, g, b)`

- `r`, `g`, `b` must be integers in `[0, 255]`
- invalid values throw `RangeError`

---

## Development

### 1) Install dependencies

```bash
npm install
```

### 2) Build TypeScript layer

```bash
npm run build
```

### 3) Build native addon

```bash
npm run gyp:rebuild
```

### 4) Run local test script

```bash
npm test
```

> The test script changes real desktop wallpaper settings. Run with care.

> On non-Windows environments (Linux/macOS CI), native build commands fail because `Windows.h` is unavailable.

### 5) Watch mode (TS only)

```bash
npm run watch
```

---

## Packaging & Publish

The package publish flow compiles TS and native addon first:

```bash
npm run prepublishOnly
npm publish --access public
```

Or use the helper script:

```bash
npm run publish-me
```

---

## Project structure

```text
source/
  index.ts            # Public JS/TS API, Win7/Win8+ routing
  wallpaper-win7.ts   # Win7 registry-based compatibility helpers
  reg-util.ts         # Registry command wrappers
lib/
  index.cpp           # N-API native addon implementation
test/
  set-wallpaper/      # Manual runtime test script
```

---

## License

MIT
