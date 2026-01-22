import { Injectable } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme: Theme = "dark";

  initTheme() {
    const saved = localStorage.getItem('theme') as Theme | null;

    if (saved) {
      this.setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setTheme('dark');
    }
  }

  setTheme(theme: Theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    this.theme = theme;
    localStorage.setItem('theme', theme);
  }

  getTheme(): Theme {
    return this.theme;
  }

  toggle() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
  }
}
