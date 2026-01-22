import { Component } from '@angular/core';
import { ThemeService } from '@app/theme-service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ScrollSpy } from '@app/shared/directives/scroll-directive/scroll-spy';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, ScrollSpy],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isLightTheme = false;
  protected themeService: ThemeService;
  constructor(themeService: ThemeService) {
    this.themeService = themeService;
    this.isLightTheme = this.themeService.getTheme() === 'light';
  }

  toggleTheme() {
    this.themeService.toggle();
    this.isLightTheme = this.themeService.getTheme() === 'light';
  }
}
