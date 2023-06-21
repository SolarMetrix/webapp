export interface IUser {
  readonly uuid: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface IModal {
  isOpen: boolean;
  close: () => void;
}
