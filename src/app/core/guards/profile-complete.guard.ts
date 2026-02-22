import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { ProfileService } from '../profile/profile.service';

export const profileCompleteGuard: CanActivateFn = () => {
  const profileService = inject(ProfileService);
  const router = inject(Router);

  return profileService.getStatus().pipe(
    map(status => (status.completed ? true : router.parseUrl('/profile'))),
    catchError(() => of(router.parseUrl('/profile')))
  );
};
