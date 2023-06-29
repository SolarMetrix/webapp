export interface IModal {
  isOpen: boolean;
  close: () => void;
}

export interface IUser {
  readonly uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  city: string;
}

export interface IProject {
  readonly uuid: string;
  title: string;
  description: string;
  productsNumber: number;
  readonly: boolean;
  createdAt: Date | string;
}

export interface IProduct {
  readonly uuid: string;
  type: ProductT;
  powerPeak: number;
  efficiency: number;
  orientation: OrientationT;
  inclination: number;
  area: number;
  longitude: number;
  latitude: number;
  createdAt: string;
  totalGeneratedElectricity: number;
  project: {
    uuid: string;
    title: string;
    readonly: boolean;
  };
}

export type ProductT = "firstsolar" | "jinkosolar" | "sunpower";
export type OrientationT = "north" | "east" | "south" | "west";
