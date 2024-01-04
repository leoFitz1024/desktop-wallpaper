import * as regUtils from "./reg-util"

const setBackgroundColor = (r: number, g: number, b: number) => {
    const bgColorStr = `${r} ${g} ${b}`;
    regUtils.addKey("HKEY_CURRENT_USER\\Control Panel\\Colors", "Background", bgColorStr)
}

const getBackgroundColor = () => {
    let bgColor = regUtils.queryKey("HKEY_CURRENT_USER\\Control Panel\\Colors", "Background");
    bgColor = bgColor.replaceAll("HKEY_CURRENT_USER\\Control Panel\\Colors\r\n    Background    REG_SZ    ", "")
    bgColor = bgColor.replaceAll("\r\n", "")
    return bgColor.replaceAll(" ", ",");
}

// CENTER - TILE - STRETCH - FIT - FILL - SPAN
const FILL_MODEL = [[0, 0], [0, 1], [2, 0], [6, 0], [10, 0], [22, 0]];
const setPosition = (fillMode: number) => {
    // @ts-ignore
    regUtils.addKey("HKEY_CURRENT_USER\\Control Panel\\Desktop", "WallpaperStyle", FILL_MODEL[fillMode][0])
    // @ts-ignore
    regUtils.addKey("HKEY_CURRENT_USER\\Control Panel\\Desktop", "TileWallpaper", FILL_MODEL[fillMode][1])
}

const getPosition = (): number => {
    // @ts-ignore
    let wallpaperStyle = regUtils.queryKey("HKEY_CURRENT_USER\\Control Panel\\Desktop", "WallpaperStyle");
    wallpaperStyle = wallpaperStyle.replaceAll("HKEY_CURRENT_USER\\Control Panel\\Desktop\r\n    WallpaperStyle    REG_SZ    ", "")
    wallpaperStyle = wallpaperStyle.replaceAll("\r\n", "")
    let tileWallpaper = regUtils.queryKey("HKEY_CURRENT_USER\\Control Panel\\Desktop", "TileWallpaper");
    tileWallpaper = tileWallpaper.replaceAll("HKEY_CURRENT_USER\\Control Panel\\Desktop\r\n    TileWallpaper    REG_SZ    ", "")
    tileWallpaper = tileWallpaper.replaceAll("\r\n", "")
    for (let i = 0; i < FILL_MODEL.length; i++) {
        // @ts-ignore
        if (FILL_MODEL[i][0] == Number(wallpaperStyle) && FILL_MODEL[i][1] == Number(tileWallpaper)) {
            return i;
        }
    }
    return 3;
}

export {
    setPosition,
    getPosition,
    setBackgroundColor,
    getBackgroundColor
}
