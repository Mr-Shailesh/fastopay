"use client";

import { useState } from "react";
import {
  Toast as ShadcnToast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
}

const toastVariant = {
  success: "success",
  error: "destructive",
  info: "default",
} as const;

export function Toast({ message, type = "info" }: ToastProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ToastProvider swipeDirection="right">
      <ShadcnToast
        open={isOpen}
        onOpenChange={setIsOpen}
        duration={3000}
        variant={toastVariant[type]}
      >
        <ToastDescription>{message}</ToastDescription>
        <ToastClose />
      </ShadcnToast>
      <ToastViewport />
    </ToastProvider>
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
