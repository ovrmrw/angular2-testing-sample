import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Page1Service } from './page1.service';

@Component({
  selector: 'sg-page1',
  template: `
    <h4>{{content}}</h4>
    <button (click)="changeContent()" name="change">Change</button>
    <ul>
      <li *ngFor="let text of texts,let i=index" id="text{{i}}">{{text}}</li>
    </ul>
    <h2>{{_$counter}}</h2>
    <button (click)="increment()" id="btnIncrement">Increment</button>.
    <hr />
    <div>{{timeNow$ | async | date:'medium'}}</div>
  `,
  providers: [Page1Service],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page1Component implements OnInit {
  content: string = 'page1 content.';
  texts: string[] = [];

  constructor(
    private service: Page1Service,
    public cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    (async () => {
      this.texts.push('start async');

      await new Promise(resolve => {
        setTimeout(() => {
          this.texts.push('this message should be shown between "start" and "end".');
          resolve();
          this.cd.markForCheck();
        }, 1000);
      });

      this.texts.push('end async');
    })();

    this.service.counter$.subscribe(counter => {
      this._$counter = counter;
      this.cd.markForCheck();
    });
  }

  changeContent() {
    this.content = 'page1 content changed.';
  }

  increment() {
    this.service.increment(1);
  }

  get counter$() { return this.service.counter$.do(c => console.log(c)); }
  private _$counter: number;

  get timeNow$() { return this.service.timeNow$; }
}