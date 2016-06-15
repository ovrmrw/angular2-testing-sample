import { Page1Component } from '../page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, iit, xit, async, expect, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { fakeAsync, tick } from '../../fake_async';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], tcb => {
    builder = tcb;
  }));


  it('can create', fakeAsync(() => {
    let fixture;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    assert(!!fixture);
  }));


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


  it('counter should be incremented correctly', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
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
    tick(1);
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '1');

    (<HTMLButtonElement>el.querySelector(INCREMENT)).click(); // component.increment();
    tick(1);
    fixture.detectChanges();
    assert(elementText(el, COUNTER) === '2');
  }));


  it('texts should be shown delayed via async function', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
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


function elementText(element: HTMLElement, selectors: string, index: number = 0): string {
  return element.querySelectorAll(selectors)[index].textContent;
}


function elements(element: HTMLElement, selectors: string): NodeListOf<Element> {
  return element.querySelectorAll(selectors);
}