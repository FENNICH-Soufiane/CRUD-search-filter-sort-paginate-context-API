import { BASE_URL } from "./helper";
import { commonRequest } from "./ApiCall";

export const registerFunc = async (data, header) => {
  return await commonRequest("POST", `${BASE_URL}/user/register`, data, header);
};

export const usergetFunc = async (search, gender, status, sort, page) => {
  return await commonRequest(
    "GET",
    `${BASE_URL}/user/details?search=${search}&gender=${gender}&status=${status}&sort=${sort}&page=${page}`,
    ""
  ); // "" pour data dans commonRequest
};

export const getSingleUserFun = async (id) => {
  return await commonRequest("GET", `${BASE_URL}/user/${id}`, "");
};

export const editFun = async (id, data, header) => {
  return await commonRequest(
    "PUT",
    `${BASE_URL}/user/edit/${id}`,
    data,
    header
  );
};

export const deleteFun = async (id) => {
  return await commonRequest("DELETE", `${BASE_URL}/user/delete/${id}`);
};

export const changeStatusFun = async (id, data) => {
  return await commonRequest("PUT", `${BASE_URL}/user/status/${id}`, {data});
};

export const exportToCsvFunc = async () => {
  return await commonRequest("GET", `${BASE_URL}/userExport`)
}
