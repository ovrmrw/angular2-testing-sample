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
import { elements, elementText, setTimeoutPromise } from '../../../test';
declare var Zone: any;

// オリジナルのfakeAsyncだとsetIntervalが元々走っているComponent(Service)をまともにテストできないので少し改造した。
import { fakeAsync, tick, async } from '../../../test';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb.overrideProviders(Page1Component, [
      provide(Page1Service, { useClass: Page1ServiceMock })
    ]);
  }));


  it('can create', (done) => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      assert(!!fixture);
      done();
    })().catch(e => done.fail(e));
  });


  it('should have text: "page1 content."', (done) => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      const el = fixture.nativeElement as HTMLElement;
      const CONTENT = 'h4';

      // expect(elementText(el, CONTENT)).toBe('');
      assert(elementText(el, CONTENT) === '');
      fixture.detectChanges();
      // expect(elementText(el, CONTENT)).toBe('page1 content.');
      assert(elementText(el, CONTENT) === 'page1 content.');
      done();
    })().catch(e => done.fail(e));
  });


  it('counter should have number: "0"', (done) => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      const el = fixture.nativeElement as HTMLElement;
      const COUNTER = 'h2';

      expect(elementText(el, COUNTER)).toBe('');
      fixture.detectChanges();
      expect(elementText(el, COUNTER)).toBe('0');
      done();
    })().catch(e => done.fail(e));
  });


  it('counter should be incremented correctly', (done) => {
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
      done();
    })().catch(e => done.fail(e));
  });


  it('texts should be shown delayed via async function', (done) => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      const el = fixture.nativeElement as HTMLElement;
      const TEXTS = 'ul li';

      fixture.detectChanges();
      expect(elements(el, TEXTS).length).toBe(1);
      expect(elementText(el, TEXTS, 0)).toBe('start async');

      await setTimeoutPromise(1000);
      fixture.detectChanges();
      expect(elements(el, TEXTS).length).toBe(3);
      expect(elementText(el, TEXTS, 2)).toBe('end async');
      done();
    })().catch(e => done.fail(e));
  });

});


