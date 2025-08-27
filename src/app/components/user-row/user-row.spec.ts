import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserRowComponent } from './user-row.component';
import { uniqueUser } from '../../mocks/mockUsers';

describe('UserRowComponent', () => {
  let component: UserRowComponent;
  let fixture: ComponentFixture<UserRowComponent>;

  const mockUser = uniqueUser;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRowComponent],
      imports: [CommonModule, ButtonModule],
    }).compileComponents();
    fixture = TestBed.createComponent(UserRowComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user data properly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    console.log(compiled);
  });
});
