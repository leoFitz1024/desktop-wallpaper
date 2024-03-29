const {getMonitorCount, getMonitorId, setWallpaper, getWallpaper, setPosition, getPosition,
    getBackgroundColor, setBackgroundColor, enableWallpaper, disableWallpaper} = require("../../dist/index");
const path = require("path")

setPosition(3)
console.log(getPosition())
setBackgroundColor(22,22,22)
console.log(getBackgroundColor())
setWallpaper(80, path.resolve(__dirname, "../../assets/demo.jpg"))
console.log(getWallpaper(0))

// console.log(getBackgroundColor())
// let monitorCount = getMonitorCount();
// for (let i = 0; i < monitorCount; i++) {
//     console.log(getMonitorId(i))
// }
// enableWallpaper()
// setSlideShowOptions({mode:0, slideshowTick: 600000})
// console.log(getSlideShowOptions())
// console.log(getSlideShowStatus())
