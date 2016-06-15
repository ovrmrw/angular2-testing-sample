import { Page1Component } from '../page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, xit, async, expect, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { fakeAsync, tick } from '../../fake_async';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], tcb => {
    builder = tcb;
  }));

  it('can create', () => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      assert(!!fixture);
    })();
  });

  it('should have text: "page1 content."', () => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      const el = fixture.nativeElement as HTMLElement;
      const contentSelector = 'h4';

      assert(elementText(el, contentSelector) === '');
      fixture.detectChanges();
      assert(elementText(el, contentSelector) === 'page1 content.');
    })();
  });

  it('counter should have number: "0"', () => {
    (async () => {
      const fixture = await builder.createAsync(Page1Component);
      const el = fixture.nativeElement as HTMLElement;
      const counterSelector = 'h2';

      assert(elementText(el, counterSelector) === '');
      fixture.detectChanges();
      assert(elementText(el, counterSelector) === '0');
    })();
  });

  it('counter should be incremented correctly', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const component = fixture.componentRef.instance;
    const el = fixture.nativeElement as HTMLElement;
    const buttonSelector = '#btnIncrement';
    const counterSelector = 'h2';

    assert(elementText(el, counterSelector) === '');
    fixture.detectChanges();
    assert(elementText(el, counterSelector) === '0');

    (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // component.increment();
    tick(1);
    fixture.detectChanges();
    assert(elementText(el, counterSelector) === '1');

    (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // component.increment();
    tick(1);
    fixture.detectChanges();
    assert(elementText(el, counterSelector) === '2');
  }));

  it('texts should be shown delayed via async function', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const textsSelector = 'ul li';

    fixture.detectChanges();
    assert(elements(el, textsSelector).length === 1);
    assert(elementText(el, textsSelector, 0) === 'start async');

    tick(1000);
    fixture.detectChanges();
    assert(elements(el, textsSelector).length === 3);
    assert(elementText(el, textsSelector, 2) === 'end async');
  }));

});


function elementText(element: HTMLElement, selectors: string, index: number = 0): string {
  return element.querySelectorAll(selectors)[index].textContent;
}


function elements(element: HTMLElement, selectors: string): NodeListOf<Element> {
  return element.querySelectorAll(selectors);
}