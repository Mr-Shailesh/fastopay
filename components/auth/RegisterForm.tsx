"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/lib/validation/authSchemas";
import { getErrorMessage } from "@/lib/utils";
import { Toast, useToast } from "@/components/common/Toast";
import { MultiSelectField, TextInput } from "@/components/common/FormControls";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, KeyRound, Lock, Mail, Phone, User } from "lucide-react";

const PROJECT_OPTIONS = [
  "Web Development",
  "Mobile App",
  "AI/ML",
  "Data Science",
  "Cloud Infrastructure",
];
const BUDGET_OPTIONS = ["$0-10K", "$10K-50K", "$50K-100K", "$100K+"];

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const { toasts, showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      mobile: "",
      password: "",
      securePin: "",
      projects: [] as string[],
      budgets: [] as string[],
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await register(values);
        showToast("Registration successful! Redirecting...", "success");
        router.push("/dashboard");
      } catch (error: unknown) {
        showToast(getErrorMessage(error, "Registration failed"), "error");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleCheckboxChange = (
    field: "projects" | "budgets",
    value: string,
  ) => {
    const currentArray = formik.values[field];
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value];
    formik.setFieldValue(field, newArray);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="w-full space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextInput
            label="Email"
            type="email"
            icon={Mail}
            placeholder="Enter email"
            error={formik.touched.email ? formik.errors.email : undefined}
            {...formik.getFieldProps("email")}
          />

          <TextInput
            label="Full Name"
            type="text"
            icon={User}
            placeholder="Enter full name"
            error={formik.touched.fullName ? formik.errors.fullName : undefined}
            {...formik.getFieldProps("fullName")}
          />

          <TextInput
            label="Mobile"
            type="tel"
            icon={Phone}
            leadingAddon="+91"
            placeholder="Enter mobile"
            error={formik.touched.mobile ? formik.errors.mobile : undefined}
            {...formik.getFieldProps("mobile")}
          />

          <TextInput
            label="Password"
            type="password"
            icon={Lock}
            placeholder="Enter your password"
            error={formik.touched.password ? formik.errors.password : undefined}
            {...formik.getFieldProps("password")}
          />

          <TextInput
            label="Secure PIN (4 digits)"
            type="password"
            icon={KeyRound}
            placeholder="Enter 4-digit PIN"
            maxLength={4}
            error={
              formik.touched.securePin ? formik.errors.securePin : undefined
            }
            {...formik.getFieldProps("securePin")}
          />
        </div>

        <MultiSelectField
          label="Project (multi-select)"
          options={PROJECT_OPTIONS}
          values={formik.values.projects}
          onToggle={(project) => handleCheckboxChange("projects", project)}
          columnsClassName="grid-cols-1 sm:grid-cols-3"
        />

        <MultiSelectField
          label="Budget (multi-select)"
          options={BUDGET_OPTIONS}
          values={formik.values.budgets}
          onToggle={(budget) => handleCheckboxChange("budgets", budget)}
          columnsClassName="grid-cols-2 sm:grid-cols-4"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-md bg-blue-500 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-600 disabled:translate-y-0 disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Next"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-slate-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-blue-700 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-blue-900 hover:text-blue-700"
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
