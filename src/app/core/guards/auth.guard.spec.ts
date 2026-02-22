import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { authGuard } from './auth.guard';

class AuthServiceMock {
  token: string | null = null;
  isLoggedIn(): boolean {
    return !!this.token;
  }
}

describe('authGuard', () => {
  it('allows navigation when logged in', () => {
    const auth = new AuthServiceMock();
    auth.token = 'token';

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: auth }
      ]
    });

    const result = TestBed.runInInjectionContext(() => authGuard());
    expect(result).toBe(true);
  });

  it('redirects to login when logged out', () => {
    const auth = new AuthServiceMock();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: auth }
      ]
    });

    const router = TestBed.inject(Router);
    const result = TestBed.runInInjectionContext(() => authGuard());
    expect(result?.toString()).toBe(router.parseUrl('/login').toString());
  });
});
