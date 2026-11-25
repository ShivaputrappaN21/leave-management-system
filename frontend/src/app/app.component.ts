import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
  <div class="d-flex">
    <app-navbar></app-navbar>
    <main class="flex-grow-1 p-4"><router-outlet></router-outlet></main>
  </div>`
})
export class AppComponent {}
