import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { User, UserForm } from '../../models/user.model';
import { formatDateDayMonthYear } from '../../utils/date-utils';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';



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
  @Input() formInputs!: User;
  @Input() modalTitle?: string = '';
  @Input() saveButtonText?: string = '';


  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private usersService: UsersService,
  ) {

    this.form = this.fb.group({
      name: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(3)],
        updateOn: 'blur'
      }),
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }),
      phone: this.fb.control('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      birthDate: this.fb.control('', {
        validators: [Validators.required, Validators.minLength(8)],
        updateOn: 'blur'
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

    const formData: UserForm = this.form.value;

    if (this.formInputs){
      this.usersService.updateUser(this.formInputs.id, formData).subscribe({
        next: () => {
          this.renderUsersCall.emit();
          this.closeModal();
          this.showRegisterSucess('Cadastro editado com sucesso!');
        },
        error: err => console.error(err)
      });
    } else {
      this.usersService.createUser(formData).subscribe({
        next: () => {
          this.renderUsersCall.emit();
          this.closeModal();
          this.showRegisterSucess('Cadastro criado com sucesso!');
        },
        error: err => console.error(err)
      });

    }
  }

  showRegisterSucess(successModalTitle: string): void {
    console.log(successModalTitle);
  };

  closeModal = (): void => this.ref.close();
}
