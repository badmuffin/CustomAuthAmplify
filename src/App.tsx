import { Amplify } from "aws-amplify";
import { AwsConfigAuth } from "./config/awsConfig";
import AmplifyAuthContextProvider from "./context/AwsAuthAmplifyProvider";
import Router from "./Router";
import UserSessionContextProvider from "./context/UserSessionContextProvider";

const App = () => {
  Amplify.configure(AwsConfigAuth);

  return (
    <UserSessionContextProvider>
      <AmplifyAuthContextProvider>
        <Router />
      </AmplifyAuthContextProvider>
    </UserSessionContextProvider>
  );
};

export default App;
