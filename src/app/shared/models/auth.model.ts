export interface ResponseToken {
  token: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface RegisterUserInputs {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthDate: string;
}
