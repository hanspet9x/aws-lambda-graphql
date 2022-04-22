export interface IMutationResponse <T = null>{
  message: string;
  code: number;
  data: T;
  status: boolean;
}
