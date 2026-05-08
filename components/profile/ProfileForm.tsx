"use client";

import { useFormik } from "formik";
import { useAuth } from "@/hooks/useAuth";
import { profileSchema } from "@/lib/validation/authSchemas";
import { getErrorMessage } from "@/lib/utils";
import { Toast, useToast } from "@/components/common/Toast";
import { MultiSelectField, TextInput } from "@/components/common/FormControls";
import { useState } from "react";
import { User } from "@/types/index";
import {
  ArrowLeft,
  KeyRound,
  Lock,
  Mail,
  Phone,
  User as UserIcon,
} from "lucide-react";
import Link from "next/link";

const PROJECT_OPTIONS = [
  "Web Development",
  "Mobile App",
  "AI/ML",
  "Data Science",
  "Cloud Infrastructure",
];
const BUDGET_OPTIONS = ["$0-10K", "$10K-50K", "$50K-100K", "$100K+"];

export function ProfileForm() {
  const { user, updateProfile } = useAuth();
  const { toasts, showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      password: "",
      securePin: "",
      projects: user?.projects || [],
      budgets: user?.budgets || [],
    },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const updateData: Partial<User> = {
          fullName: values.fullName,
          mobile: values.mobile,
          projects: values.projects,
          budgets: values.budgets,
        };

        updateProfile(updateData);
        showToast("Profile updated successfully!", "success");
      } catch (error: unknown) {
        showToast(getErrorMessage(error, "Failed to update profile"), "error");
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
      <div className="mb-6 flex items-center gap-2">
        <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 max-w-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Full Name"
            type="text"
            icon={UserIcon}
            placeholder="Enter your full name"
            error={formik.touched.fullName ? formik.errors.fullName : undefined}
            {...formik.getFieldProps("fullName")}
          />

          <TextInput
            label="Email Address"
            type="email"
            icon={Mail}
            value={formik.values.email}
            disabled
            readOnly
          />

          <TextInput
            label="Mobile Number"
            type="tel"
            icon={Phone}
            placeholder="Enter 10-digit mobile number"
            error={formik.touched.mobile ? formik.errors.mobile : undefined}
            {...formik.getFieldProps("mobile")}
          />

          <TextInput
            label="Password (Optional)"
            type="password"
            icon={Lock}
            placeholder="Leave blank to keep current password"
            error={formik.touched.password ? formik.errors.password : undefined}
            {...formik.getFieldProps("password")}
          />

          <TextInput
            label="Secure PIN (Optional)"
            type="password"
            icon={KeyRound}
            placeholder="4-digit PIN"
            maxLength={4}
            error={
              formik.touched.securePin ? formik.errors.securePin : undefined
            }
            {...formik.getFieldProps("securePin")}
          />
        </div>

        <div className="mt-8">
          <MultiSelectField
            label="Projects"
            options={PROJECT_OPTIONS}
            values={formik.values.projects}
            onToggle={(project) => handleCheckboxChange("projects", project)}
          />
        </div>

        <div className="mt-8">
          <MultiSelectField
            label="Budget"
            options={BUDGET_OPTIONS}
            values={formik.values.budgets}
            onToggle={(budget) => handleCheckboxChange("budgets", budget)}
          />
        </div>

        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>

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
