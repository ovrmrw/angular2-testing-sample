import { AppComponent } from './app.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
import {inject, async, TestComponentBuilder} from 'angular2-testing-lite/core';
import {describe, it, xit, beforeEach} from 'angular2-testing-lite/mocha';
import {By} from "@angular/platform-browser";


// テストの書き方とかよく知らないので中身は適当です。
describe('AppComponent', () => {
  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    builder = tcb.overrideProviders(AppComponent, []);
  }));

  it("can create", async(() => {
    builder.createAsync(AppComponent)
      .then(fixture => {
        assert(!!fixture);
      });
  }));

  it("should has text: 'My First Angular 2 App'", inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    return tcb.createAsync(AppComponent).then(fixture => {
      const el = fixture.nativeElement;
      fixture.detectChanges();
      assert(el.querySelectorAll('h1').length === 1);
      assert(el.querySelector('h1').innerHTML === "My First Angular 2 App");
    });
  }));

  it("should has text: 'My Test'", async(() => {
    builder.createAsync(AppComponent)
      .then(fixture => {
        let el = fixture.debugElement;
        assert(el.query(By.css("p")).nativeElement.innerHTML === "My Test");
      });
  }));

  it("should equal", async(() => {
    let app = new AppComponent();
    let num = app.getNumber();
    assert(num === 100);
  }));
});