import { AppComponent } from './app.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, expect, async, beforeEach, beforeEachProviders, inject, injectAsync } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { By } from "@angular/platform-browser";


describe('AppComponent test', () => {
  let appComponentFix: Promise<ComponentFixture<AppComponent>>;

  beforeEach(injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    appComponentFix = tcb.createAsync(AppComponent);
  }));

  it("can create", async(() => {
    appComponentFix
      .then(fixture => {
        assert(!!fixture);
      });
  }));

  it("should have text: 'top component'", async(() => {
    appComponentFix
      .then(fixture => {
        const el = fixture.debugElement;
        assert(el.query(By.css('h3')).nativeElement.innerHTML === '');
        fixture.detectChanges();
        assert(el.query(By.css('h3')).nativeElement.innerHTML === 'top component');
      });
  }));

  it("title should be changed", async(() => {
    appComponentFix
      .then(fixture => {
        const instance = fixture.componentRef.instance;
        const el = fixture.debugElement;
        instance.title = 'changed';
        fixture.detectChanges();
        assert(el.query(By.css('h3')).nativeElement.innerHTML === 'changed');
      });
  }));
});