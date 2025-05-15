import { Component, EventEmitter, Output, Input } from '@angular/core';
import { InputButtonComponent } from "../../components/input-button/input-button.component";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-register-modal',
  imports: [InputButtonComponent, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {

  modalTitle: string = '';


  form: FormGroup;

  @Output() renderUsersCall = new EventEmitter<void>();
  @Input() userData?: User;

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

  ngOnInit() {
    if (this.userData) {
      this.form.patchValue({
        name: this.userData.name,
        email: this.userData.email,
        phone: this.userData.phone,
        birthDate: this.userData.birthDate
      });
    }
  }


  saveNewRegister() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    const obs$ = this.userData
    ? this.usersService.updateUser(this.userData.id, formData)
    : this.usersService.createUser(formData);

    obs$.subscribe({
      next: () => {
        this.renderUsersCall.emit();
        this.closeModal();
        this.showRegisterSucess();
      },
      error: err => console.error(err)
    });

  }

  showRegisterSucess() {

    const initialState = {
      modalTitle: 'Cadastro criado com sucesso!'
    }
    this.modalHelperService.showActionSucess(initialState, 500)
  }

  closeModal() {
    this.bsModalRef.hide();
  };
}
