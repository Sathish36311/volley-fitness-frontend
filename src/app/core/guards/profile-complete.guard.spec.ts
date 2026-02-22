import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProfileService } from '../profile/profile.service';
import { profileCompleteGuard } from './profile-complete.guard';

class ProfileServiceMock {
  status = { completed: false };
  getStatus() {
    return of(this.status);
  }
}

describe('profileCompleteGuard', () => {
  it('allows navigation when profile is complete', done => {
    const profileService = new ProfileServiceMock();
    profileService.status = { completed: true };

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ProfileService, useValue: profileService }
      ]
    });

    TestBed.runInInjectionContext(() => profileCompleteGuard()).subscribe(result => {
      expect(result).toBe(true);
      done();
    });
  });

  it('redirects to profile when incomplete', done => {
    const profileService = new ProfileServiceMock();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: ProfileService, useValue: profileService }
      ]
    });

    const router = TestBed.inject(Router);

    TestBed.runInInjectionContext(() => profileCompleteGuard()).subscribe(result => {
      expect(result?.toString()).toBe(router.parseUrl('/profile').toString());
      done();
    });
  });

  it('redirects to profile on error', done => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: ProfileService,
          useValue: { getStatus: () => throwError(() => new Error('fail')) }
        }
      ]
    });

    const router = TestBed.inject(Router);

    TestBed.runInInjectionContext(() => profileCompleteGuard()).subscribe(result => {
      expect(result?.toString()).toBe(router.parseUrl('/profile').toString());
      done();
    });
  });
});
