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
        console.log(fixture.isStable());
        assert(!!fixture);
      })
  }));

  it('should have text: "page1 content."', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLElement;
        assert(el.querySelector('h4').textContent === '');
        fixture.detectChanges();
        assert(el.querySelector('h4').textContent === 'page1 content.');
      });
  }));

  it('counter should have number: "0"', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLElement;
        assert(el.querySelector('h2').textContent === '');
        fixture.detectChanges();
        assert(el.querySelector('h2').textContent === '0');
      });
  }));

  it('counter should be incremented correctly', async(() => {
    page1ComponentFix
      .then(fixture => {
        const instance = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLElement;

        setTimeout(() => {
          console.log('Second turn of NgZone (?)');
          assert(el.querySelector('h2').textContent === '');
          fixture.detectChanges();
          assert(el.querySelector('h2').textContent === '0');
          instance.increment();
          fixture.detectChanges();
          assert(el.querySelector('h2').textContent === '1');
          instance.increment();
          fixture.detectChanges();
          assert(el.querySelector('h2').textContent === '2');
        }, 0);

        console.log('First turn of NgZone');
      });
  }));

  it('texts should be shown delayed via async function', async(() => {
    page1ComponentFix
      .then(fixture => {
        const instance = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLElement;

        setTimeout(() => {
          console.log('Second turn of NgZone (?)');
          fixture.detectChanges();
          assert(el.querySelectorAll('ul li').length === 1);
          assert(el.querySelectorAll('ul li')[0].textContent === 'start async');
          console.log(instance.texts);
        }, 0);

        setTimeout(() => {
          console.log('Third turn of NgZone (?)');
          fixture.detectChanges();
          assert(el.querySelectorAll('ul li').length === 3);
          assert(el.querySelectorAll('ul li')[2].textContent === 'end async');
          console.log(instance.texts);
        }, 2000);

        console.log('First turn of NgZone');
      });
  }));

});
