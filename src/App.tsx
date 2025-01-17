import { Amplify } from "aws-amplify";
import { AwsConfigAuth } from "./config/awsConfig";
import { AmplifyAuthContextProvider } from "./context/AwsAuthAmplifyProvider";

const App = () => {
  Amplify.configure(AwsConfigAuth);

  return (
    <AmplifyAuthContextProvider>
      <div className="text-red-700">App</div>
    </AmplifyAuthContextProvider>
  );
};

export default App;
