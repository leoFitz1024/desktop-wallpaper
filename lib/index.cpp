#include <napi.h>
#include <ShObjIdl.h>
#include <iostream>

using namespace Napi;

IDesktopWallpaper *desktopWallpaper = nullptr;

IDesktopWallpaper *initDesktopWallpaper() {
    CoInitialize(nullptr);
    CoCreateInstance(CLSID_DesktopWallpaper, nullptr, CLSCTX_ALL, IID_IDesktopWallpaper, (void **) &desktopWallpaper);
    return desktopWallpaper;
}

void releaseDesktopWallpaper() {
    if (desktopWallpaper) {
        desktopWallpaper->Release();
        desktopWallpaper = nullptr;
    }
    CoUninitialize();
}


Napi::Value setWallpaper(const Napi::CallbackInfo &info) {
    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsString()) {
        Napi::TypeError::New(info.Env(),
                             "Invalid arguments. Expected: screenIndex (number), imagePath (string).").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
    initDesktopWallpaper();
    int screenIndex = info[0].As<Napi::Number>().Int32Value();
    std::u16string imagePathUtf16 = info[1].As<Napi::String>().Utf16Value();

    // Convert std::u16string to std::wstring
    std::wstring imagePath(imagePathUtf16.begin(), imagePathUtf16.end());

    HRESULT hr;
    if (screenIndex < 0) {
        hr = desktopWallpaper->SetWallpaper(nullptr, imagePath.c_str());
    } else {
        LPWSTR monitorID = nullptr;
        desktopWallpaper->GetMonitorDevicePathAt(screenIndex, &monitorID);
        hr = desktopWallpaper->SetWallpaper(monitorID, imagePath.c_str());
    }

    releaseDesktopWallpaper();
    if (SUCCEEDED(hr)) {
        return Napi::Boolean::New(info.Env(), true);
    } else {
        Napi::Error::New(info.Env(), "Failed to set wallpaper.").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
}

Napi::Value getWallpaper(const Napi::CallbackInfo &info) {
    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(info.Env(),
                             "Invalid argument. Expected: screenIndex (number).").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
    initDesktopWallpaper();

    int screenIndex = info[0].As<Napi::Number>().Int32Value();
    LPWSTR monitorID = nullptr;
    desktopWallpaper->GetMonitorDevicePathAt(screenIndex, &monitorID);

    LPWSTR wallpaperPath = nullptr;
    HRESULT hr = desktopWallpaper->GetWallpaper(monitorID, &wallpaperPath);

    releaseDesktopWallpaper();
    if (SUCCEEDED(hr)) {
        Napi::Value result = Napi::String::New(info.Env(), reinterpret_cast<const char16_t *>(wallpaperPath));
        CoTaskMemFree(wallpaperPath);
        return result;
    } else {
        Napi::Error::New(info.Env(), "Failed to get wallpaper.").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
}

Napi::Value setPosition(const Napi::CallbackInfo &info) {
    if (info.Length() < 1 || !info[0].IsNumber()) {
        Napi::TypeError::New(info.Env(),
                             "Invalid arguments. Expected: fillMode (number).").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
    initDesktopWallpaper();
    DESKTOP_WALLPAPER_POSITION fillMode = (DESKTOP_WALLPAPER_POSITION)info[0].As<Napi::Number>().Int32Value();
    HRESULT hr = desktopWallpaper->SetPosition(fillMode);
    releaseDesktopWallpaper();
    if (SUCCEEDED(hr)) {
        return Napi::Boolean::New(info.Env(), true);
    } else {
        Napi::Error::New(info.Env(), "Failed to set position.").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
}

Napi::Value getPosition(const Napi::CallbackInfo &info) {
    initDesktopWallpaper();
    DESKTOP_WALLPAPER_POSITION position;
    HRESULT hr = desktopWallpaper->GetPosition(&position);
    releaseDesktopWallpaper();
    if (SUCCEEDED(hr)) {
        return Napi::Number::New(info.Env(), position);
    } else {
        Napi::Error::New(info.Env(), "Failed to get position.").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
}

Napi::Value setBackgroundColor(const Napi::CallbackInfo& info) {
    if (info.Length() < 3 || !info[0].IsNumber() || !info[1].IsNumber() || !info[2].IsNumber()) {
        Napi::TypeError::New(info.Env(), "Invalid arguments. Expected: RGB COLOR (8,8,8).").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
    initDesktopWallpaper();
    int R = info[0].As<Napi::Number>().Int32Value();
    int G = info[1].As<Napi::Number>().Int32Value();
    int B = info[2].As<Napi::Number>().Int32Value();
    COLORREF color = RGB(R, G, B);
    HRESULT hr =  desktopWallpaper->SetBackgroundColor(color);
    releaseDesktopWallpaper();
    if (SUCCEEDED(hr)) {
        return Napi::Boolean::New(info.Env(), true);
    } else {
        Napi::Error::New(info.Env(), "Failed to set background color.").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
}

Napi::Value getBackgroundColor(const Napi::CallbackInfo& info) {
    initDesktopWallpaper();

    COLORREF color;
    HRESULT hr =   desktopWallpaper->GetBackgroundColor(&color);
    int r = GetRValue(color);
    int g = GetGValue(color);
    int b = GetBValue(color);

    std::string result = std::to_string(r) + "," + std::to_string(g) + "," + std::to_string(b);
    releaseDesktopWallpaper();
    if (SUCCEEDED(hr)) {
        return Napi::String::New(info.Env(), result);
    } else {
        Napi::Error::New(info.Env(), "Failed to get background color.").ThrowAsJavaScriptException();
        return info.Env().Undefined();
    }
}

//
//Napi::Value setSlideShowOptions(const Napi::CallbackInfo& info) {
//    initDesktopWallpaper();
//    auto options = info[1].As<Napi::Object>();
//
//    auto folderPath = options.Get("folderPath").As<Napi::String>().Utf16Value();
//    IShellItemArray items = CreateShellItemArrayFromFolderPath(folderPath);
//    HRESULT hr = pDesktopWallpaper->SetSlideshow(items.Get());
//    if (!SUCCEEDED(hr)) {
//        Napi::Error::New(info.Env(), "Failed to set slide show folder.").ThrowAsJavaScriptException();
//        return info.Env().Undefined();
//    }
//    auto mode = (DESKTOP_SLIDESHOW_OPTIONS)options.Get("mode").As<Napi::Number>().Int32Value();
//    auto slideshowTick = options.Get("slideshowTick").As<Napi::Number>().Int64Value();
//    hr = desktopWallpaper->SetSlideshowOptions(mode, slideshowTick);
//    releaseDesktopWallpaper();
//    if (SUCCEEDED(hr)) {
//        return Napi::Boolean::New(info.Env(), true);
//    } else {
//        Napi::Error::New(info.Env(), "Failed to set slide show options.").ThrowAsJavaScriptException();
//        return info.Env().Undefined();
//    }
//}
//
//Napi::Value getSlideShowOptions(const Napi::CallbackInfo& info) {
//    initDesktopWallpaper();
//    int mode;
//    long slideshowTick;
//    IShellItemArray pItemArray;
//    HRESULT hr = pDesktopWallpaper->GetSlideshow(&pItemArray);
//    if (!SUCCEEDED(hr)) {
//        Napi::Error::New(info.Env(), "Failed to get slide show folder.").ThrowAsJavaScriptException();
//        return info.Env().Undefined();
//    }
//    DWORD count;
//    pItemArray->GetCount(&count);
//    PWSTR pszFilePath;
//    for (DWORD i = 0; i < count; i++) {
//        IShellItem pItem;
//        pItemArray->GetItemAt(i, &pItem);
//        pItem->GetDisplayName(SIGDN_FILESYSPATH, &pszFilePath);
//    }
//    hr = desktopWallpaper->GetSlideshowOptions(reinterpret_cast<DESKTOP_SLIDESHOW_OPTIONS *>(&mode),
//    reinterpret_cast<UINT *>(&slideshowTick));
//    releaseDesktopWallpaper();
//    if (SUCCEEDED(hr)) {
//        Napi::Object result = Napi::Object::New(info.Env());
//        result.Set("folderPath", pszFilePath);
//        result.Set("mode", mode);
//        result.Set("slideshowTick", slideshowTick);
//        return result;
//    } else {
//        Napi::Error::New(info.Env(), "Failed to get slide show options.").ThrowAsJavaScriptException();
//        return info.Env().Undefined();
//    }
//}
//
//Napi::Value getSlideShowStatus(const Napi::CallbackInfo& info) {
//    initDesktopWallpaper();
//    DESKTOP_SLIDESHOW_STATE status;
//    HRESULT hr = desktopWallpaper->GetStatus(&status);
//    releaseDesktopWallpaper();
//    if (SUCCEEDED(hr)) {
//        return Napi::Number::New(info.Env(), status);
//    } else {
//        Napi::Error::New(info.Env(), "Failed to get slide show status.").ThrowAsJavaScriptException();
//        return info.Env().Undefined();
//    }
//}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(Napi::String::New(env, "setWallpaper"), Napi::Function::New(env, setWallpaper));
    exports.Set(Napi::String::New(env, "getWallpaper"), Napi::Function::New(env, getWallpaper));
    exports.Set(Napi::String::New(env, "getPosition"), Napi::Function::New(env, getPosition));
    exports.Set(Napi::String::New(env, "setPosition"), Napi::Function::New(env, setPosition));
    exports.Set(Napi::String::New(env, "getBackgroundColor"), Napi::Function::New(env, getBackgroundColor));
    exports.Set(Napi::String::New(env, "setBackgroundColor"), Napi::Function::New(env, setBackgroundColor));
//    exports.Set(Napi::String::New(env, "getSlideShowOptions"), Napi::Function::New(env, getSlideShowOptions));
//    exports.Set(Napi::String::New(env, "setSlideShowOptions"), Napi::Function::New(env, setSlideShowOptions));
//    exports.Set(Napi::String::New(env, "getSlideShowStatus"), Napi::Function::New(env, getSlideShowStatus));

    return exports;
}

NODE_API_MODULE(addon, Init);
