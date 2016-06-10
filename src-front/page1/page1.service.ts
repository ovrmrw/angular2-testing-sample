import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs/Rx';

const initValue = 0;

@Injectable()
export class Page1Service {
  private _counter$ = new BehaviorSubject<number>(initValue);
  private state$ = new Subject<number>();

  constructor() {
    this.state$
      .scan((p, value) => {
        return p + value;
      }, initValue)
      .do(value => this._counter$.next(value))
      .subscribe();
  }

  increment(value: number): void {
    this.state$.next(value);
  }

  get counter$() { return this._counter$ as Observable<number> }
}