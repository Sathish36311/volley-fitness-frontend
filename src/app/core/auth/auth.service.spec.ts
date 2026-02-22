import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  it('stores token on login', () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), AuthService]
    });

    const service = TestBed.inject(AuthService);
    const http = TestBed.inject(HttpClient);
    const controller = TestBed.inject(HttpTestingController);

    service.login('test@example.com', 'password').subscribe();

    const req = controller.expectOne('/api/auth/login');
    req.flush({ token: 'abc' });

    expect(service.getToken()).toBe('abc');
    controller.verify();
  });
});
