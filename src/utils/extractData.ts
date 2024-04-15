import { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { ResponseRecord } from '../api';

export class ResponseError extends Error {
  code?: number;
}

function errorToastAsyncify<T, K extends any[]>(
  api: (...args: K) => Promise<AxiosResponse<ResponseRecord<T>>>
): (...args: K) => Promise<T> {
  return async (...args: K) => {
    try {
      const response = await api(...args);

      const data = extractData(response);
      return data;
    } catch (err) {
      ElMessage.error((err as Error).message);
      throw err;
    }
  };
}
function asyncify<T, K extends any[]>(
  api: (...args: K) => Promise<AxiosResponse<ResponseRecord<T>>>
): (...args: K) => Promise<T> {
  return async (...args: K) => {
    try {
      const response = await api(...args);

      const data = extractData(response);
      return data;
    } catch (err) {
      throw err;
    }
  };
}
function extractData<T>({ data }: AxiosResponse<ResponseRecord<T>>) {
  if (data.ok && data.code === 0) {
    return data.data;
  } else {
    const err = new ResponseError(data?.msg ?? '未知错误');
    if (data) {
      err.code = data.code;
    }
    throw err;
  }
}
export { asyncify, errorToastAsyncify, extractData };
export default extractData;
