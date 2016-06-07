// テストの宣言ファイルのようなもの？
// 一度書いたらその後はほぼ変更無しだと思う。


// es6 shim
import "core-js/shim";

// ng2 deps
import 'rxjs/Rx';
import "zone.js/dist/zone";
import "zone.js/dist/long-stack-trace-zone";
import "zone.js/dist/async-test";

import {
  setBaseTestProviders,
  resetBaseTestProviders,
} from "angular2-testing-lite/core";

import {
  BROWSER_APP_DYNAMIC_PROVIDERS
} from "@angular/platform-browser-dynamic";

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