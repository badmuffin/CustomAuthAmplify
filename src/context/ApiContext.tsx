import { useContext, createContext, useCallback } from "react";
import axios from "axios";
import { useUserSessionContext } from "./UserSessionContextProvider";
import { IAwsApiResponse } from "../types/common";

interface IApiContextType {
  createUserWithCognitoId: (cognitoUser: {
    cogId?: string;
    email: string;
  }) => Promise<IAwsApiResponse<any>>;
  // deleteDocument: (id: string) => Promise<IAwsApiResponse<any>>;
  // deleteCollection: (id: string) => Promise<IAwsApiResponse<any>>;
  // deleteChatHistory: (
  //   userId: string,
  //   docId: string
  // ) => Promise<IAwsApiResponse<any>>;
  // getAllDocument: () => Promise<IAwsApiResponse<any>>;
  // getDocumentByUserId: (
  //   userId: string,
  //   showLoader?: boolean
  // ) => Promise<IAwsApiResponse<any>>;
  // getChatMessagesById: (userId: string, docId: string) => Promise<any>;
  // postQuery: (
  //   query: any,
  //   headers?: any,
  //   showLoader?: boolean
  // ) => Promise<string | undefined>;
  // uploadDocument: (
  //   userId: string,
  //   file: File,
  //   showLoader?: boolean
  // ) => Promise<IAwsApiResponse<any>>;
  // createCollection: (
  //   userId: string,
  //   collectionName: string,
  //   files: File[]
  // ) => Promise<IAwsApiResponse<any>>;
  // getAllCollectionByUserId: (
  //   userId: string,
  //   showLoader?: boolean
  // ) => Promise<IAwsApiResponse<any>>;
  // postCollectionQuery: (
  //   query: any,
  //   headers?: any,
  //   showLoader?: boolean
  // ) => Promise<string | undefined>;
  // getCollectionChatMessages: (collectionId: string) => Promise<any>;
  // getAllCollectionDocuments: (
  //   collectionId: string
  // ) => Promise<IAwsApiResponse<any>>;
  // addDocsToCollection: (
  //   userId: string,
  //   collectionId: string,
  //   files: File[]
  // ) => Promise<IAwsApiResponse<any>>;
  // removeDocFromCollection: (
  //   collectionDocId: string
  // ) => Promise<IAwsApiResponse<any>>;
}

const AxiosService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

export const ApiContext = createContext<IApiContextType | null>(null);
export const useApiContext = () => {
   const context = useContext(ApiContext);
  
    if (!context) {
      throw new Error(
        "useAwsAmplifyAuthContent must be used within a UserProvider"
      );
    }
  
    return context;
}

const ApiContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { setShowLoader } = useUserSessionContext();

  const get = useCallback(
    async (
      endpoint: string,
      showLoader = true
    ): Promise<IAwsApiResponse<any>> => {
      setShowLoader(showLoader);
      return AxiosService.get(endpoint)
        .then((res) => {
          console.log(`GET: ${endpoint} res`, res.status);
          return { success: true, errorMsg: "", response: res.data };
        })
        .catch((err) => {
          console.log(`GET - ${endpoint} err`, err);
          return { success: false, errorMsg: err.message, response: {} };
        })
        .finally(() => setShowLoader(false));
    },
    [setShowLoader]
  );

  const post = useCallback(
    async (
      endpoint: string,
      data: any,
      headers?: any,
      showLoader = true
    ): Promise<IAwsApiResponse<any>> => {
      setShowLoader(showLoader);
      return AxiosService.post(endpoint, data, headers)
        .then((res) => {
          console.log(`POST: ${endpoint} res`, res.status);
          return { success: true, errorMsg: "", response: res.data };
        })
        .catch((err) => {
          console.log(`POST - ${endpoint} err`, err);
          return { success: false, errorMsg: err.message, response: {} };
        })
        .finally(() => setShowLoader(false));
    },
    [setShowLoader]
  );

  // const deleteDoc = useCallback(
  //   async (
  //     endpoint: string,
  //     showLoader = true
  //   ): Promise<IAwsApiResponse<any>> => {
  //     setShowLoader(showLoader);
  //     return AxiosService.delete(endpoint)
  //       .then((res) => {
  //         console.log(`DELETE: ${endpoint} res`, res.status);
  //         return { success: true, errorMsg: "", response: res.data };
  //       })
  //       .catch((err) => {
  //         console.log(`DELETE - ${endpoint} err`, err);
  //         return { success: false, errorMsg: err.message, response: {} };
  //       })
  //       .finally(() => {
  //         //These calls might be redundant depending on your application logic.  Consider removing if unnecessary.
  //         getAllCollectionDocuments();
  //         getAllDocument();
  //         setShowLoader(false);
  //       });
  //   },
  //   [setShowLoader, getAllCollectionDocuments, getAllDocument]
  // );

  const postFile = useCallback(
    async (
      endpoint: string,
      file: File,
      userId: string,
      showLoader = true
    ): Promise<IAwsApiResponse<any>> => {
      setShowLoader(showLoader);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userId);
      formData.append("is_docs_formatted", "false"); //changed to string
      return AxiosService.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(`POST: ${endpoint} res`, res.status);
          return { success: true, errorMsg: "", response: res.data }; //added success/error handling
        })
        .catch((err) => {
          console.log(`POST - ${endpoint} err`, err);
          return { success: false, errorMsg: err.message, response: {} }; //added success/error handling
        })
        .finally(() => setShowLoader(false));
    },
    [setShowLoader]
  );

  const createUserWithCognitoId = useCallback(
    async (cognitoUser: {
      cogId?: string;
      email: string;
    }): Promise<IAwsApiResponse<any>> => {
      const req = {
        user_id: cognitoUser.cogId,
        user_email_id: cognitoUser.email,
      };
      console.log("The  request is",req)
      const res = await post(`/user/`, req);
      return res;
    },
    [post]
  );

  
	return (
		<ApiContext.Provider
			value={{
				createUserWithCognitoId,
			}}
		>
			{children}
		</ApiContext.Provider>
	);
};

export default ApiContextProvider;


