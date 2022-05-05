# 🚀 My Movies

<img src="https://raw.githubusercontent.com/AsoStrife/My-Movies-F7-Vue/feature/my-movies-vue/resources/demo-app.png" style="zoom:50%;" />

This repository is a part of the **My Movies** App project. 

**My movies** is a simple application to monitor which movies you have seen and which you own in 4k blu ray, blu ray, dvd and vhs. It's open source both Front-End and Back-End repository.

- [AsoStrife/My-Movies-Strapi: Strapi Services for My Movies App (BE)](https://github.com/AsoStrife/My-Movies-Strapi)
- [AsoStrife/My-Movies-F7-Vue (FE)](https://github.com/AsoStrife/My-Movies-F7-Vue)

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production
* 📱 `build-capacitor-ios` - build app and copy it to iOS capacitor project
* 📱 `build-capacitor-android` - build app and copy it to Android capacitor project

## Set the app

Copy `./src/js/constants.tpl.js` in `./src/js/constants.js` and set the following value: 

- **locale**: default language of the app. Default value is `en`
- **fallbackLocale**: If some strings are missing, the app will use fallbackLocale as strings. Default value is `en`
- **supportedLanguages**: contains the supported languages
- **api_key**: api key of themoviedb api. This value is required to search movies online. Check the doc [API Overview — The Movie Database (TMDB) (themoviedb.org)](https://www.themoviedb.org/documentation/api) to know how to create an API KEY.

## i18n 

My Movies supports internationalization natively. 
Inside the `./src/assets/` folder are the files containing the strings of the app. The folder contains one file for each supported language es `en.js`.

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.
## Capacitor

This project created with Capacitor support. And first thing required before start is to add capacitor platforms, run in terminal:

```
npx cap add ios && npx cap add android
```

Check out [official Capacitor documentation](https://capacitorjs.com) for more examples and usage examples.

## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```

## Capacitor Assets

Capacitor assets are located in `resources` folder which is intended to be used with `cordova-res` tool. To generate  mobile apps assets run in terminal:
```
npx cordova-res

npm install -g cordova-res
cordova-res ios --skip-config --copy
cordova-res android --skip-config --copy
```

Folder must have the followings file: 

- Create a `432x432.png` file. Then save it as "icon-background.png". you may decide to make the color transparent or not

- Create another `432x432.png` file and save it as "icon-foreground.png".

```
resources/
├── android/
│   ├── icon-background.png
│   └── icon-foreground.png
├── icon.png
└── splash.png
```



Check out [official cordova-res documentation](https://github.com/ionic-team/cordova-res) for more usage examples.

[Creating Splash Screens and Icons - Capacitor (capacitorjs.com)](https://capacitorjs.com/docs/guides/splash-screens-and-icons)

## Fix Localbase problem "required is not defined"

Inside `localbase/localbase/api/actions/add.js` change the first line of the script with this:
`import UUID from 'ordered-uuid'`

[require is not defined problem when using vite · Issue #57 · dannyconnell/localbase (github.com)](https://github.com/dannyconnell/localbase/issues/57)



# Link

- [API Overview — The Movie Database (TMDB) (themoviedb.org)](https://www.themoviedb.org/documentation/api)
- [Framework7 - Full Featured Framework For Building iOS, Android & Desktop Apps](https://framework7.io/)
- [Vue I18n (kazupon.github.io)](https://kazupon.github.io/vue-i18n/)
- [dannyconnell/localbase: A Firebase-Style Database ... Offline! (github.com)](https://github.com/dannyconnell/localbase)
- [Andrea Corriga (@AsoStrife) • Ph.D. and Software Engineer](https://andreacorriga.com/)
- [Strapi - Open source Node.js Headless CMS 🚀](https://strapi.io/)

