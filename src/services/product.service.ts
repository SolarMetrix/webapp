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

export const getProducts = async (): Promise<IProduct[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/products`,
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
  latitude,
  longitude,
}: {
  projectId: string;
  type: ProductT;
  powerPeak: number;
  area: number;
  orientation: OrientationT;
  inclination: number;
  latitude: number;
  longitude: number;
}): Promise<any> => {
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
        latitude,
        longitude,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};

export const deleteProduct = ({ uuid }: { uuid: string }) => {
  try {
    return axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/products/${uuid}`,
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};
