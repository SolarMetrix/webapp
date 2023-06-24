import axios from "axios";
import { IProduct, IProject, OrientationT, ProductT } from "../../types";

export const getProjectProducts = async (
  projectId: string
): Promise<IProduct[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/products?projectId=${projectId}`,
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
  powerPeak,
  area,
  orientation,
  inclination,
  longitude,
  latitude,
}: {
  projectId: string;
  type: ProductT;
  powerPeak: number;
  area: number;
  orientation: OrientationT;
  inclination: number;
  longitude: number;
  latitude: number;
}): Promise<IProject[]> => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/products`,
      {
        project_id: projectId,
        type,
        power_peak: powerPeak,
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
