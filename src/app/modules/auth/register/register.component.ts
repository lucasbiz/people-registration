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
import { PopoverModule } from 'primeng/popover';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { AuthService } from '../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '@services/toast.service';
import { PasswordModule } from 'primeng/password';
import { UserFormComponent } from '../../../shared/components/user-form/user-form.component';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FluidModule,
    InputTextModule,
    MessageModule,
    FormsModule,
    CardModule,
    RouterLink,
    PopoverModule,
    DatePickerModule,
    InputMaskModule,
    PasswordModule,
    UserFormComponent,
  ],
  standalone: true,
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;

  private destroyRef: DestroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);
  private readonly toastService: ToastService = inject(ToastService);
  private readonly router: Router = inject(Router);

  constructor() {
    this.form = this.fb.group({
      name: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'submit',
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit',
      }),
      password: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(100)],
        updateOn: 'submit',
      }),
      phone: this.fb.control('', {
        validators: [Validators.required],
        updateOn: 'submit',
      }),
      birthDate: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'submit',
      }),
    });
  }

  registerHandler(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
    }
    const formData = this.form.value;

    this.authService
      .registerNewUser(formData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.authService
            .loginUser({
              email: formData.email,
              password: formData.password,
            })
            .subscribe({
              next: () => {
                this.router.navigate(['home']);
              },
            });
        },
        error: () => {
          this.toastService.showError('Erro!', 'Erro ao criar/editar usuário');
        },
      });
  }
}
