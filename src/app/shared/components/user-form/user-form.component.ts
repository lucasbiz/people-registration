import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FluidModule } from 'primeng/fluid';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from 'primeng/popover';
import { DatePickerModule } from 'primeng/datepicker';
import { formatDateDayMonthYear } from '../../../shared/utils/date-utils';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FluidModule,
    InputTextModule,
    MessageModule,
    FormsModule,
    PopoverModule,
    DatePickerModule,
    InputMaskModule,
    PasswordModule,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() title = '';
  @Input() submitLabel? = '';
  @Input() formInputs?: User;

  @Output() formSubmit = new EventEmitter<FormGroup>();

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

  onSubmit(): void {
    if (this.form.valid) {
      this.formSubmit.emit(this.form);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onSelectBirthDate(date: Date): void {
    this.form
      .get('birthDate')
      ?.setValue(formatDateDayMonthYear(date.toISOString()));
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get name() {
    return this.form.get('name');
  }
  get phone() {
    return this.form.get('phone');
  }
  get birthDate() {
    return this.form.get('birthDate');
  }
}
