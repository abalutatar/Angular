import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss',
})
export class ThemeToggleComponent {
  //isDark$ = this.themeService.darkMode$;
  isDark$: Observable<boolean>;
  constructor(private themeService: ThemeService) { this.isDark$ = this.themeService.darkMode$; }

  toggle() {
    this.themeService.toggleTheme();
  }

}
