export default interface ICreateAddressDTO {
  id?: string;
  address: string;
  number: number;
  complement: string;
  zipCode: string;
  city: string;
  state: string;
  user_id: string;
}
