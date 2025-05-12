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
  users: User[],
  currentPage: number,
  limit: number,
  totalCount: number,
  totalPages: number
}
