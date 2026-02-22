import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../core/profile/profile.service';
import { Profile } from '../../core/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  message: string | null = null;
  error: string | null = null;

  form = this.fb.group({
    age: [0, [Validators.required, Validators.min(10)]],
    height: [0, [Validators.required, Validators.min(100)]],
    weight: [0, [Validators.required, Validators.min(30)]],
    gender: ['', Validators.required],
    goal: ['', Validators.required],
    skillLevel: ['', Validators.required],
    position: ['', Validators.required]
  });

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: profile => {
        if (profile) {
          this.form.patchValue(profile);
        }
      }
    });
  }

  save(): void {
    this.message = null;
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const profile = this.form.getRawValue() as Profile;
    this.profileService.updateProfile(profile).subscribe({
      next: () => {
        this.message = 'Profile saved. You can generate a plan now.';
        this.router.navigateByUrl('/plan');
      },
      error: () => {
        this.error = 'Profile update failed.';
      }
    });
  }
}
