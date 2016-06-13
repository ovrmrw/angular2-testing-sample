import { Page1Component } from '../page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, xit, async, expect, beforeEach, beforeEachProviders, inject, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let page1ComponentFixturePromise: Promise<ComponentFixture<Page1Component>>;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    page1ComponentFixturePromise = _tcb.createAsync(Page1Component);
  }));

  it('can create', async(() => {
    (async () => {
      const fixture = await page1ComponentFixturePromise;
      assert(!!fixture);
    })();
  }));

  it('should have text: "page1 content."', async(() => {
    (async () => {
      const fixture = await page1ComponentFixturePromise;
      const el = fixture.nativeElement as HTMLElement;
      const contentSelector = 'h4';

      assert(el.querySelector(contentSelector).textContent === '');

      fixture.autoDetectChanges();
      assert(el.querySelector(contentSelector).textContent === 'page1 content.');
    })();
  }));

  it('counter should have number: "0"', async(() => {
    (async () => {
      const fixture = await page1ComponentFixturePromise;
      const el = fixture.nativeElement as HTMLElement;
      const counterSelector = 'h2';

      assert(el.querySelector(counterSelector).textContent === '');

      fixture.autoDetectChanges();
      assert(el.querySelector(counterSelector).textContent === '0');
    })();
  }));

  it('counter should be incremented correctly', async(() => {
    (async () => {
      const fixture = await page1ComponentFixturePromise;
      const component = fixture.componentRef.instance;
      const el = fixture.nativeElement as HTMLElement;
      const buttonSelector = '#btnIncrement';
      const counterSelector = 'h2';

      assert(el.querySelector(counterSelector).textContent === '');

      fixture.autoDetectChanges();
      await setTimeoutPromise(0);
      assert(el.querySelector(counterSelector).textContent === '0');

      (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // component.increment();
      assert(el.querySelector(counterSelector).textContent === '1');

      (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // component.increment();
      assert(el.querySelector(counterSelector).textContent === '2');
    })();
  }));

  it('texts should be shown delayed via async function', async(() => {
    (async () => {
      const fixture = await page1ComponentFixturePromise;
      const el = fixture.nativeElement as HTMLElement;
      const textsSelector = 'ul li';

      fixture.autoDetectChanges();
      await setTimeoutPromise(0);
      assert(el.querySelectorAll(textsSelector).length === 1);
      assert(el.querySelectorAll(textsSelector)[0].textContent === 'start async');

      await setTimeoutPromise(1000);
      assert(el.querySelectorAll(textsSelector).length === 3);
      assert(el.querySelectorAll(textsSelector)[2].textContent === 'end async');
    })();
  }));

});


function setTimeoutPromise(ms: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('***** setTimeout: ' + ms + ' ms *****');
      resolve();
    }, ms);
  });
}