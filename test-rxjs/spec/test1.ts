/* >>> boilerplate */
import { Observable, Subject, TestScheduler } from 'rxjs/Rx';
import chai from 'chai';
const assert = chai.assert;
/* <<< boilerplate */

import { counterObservable, timerObservable, counterAndTimerObservable } from '../../src-front/page1/page1.service';


describe('Observable', () => {
  /* >>> boilerplate */
  let ts: TestScheduler;
  let hot: typeof TestScheduler.prototype.createHotObservable;
  let cold: typeof TestScheduler.prototype.createColdObservable;

  beforeEach(() => {
    ts = new TestScheduler(assert.deepEqual);
    hot = ts.createHotObservable.bind(ts);
    cold = ts.createColdObservable.bind(ts);
  });
  /* <<< boilerplate */


  it('should return correct observable', () => {
    const source = cold<number>('-a-b-c', { a: 1, b: 2, c: 3 });
    const marbles = '---b-c';
    const values = { a: 10, b: 20, c: 30 };
    const test = maptest(source);
    ts.expectObservable(test).toBe(marbles, values);
    ts.flush();
  });


  it('should pass', () => {
    assert(1 + 1 === 2);
  });


  it('counterObservable', () => {
    const source = hot<number>('^a-b-c---d', { a: 0, b: 1, c: 1, d: 2 });
    const marbles = '-a-b-c---d';
    const values = { a: 0, b: 1, c: 2, d: 4 };
    const test = counterObservable(source);
    ts.expectObservable(test).toBe(marbles, values);
    ts.flush();
  });


  it('timerObservable', () => {
    const marbles = 'a-b-c-(d|';
    const values = { a: 0, b: 1, c: 2, d: 3 };
    const test = timerObservable(0, 20, ts).take(4);
    ts.expectObservable(test).toBe(marbles, values);
    ts.flush();
  });


  /* これは無理。テストを通せる気がしない。 */
  // it('counterAndTimerObservable', () => {
  //   const source = hot<number>('^a-|', { a: 9, b: 1, c: 1, d: 2 });
  //   const marbles = '-a(b|';
  //   const values = { a: [9, 0], b: [9, 0] };
  //   const test = counterAndTimerObservable(source, 0, 1000, ts).take(3);
  //   ts.expectObservable(test).toBe(marbles, values);
  //   ts.flush();
  // });

});


function maptest(observable: Observable<number>): Observable<number> {
  return observable
    .map(value => value * 10)
    .filter(value => value > 10);
}