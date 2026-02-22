import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { PlanComponent } from './plan.component';
import { PlanService } from '../../core/plan/plan.service';

class PlanServiceMock {
  getTodayPlan() {
    return of(null);
  }
  generatePlan() {
    return of({
      date: '2026-02-16',
      workoutPlan: [],
      dietPlan: { totalCalories: 0, protein: 0, carbs: 0, fats: 0, meals: [] }
    });
  }
}

describe('PlanComponent', () => {
  let fixture: ComponentFixture<PlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlanComponent],
      providers: [{ provide: PlanService, useClass: PlanServiceMock }]
    });

    fixture = TestBed.createComponent(PlanComponent);
    fixture.detectChanges();
  });

  it('renders empty state when no plan', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No plan generated today');
  });
});
