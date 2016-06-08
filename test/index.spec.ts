// テストの宣言ファイルのようなもの？
// 一度書いたらその後はほぼ変更無しだと思う。


// es6 shim
import 'core-js/shim';
import 'babel-polyfill';

// ng2 deps
import "zone.js/dist/zone";
// import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/async-test";
// import 'rxjs/Rx';

import {
  setBaseTestProviders,
  resetBaseTestProviders,
} from "angular2-testing-lite/core";
// } from '@angular/core/testing';

import {
  BROWSER_APP_DYNAMIC_PROVIDERS,
} from "@angular/platform-browser-dynamic";

// import {
//   TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
//   TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
// } from "@angular/platform-browser-dynamic/testing";

import {
  TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
  ADDITIONAL_TEST_BROWSER_PROVIDERS,
} from "@angular/platform-browser/testing/browser_static";


import '../app/app.spec'; // テストしたいTSファイル


resetBaseTestProviders();
setBaseTestProviders(TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, [
  BROWSER_APP_DYNAMIC_PROVIDERS,
  ADDITIONAL_TEST_BROWSER_PROVIDERS
]);
// setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);