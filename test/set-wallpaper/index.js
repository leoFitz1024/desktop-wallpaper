const {getMonitorCount, getMonitorId, setWallpaper, getWallpaper, setPosition, getPosition,
    getBackgroundColor, setBackgroundColor, enableWallpaper, disableWallpaper} = require("../../dist/index");
const path = require("path")


console.log(getWallpaper(0))
setPosition(4)
console.log(getPosition())
// console.log(getPosition())
// console.log(getBackgroundColor())
setBackgroundColor(99,99,255)
console.log(getBackgroundColor(99,99,255))
// console.log(path.resolve(__dirname, "../../assets/demo.jpg"))
setWallpaper(0, path.resolve(__dirname, "../../assets/demo.png"))
// console.log(getBackgroundColor())
// let monitorCount = getMonitorCount();
// for (let i = 0; i < monitorCount; i++) {
//     console.log(getMonitorId(i))
// }
// enableWallpaper()
// setSlideShowOptions({mode:0, slideshowTick: 600000})
// console.log(getSlideShowOptions())
// console.log(getSlideShowStatus())
