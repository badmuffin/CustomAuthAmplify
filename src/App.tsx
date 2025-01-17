import { Amplify } from "aws-amplify";
import { AwsConfigAuth } from "./config/awsConfig";
import AmplifyAuthContextProvider  from "./context/AwsAuthAmplifyProvider";
import Router from "./Router";

const App = () => {
  Amplify.configure(AwsConfigAuth);

  return (
    <AmplifyAuthContextProvider>
      <Router />
    </AmplifyAuthContextProvider>
  );
};

export default App;
