import { Component } from '@angular/core';
import { Navbar } from '@core/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'My_Portfolio';
}
