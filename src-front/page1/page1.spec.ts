import { Page1Component } from './page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, xit, expect, async, beforeEach, injectAsync } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';


describe('Page1Component test', () => {
  let page1ComponentFix: Promise<ComponentFixture<Page1Component>>;

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    page1ComponentFix = tcb.createAsync(Page1Component);
  }));

  it('can create', async(() => {
    page1ComponentFix
      .then(fixture => {
        assert(!!fixture);
      });
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
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '0');
        instance.increment();
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '1');
        instance.increment();
        fixture.detectChanges();
        assert(el.querySelector('h2').innerHTML === '2');
      });
  }));

  xit('text should be shown delayed via async function', async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.nativeElement as HTMLDocument;
        // TODO:ここで1秒待つ
        assert(el.querySelectorAll('sg-page1 ul li').length === 1);
        // TODO:ここで2秒待つ        
        assert(el.querySelectorAll('sg-page1 ul li').length === 3);
      });
  }));

});