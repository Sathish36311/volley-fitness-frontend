import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models';
import { environment } from '../../../environments/environment';

const API_BASE = environment.apiBase;

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  getProfile(): Observable<Profile | null> {
    return this.http.get<Profile | null>(`${API_BASE}/profile`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(`${API_BASE}/profile`, profile);
  }

  getStatus(): Observable<{ completed: boolean }> {
    return this.http.get<{ completed: boolean }>(`${API_BASE}/profile/status`);
  }
}
