import 'core-js/shim';
import 'babel-polyfill';

import 'zone.js/dist/zone';
// import 'zone.js/dist/sync-test'; // 多分要らない
import 'zone.js/dist/async-test'; // おそらくasyncを使う場合に必要。
import 'zone.js/dist/fake-async-test'; // fakeAsyncを使う場合は必要。

import { setBaseTestProviders } from '@angular/core/testing';

import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);


import '../src-front/specs.ref'; // テストしたいTSファイル
