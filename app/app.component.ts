import {Component} from '@angular/core';
import {AppComponent2} from './app2.component'; // async/await sample.


@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <p>My Test</p>
    <my-app2></my-app2>
  `,
  directives: [AppComponent2]
})
export class AppComponent {
  title:string = 'My First Angular 2 App';

  getNumber() {
    return 100;
  }
}
