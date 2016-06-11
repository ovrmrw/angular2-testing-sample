import { Page1Component } from '../page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, xit, async, beforeEach, beforeEachProviders, inject, fakeAsync, tick, flushMicrotasks, clearPendingTimers } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';

describe('Page1Component test ' + '-'.repeat(40), () => {
  let page1ComponentFix: Promise<ComponentFixture<Page1Component>>;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    page1ComponentFix = tcb.createAsync(Page1Component);
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
        const el = fixture.nativeElement as HTMLDocument;
        assert(el.querySelector('h4').innerHTML === '');
        fixture.detectChanges();
        assert(el.querySelector('h4').innerHTML === 'page1 content.');
      });
  }));

  it('counter should have number: "0"', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLDocument;
        assert(el.querySelector('h2').innerHTML === '');
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '0');
      });
  }));

  it('counter should be incremented correctly', async(() => {
    page1ComponentFix
      .then(fixture => {
        const instance = fixture.componentRef.instance;
        const el = fixture.nativeElement as HTMLDocument;
        const de = fixture.debugElement;
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '0');
        instance.counter$.subscribe(c => assert(c === 0)).unsubscribe();
        instance.increment();
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '1');
        instance.counter$.subscribe(c => assert(c === 1)).unsubscribe();
        instance.increment();
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '2');
        instance.counter$.subscribe(c => assert(c === 2)).unsubscribe();
      });
  }));

  // xit('text should be shown delayed via async function', fakeAsync(() => {
  //   console.log(page1ComponentFix);

  //   page1ComponentFix
  //     .then(fixture => {
  //       console.log(fixture);
  //       const page1 = fixture.componentRef.instance;
  //       const el = fixture.nativeElement as HTMLDocument;
  //       fixture.detectChanges();
  //       console.log(page1.texts);
  //       assert(page1.texts[0] === 'start async');
  //       assert(el.querySelectorAll('sg-page1 ul li').length === 1);
  //       // tick(2000);
  //       fixture.detectChanges();
  //       assert(page1.texts[2] === 'end async');
  //       assert(el.querySelectorAll('sg-page1 ul li').length === 3);
  //     });
  // }));

});
