import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("The event has occurred");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen gap-2 bg-cyan-200">
      <div className="w-1/2 p-2 flex flex-col items-center gap-2 justify-center shadow-2xl bg-white">
        <h1 className="text-center text-2xl font-serif">
          Welcome to the MagAI !!
        </h1>

        <form className="flex flex-col gap-2 w-2/3 text-2xl font-serif text-slate-600">
          <label className="w-full" htmlFor="name">
            Name
          </label>

          <input
            id="name"
            className="w-full border-2 border-slate-600 outline-none p-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Enter your email"
          />

          <label className="w-full" htmlFor="email">
            Email
          </label>

          <input
            id="email"
            className="w-full border-2 border-slate-600 outline-none p-2 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
          />

          <label className="w-full" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="w-full border-2 border-slate-600 outline-none p-2 rounded-md"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Link to="/login" className="text-blue-700 underline">
            Don't have account Login
          </Link>
          <button
            className="bg-black text-white p-2 border-2 rounded-md"
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
