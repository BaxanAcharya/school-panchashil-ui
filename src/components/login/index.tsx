"use client";
import Button from "@/common/Button";
import Loader from "@/common/Loader";
import UserContext from "@/context/userContext";
import { loginApi } from "@/feature/auth/AuthApi";
import { IProfile } from "@/types/Auth";
import { accessToken, refreshToken } from "@/types/Key";
import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookie = new Cookies();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginApi({ email, password });

    if (!res.success) {
      setLoading(false);
      return toast(
        res.message || "Something went wrong. Please try again later.",
        {
          type: "error",
          theme: "dark",
          autoClose: 1000,
        }
      );
    }
    setLoading(false);
    setUser(res.data.admin as IProfile);
    const accessTokenValue = res.data.accessToken as string;
    cookie.set(accessToken, accessTokenValue);
    const refreshTokenValue = res.data.refreshToken as string;
    cookie.set(refreshToken, refreshTokenValue);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {loading && <Loader />}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <Button
              text="Sign in"
              loading={loading}
              disabled={!email || !password}
              className={` w-fit text-white ${
                !email || !password ? "bg-blue-400" : "bg-blue-700"
              } hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center justify-center`}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
