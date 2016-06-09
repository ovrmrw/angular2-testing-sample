import 'core-js/shim';
import 'babel-polyfill';

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';

import { setBaseTestProviders } from '@angular/core/testing';

import {
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS,
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);


import '../src-front/specs.ref'; // テストしたいTSファイル
