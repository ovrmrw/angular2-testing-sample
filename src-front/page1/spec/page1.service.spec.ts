declare var Zone: any;
import { Page1Service } from '../page1.service';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, xdescribe, it, iit, async, expect, xit, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { setTimeoutPromise, observableValue, asyncPower, fakeAsyncPower, tick, fakeAsync, ticker } from '../../../test';


describe('Page1Service test ' + '-'.repeat(40), () => {
  let service: Page1Service;

  beforeEachProviders(() => [
    Page1Service,
  ]);


  beforeEach(inject([Page1Service], _service => {
    service = _service;
  }));


  it('can create', asyncPower(async () => {
    assert(!!service);
  }));


  // このテストはfakeAsyncテストでは通らない。asyncテストでもsetTimeoutしないと通らない。
  // ServiceからsetInterval(Observable.timer)を取り除けばこんなややこしいことをしなくてもテストが通る。
  it('counter value must be increment correctly', asyncPower(async () => {
    await setTimeoutPromise(0, true); // setTimeoutしてzoneのfirst turnから抜けた状態じゃないと下記のテストは通らない。    
    assert(observableValue(service.counter$) === 0);
    service.increment(1);
    assert(observableValue(service.counter$) === 1);
    service.increment(1);
    assert(observableValue(service.counter$) === 2);
    service.increment(2);
    assert(observableValue(service.counter$) === 4);
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


  iit('exprimental', fakeAsync(() => {
    setTimeout(() => { }, 1000 * 10);
    let valueList: number[] = [];
    console.log(Zone.current.name);
    console.log(Zone.current.parent.name);
    const zone = Zone.current.fork({ name: 'second zone' });
    // zone.run(() => {
    // zone.runGuarded(() => {
      service.counter$.subscribe(counter => valueList.push(counter), err => console.log(err), () => console.log('complete'));
      // service.increment(1);
      // service.increment(1);
      service.inCounter$.next(1);
      service.inCounter$.next(1);
      service.increment(1);
      service.increment(1);
    // });
    // });
    ticker();

    console.log(valueList);

    // assert(value === 1);
    // zone.run(() => {
    new Promise(resolve => {
      service.increment(1);
      resolve();
    });
    // });
    ticker();
    console.log(valueList);

    // assert(value === 2);
    service.increment(2);
    console.log(valueList);
    // }, 0);

    // assert(value === 4);
    // testZoneSpec.tick();
    // const el = fixture.nativeElement as HTMLElement;
    // const TEXTS = 'ul li';

    // fixture.detectChanges();
    // assert(elements(el, TEXTS).length === 1);
    // assert(elementText(el, TEXTS, 0) === 'start async');

    // testZoneSpec.tick(900);
    // // await setTimeoutPromise(1000);
    // fixture.detectChanges();
    // assert(elements(el, TEXTS).length === 3);
    // assert(elementText(el, TEXTS, 2) === 'end async');
    console.log(3);

    zone.runGuarded(() => {
      setTimeout(() => {
        assert.deepEqual(valueList, [0, 1, 2, 3, 4]);
      }, 0);
    });
    ticker();
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



