import axios from "axios";
import { IProject } from "../../types";

export const getProjects = async (): Promise<IProject[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/projects`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};

export const createProject = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  try {
    return axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/projects`,
      { title, description },
      { withCredentials: true }
    );
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};

export const deleteProject = ({ uuid }: { uuid: string }) => {
  try {
    return axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/projects/${uuid}`,
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};

export const updateProject = async ({
  projectId,
  title,
  description,
}: {
  projectId: string;
  title: string;
  description: string;
}): Promise<void> => {
  try {
    return axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/projects/${projectId}`,
      {
        title,
        description: description || "",
      },
      {
        withCredentials: true,
      }
    );
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};
