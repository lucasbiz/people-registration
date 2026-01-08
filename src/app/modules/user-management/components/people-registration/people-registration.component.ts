import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-people-registration',
  imports: [
    ButtonModule,
    UserListComponent,
    InputText,
    InputIcon,
    IconField,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './people-registration.component.html',
})
export class PeopleRegistrationComponent implements OnInit {
  @ViewChild(UserListComponent) userListComponent!: UserListComponent;

  searchForm: FormGroup;
  private readonly fb = inject(FormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef);

  constructor() {
    this.searchForm = this.fb.group({
      searchText: this.fb.control(''),
    });
  }

  ngOnInit() {
    this.searchForm
      .get('searchText')
      ?.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => {
        this.userListComponent?.onFilter(term);
      });
  }

  newRegister(): void {
    this.userListComponent.onCreate();
  }
}
