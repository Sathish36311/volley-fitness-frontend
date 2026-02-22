import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyPlan } from '../models';
import { environment } from '../../../environments/environment';

const API_BASE = environment.apiBase;

@Injectable({ providedIn: 'root' })
export class PlanService {
  private http = inject(HttpClient);

  getTodayPlan(): Observable<DailyPlan | null> {
    return this.http.get<DailyPlan | null>(`${API_BASE}/plans/today`);
  }

  generatePlan(): Observable<DailyPlan> {
    return this.http.post<DailyPlan>(`${API_BASE}/plans/generate`, {});
  }
}
