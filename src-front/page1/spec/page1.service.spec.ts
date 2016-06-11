import { Page1Service } from '../page1.service';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, async, expect, xit, beforeEach, beforeEachProviders, inject, fakeAsync, tick } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

describe('Page1Service test ' + '-'.repeat(40), () => {
  let service: Page1Service;

  beforeEach(() => {
    service = new Page1Service();
  })

  it('can create', async(() => {
    assert(!!service);
  }));

  it('counter value must be increment correctly', async(() => {
    service.counter$.subscribe(counter => assert(counter === 0)).unsubscribe();
    service.increment(1);
    service.counter$.subscribe(counter => assert(counter === 1)).unsubscribe();
    service.increment(1);
    service.counter$.subscribe(counter => assert(counter === 2)).unsubscribe();
    service.increment(2);
    service.counter$.subscribe(counter => assert(counter === 4)).unsubscribe();
  }));

  it('fakeAsync test', fakeAsync(() => {
    let value = '';
    setTimeout(() => value = 'done', 1000);
    assert(value === '');
    tick(500);
    assert(value === '');
    console.log(value);
    tick(500);
    assert(value !== '');
    console.log(value);
  }));
});
