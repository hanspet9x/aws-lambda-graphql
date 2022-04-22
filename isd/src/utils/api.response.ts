import {IMutationResponse} from '../interfaces/mutationResponse.interface';
import ResponseError from './error.response';

export default class APIResponse {
  static sendError(error: ResponseError | any): IMutationResponse {
    return {...error, status: false, data: null};
  }

  static send<T>(data: T, message: string): IMutationResponse<T> {
    const d = {message, status: true, data, code: 200};
    console.log(d);
    return d;
  }
}
