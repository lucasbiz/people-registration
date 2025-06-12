import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { ModalHelperService } from '../../services/modal-helper.service';
import { User, UserForm } from '../../models/user.model';
import { formatDateDayMonthYear } from '../../utils/date-utils';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';



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
  @Input() userData?: User;
  @Input() saveButtonText?: string = '';
  @Input() modalTitle?: string = '';


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private usersService: UsersService,
    private modalHelperService: ModalHelperService
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
    this.modalTitle = this.config.data?.modalTitle || '';
    this.saveButtonText = this.config.data?.saveButtonText || '';
    this.userData = this.config.data?.userData;
  
    if (this.userData) {
      this.form.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        phone: this.userData.phone,
        birthDate: formatDateDayMonthYear(this.userData.birthDate)
      });
    }
  }
  

  saveRegister(): void {

    this.showErrors = true;
    console.log('aa');
    if (!this.form.valid) { 
      this.form.markAllAsTouched();
      return;
    };

    const formData: UserForm = this.form.value;

    if (this.userData){
      this.usersService.updateUser(this.userData.id, formData).subscribe({
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

    const initialState = {
      modalTitle: `${successModalTitle}`
    };
    this.modalHelperService.showActionSucess(initialState, 500);
  };

  closeModal = (): void => this.ref.close();
}
