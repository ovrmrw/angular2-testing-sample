declare var Zone: any;
import { provide } from '@angular/core';
import { Page1Component } from '../page1.component';
import { Page1Service } from '../page1.service';
import { Page1ServiceMock } from './page1.service.mock.spec';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import lodash from 'lodash';
import { describe, it, iit, xit, expect, beforeEach, beforeEachProviders, inject, afterEach } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { elements, elementText, setTimeoutPromise, asyncPower, fakeAsyncPower, tick } from '../../../test';


// オリジナルのfakeAsyncだとsetIntervalが元々走っているComponent(Service)をまともにテストできないので少し改造した。
// import { fakeAsync, tick, async } from '../../../test';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    // builder = tcb.overrideProviders(Page1Component, [
    //   provide(Page1Service, { useClass: Page1ServiceMock })
    // ]);
    builder = tcb;
  }));


  it('can create', asyncPower(async () => {
    const fixture = await builder.createAsync(Page1Component);
    assert(!!fixture);
  }));


  it('should have text: "page1 content."', asyncPower(async () => {
    const fixture = await builder.createAsync(Page1Component);
    const el = fixture.nativeElement as HTMLElement;
    const CONTENT = 'h4';

    assert(elementText(el, CONTENT) === '');
    fixture.detectChanges();
    assert(elementText(el, CONTENT) === 'page1 content.');
  }));


  it('counter should have number: "0"', asyncPower(async () => {
    const fixture = await builder.createAsync(Page1Component);
    const el = fixture.nativeElement as HTMLElement;
    const COUNTER = 'h2';

    assert(elementText(el, COUNTER) === '');
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '0');
  }));


  xit('counter should be incremented correctly', asyncPower(async () => {
    const fixture = await builder.createAsync(Page1Component);
    const component = fixture.componentRef.instance;
    const el = fixture.nativeElement as HTMLElement;
    const INCREMENT = '#btnIncrement';
    const COUNTER = 'h2';

    assert(elementText(el, COUNTER) === '');
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '0');

    (<HTMLButtonElement>el.querySelector(INCREMENT)).click(); // component.increment();
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '1');

    (<HTMLButtonElement>el.querySelector(INCREMENT)).click(); // component.increment();
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '2');
  }));

  it('counter should be incremented correctly', fakeAsyncPower(() => {
    let fixture;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const component = fixture.componentRef.instance;
    const el = fixture.nativeElement as HTMLElement;
    const INCREMENT = '#btnIncrement';
    const COUNTER = 'h2';

    assert(elementText(el, COUNTER) === '');
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '0');

    (<HTMLButtonElement>el.querySelector(INCREMENT)).click(); // component.increment();
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '1');

    (<HTMLButtonElement>el.querySelector(INCREMENT)).click(); // component.increment();
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '2');
  }));


  it('texts should be shown delayed via async function', asyncPower(async () => {
    const fixture = await builder.createAsync(Page1Component) as ComponentFixture<Page1Component>;
    const el = fixture.nativeElement as HTMLElement;
    const TEXTS = 'ul li';

    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 1);
    assert(elementText(el, TEXTS, 0) === 'start async');

    await setTimeoutPromise(1000);
    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 3);
    assert(elementText(el, TEXTS, 2) === 'end async');
  }));



  it('exprimental', fakeAsyncPower(() => {
    let fixture;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const TEXTS = 'ul li';

    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 1);
    assert(elementText(el, TEXTS, 0) === 'start async');

    tick(1000);
    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 3);
    assert(elementText(el, TEXTS, 2) === 'end async');
  }));

});
