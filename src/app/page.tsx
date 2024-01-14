"use client";
import UserContext from "@/context/userContext";
import { useContext } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <p>{user?.email}</p>
      <p>{user?.fullName}</p>

      <br />
    </div>
  );
}
