import axios from "axios";

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
