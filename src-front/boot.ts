import 'zone.js/dist/zone';
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provideRouter, HashLocationStrategy } from '@ngrx/router';

import { AppComponent, routes } from './app/app.component';


enableProdMode();
bootstrap(AppComponent, [
  provideRouter(routes, HashLocationStrategy)
]);
