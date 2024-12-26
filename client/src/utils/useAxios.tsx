import axios from "axios";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "./useSnackbar";

export const useAxios = () => {
  const { t } = useTranslation();
  const snackbar = useSnackbar();

  const apiClient = axios.create({});

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      let errorMessage;
      if (axios.isAxiosError(error)) {
        if (error.response) {
          errorMessage = error.response.data.message;
        } else if (error.request) {
          errorMessage = t("errors.noResponse");
        } else {
          errorMessage = error.message;
        }
      } else {
        errorMessage = t("errors.unexpected");
      }
      snackbar.open("error", errorMessage);
      return Promise.reject(error);
    }
  );

  return apiClient;
};

export default useAxios;
