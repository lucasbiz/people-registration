import { Component, DestroyRef, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FluidModule,
    InputTextModule,
    MessageModule,
    FormsModule,
    CardModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private readonly toastService = inject(ToastService);

  constructor() {
    this.form = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(100)],
        updateOn: 'submit',
      }),
    });
  }

  loginHandler(): void {
    this.authService.loginUser(this.form.value).subscribe({
      next: () => this.router.navigate(['home']),
      error: () => {
        this.toastService.showError('Erro!', 'Erro ao fazer login');
      },
    });
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
