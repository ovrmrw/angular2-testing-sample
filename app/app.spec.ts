import { AppComponent } from './app.component';


/**
 *  ===== testing world =====
 */
import assert from 'power-assert';
// import {inject, async, TestComponentBuilder} from 'angular2-testing-lite/core';
// import {describe, it, xit, beforeEach, beforeEachProviders} from 'angular2-testing-lite/mocha';
// import chai from 'chai';
// const expect = chai.expect;
import { beforeEachProviders, describe, expect, it, async, inject, beforeEach, injectAsync } from '@angular/core/testing';
import { TestComponentBuilder} from '@angular/compiler/testing';
import { By } from "@angular/platform-browser";

// テストの書き方とかよく知らないので中身は適当です。
describe('AppComponent', () => {
  let tcb: TestComponentBuilder;

  beforeEachProviders(() => [TestComponentBuilder]);

  beforeEach(injectAsync([TestComponentBuilder], _tcb => {
    tcb = _tcb;
  }));

  it("can create", done => {
    tcb.createAsync(AppComponent).then(fixture => {
      assert(!!fixture);
      done();
    });
  });

  it("should has text: 'My First Angular 2 App'", done => {
    tcb.createAsync(AppComponent).then(fixture => {
      const el = fixture.debugElement;
      assert(el.query(By.css('h1')).nativeElement.innerHTML === '');
      fixture.detectChanges();
      assert(el.query(By.css('h1')).nativeElement.innerHTML === 'My First Angular 2 App');
      done();
    });
  });

  it("should has text: 'My Test'", done => {
    tcb.createAsync(AppComponent).then(fixture => {
      let el = fixture.debugElement;
      const text = el.query(By.css("p")).nativeElement.innerHTML;
      assert(text === "My Test");
      done();
    });
  });

  it("should equal", done => {
    let app = new AppComponent();
    let num = app.getNumber();
    assert(num === 100);
    done();
  });
});