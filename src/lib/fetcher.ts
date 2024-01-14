import { GenericResponse } from "@/types/GenericResponse";
import { accessToken } from "@/types/Key";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export const BASE_URL = "https://panchashilapi.biplabacharya.com.np/api/v1";
export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const access = cookie.get(accessToken);

export const fetcher = async (
  url: string,
  method?: Method,
  body?: Record<string, string>,
  headers?: Record<string, string>
) => {
  const response: GenericResponse<any> = {
    errors: [],
    data: {},
    message: "",
    statusCode: 0,
    success: false,
  };
  const res = await fetch(BASE_URL + url, {
    method: method ? method : Method.GET,
    headers: headers
      ? headers
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  response.errors = data.errors;
  response.data = data.data;
  response.message = data.message;
  response.statusCode = data.statusCode;
  response.success = data.success;
  return response;
};
