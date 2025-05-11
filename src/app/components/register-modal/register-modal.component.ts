import { Component, EventEmitter, Output } from '@angular/core';
import { InputButtonComponent } from "../input-button/input-button.component";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../user.service';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-register-modal',
  imports: [InputButtonComponent, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {

  @Output() userCreated = new EventEmitter<void>();

  modalTitle: string = '';
  saveButtonText: string = '';
  showSuccessMessage = false;


  form: FormGroup;

constructor(public bsModalRef: BsModalRef, private modalService: BsModalService, private fb: FormBuilder, private usersService: UsersService) {
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
          this.userCreated.emit();
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

    this.bsModalRef = this.modalService.show(SuccessModalComponent, {
      initialState,
      class: 'modal-dialog-centered'
    });
  }

  closeModal() {
    this.bsModalRef.hide();
  };

}
