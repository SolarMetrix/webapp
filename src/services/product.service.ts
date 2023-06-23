import axios from "axios";
import { IProject, OrientationT, ProductT } from "../../types";

export const getProducts = async (projectId: string): Promise<IProject[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/projects/${projectId}/products`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};

export const addProduct = async ({
  projectId,
  type,
  power_peak,
  area,
  orientation,
  inclination,
  longitude,
  latitude,
}: {
  projectId: string;
  type: ProductT;
  power_peak: number;
  area: number;
  orientation: OrientationT;
  inclination: number;
  longitude: number;
  latitude: number;
}): Promise<IProject[]> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/projects/${projectId}/products`,
      {
        type,
        power_peak,
        area,
        orientation,
        inclination,
        longitude,
        latitude,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};
