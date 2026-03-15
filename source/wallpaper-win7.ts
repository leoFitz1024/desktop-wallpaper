import * as regUtils from "./reg-util";

const BG_PATH = "HKEY_CURRENT_USER\\Control Panel\\Colors";
const DESKTOP_PATH = "HKEY_CURRENT_USER\\Control Panel\\Desktop";

const parseRegistryValue = (raw: string): string => {
    const lines = raw
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);

    const valueLine = lines.find((line) => line.includes("REG_SZ"));
    if (!valueLine) {
        throw new Error("Failed to parse registry output.");
    }

    return valueLine.split("REG_SZ").pop()?.trim() ?? "";
};

const setBackgroundColor = (r: number, g: number, b: number) => {
    const bgColorStr = `${r} ${g} ${b}`;
    regUtils.addKey(BG_PATH, "Background", bgColorStr);
};

const getBackgroundColor = () => {
    const bgColor = parseRegistryValue(regUtils.queryKey(BG_PATH, "Background"));
    return bgColor.replaceAll(" ", ",");
};

// CENTER - TILE - STRETCH - FIT - FILL - SPAN
const FILL_MODEL: ReadonlyArray<readonly [number, number]> = [
    [0, 0],
    [0, 1],
    [2, 0],
    [6, 0],
    [10, 0],
    [22, 0],
];

const setPosition = (fillMode: number) => {
    const style = FILL_MODEL[fillMode];
    if (!style) {
        throw new RangeError("Invalid fillMode. Expected an integer between 0 and 5.");
    }

    regUtils.addKey(DESKTOP_PATH, "WallpaperStyle", String(style[0]));
    regUtils.addKey(DESKTOP_PATH, "TileWallpaper", String(style[1]));
};

const getPosition = (): number => {
    const wallpaperStyle = Number(parseRegistryValue(regUtils.queryKey(DESKTOP_PATH, "WallpaperStyle")));
    const tileWallpaper = Number(parseRegistryValue(regUtils.queryKey(DESKTOP_PATH, "TileWallpaper")));

    for (let i = 0; i < FILL_MODEL.length; i++) {
        const style = FILL_MODEL[i];
        if (style && style[0] === wallpaperStyle && style[1] === tileWallpaper) {
            return i;
        }
    }

    return 3;
};

export {
    setPosition,
    getPosition,
    setBackgroundColor,
    getBackgroundColor,
};
