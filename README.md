# TgClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ionic cordova build --release` to build the project. The build artifacts will be stored in the `platforms\android\app\build\outputs\apk\release` directory. Use the `--release` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Releasing the app

First run the ionic build command to generate an unsigned apk. Then run the following command to sign the apk:

    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore tg-key.jks app-release-unsigned.apk tg-key

Then run the zipalign tool to ensure that the app is compatable with the google play store (in the event of issues, the command works when apk is in zipalign folder)

     zipalign -f -v 4 ./app-release-unsigned.apk ./app-release-signed.apk
     (~\AppData\Local\Android\Sdk\build-tools\28.0.3\zipalign.exe -f -v 4 ./app-release-unsigned.apk ./app-release-signed.apk as a full path reference also works, version to taste)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
