import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { AuthResponse } from '../models';
import { environment } from '../../../environments/environment';

const API_BASE = environment.apiBase;
const TOKEN_KEY = 'vf_token';
const EMAIL_KEY = 'vf_email';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  register(email: string, password: string): Observable<void> {
    return this.http.post<void>(`${API_BASE}/auth/register`, { email, password });
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<AuthResponse>(`${API_BASE}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setEmail(email);
        }),
        map(() => void 0)
      );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY) ?? this.extractEmailFromToken();
  }

  private setEmail(email: string): void {
    localStorage.setItem(EMAIL_KEY, email);
  }

  private setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private extractEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    const parts = token.split('.');
    if (parts.length < 2) {
      return null;
    }

    try {
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const decoded = atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='));
      const data = JSON.parse(decoded) as { sub?: string };
      return data.sub ?? null;
    } catch {
      return null;
    }
  }
}
