import { Amplify } from "aws-amplify";
import { AwsConfigAuth } from "./config/awsConfig";
import AmplifyAuthContextProvider from "./context/AwsAuthAmplifyProvider";
import Router from "./Router";
import UserSessionContextProvider from "./context/UserSessionContextProvider";
import ApiContextProvider from "./context/ApiContext";

const App = () => {
  Amplify.configure(AwsConfigAuth);

  return (
    <UserSessionContextProvider>
      <ApiContextProvider>
        <AmplifyAuthContextProvider>
          <Router />
        </AmplifyAuthContextProvider>
      </ApiContextProvider>
    </UserSessionContextProvider>
  );
};

export default App;
