import { Observable, Subject, TestScheduler } from 'rxjs/Rx';
import assert from 'assert';
import { counterObservable, timerObservable } from '../../src-front/page1/page1.service';


describe('Observable', () => {
  let ts: TestScheduler;
  let hot: typeof TestScheduler.prototype.createHotObservable;
  let cold: typeof TestScheduler.prototype.createColdObservable;


  beforeEach(() => {
    ts = new TestScheduler(assert.deepEqual);
    hot = ts.createHotObservable.bind(ts);
    cold = ts.createColdObservable.bind(ts);
  });


  it('should return correct observable', () => {
    const source = cold<number>('-a-b-c', { a: 1, b: 2, c: 3 });
    const expected = '---b-c';
    const expectedValues = { a: 10, b: 20, c: 30 };

    ts.expectObservable(maptest(source)).toBe(expected, expectedValues);
    ts.flush();
  });


  it('should pass', () => {
    assert(1 + 1 === 2);
  });


  it('counterObservable', () => {
    const source = hot<number>('^a-b-c---d', { a: 0, b: 1, c: 1, d: 2 });
    const marbles = '-a-b-c---d';
    const values = { a: 0, b: 1, c: 2, d: 4 };
    ts.expectObservable(counterObservable(source)).toBe(marbles, values);
    ts.flush();
  });


  it('timerObservable', () => {
    // const source = cold<number>('----');
    const marbles = 'a-b-c-(d|';
    const values = { a: 0, b: 1, c: 2, d: 3 };
    ts.expectObservable(timerObservable(0, 20, ts).take(4)).toBe(marbles, values);
    ts.flush();
  });

});


function maptest(observable: Observable<number>): Observable<number> {
  return observable
    .map(value => value * 10)
    .filter(value => value > 10);
}