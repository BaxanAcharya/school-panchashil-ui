import { Method, fetcher } from "@/lib/fetcher";
import { ILogin } from "@/types/Auth";

const loginApi = async (auth: ILogin) => {
  const res = await fetcher("/admin/login", Method.POST, auth);
  return res;
};
export { loginApi };
