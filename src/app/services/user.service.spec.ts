import { UsersService } from './user.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockUsers } from '../shared/mocks/mockUsers';
import { baseApiUrl } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { payloadHelper } from '../shared/helpers/user.helper';
import { UserForm } from '../shared/models/user.model';

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
    const promise = firstValueFrom(service.getUsers(0, 10));

    const req = httpTestingController.expectOne(
      (r) =>
        r.url === `${baseApiUrl}` &&
        r.params.get('page') === '1' &&
        r.params.get('limit') === '10',
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);

    const expected = {
      users: mockUserData.results,
      currentPage: mockUserData.page,
      limit: mockUserData.limit,
      totalCount: mockUserData.count,
      totalPages: Math.ceil(mockUserData.count / mockUserData.limit),
    };

    return expect(promise).resolves.toEqual(expected);
  });

  it('should create user', async () => {
    const createdUser = mockUserData.results.find((user) => user.id === 436)!;

    const newUserForm = {
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
      birthDate: createdUser.birthDate,
    };

    const promise = firstValueFrom(service.createUser(newUserForm));
    const req = httpTestingController.expectOne(`${baseApiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payloadHelper(newUserForm as UserForm));
    req.flush(createdUser);

    await expect(promise).resolves.toEqual(createdUser);
  });

  it('should delete user', async () => {
    const idToBeDeleted = 466;
    const promise = firstValueFrom(service.deleteUser(idToBeDeleted));
    const req = httpTestingController.expectOne(
      `${baseApiUrl}` + `/` + `${idToBeDeleted}`,
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null, { status: 204, statusText: 'No Content' });

    await expect(promise).resolves.toBeNull();
  });

  it('should handle request errors', async () => {
    const userIdToDelete = 123;
    const errorResponse = { status: 404, statusText: 'Not Found' };
    const promise = firstValueFrom(service.deleteUser(userIdToDelete));

    const req = httpTestingController.expectOne(
      `${baseApiUrl}/${userIdToDelete}`,
    );
    req.flush(null, errorResponse);

    await expect(promise).rejects.toMatchObject({ status: 404 });
  });

  it('should update user', async () => {
    const existing = mockUserData.results[0];
    const updateForm = {
      name: existing.name + ' Edited',
      email: existing.email,
      phone: existing.phone,
      birthDate: existing.birthDate,
    };

    const promise = firstValueFrom(service.updateUser(existing.id, updateForm));
    const req = httpTestingController.expectOne(`${baseApiUrl}/${existing.id}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(payloadHelper(updateForm as UserForm));

    const updated = { ...existing, name: updateForm.name };
    req.flush(updated);

    await expect(promise).resolves.toEqual(updated);
  });
});
