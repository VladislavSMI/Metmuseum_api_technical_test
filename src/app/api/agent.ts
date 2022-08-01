import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "../../App";
import { IDepartments, IArtsIDs, IArtDetails } from "../models/arts";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { status, statusText } = error.response!;
    let message;

    if (error instanceof AxiosError) {
      message = error.response?.data.message;
    }

    switch (status) {
      case 404:
        if (message === "Not a valid object") {
          console.log(`Status: ${status} StatusText: ${statusText}`);
          return Promise.resolve({ data: {} });
        }
        history.push("/error");
        break;
      default:
        console.log(`Status: ${status} StatusText: ${statusText}`);
        history.push("/error");
    }

    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
};

export const MetApi = {
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
  MetApi,
};

export default agent;
