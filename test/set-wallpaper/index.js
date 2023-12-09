const {setWallpaper, getWallpaper, setPosition, getPosition,
    getBackgroundColor, setBackgroundColor} = require("../../dist/index");
const path = require("path")

setWallpaper(0, path.resolve(__dirname, "../../assets/demo.jpg"))
console.log(getWallpaper(0))
setPosition(3)
console.log(getPosition())
setBackgroundColor(255,255,255)
console.log(getBackgroundColor())
// setSlideShowOptions({mode:0, slideshowTick: 600000})
// console.log(getSlideShowOptions())
// console.log(getSlideShowStatus())
