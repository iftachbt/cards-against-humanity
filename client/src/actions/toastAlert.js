import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const toster = (str) =>
  toast.success(str, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
export const errToster = (str) =>
  toast.error(str, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const infoToster = (str) =>
  toast.info(str, {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

export const awaitToast = (fn, str) =>
  toast.promise(fn, {
    pending: "waiting for answer",
    success: `${str} succeed`,
    error: `${str} something went wrong`,
  });
