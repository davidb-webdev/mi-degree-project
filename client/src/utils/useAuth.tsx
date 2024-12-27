import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import useAxios from "./useAxios";
import { SignInFormData } from "../models/FormData";

interface AuthContextProps {
  user: { email: string } | undefined;
  signIn: ({}: SignInFormData) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  signIn: () => {},
  signOut: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState();
  const apiClient = useAxios();

  useEffect(() => {
    const getAuth = async () => {
      const response = await apiClient.get("/api/auth");
      setUser(response.data);
    };
    getAuth();
  }, []);

  const signIn = async (formData: SignInFormData) => {
    await apiClient.post("/api/signin", formData);
  };

  const signOut = async () => {
    await apiClient.get("/api/signout");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
