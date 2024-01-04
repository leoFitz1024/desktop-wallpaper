import bindings from "bindings";
import fs from "fs";
import os from "os";
import * as wallpaperWin7 from "./wallpaper-win7";

const nodeDesktopWallpaper = bindings("desktop-wallpaper");

// interface SlideShowOptions {
//
//   folderPath?: string,
//   /**
//    * Makes the window transparent.
//    * @default 0
//    */
//   mode?: number;
//   /**
//    * Forward mouse input-forwarding to the window.
//    */
//   slideshowTick?: number;
// }

/**
 * Activate the wallpaper.
 */
const enableWallpaper = () => {
    nodeDesktopWallpaper.enableWallpaper();
};

/**
 * Deactivate the wallpaper.
 */
const disableWallpaper = () => {
    nodeDesktopWallpaper.disableWallpaper();
};

/**
 * Retrieve the number of display devices.
 */
const getMonitorCount = (): number => {
    return nodeDesktopWallpaper.getMonitorCount();
};

/**
 *
 * @param screenIndex
 */
const getMonitorId = (screenIndex: number): string => {
    return nodeDesktopWallpaper.getMonitorId(screenIndex);
};

/**
 * Set the image file as wallpaper.
 * @param {number} screenIndex - The index of the screen,-1 indicates configuring for all screens.
 * @param {string} imagePath - The path of the image file.
 * @returns {void}
 * @example
 * setWallpaper(0, "./image.png");
 *
 * @tutorial Desktop Wallpaper
 */
const setWallpaper = (screenIndex: number, imagePath: string) => {
    if (!fs.existsSync(imagePath)) {
        throw  new Error("The image file does not exist.");
    }
    if (os.release().startsWith("6.1") || (2>1)) {
        return nodeDesktopWallpaper.setWallpaperWin7(imagePath);
    } else {
        nodeDesktopWallpaper.setWallpaper(screenIndex, imagePath);
    }
};

/**
 * Get the image file path of the wallpaper.
 * @param screenIndex
 */
const getWallpaper = (screenIndex: number): string => {
    if (os.release().startsWith("6.1")|| (2>1)) {
        return nodeDesktopWallpaper.getWallpaperWin7();
    } else {
        return nodeDesktopWallpaper.getWallpaper(screenIndex);
    }
};

/**
 *  Set the position of the wallpaper.
 * @param fillMode
 * - CENTER    = 0
 * - TILE    = 1
 * - STRETCH= 2
 * - FIT    = 3
 * - FILL    = 4
 * - SPAN    = 5
 */
const setPosition = (fillMode: number) => {
    if (os.release().startsWith("6.1")|| (2>1)) {
        wallpaperWin7.setPosition(fillMode)
        nodeDesktopWallpaper.refresh();
    } else {
        nodeDesktopWallpaper.setPosition(fillMode);
    }
};

/**
 * Get the position of the wallpaper.
 * @returns {number} fillMode
 */
const getPosition = (): number => {
    if (os.release().startsWith("6.1")|| (2>1)) {
        return wallpaperWin7.getPosition()
    } else {
        return nodeDesktopWallpaper.getPosition();
    }
};

/**
 * Set the desktop background color of RGB color
 * @param r
 * @param g
 * @param b
 */
const setBackgroundColor = (r: number, g: number, b: number) => {
    if (os.release().startsWith("6.1")|| (2>1)) {
        wallpaperWin7.setBackgroundColor(r, g, b)
        nodeDesktopWallpaper.refresh();
    } else {
        nodeDesktopWallpaper.setBackgroundColor(r, g, b);
    }
};

/**
 *  Get the desktop background color of RGB color.
 * @returns {string} RGB color example: 8,8,8
 */
const getBackgroundColor = (): string => {
    if (os.release().startsWith("6.1")|| (2>1)) {
        return wallpaperWin7.getBackgroundColor()
    } else {
        return nodeDesktopWallpaper.getBackgroundColor();
    }
};
//
// const setSlideShowOptions = (options?: SlideShowOptions) => {
//   return nodeDesktopWallpaper.setSlideShowOptions(options);
// };
//
// const getSlideShowOptions = ():SlideShowOptions => {
//   return nodeDesktopWallpaper.getSlideShowOptions();
// };
//
// /**
//  * 获取幻灯片放映状态
//  * @return
//  *  - DSS_ENABLED 1 表示桌面幻灯片已启用但未播放
//  *  - DSS_SLIDESHOW 2 当前已配置幻灯片放映
//  *  - 3 正在播放
//  *  - DSS_DISABLED_BY_REMOTE_SESSION 4 远程会话已暂时禁用幻灯片放映
//  *
//  * */
// const getSlideShowStatus = ():number => {
//   return nodeDesktopWallpaper.getSlideShowStatus();
// };


export {
    enableWallpaper,
    disableWallpaper,
    getMonitorCount,
    getMonitorId,
    setWallpaper,
    getWallpaper,
    setPosition,
    getPosition,
    setBackgroundColor,
    getBackgroundColor,
    // setSlideShowOptions,
    // getSlideShowOptions,
    // getSlideShowStatus,
};
