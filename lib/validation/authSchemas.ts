import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  fullName: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be a valid 10-digit number")
    .required("Mobile number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  securePin: yup
    .string()
    .matches(/^[0-9]{4}$/, "Secure PIN must be a 4-digit number")
    .required("Secure PIN is required"),
});

export const profileSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile must be a valid 10-digit number")
    .required("Mobile number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .nullable()
    .notRequired(),
  securePin: yup
    .string()
    .matches(/^[0-9]{4}$/, "Secure PIN must be a 4-digit number")
    .nullable()
    .notRequired(),
  projects: yup.array().of(yup.string()).optional(),
  budgets: yup.array().of(yup.string()).optional(),
});
