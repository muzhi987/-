/* eslint-disable @typescript-eslint/no-explicit-any */
import { del, get, post, put } from "../utils/request";

/**
 * 获取列表
 * @returns
 */
export const loadDataAPI = (query: any) => get("/api/v1/admin/forum", query);

/**
 * 根据id获取一个
 * @returns
 */
export const loadDataByIdAPI = (id: string) => get("/api/v1/admin/forum/" + id);

/**
 * 新增
 * @param data
 * @returns
 */
export const addDataAPI = (data: any) => post("/api/v1/admin/forum", data);

/**
 * 根据id修改
 * @param id
 * @param data
 * @returns
 */
export const modifyDataByAPI = (id: string, data: any) =>
  put("/api/v1/admin/forum/" + id, data);

/**
 * 根据id删除
 * @param id
 * @returns
 */
export const delByIdAPI = (id: string) => del("/api/v1/admin/forum/" + id);
