import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../core/profile/profile.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  profileComplete = false;

  private profileService = inject(ProfileService);

  constructor() {
    this.profileService.getStatus().subscribe({
      next: status => (this.profileComplete = status.completed)
    });
  }
}
