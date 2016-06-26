declare var Zone: any;
import { Observable } from 'rxjs/Rx';


export function setTimeoutPromise(ms: number, forNextTurn: boolean = false): Promise<any> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (forNextTurn) {
        console.log('***** setTimeout for forwarding Zone\'s turn: ' + ms + ' ms *****');
      } else {
        console.log('***** setTimeout: ' + ms + ' ms *****');
      }
      resolve();
    }, ms);
  });
}


export function elementText(element: HTMLElement, selectors: string, index: number = 0): string {
  return element.querySelectorAll(selectors)[index].textContent;
}


export function elements(element: HTMLElement, selectors: string): NodeListOf<Element> {
  return element.querySelectorAll(selectors);
}


export function observableValue<T>(obs: Observable<T>): T {
  let _value: any;
  obs.subscribe(value => _value = value).unsubscribe(); // unsubscribeしないとsubscriptionが生き続けて処理の邪魔をする。
  return _value;
}


export function withPower(done: any, functionMayHaveError: () => void): void {
  try {
    functionMayHaveError.call(this);
  } catch (e) {
    if (done) {
      const err = `Error in "${Zone.current.name} zone": `;
      done.fail(e.message ? err + e.message : err + e);
    }
  }
}


export function asyncPower(asyncAwaitFunction: () => Promise<void>): Function {
  return function (done) {
    asyncAwaitFunction.call(this)
      .then(() => done())
      .catch(e => {
        const err = `Error in "${Zone.current.name} zone": `;
        done.fail(e.message ? err + e.message : err + e);
      });
  }
}


export function fakeAsyncPower(functionWithTicks: Function): Function {
  return function (done) {
    let FakeAsyncTestZoneSpec = Zone['FakeAsyncTestZoneSpec'];
    let testZoneSpec = new FakeAsyncTestZoneSpec();
    Zone.current
      .fork(testZoneSpec)
      .fork({
        'name': 'fakeAsyncPower test',
        'onHandleError': function (parentZoneDelegate, currentZone, targetZone, error) {
          const err = `Error in "${Zone.current.name} zone": `;
          done.fail(error.message ? err + error.message : err + error);
        }
      })
      .runGuarded(functionWithTicks);
    done();
  }
}


export function tick(ms: number = 0): void {
  Zone.current.get('FakeAsyncTestZoneSpec').tick(ms);
}