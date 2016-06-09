import { Page1Component } from './page1.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, expect, async, beforeEach, injectAsync } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { By } from "@angular/platform-browser";


describe('Page1Component test', () => {
  let page1ComponentFix: Promise<ComponentFixture<Page1Component>>;

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    page1ComponentFix = tcb.createAsync(Page1Component);
  }));

  it("can create", async(() => {
    page1ComponentFix
      .then(fixture => {
        assert(!!fixture);
      });
  }));

  it("should has text: 'page1 content'", async(() => {
    page1ComponentFix
      .then(fixture => {
        const el = fixture.debugElement;
        assert(el.query(By.css('h4')).nativeElement.innerHTML === '');
        fixture.detectChanges();
        assert(el.query(By.css('h4')).nativeElement.innerHTML === 'page1 content');
      });
  }));

});