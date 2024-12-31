import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import useAxios from "./useAxios";
import { SignInFormData } from "../models/FormData";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "./useSnackbar";

interface AuthContextProps {
  auth: boolean | undefined;
  signIn: ({}: SignInFormData) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  auth: undefined,
  signIn: () => {},
  signOut: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const apiClient = useAxios();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation("translation", { keyPrefix: "auth" });

  useEffect(() => {
    const getAuth = async () => {
      try {
        await apiClient.get<{ success: boolean }>("/api/auth");
        setAuth(true);
      } catch (error) {
        snackbar.close();
        setAuth(false);
      }
    };
    getAuth();
  }, []);

  const signIn = async (requestBody: SignInFormData) => {
    await apiClient.post<{ success: boolean }>("/api/signin", requestBody);
    setAuth(true);
    navigate("/dashboard");
    snackbar.open("success", t("signIn"));
  };

  const signOut = async () => {
    await apiClient.get<{ success: boolean }>("/api/signout");
    setAuth(false);
    snackbar.open("success", t("signOut"));
    navigate("/start");
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
