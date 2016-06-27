import { Observable, Subject, TestScheduler } from 'rxjs/Rx';
import assert from 'assert';


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

});


function maptest(observable: Observable<number>): Observable<number> {
  return observable
    .map(value => value * 10)
    .filter(value => value > 10);
}