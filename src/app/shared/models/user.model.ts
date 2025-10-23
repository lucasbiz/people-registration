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
  pagination: {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface UserForm {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
}
