import { Component } from '@angular/core';
import { ThemeService } from '@app/theme-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ScrollSpy } from '@app/shared/directives/scroll-directive/scroll-spy';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, ScrollSpy],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isLightTheme = false;
  isMobile = false;
  isMobileMenuOpen = false
  protected themeService: ThemeService;
  constructor(themeService: ThemeService) {
    this.themeService = themeService;
    this.isLightTheme = this.themeService.getTheme() === 'light';
  }

  ngOnInit() {
    this.updateScreenSize();
    window.addEventListener('resize', this.updateScreenSize);
  }

  updateScreenSize = () => {
    this.isMobile = window.innerWidth < 800;
  };

  ngOnDestroy() {
    window.removeEventListener('resize', this.updateScreenSize);
  }

  toggleTheme() {
    this.themeService.toggle();
    this.isLightTheme = this.themeService.getTheme() === 'light';
  }
}
