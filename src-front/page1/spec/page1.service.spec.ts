import { Page1Service } from '../page1.service';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, xdescribe, it, async, expect, xit, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { fakeAsync, tick } from '../../fake_async';


describe('Page1Service test ' + '-'.repeat(40), () => {
  let service: Page1Service;

  beforeEach(() => {
    service = new Page1Service();
  })

  it('can create', () => {
    assert(!!service);
  });

  it('counter value must be increment correctly', () => {
    (async () => {
      await setTimeoutPromise(0, true); // setTimeoutしてzoneのfirst turnから抜けた状態じゃないと下記のテストは通らない。
      service.counter$.subscribe(counter => assert(counter === 0)).unsubscribe();
      service.increment(1);
      service.counter$.subscribe(counter => assert(counter === 1)).unsubscribe();
      service.increment(1);
      service.counter$.subscribe(counter => assert(counter === 2)).unsubscribe();
      service.increment(2);
      service.counter$.subscribe(counter => assert(counter === 4)).unsubscribe();
    })();
  });

  // it('fakeAsync test', fakeAsync(() => {
  //   let value = '';
  //   setTimeout(() => value = 'done', 1000);
  //   assert(value === '');
  //   tick(500);
  //   assert(value === '');
  //   console.log(value);
  //   tick(500);
  //   assert(value !== '');
  //   console.log(value);
  // }));
});


function setTimeoutPromise(ms: number, forNextTurn: boolean = false): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (forNextTurn) {
        console.log('***** setTimeout for forwarding turn of zone: ' + ms + ' ms *****');
      } else {
        console.log('***** setTimeout: ' + ms + ' ms *****');
      }
      resolve();
    }, ms);
  });
}