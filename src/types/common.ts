export interface IAwsApiResponse<T> {
  success: boolean;
  errorMsg?: string | null;
  response?: T | null;
}