export enum Gender {
  BRANCO = 'branco',
  PRETO = 'preto',
  PARDO = 'pardo',
  AMARELO = 'amarelo',
  INDIGENA = 'indigena',
}
export interface ICreateUserDTO {
  id?: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  weight: number;
  gender: Gender;
  password: string;
}
