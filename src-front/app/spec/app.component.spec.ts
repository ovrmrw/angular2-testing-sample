import { AppComponent } from '../app.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import { describe, it, expect, async, beforeEach, beforeEachProviders, inject, injectAsync } from '@angular/core/testing';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';


describe('AppComponent test ' + '-'.repeat(40), () => {
  let appComponentFixturePromise: Promise<ComponentFixture<AppComponent>>;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    appComponentFixturePromise = tcb.createAsync(AppComponent);
  }));

  it('can create', async(() => {
    (async () => {
      const fixture = await appComponentFixturePromise;
      assert(!!fixture);
    })();
  }));

  it('should have text: "top component"', async(() => {
    (async () => {
      const fixture = await appComponentFixturePromise;
      const el = fixture.nativeElement as HTMLElement;

      assert(el.querySelector('h3').innerHTML === '');

      fixture.autoDetectChanges();
      assert(el.querySelector('h3').innerHTML === 'top component');
    })();
  }));

  it('title should be changed', async(() => {
    (async () => {
      const fixture = await appComponentFixturePromise;
      const component = fixture.componentRef.instance;
      const el = fixture.nativeElement as HTMLElement;
      
      component.title = 'changed';

      fixture.detectChanges();
      assert(el.querySelector('h3').innerHTML === 'changed');
    })();
  }));
});


function setTimeoutPromise(ms: number): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('***** setTimeout: ' + ms + ' ms *****');
      resolve();
    }, ms);
  });
}