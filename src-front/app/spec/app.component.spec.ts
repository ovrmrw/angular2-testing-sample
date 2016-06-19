import { AppComponent } from '../app.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, expect, async, beforeEach, beforeEachProviders, inject } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { elementText } from '../../../test';


describe('AppComponent test ' + '-'.repeat(40), () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], tcb => {
    builder = tcb;
  }));


  it('can create', async(() => {
    (async () => {
      const fixture = await builder.createAsync(AppComponent);
      assert(!!fixture);
    })();
  }));


  it('should have text: "top component"', async(() => {
    (async () => {
      const fixture = await builder.createAsync(AppComponent) as ComponentFixture<AppComponent>;
      const el = fixture.nativeElement as HTMLElement;

      assert(elementText(el, 'h3') === '');
      fixture.autoDetectChanges();
      assert(elementText(el, 'h3') === 'top component');
    })();
  }));


  it('title should be changed', async(() => {
    (async () => {
      const fixture = await builder.createAsync(AppComponent) as ComponentFixture<AppComponent>;
      const component = fixture.componentRef.instance;
      const el = fixture.nativeElement as HTMLElement;

      component.title = 'changed';

      fixture.detectChanges();
      assert(elementText(el, 'h3') === 'changed');
    })();
  }));
});
