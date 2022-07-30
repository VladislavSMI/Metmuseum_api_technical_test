import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "../../App";
import { IDepartments, IArtsIDs, IArtDetails } from "../models/apiTypes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { status, statusText } = error.response!;

    console.log(`Status: ${status} StatusText: ${statusText}`);
    history.push("/error");
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

//The Metropolitan Museum API => https://metmuseum.github.io/

export const Data = {
  departments: () =>
    requests.get<IDepartments>(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    ),
  artsIDs: (departmentId: number) =>
    requests.get<IArtsIDs>(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${departmentId}&hasImages=true&isHighlight=true&q=a`
    ),
  artsDetails: (artId: number) =>
    requests.get<IArtDetails>(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`
    ),
};

const agent = {
  Data,
};

export default agent;
