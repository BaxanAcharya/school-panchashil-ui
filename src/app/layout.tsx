"use client";
import Login from "@/components/login";
import UserContext from "@/context/userContext";
import { profileApi } from "@/feature/auth/AuthApi";
import { IProfile } from "@/types/Auth";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<null | IProfile>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    profileApi()
      .then((res) => {
        if (res.success) {
          setUser(res.data);
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
          <>{!user ? <Login /> : children}</>
          <ToastContainer />
        </UserContext.Provider>
      </body>
    </html>
  );
}
