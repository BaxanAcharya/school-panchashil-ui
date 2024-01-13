import { toast } from "react-toastify";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning" | "default";
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  autoClose?: number;
  theme?: "light" | "dark";
}

const Notification = ({
  message,
  type,
  position,
  autoClose,
  theme,
}: NotificationProps) => {
  return toast(message, {
    type: type || "default",
    position: position || "top-right",
    autoClose: autoClose || 5000,
    theme: theme || "light",
  });
};

export default Notification;
