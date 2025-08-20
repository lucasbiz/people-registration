import { UsersService } from './user.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockUsers } from '../mocks/mockUsers';
import { baseApiUrl } from '../../environments/environment';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  const mockUserData = mockUsers;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get users', () => {
    service.getUsers(0, 10).subscribe((users) => {
      expect(users).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne(
      (r) =>
        r.url === `${baseApiUrl}` &&
        r.params.get('page') === '1' &&
        r.params.get('limit') === '10',
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });
});
