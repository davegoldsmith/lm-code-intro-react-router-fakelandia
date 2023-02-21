export interface Citizen {
  citizenID: string;
  citizenName: string;
  password: string;
}

export interface FormError {
  inputName: string;
  message: string;
}