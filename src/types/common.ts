import { SignInOutput } from "@aws-amplify/auth";
export interface IAwsApiResponse<T> {
  success: boolean;
  errorMsg?: string | null;
  response?: T | null;
}

export interface IUserData {
  userId: string;
  username: string;
  email: string;
  signInDetails: SignInOutput;
}

export interface ICogUser {
  cogId: string;
  email: string;
}
