import { IProfile } from "@/types/Auth";
import { Context, createContext } from "react";

type UserContextType = {
  user: null | IProfile;
  setUser: (user: IProfile) => void;
};

const defaultUserContextValue: UserContextType = {
  user: null,
  setUser: () => {},
};

const UserContext: Context<UserContextType> = createContext(
  defaultUserContextValue
);
export default UserContext;
