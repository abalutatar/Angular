import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

import { RouterOutlet } from '@angular/router';
import { BlogHomeComponent } from './components/blog-home/blog-home';

import { ThemeService } from './services/theme';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BlogHomeComponent, ThemeToggleComponent, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private themeService: ThemeService) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('test', 'test');

 
    }
  }
}


