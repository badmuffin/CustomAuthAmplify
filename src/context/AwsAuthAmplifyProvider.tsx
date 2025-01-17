// ==================================================
// ============ POINT TO BE NOTED ===================
// username in the paramater is the email of the user
// ==================================================

import { createContext, useCallback, useContext } from "react";

import {
  signIn,
  confirmSignIn,
  signOut,
  confirmSignUp,
  signUp,
  getCurrentUser,
  ConfirmSignUpOutput,
  SignUpOutput,
  type SignInOutput,
  type ConfirmSignInOutput,
  type GetCurrentUserOutput,
} from "aws-amplify/auth";

import { IAwsApiResponse } from "../types/common";
import { getErrorMessage } from "../utils/utils";

interface IAwsAmplifyAuthContextType {
  signUpUser: (
    username: string,
    password: string
  ) => Promise<IAwsApiResponse<SignUpOutput>>;
  confirmSignInOtp: (
    otp: string
  ) => Promise<IAwsApiResponse<ConfirmSignInOutput>>;
  confirmUserSignUp: (
    username: string,
    otp: string
  ) => Promise<IAwsApiResponse<ConfirmSignUpOutput>>;
  signInUser: (
    username: string,
    password: string
  ) => Promise<IAwsApiResponse<SignInOutput>>;
  getCurrentLoggedInUser: () => Promise<IAwsApiResponse<GetCurrentUserOutput>>;
  signOutUser: () => Promise<IAwsApiResponse<void>>;
}
interface IAuthChildren {
  children: React.ReactNode;
}

export const AmplifyAuthContext =
  createContext<IAwsAmplifyAuthContextType | null>(null);

export const useAwsAmplifyAuthContent = () => {
  const context = useContext(AmplifyAuthContext);

  if (!context) {
    throw new Error(
      "useAwsAmplifyAuthContent must be used within a UserProvider"
    );
  }

  return context;
};

const AmplifyAuthContextProvider: React.FC<IAuthChildren> = ({ children }) => {
  // ============ Sign In - Start ==============
  const signInUser = useCallback(
    async (
      username: string,
      password: string
    ): Promise<IAwsApiResponse<SignInOutput>> => {
      try {
        const res = await signIn({
          username,
          password,
        });

        // const currentUser = await getCurrentUser();
        console.log("Sign In Response (DEBUG): ", res);
        return { success: true, errorMsg: "", response: res };
      } catch (error) {
        console.log("Sign In Error (DEBUG): ", error);
        return {
          success: false,
          errorMsg: getErrorMessage(error),
          response: null,
        };
      }
    },
    []
  );

  // =========== Sign Out ==============
  const signUpUser = useCallback(
    async (
      username: string,
      password: string
    ): Promise<IAwsApiResponse<SignUpOutput>> => {
      try {
        const res = await signUp({
          username,
          password,
        });
        console.log("Sign Up Response (DEBUG): ", res);
        return { success: true, errorMsg: "", response: res };
      } catch (error) {
        console.log("Sign Up Error (DEBUG): ", error);
        return {
          success: false,
          errorMsg: getErrorMessage(error),
          response: null,
        };
      }
    },
    []
  );

  // ============ Sign Out ================
  const signOutUser = useCallback(async (): Promise<IAwsApiResponse<void>> => {
    try {
      await signOut();
      console.log("Sign Out Successful");
      return { success: true, errorMsg: "", response: null };
    } catch (error) {
      console.log("Sign Out Error");
      return {
        success: false,
        errorMsg: getErrorMessage(error),
        response: null,
      };
    }
  }, []);

  // ============ Confirm SignIn Otp ============
  const confirmSignInOtp = useCallback(
    async (otp: string): Promise<IAwsApiResponse<ConfirmSignInOutput>> => {
      try {
        const res = await confirmSignIn({ challengeResponse: otp });
        console.log("Comfirm Sign In (DEBUG): ", res);
        return { success: true, errorMsg: "", response: res };
      } catch (error) {
        console.log("Confirm Sign In Error (Debug): ", error);
        return {
          success: false,
          errorMsg: getErrorMessage(error),
          response: null,
        };
      }
    },
    []
  );

  // ======== Confirm User Sign Up ============
  const confirmUserSignUp = useCallback(
    async (
      username: string,
      otp: string
    ): Promise<IAwsApiResponse<ConfirmSignUpOutput>> => {
      try {
        const res = await confirmSignUp({ username, confirmationCode: otp });
        console.log("Confirm User Sign Up (Debug): ", res);
        return { success: true, errorMsg: "", response: res };
      } catch (error) {
        console.log("Confirm User Sign Up Error: ", error);
        return {
          success: false,
          errorMsg: getErrorMessage(error),
          response: null,
        };
      }
    },
    []
  );

  // ======== Get Current Logged In user =======
  const getCurrentLoggedInUser = useCallback(async (): Promise<
    IAwsApiResponse<GetCurrentUserOutput>
  > => {
    try {
      const res = await getCurrentUser();
      console.log("Get Current User (DEBUG): ", res);
      return { success: true, errorMsg: "", response: res };
    } catch (error) {
      console.log("Get Current User Error(DEBUG); ", error);
      return {
        success: false,
        errorMsg: getErrorMessage(error),
        response: null,
      };
    }
  }, []);

  return (
    <AmplifyAuthContext.Provider
      value={{
        signInUser,
        signUpUser,
        signOutUser,
        confirmSignInOtp,
        confirmUserSignUp,
        getCurrentLoggedInUser,
      }}
    >
      {children}
    </AmplifyAuthContext.Provider>
  );
};

export default AmplifyAuthContextProvider;
