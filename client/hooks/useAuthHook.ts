import { isUserExist } from "@/utils";
import { useAppSelector } from "@/app/_redux";

export default function useAuthHook() {
  const { user } = useAppSelector((state) => state.auth);

  return isUserExist(user) ? true : false;
}
