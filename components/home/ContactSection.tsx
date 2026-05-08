"use client";

import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useState } from "react";
import { Building2, Calendar, Mail, Phone, Send, Users } from "lucide-react";
import {
  SelectField,
  TextareaField,
  TextInput,
} from "@/components/common/FormControls";
import { fadeIn, staggerContainer } from "./animation";
import {
  contactItems,
  contactSelects,
  quickActions,
  supportCards,
} from "@/hooks/constant";
import { ContactFormValues } from "@/types";

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const initialContactFormValues: ContactFormValues = {
  fullName: "",
  organizationName: "",
  email: "",
  phone: "",
  organizationType: "Select organization type",
  employeeCount: "Select employee count",
  requestType: "What can we help you with?",
  message: "",
};

const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9+\-\s()]{8,16}$/;

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!values.organizationName.trim()) {
    errors.organizationName = "Organization name is required";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (values.phone.trim() && !phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (values.organizationType === "Select organization type") {
    errors.organizationType = "Select organization type";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
};

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik<ContactFormValues>({
    initialValues: initialContactFormValues,
    validate: validateContactForm,
    onSubmit: (_, helpers) => {
      setIsSubmitted(true);
      helpers.resetForm();
    },
  });

  const getFieldError = (field: keyof ContactFormValues) =>
    formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : undefined;

  const handleFieldChange = (field: keyof ContactFormValues, value: string) => {
    formik.setFieldValue(field, value);
    setIsSubmitted(false);
  };

  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="contact" className="py-20 bg-white scroll-mt-16">
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="mb-14 text-center">
          <span className="inline-flex rounded-md border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
            Get in Touch
          </span>
          <h2 className="mt-5 text-4xl font-bold text-slate-950">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Contact us today for a personalized demo or to discuss how FastoPay
            can transform your organization&apos;s payment processes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.75fr]">
          <motion.aside {...fadeIn}>
            <h3 className="mb-7 text-xl font-bold text-slate-950">
              Get in Touch
            </h3>
            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.className}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{item.label}</p>
                    <p className="mt-1 text-slate-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
              <div className="mb-6 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-950">
                  Quick Actions
                </h3>
              </div>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    onClick={
                      action.label === "Request Pricing Quote"
                        ? scrollToPricing
                        : undefined
                    }
                    className="flex w-full items-center gap-3 rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-950 transition-colors hover:border-blue-300 hover:bg-blue-50"
                  >
                    <action.icon className="h-4 w-4" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          <motion.form
            {...fadeIn}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-950">
                Send us a Message
              </h3>
              <p className="mt-2 text-slate-600">
                Fill out the form below and we&apos;ll get back to you within 24
                hours
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TextInput
                label="Full Name *"
                type="text"
                name="fullName"
                icon={Users}
                placeholder="Enter your full name"
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                onChange={(event) =>
                  handleFieldChange("fullName", event.target.value)
                }
                error={getFieldError("fullName")}
              />
              <TextInput
                label="Organization Name *"
                type="text"
                name="organizationName"
                icon={Building2}
                placeholder="Enter organization name"
                value={formik.values.organizationName}
                onBlur={formik.handleBlur}
                onChange={(event) =>
                  handleFieldChange("organizationName", event.target.value)
                }
                error={getFieldError("organizationName")}
              />
              <TextInput
                label="Email Address *"
                type="email"
                name="email"
                icon={Mail}
                placeholder="Enter your email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={(event) =>
                  handleFieldChange("email", event.target.value)
                }
                error={getFieldError("email")}
              />
              <TextInput
                label="Phone Number"
                type="tel"
                name="phone"
                icon={Phone}
                placeholder="Enter your mobile number"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={(event) =>
                  handleFieldChange("phone", event.target.value)
                }
                error={getFieldError("phone")}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {contactSelects.map((select) => (
                <SelectField
                  key={select.label}
                  label={select.label}
                  name={select.name}
                  options={select.options}
                  value={formik.values[select.name]}
                  onBlur={formik.handleBlur}
                  onChange={(event) =>
                    handleFieldChange(select.name, event.target.value)
                  }
                  error={getFieldError(select.name)}
                />
              ))}
            </div>

            <div className="mt-8">
              <TextareaField
                label="Message"
                name="message"
                rows={6}
                placeholder="Tell us about your requirements, questions, or how we can help..."
                value={formik.values.message}
                onBlur={formik.handleBlur}
                onChange={(event) =>
                  handleFieldChange("message", event.target.value)
                }
                error={getFieldError("message")}
              />
            </div>

            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700"
              >
                Thanks for reaching out. We&apos;ll get back to you within 24
                hours.
              </motion.p>
            )}

            <button
              type="submit"
              className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-md bg-blue-700 px-6 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition-colors hover:bg-blue-800"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {supportCards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeIn}
              className="rounded-xl border border-slate-200 bg-white p-8 text-center"
            >
              <div
                className={`mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${card.className}`}
              >
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-950">{card.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
