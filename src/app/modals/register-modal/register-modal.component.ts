import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { User, UserForm } from '../../models/user.model';
import { formatDateDayMonthYear } from '../../utils/date-utils';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalHelperService } from '../../services/modal-helper.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-register-modal',
  imports: [ReactiveFormsModule, NgxMaskDirective, ButtonModule],
  providers: [provideNgxMask()],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css',
})
export class RegisterModalComponent implements OnInit {
  form: FormGroup;
  visible = false;

  showErrors = false;
  @Output() renderUsersCall = new EventEmitter<void>();
  @Input() formInputs?: User;
  @Input() modalTitle?: string = '';
  @Input() saveButtonText?: string = '';

  private destroyRef: DestroyRef = inject(DestroyRef);

  private readonly ref = inject(DynamicDialogRef);
  private readonly fb = inject(FormBuilder);
  private readonly usersService = inject(UsersService);
  private readonly modalHelperService = inject(ModalHelperService);
  private readonly toastService = inject(ToastService);

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

  ngOnInit(): void {
    if (this.formInputs) {
      this.form.patchValue({
        name: this.formInputs.name,
        email: this.formInputs.email,
        phone: this.formInputs.phone,
        birthDate: formatDateDayMonthYear(this.formInputs.birthDate),
      });
    }
  }

  saveRegister(): void {
    this.showErrors = true;
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData: UserForm = this.form.value;

    if (this.formInputs) {
      this.submitRequest(
        this.usersService.updateUser(this.formInputs.id, formData),
        'Cadastro editado com sucesso!',
      );
    } else {
      this.submitRequest(
        this.usersService.createUser(formData),
        'Cadastro criado com sucesso!',
      );
    }
  }

  submitRequest<T>(request$: Observable<T>, successMessage: string): void {
    const onSuccess = (successMessage: string) => {
      this.modalHelperService.showSuccessMessage(successMessage);
      this.closeModal();
    };
    request$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => onSuccess(successMessage),
      error: () =>
        this.toastService.showError('Erro!', 'Erro ao criar/editar usuário'),
    });
  }

  closeModal = (): void => this.ref.close(true);
}
