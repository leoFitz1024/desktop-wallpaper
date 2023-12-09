const {setWallpaper, getWallpaper, setPosition, getPosition,
    getBackgroundColor, setBackgroundColor,
    getSlideShowOptions, setSlideShowOptions,
    getSlideShowStatus} = require("../../dist/index");

setWallpaper(0, "C:\\Users\\chen\\Pictures\\test\\2.jpg")
console.log(getWallpaper(0))
setPosition(3)
console.log(getPosition())
setBackgroundColor(255,255,255)
console.log(getBackgroundColor())
// setSlideShowOptions({mode:0, slideshowTick: 600000})
// console.log(getSlideShowOptions())
// console.log(getSlideShowStatus())
