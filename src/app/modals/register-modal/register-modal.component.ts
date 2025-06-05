import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputButtonComponent } from '../../components/input-button/input-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';
import { User, UserForm } from '../../models/user.model';
import { formatDateDayMonthYear } from '../../utils/date-utils';


@Component({
  selector: 'app-register-modal',
  imports: [InputButtonComponent, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent implements OnInit{

  form: FormGroup;

  @Output() renderUsersCall = new EventEmitter<void>();
  @Input() userData?: User;
  @Input() saveButtonText?: string = '';
  @Input() modalTitle?: string = '';


  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private usersService: UsersService, private modalHelperService: ModalHelperService) {

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

  closeModal = (): void => this.bsModalRef.hide();
}
