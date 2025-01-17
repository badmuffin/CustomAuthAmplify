import { createContext, useContext, useState } from "react";
import { ICogUser, IUserData } from "../types/common";

export interface IUserSessionContextType {
  showLoader: boolean;
  setShowLoader: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: string | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<string | null>>;
  authenticatedUser: IUserData | null;
  setAuthenticatedUser: React.Dispatch<React.SetStateAction<IUserData | null>>;
  cognitoUser: ICogUser | null;
  setCognitoUser: React.Dispatch<React.SetStateAction<ICogUser | null>>;
  selectedChat: string[] | [];
  setSelectedChat: React.Dispatch<React.SetStateAction<string[] | []>>;
}
export const UserSessionContext = createContext<IUserSessionContextType | null>(
  null
);

export const useUserSessionContext = () => {
  const context = useContext(UserSessionContext);

  if (!context) {
    throw new Error(
      "useAwsAmplifyAuthContent must be used within a UserProvider"
    );
  }

  return context;
};

interface IUserSessionChildren {
  children: React.ReactNode;
}
const UserSessionContextProvider: React.FC<IUserSessionChildren> = ({
  children,
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<IUserData | null>(
    null
  );
  const [cognitoUser, setCognitoUser] = useState<ICogUser | null>(null);
  const [selectedChat, setSelectedChat] = useState<string[] | []>([]);

  return (
    <UserSessionContext.Provider
      value={{
        showLoader,
        setShowLoader,
        selectedFile,
        setSelectedFile,
        authenticatedUser,
        setAuthenticatedUser,
        cognitoUser,
        setCognitoUser,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </UserSessionContext.Provider>
  );
};
export default UserSessionContextProvider;
