export interface IModal {
  isOpen: boolean;
  close: () => void;
}

export interface IUser {
  readonly uuid: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface IProject {
  readonly uuid: string;
  title: string;
  description: string;
  readonly: boolean;
  createdAt: Date | string;
}

export interface IProduct {
  readonly uuid: string;
  type: ProductT;
  powerPeak: number;
  orientation: OrientationT;
  inclination: number;
  area: number;
  longitude: number;
  latitude: number;
  createdAt: Date | string;
}

export type ProductT = "firstsolar" | "jinkosolar" | "sunpower";
export type OrientationT = "north" | "east" | "south" | "west";
