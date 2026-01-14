import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from './components/head-bar/head-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadBar],
  template: `
    <app-head-bar></app-head-bar>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'open-library-app';
}
