import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanService } from '../../core/plan/plan.service';
import { DailyPlan } from '../../core/models';

const FALLBACK_GIF = 'https://via.placeholder.com/240x160?text=Workout';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan.component.html'
})
export class PlanComponent {
  private planService = inject(PlanService);

  plan: DailyPlan | null = null;
  isLoading = false;
  error: string | null = null;
  previewUrl: string | null = null;
  previewName: string | null = null;

  constructor() {
    this.loadPlan();
  }

  loadPlan(): void {
    this.planService.getTodayPlan().subscribe({
      next: plan => (this.plan = plan),
      error: () => (this.error = 'Failed to load today\'s plan.')
    });
  }

  generate(): void {
    this.error = null;
    this.isLoading = true;
    this.planService.generatePlan().subscribe({
      next: plan => {
        this.plan = plan;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'AI generation failed. Try again tomorrow.';
        this.isLoading = false;
      }
    });
  }

  openPreview(name: string, url?: string): void {
    this.previewName = name;
    this.previewUrl = url || FALLBACK_GIF;
  }

  closePreview(): void {
    this.previewName = null;
    this.previewUrl = null;
  }

  setFallback(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (img) {
      img.src = FALLBACK_GIF;
    }
  }
}
