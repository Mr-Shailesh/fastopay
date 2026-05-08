"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/lib/validation/authSchemas";
import { getErrorMessage } from "@/lib/utils";
import { Toast, useToast } from "@/components/common/Toast";
import { TextInput } from "@/components/common/FormControls";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { toasts, showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await login(values.email, values.password);
        showToast("Login successful!", "success");
        router.push("/dashboard");
      } catch (error: unknown) {
        showToast(getErrorMessage(error, "Login failed"), "error");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-full space-y-5">
        <TextInput
          label="Email Address"
          type="email"
          icon={Mail}
          placeholder="Enter your email"
          error={formik.touched.email ? formik.errors.email : undefined}
          {...formik.getFieldProps("email")}
        />

        <TextInput
          label="Password"
          type="password"
          icon={Lock}
          placeholder="Enter your password"
          error={formik.touched.password ? formik.errors.password : undefined}
          {...formik.getFieldProps("password")}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-md bg-blue-600 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700 disabled:translate-y-0 disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-blue-700 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </>
  );
}
