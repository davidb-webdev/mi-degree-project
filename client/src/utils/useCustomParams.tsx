import { createContext, ReactNode, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router";

type ParamKey = "p" | "f" | "n";

interface CustomParamsContextProps {
  getParam: (key: ParamKey) => string | null;
  addParam: (newParam: "p" | "f" | "n", newValue: string) => void;
  removeParam: (paramToRemove: "p" | "f" | "n") => void;
  updateParams: (
    paramsToSet: Partial<Record<ParamKey, string>>,
    paramsToRemove: ParamKey[]
  ) => void;
  navigateWithParams: (path: string) => void;
  navigateAndUpdateParams: (
    path: string,
    paramsToSet: Partial<Record<ParamKey, string>>,
    paramsToRemove: ParamKey[]
  ) => void;
}

const CustomParamsContext = createContext<CustomParamsContextProps>({
  getParam: () => null,
  addParam: () => {},
  removeParam: () => {},
  updateParams: () => {},
  navigateWithParams: () => {},
  navigateAndUpdateParams: () => {}
});

export const CustomParamsProvider = ({ children }: { children: ReactNode }) => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const getParam = (key: ParamKey): string | null => params.get(key);

  const addParam = (newParam: ParamKey, newValue: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set(newParam, newValue);
    setParams(newParams);
  };

  const removeParam = (paramToRemove: ParamKey) => {
    const newParams = new URLSearchParams(params);
    newParams.delete(paramToRemove);
    setParams(newParams);
  };

  const updateParams = (
    paramsToSet: Partial<Record<ParamKey, string>>,
    paramsToRemove: ParamKey[] = []
  ) => {
    const newParams = new URLSearchParams(params);
    Object.entries(paramsToSet).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    paramsToRemove.forEach((key) => {
      newParams.delete(key);
    });
    setParams(newParams);
  };

  const navigateWithParams = (path: string) => {
    navigate(`${path}?${params.toString()}`);
  };

  const navigateAndUpdateParams = (
    path: string,
    paramsToSet: Partial<Record<ParamKey, string>>,
    paramsToRemove: ParamKey[] = []
  ) => {
    const newParams = new URLSearchParams(params);
    Object.entries(paramsToSet).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    paramsToRemove.forEach((key) => {
      newParams.delete(key);
    });
    setParams(newParams);
    navigate(`${path}?${newParams.toString()}`);
  };

  return (
    <CustomParamsContext.Provider
      value={{
        getParam,
        addParam,
        removeParam,
        updateParams,
        navigateWithParams,
        navigateAndUpdateParams
      }}
    >
      {children}
    </CustomParamsContext.Provider>
  );
};

export const useCustomParams = () => useContext(CustomParamsContext);
