import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'sg-page1',
  template: `
    <h4>{{content}}</h4>
    <button (click)="changeContent()" name="change">Change</button>
    <ul>
      <li *ngFor="let text of texts,let i=index" id="text{{i}}">{{text}}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page1Component implements OnInit {
  content: string = 'page1 content.';
  texts: string[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    (async () => {
      this.texts.push('start async');

      await new Promise(resolve => {
        setTimeout(() => {
          this.texts.push('this message should be shown between "start" and "end".');
          resolve();
          this.cd.markForCheck();
        }, 2000);
      });

      this.texts.push('end async');
    })();
  }

  changeContent() {
    this.content = "page1 content changed.";
  }
}