import axios from "axios";

export const fetchUserInfo = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_API_ENDPOINT}/auth`,
      { withCredentials: true }
    );

    return data;
  } catch (error: any) {
    console.log(error?.response.data);
    return Promise.reject(error?.response.data);
  }
};
