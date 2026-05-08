"use client";

import { LucideIcon } from "lucide-react";
import {
  FocusEventHandler,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "className" | "onChange" | "onBlur"> {
  options: string[];
  onValueChange?: (value: string) => void;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
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
  cn(
    controlBaseClassName,
    hasError ? "border-red-400 bg-red-50/40" : "border-slate-200",
    disabled ? "bg-slate-100 text-slate-500" : "",
  );

export function TextInput({
  label,
  error,
  icon: Icon,
  leadingAddon,
  disabled,
  ...props
}: TextInputProps) {
  return (
    <Label>
      <span className={labelClassName}>{label}</span>
      <div
        className={cn(
          "flex h-11 items-center gap-3 px-3",
          getControlClassName(Boolean(error), disabled),
        )}
      >
        {leadingAddon && (
          <span className="shrink-0 border-r border-slate-200 pr-3 text-sm font-bold text-slate-950">
            {leadingAddon}
          </span>
        )}
        {Icon && <Icon className="h-5 w-5 shrink-0 text-slate-400" />}
        <Input {...props} disabled={disabled} aria-invalid={Boolean(error)} />
      </div>
      {error && <p className={errorClassName}>{error}</p>}
    </Label>
  );
}

export function SelectField({
  label,
  error,
  icon: Icon,
  options,
  disabled,
  value,
  onValueChange,
  name,
  onBlur,
}: SelectFieldProps) {
  return (
    <Label>
      <span className={labelClassName}>{label}</span>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-slate-400" />
        )}
        <Select
          value={String(value || "")}
          onValueChange={onValueChange}
          name={name}
          disabled={disabled}
        >
          <SelectTrigger
            onBlur={onBlur}
            aria-invalid={Boolean(error)}
            className={cn(
              Icon ? "pl-10" : "",
              error ? "border-red-400 bg-red-50/40" : "border-slate-200",
            )}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {error && <p className={errorClassName}>{error}</p>}
    </Label>
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
    <Label>
      <span className={labelClassName}>{label}</span>
      <Textarea
        {...props}
        rows={rows}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        className={error ? "border-red-400 bg-red-50/40" : "border-slate-200"}
      />
      {error && <p className={errorClassName}>{error}</p>}
    </Label>
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
      <Label className={labelClassName}>{label}</Label>
      <div className={`grid gap-2 ${columnsClassName}`}>
        {options.map((option) => {
          const isSelected = values.includes(option);

          return (
            <label
              key={option}
              className={cn(
                "flex min-h-10 items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition-colors",
                isSelected
                  ? "border-blue-300 bg-blue-50 text-blue-700"
                  : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50",
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(option)}
              />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
