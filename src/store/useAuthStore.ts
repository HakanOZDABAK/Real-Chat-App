import { create } from "zustand";
import Cookies from "universal-cookie";

type Auth = {
  isAuth: any;
  setIsAuth:any
};
const cookies = new Cookies()

export const useAuthStore = create<Auth>((set) => ({
  isAuth: cookies.get("auth-token"),
  setIsAuth:(isAuth:any) =>set(()=>({isAuth})) // Başlangıç durumu false olarak ayarlandı
}));