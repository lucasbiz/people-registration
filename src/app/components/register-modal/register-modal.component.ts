import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { InputButtonComponent } from "../input-button/input-button.component";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../user.service';


@Component({
  selector: 'app-register-modal',
  imports: [InputButtonComponent, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.css'
})
export class RegisterModalComponent {

  modalTitle: string = '';
  saveButtonText: string = '';

  form: FormGroup;

constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private usersService: UsersService) {
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
        next: (response) => console.log(response),
        error: (err) => console.error('Erro: ', err),
        complete: () => {
          console.log('Observable concluído');
          this.usersService.getUsers();
      }});
    } else {
    this.form.markAllAsTouched();
    }
  }

  closeModal() {
    this.bsModalRef.hide();
  };

}
