import axios from "axios";
import { IProject } from "../../types";

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