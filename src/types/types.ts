export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'Male' | 'Female' | 'Other';
  country: string;
  picture: string;
  terms: boolean;
}

export interface IError {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  country?: string;
  picture?: string;
  terms?: string;
}
