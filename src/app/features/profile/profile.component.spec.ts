import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { ProfileService } from '../../core/profile/profile.service';

class ProfileServiceMock {
  getProfile() {
    return of(null);
  }
  updateProfile() {
    return of({
      age: 20,
      height: 180,
      weight: 75,
      gender: 'M',
      goal: 'Power',
      skillLevel: 'Intermediate',
      position: 'Setter'
    });
  }
}

describe('ProfileComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [{ provide: ProfileService, useClass: ProfileServiceMock }]
    });

    fixture = TestBed.createComponent(ProfileComponent);
    fixture.detectChanges();
  });

  it('marks form invalid when empty', () => {
    const component = fixture.componentInstance;
    component.form.reset();
    expect(component.form.valid).toBe(false);
  });
});
