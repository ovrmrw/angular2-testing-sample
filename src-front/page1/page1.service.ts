import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Scheduler } from 'rxjs/Rx';
import lodash from 'lodash';

const initCounter = 0;
const initTimeNow = lodash.now();

@Injectable()
export class Page1Service {
  private inCounter$ = new Subject<number>();
  private outCounter$ = new BehaviorSubject<number>(initCounter);
  private outTimeNow$ = new BehaviorSubject<number>(initTimeNow);

  constructor() {
    const watchingObservables = [
      this.inCounter$.scan((p, value) => {
        return p + value;
      }, initCounter),

      Observable.timer(1, 1000)
        .map(() => lodash.now())
    ];

    Observable
      .combineLatest<any[]>(...watchingObservables)
      .do(values => {
        console.log(values);
        this.outCounter$.next(values[0]);
        this.outTimeNow$.next(values[1]);
      })
      .share()
      .subscribe();

    this.inCounter$.next(0); // Observableループをkick
  }

  increment(value: number): void {
    this.inCounter$.next(value);
  }

  get counter$() { return this.outCounter$ as Observable<number>; }

  get timeNow$() { return this.outTimeNow$ as Observable<number>; }
}