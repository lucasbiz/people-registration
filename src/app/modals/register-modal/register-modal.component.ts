import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { User, UserForm } from '../../models/user.model';
import { formatDateDayMonthYear } from '../../utils/date-utils';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalHelperService } from '../../services/modal-helper.service';


@Component({
  selector: 'app-register-modal',
  imports: [ReactiveFormsModule, NgxMaskDirective, ButtonModule],
  providers: [provideNgxMask()],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent implements OnInit{

  form: FormGroup;
  visible: boolean = false;

  showErrors = false;
  @Output() renderUsersCall = new EventEmitter<void>();
  @Input() formInputs?: User;
  @Input() modalTitle?: string = '';
  @Input() saveButtonText?: string = '';


  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private usersService: UsersService,
    private modalHelperService: ModalHelperService
  ) {

    this.form = this.fb.group({
      name: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'submit'
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'submit'
      }),
      phone: this.fb.control('', {
        validators: [Validators.required],
        updateOn: 'submit'
      }),
      birthDate: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'submit'
      }),
    });
  }

  ngOnInit(): void {
    if (this.formInputs) {
      this.form.patchValue({
        name: this.formInputs.name,
        email: this.formInputs.email,
        phone: this.formInputs.phone,
        birthDate: formatDateDayMonthYear(this.formInputs.birthDate)
      });
    }
  }

  saveRegister(): void {

    this.showErrors = true;
    if (!this.form.valid) { 
      this.form.markAllAsTouched();
      return;
    };

    const onSuccess = (successMessage: string) => {
      this.modalHelperService.showSuccessMessage(successMessage);
      this.closeModal();
    };

    const formData: UserForm = this.form.value;

    if (this.formInputs){
      this.usersService.updateUser(this.formInputs.id, formData).subscribe({
        next: () => {onSuccess('Cadastro editado com sucesso!');
        },
        error: err => console.error(err)
      });
    } else {
      this.usersService.createUser(formData).subscribe({
        next: () => {onSuccess('Cadastro criado com sucesso!');
        },
        error: err => console.error(err)
      });
      
    }
  }

  closeModal = (): void => this.ref.close(true);
}
