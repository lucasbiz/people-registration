export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersData {
  users: User[];
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface RawUsersResponse {
  results: User[];
  page: number;
  limit: number;
  count: number;
}

export interface UserForm {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface UserLogin {
  email: string;
  name: string;
}
