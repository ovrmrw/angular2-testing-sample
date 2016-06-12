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

        assert(el.querySelector(contentSelector).textContent === '');
        fixture.detectChanges();
        assert(el.querySelector(contentSelector).textContent === 'page1 content.');
      });
  }));

  it('counter should have number: "0"', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLElement;
        const counterSelector = 'h2';

        assert(el.querySelector(counterSelector).textContent === '');
        fixture.detectChanges();
        assert(el.querySelector(counterSelector).textContent === '0');
      });
  }));

  it('counter should be incremented correctly', async(() => {
    page1ComponentFix
      .then(fixture => {
        const component = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLElement;
        const buttonSelector = '#btnIncrement';
        const counterSelector = 'h2';

        setTimeout(() => {
          console.log('Second turn of NgZone (?)');
          assert(el.querySelector(counterSelector).textContent === '');
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '0');
          // instance.increment();
          (<HTMLButtonElement>el.querySelector(buttonSelector)).click();
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '1');
          // instance.increment();
          (<HTMLButtonElement>el.querySelector(buttonSelector)).click();
          fixture.detectChanges();
          assert(el.querySelector(counterSelector).textContent === '2');
        }, 0);

        console.log('First turn of NgZone');
      });
  }));

  it('texts should be shown delayed via async function', async(() => {
    page1ComponentFix
      .then(fixture => {
        const instance = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLElement;
        const textsSelector = 'ul li';       

        setTimeout(() => {
          console.log('Second turn of NgZone (?)');
          fixture.detectChanges();
          assert(el.querySelectorAll(textsSelector).length === 1);
          assert(el.querySelectorAll(textsSelector)[0].textContent === 'start async');
          console.log(instance.texts);

          setTimeout(() => {
            console.log('Third turn of NgZone (?)');
            fixture.detectChanges();
            assert(el.querySelectorAll(textsSelector).length === 3);
            assert(el.querySelectorAll(textsSelector)[2].textContent === 'end async');
            console.log(instance.texts);
          }, 1000);
        }, 0);

        console.log('First turn of NgZone');
      });
  }));

});
