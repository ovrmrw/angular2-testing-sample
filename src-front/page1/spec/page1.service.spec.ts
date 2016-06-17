import { Page1Service } from '../page1.service';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, xdescribe, it, iit, async, expect, xit, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

describe('Page1Service test ' + '-'.repeat(40), () => {
  let service: Page1Service;

  beforeEachProviders(() => [Page1Service]);


  beforeEach(inject([Page1Service], _service => {
    service = _service;
  }));


  it('can create', async(() => {
    assert(!!service);
  }));


  // このテストはfakeAsyncテストでは通らない。asyncテストでもsetTimeoutしないと通らない。
  // ServiceからsetInterval(Observable.timer)を取り除けばこんなややこしいことをしなくてもテストが通る。
  it('counter value must be increment correctly', async(() => {
    (async () => {
      await setTimeoutPromise(0, true); // setTimeoutしてzoneのfirst turnから抜けた状態じゃないと下記のテストは通らない。
      assert(observableValue(service.counter$) === 0);
      service.increment(1);
      assert(observableValue(service.counter$) === 1);
      service.increment(1);
      assert(observableValue(service.counter$) === 2);
      service.increment(2);
      assert(observableValue(service.counter$) === 4);
    })();
  }));


  // らこさんエディション
  it('counter value must be increment correctly by @laco', async(() => {
    let value: number;
    service.counter$.subscribe(counter => value = counter);
    setTimeout(() => {
      service.increment(1);
      assert(value === 1);
      service.increment(1);
      assert(value === 2);
      service.increment(2);
      assert(value === 4);
    }, 0);
  }));


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
        console.log('***** setTimeout for forwarding Zone\'s turn: ' + ms + ' ms *****');
      } else {
        console.log('***** setTimeout: ' + ms + ' ms *****');
      }
      resolve();
    }, ms);
  });
}


function observableValue<T>(obs: Observable<T>): T {
  let _value: any;
  obs.subscribe(value => _value = value).unsubscribe(); // unsubscribeしないとsubscriptionが生き続けて処理の邪魔をする。
  return _value;
}