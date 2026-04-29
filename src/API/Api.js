import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

const API = async ({ method, url, data, params }) => {
  try {
    const res = await api({
      method,
      url,
      data,
      params,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
};

export default API;
