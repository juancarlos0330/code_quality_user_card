import axios from "axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com/";

export const getUser = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
