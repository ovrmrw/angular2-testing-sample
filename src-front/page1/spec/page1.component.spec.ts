import { Page1Component } from '../page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, xit, async, expect, beforeEach, beforeEachProviders, inject, fakeAsync, tick } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let page1ComponentFix: Promise<ComponentFixture<Page1Component>>;

  beforeEach(inject([TestComponentBuilder], (_tcb: TestComponentBuilder) => {
    page1ComponentFix = _tcb.createAsync(Page1Component);
  }));

  it('can create', async(() => {
    page1ComponentFix
      .then(fixture => {
        assert(!!fixture);
      })
  }));

  it('should have text: "page1 content."', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLElement;
        const contentSelector = 'h4';

        (async () => {
          await setTimeoutPromise(0);
          assert(el.querySelector(contentSelector).textContent === '');
          fixture.detectChanges();
          assert(el.querySelector(contentSelector).textContent === 'page1 content.');
        })();
      });
  }));

  it('counter should have number: "0"', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLElement;
        const counterSelector = 'h2';

        (async () => {
          await setTimeoutPromise(0);
          assert(el.querySelector(counterSelector).textContent === '');
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '0');
        })();
      });
  }));

  it('counter should be incremented correctly', async(() => {
    page1ComponentFix
      .then(fixture => {
        const component = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLElement;
        const buttonSelector = '#btnIncrement';
        const counterSelector = 'h2';

        (async () => {
          await setTimeoutPromise(0); // NgZoneのFirstTurnを抜けてsetIntervalの縛りが外れる(?)
          assert(el.querySelector(counterSelector).textContent === '');
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '0');

          (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // instance.increment();
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '1');

          (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // instance.increment();
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '2');
        })();
      });
  }));

  it('texts should be shown delayed via async function', async(() => {
    page1ComponentFix
      .then(fixture => {
        const instance = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLElement;
        const textsSelector = 'ul li';

        (async () => {
          await setTimeoutPromise(0); // NgZoneのFirstTurnを抜けてsetIntervalの縛りが外れる(?)
          fixture.detectChanges();
          assert(el.querySelectorAll(textsSelector).length === 1);
          assert(el.querySelectorAll(textsSelector)[0].textContent === 'start async');
          console.log(instance.texts);

          await setTimeoutPromise(1000);
          fixture.detectChanges();
          assert(el.querySelectorAll(textsSelector).length === 3);
          assert(el.querySelectorAll(textsSelector)[2].textContent === 'end async');
          console.log(instance.texts);
        })();
      });
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