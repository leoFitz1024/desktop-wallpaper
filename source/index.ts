import bindings from "bindings";

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
 * Set window wallpaper
 */
const setWallpaper = (screenIndex: number, imagePath: string) => {
  nodeDesktopWallpaper.setWallpaper(screenIndex, imagePath);
};

const getWallpaper = (screenIndex: number):string => {
  return nodeDesktopWallpaper.getWallpaper(screenIndex);
};

const setPosition = (fillMode: number) => {
  nodeDesktopWallpaper.setPosition(fillMode);
};

const getPosition = ():number => {
  return nodeDesktopWallpaper.getPosition();
};

const setBackgroundColor = (r:number, g:number, b:number) => {
  nodeDesktopWallpaper.setBackgroundColor(r, g, b);
};

const getBackgroundColor = ():number => {
  return nodeDesktopWallpaper.getBackgroundColor();
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
