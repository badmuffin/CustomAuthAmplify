import { useLocation } from "react-router-dom";
import { useAwsAmplifyAuthContent } from "../context/AwsAuthAmplifyProvider";
import { useState } from "react";
import { useApiContext } from "../context/ApiContext";
import { useUserSessionContext } from "../context/UserSessionContextProvider";

const Otp = () => {
  const { confirmUserSignUp} =
    useAwsAmplifyAuthContent();
  const {createUserWithCognitoId} = useApiContext() ;
  const {cognitoUser} = useUserSessionContext();
  //const navigate = useNavigate();
  const location = useLocation();
  const { email, otpDeliveryDestination } = location.state;

  const [otp, setOtp] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await confirmUserSignUp(email, otp);
      await createUserWithCognitoId({cogId : cognitoUser?.cogId ,email :  email})
    } catch (error) {
      console.log("An error occurred", error);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="h-4/5 w-3/5 flex flex-col gap-4 p-4">
        <h1 className="font-bold text-4xl text-center">
          Hey Welcome to AIDream Labs
        </h1>

        <div className="flex flex-col gap-2 justify-center items-center w-2/4  mx-auto shadow-2xl p-8 ">
          <div className="font-semibold">
            <h1 className="text-center  text-3xl">Verification</h1>

            <p>code sent to {otpDeliveryDestination}</p>
          </div>

          <form
            className="flex flex-col gap-4 w-full h-full text-slate-700"
            onSubmit={handleSubmit}
          >
            <div>
              <p className="font-bold mt-2">OTP</p>
              <input
                type="text"
                placeholder="Enter Your OTP"
                className="w-full mt-2 p-4 border-1 outline rounded-md"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-black text-white font-bold p-4 rounded-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
