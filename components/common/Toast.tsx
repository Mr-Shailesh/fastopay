"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

export function Toast({ message, type = "info" }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const bgColor = {
    success: "bg-green-100 border-green-300",
    error: "bg-red-100 border-red-300",
    info: "bg-blue-100 border-blue-300",
  }[type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    info: "text-blue-800",
  }[type];

  const Icon =
    type === "success" ? CheckCircle : type === "error" ? AlertCircle : null;

  return (
    <div
      className={`fixed right-4 top-20 ${bgColor} z-[100] flex max-w-md items-center gap-3 rounded-lg border p-4 shadow-lg`}
    >
      {Icon && <Icon className={`w-5 h-5 ${textColor}`} />}
      <span className={`flex-1 ${textColor}`}>{message}</span>
      <button
        onClick={() => setIsVisible(false)}
        className={`${textColor} hover:opacity-70`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export const useToast = () => {
  const [toasts, setToasts] = useState<
    Array<{ id: string; message: string; type: "success" | "error" | "info" }>
  >([]);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  return { toasts, showToast };
};
