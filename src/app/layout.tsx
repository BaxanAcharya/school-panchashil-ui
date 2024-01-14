"use client";
import Loader from "@/common/Loader";
import Login from "@/components/login";
import UserContext from "@/context/userContext";
import { profileApi } from "@/feature/auth/AuthApi";
import { IProfile } from "@/types/Auth";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "../components/nav";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | IProfile>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    profileApi()
      .then((res) => {
        if (res.success) {
          setUser(res.data.admin as IProfile);
        }
      })
      .catch((_) => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider
          value={{
            setUser,
            user,
          }}
        >
          <>
            {loading ? (
              <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <Loader isFullPage={true} height={80} width={80} />
              </div>
            ) : !user ? (
              <Login />
            ) : (
              <>
                <body className="font-sans flex h-screen bg-gray-100">
                  <div className="font-sans flex h-screen bg-gray-100">
                    <Nav>{children}</Nav>
                  </div>
                </body>
              </>
            )}
          </>
          <ToastContainer />
        </UserContext.Provider>
      </body>
    </html>
  );
}
