import { Component, EventEmitter, Output } from '@angular/core';
import { InputButtonComponent } from "../input-button/input-button.component";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalHelperService } from '../../services/modal-helper.service';


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

  saveNewRegister() {
    if(this.form.valid) {
      const formData = this.form.value;
      this.usersService.createUser(formData).subscribe({
        next: () => {
          this.closeModal();
          this.showRegisterSucess();
          this.renderUsers();
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
    this.form.markAllAsTouched();
    }
  }

  showRegisterSucess() {

    const initialState = {
      modalTitle: 'Cadastro criado com sucesso!'
    }
    this.modalHelperService.showActionSucess(initialState)
  }

  closeModal() {
    this.bsModalRef.hide();
  };

  renderUsers(){
    this.usersService.loadUsers();
  }

}
