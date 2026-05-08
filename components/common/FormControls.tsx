"use client";

import { LucideIcon } from "lucide-react";
import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface BaseFieldProps {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

interface TextInputProps
  extends
    BaseFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  leadingAddon?: string;
}

interface SelectFieldProps
  extends
    BaseFieldProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  options: string[];
}

interface TextareaFieldProps
  extends
    BaseFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {}

interface MultiSelectFieldProps {
  label: string;
  options: string[];
  values: string[];
  onToggle: (value: string) => void;
  columnsClassName?: string;
}

const labelClassName = "mb-2 block text-sm font-semibold text-slate-950";
const errorClassName = "mt-1 text-sm font-medium text-red-600";
const controlBaseClassName =
  "rounded-md border bg-white transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100";

const getControlClassName = (hasError: boolean, disabled?: boolean) =>
  `${controlBaseClassName} ${
    hasError ? "border-red-400 bg-red-50/40" : "border-slate-200"
  } ${disabled ? "bg-slate-100 text-slate-500" : ""}`;

export function TextInput({
  label,
  error,
  icon: Icon,
  leadingAddon,
  disabled,
  ...props
}: TextInputProps) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <div
        className={`flex h-11 items-center gap-3 px-3 ${getControlClassName(
          Boolean(error),
          disabled,
        )}`}
      >
        {leadingAddon && (
          <span className="shrink-0 border-r border-slate-200 pr-3 text-sm font-bold text-slate-950">
            {leadingAddon}
          </span>
        )}
        {Icon && <Icon className="h-5 w-5 shrink-0 text-slate-400" />}
        <input
          {...props}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className="h-full w-full bg-transparent text-slate-950 outline-none placeholder:text-slate-400 disabled:text-slate-500"
        />
      </div>
      {error && <p className={errorClassName}>{error}</p>}
    </label>
  );
}

export function SelectField({
  label,
  error,
  icon: Icon,
  options,
  disabled,
  ...props
}: SelectFieldProps) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <div
        className={`flex h-11 items-center gap-3 px-3 ${getControlClassName(
          Boolean(error),
          disabled,
        )}`}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0 text-slate-400" />}
        <select
          {...props}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          className="h-full w-full bg-transparent text-slate-600 outline-none disabled:text-slate-500"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      {error && <p className={errorClassName}>{error}</p>}
    </label>
  );
}

export function TextareaField({
  label,
  error,
  rows = 6,
  disabled,
  ...props
}: TextareaFieldProps) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      <textarea
        {...props}
        rows={rows}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={`w-full resize-y rounded-md border px-4 py-3 text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100 disabled:text-slate-500 ${
          error ? "border-red-400 bg-red-50/40" : "border-slate-200"
        }`}
      />
      {error && <p className={errorClassName}>{error}</p>}
    </label>
  );
}

export function MultiSelectField({
  label,
  options,
  values,
  onToggle,
  columnsClassName = "grid-cols-1 sm:grid-cols-2",
}: MultiSelectFieldProps) {
  return (
    <div>
      <span className={labelClassName}>{label}</span>
      <div className={`grid gap-2 ${columnsClassName}`}>
        {options.map((option) => {
          const isSelected = values.includes(option);

          return (
            <label
              key={option}
              className={`flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
                isSelected
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggle(option)}
                className="h-4 w-4 accent-blue-600"
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
