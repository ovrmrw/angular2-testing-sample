import { Page1Component } from '../page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, xit, async, expect, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { fakeAsync, tick, discardAllPendingTasks } from '../../fake_async';


describe('Page1Component test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb;
  }));

  it('can create', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    assert(!!fixture);
  }));

  it('should have text: "page1 content."', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const contentSelector = 'h4';

    assert(el.querySelector(contentSelector).textContent === '');
    fixture.detectChanges();
    assert(el.querySelector(contentSelector).textContent === 'page1 content.');
  }));

  it('counter should have number: "0"', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const counterSelector = 'h2';

    assert(el.querySelector(counterSelector).textContent === '');
    fixture.detectChanges();
    assert(el.querySelector(counterSelector).textContent === '0');
  }));

  it('counter should be incremented correctly', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const component = fixture.componentRef.instance;
    const el = fixture.nativeElement as HTMLElement;
    const buttonSelector = '#btnIncrement';
    const counterSelector = 'h2';

    assert(el.querySelector(counterSelector).textContent === '');
    fixture.detectChanges();
    assert(el.querySelector(counterSelector).textContent === '0');

    (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // component.increment();
    tick(1);
    fixture.detectChanges();
    assert(el.querySelector(counterSelector).textContent === '1');

    (<HTMLButtonElement>el.querySelector(buttonSelector)).click(); // component.increment();
    tick(1);
    fixture.detectChanges();
    assert(el.querySelector(counterSelector).textContent === '2');
  }));

  it('texts should be shown delayed via async function', fakeAsync(() => {
    let fixture: ComponentFixture<Page1Component>;
    builder.createAsync(Page1Component).then(f => fixture = f);
    tick();
    const el = fixture.nativeElement as HTMLElement;
    const textsSelector = 'ul li';

    fixture.detectChanges();
    assert(el.querySelectorAll(textsSelector).length === 1);
    assert(el.querySelectorAll(textsSelector)[0].textContent === 'start async');

    tick(1000);
    fixture.detectChanges();
    assert(el.querySelectorAll(textsSelector).length === 3);
    assert(el.querySelectorAll(textsSelector)[2].textContent === 'end async');
  }));

});