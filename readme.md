# Desktop Wallpaper (✨)

> using the COM API of Windows to configure wallpaper settings. Require Win8+.
---
<div align="center">

![license](https://badgen.net/badge/license/MIT/blue)
![npm](https://badgen.net/npm/v/desktop-wallpaper)
![downloads](https://badgen.net/npm/dw/desktop-wallpaper)
![star](https://badgen.net/github/stars/leoFitz1024/desktop-wallpaper)
![issues](https://badgen.net/github/issues/leoFitz1024/desktop-wallpaper)

</div>

---
## Features (⭐)

- set slide show

## Getting Started (✅)

- ### Installation (⏬)
    - `npm install desktop-wallpaper --save`

- ### Usage (⚡)
  ```js
  import {setWallpaper, getWallpaper, setPosition, getPosition, getBackgroundColor, setBackgroundColor} from "desktop-wallpaper";
  // or
  const {setWallpaper, getWallpaper, setPosition, getPosition, getBackgroundColor, setBackgroundColor} = require("desktop-wallpaper");
  
  setWallpaper(0, "../../assets/demo.jpg")
  console.log(getWallpaper(0))
  setPosition(3)
  console.log(getPosition())
  setBackgroundColor(255,255,255)
  console.log(getBackgroundColor())
  ```
---

## The End (💘)
