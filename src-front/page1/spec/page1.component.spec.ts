import { provide } from '@angular/core';
import { Page1Component } from '../page1.component';
import { Page1Service } from '../page1.service';
import { Page1ServiceMock } from './page1.service.mock.spec';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, iit, xit, async, expect, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { elements, elementText } from '../../../test';


// オリジナルのfakeAsyncだとsetIntervalが元々走っているComponent(Service)をまともにテストできないので少し改造した。
import { fakeAsync, tick } from '../../../test';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb.overrideProviders(Page1Component, [
      provide(Page1Service, { useClass: Page1ServiceMock })
    ]);
  }));


  // setIntervalが検知されてasyncテストは不可。
  it('can create', fakeAsync(() => {
    let fixture;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    assert(!!fixture);
  }));


  // setIntervalが検知されてasyncテストは不可。
  it('should have text: "page1 content."', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const CONTENT = 'h4';

    assert(elementText(el, CONTENT) === '');
    fixture.detectChanges();
    assert(elementText(el, CONTENT) === 'page1 content.');
  }));


  // setIntervalが検知されてasyncテストは不可。
  it('counter should have number: "0"', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const COUNTER = 'h2';

    assert(elementText(el, COUNTER) === '');
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '0');
  }));


  it('counter should be incremented correctly', async(() => {
    (async () => {
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
    })();
  }));


  // setIntervalが検知されてasyncテストは不可。
  it('texts should be shown delayed via async function', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const TEXTS = 'ul li';

    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 1);
    assert(elementText(el, TEXTS, 0) === 'start async');

    tick(1000); // 例えば1000を900に変更するとテストがコケる。まだViewが更新されていないから。
    fixture.detectChanges();
    assert(elements(el, TEXTS).length === 3);
    assert(elementText(el, TEXTS, 2) === 'end async');
  }));

});


