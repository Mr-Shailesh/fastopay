import { ContactSelectConfig } from "@/types";
import {
  CreditCard,
  TrendingUp,
  Users,
  Award,
  ShieldCheck,
  Zap,
  Building2,
  Clock,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Calendar,
  Smartphone,
  Monitor,
  BarChart3,
  SlidersHorizontal,
  ListChecks,
  FileText,
  BriefcaseBusiness,
  Shield,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

export const stats = [
  {
    icon: CreditCard,
    label: "Total Revenue",
    value: "$45,231",
    change: "+12.5%",
  },
  {
    icon: TrendingUp,
    label: "Total Transactions",
    value: "1,234",
    change: "+8.2%",
  },
  { icon: Users, label: "Active Customers", value: "456", change: "+5.3%" },
  {
    icon: CreditCard,
    label: "Pending Payments",
    value: "$8,900",
    change: "-2.4%",
  },
];

export const transactions = [
  {
    date: "2024-01-15",
    desc: "Payment received",
    amount: "+$500",
    status: "Completed",
  },
  {
    date: "2024-01-14",
    desc: "Invoice sent",
    amount: "+$1,200",
    status: "Completed",
  },
  {
    date: "2024-01-13",
    desc: "Subscription renewal",
    amount: "+$99",
    status: "Completed",
  },
  {
    date: "2024-01-12",
    desc: "Refund issued",
    amount: "-$150",
    status: "Completed",
  },
];

export const privacyPolicySections = [
  {
    title: "Information We Collect",
    body: "We collect account, contact, organization, payment workflow, and usage information needed to provide FastoPay services, support onboarding, secure transactions, and improve platform reliability.",
  },
  {
    title: "How We Use Information",
    body: "We use information to operate payment workflows, verify authorized users, provide reports, respond to support requests, improve our services, and comply with applicable legal and regulatory requirements.",
  },
  {
    title: "Data Protection",
    body: "We apply access controls, encryption, monitoring, and operational safeguards designed to protect business and user information from unauthorized access, misuse, alteration, or loss.",
  },
  {
    title: "Data Sharing",
    body: "We do not sell personal information. Data may be shared with service providers, banking or payment partners, compliance advisors, or authorities when required to deliver services or meet legal obligations.",
  },
  {
    title: "Contact",
    body: "For privacy questions or requests, contact us at contact@fastopay.in.",
  },
];

export const refundAndCancellationSections = [
  {
    title: "Subscription Cancellations",
    body: "Organizations may request cancellation of paid services by contacting FastoPay support. Cancellation timing and access changes depend on the active plan and billing arrangement.",
  },
  {
    title: "Refund Eligibility",
    body: "Refunds, if applicable, are reviewed case by case based on the subscribed service, usage, onboarding status, contractual terms, and any setup or implementation work already completed.",
  },
  {
    title: "Setup and Implementation Fees",
    body: "One-time setup, onboarding, integration, or implementation fees are generally non-refundable once work has started, unless otherwise agreed in writing.",
  },
  {
    title: "Processing Timeline",
    body: "Approved refunds are processed through the original payment method or agreed business account within a reasonable operational timeline.",
  },
  {
    title: "Contact",
    body: "For cancellation or refund requests, contact us at contact@fastopay.in.",
  },
];

export const termsOfServiceSections = [
  {
    title: "Use of Services",
    body: "FastoPay may be used only by authorized users and organizations for lawful business payment management, approvals, reporting, and related operational workflows.",
  },
  {
    title: "Account Responsibilities",
    body: "Organizations are responsible for maintaining accurate user roles, spending limits, approval rules, account information, and for safeguarding login credentials.",
  },
  {
    title: "Payments and Approvals",
    body: "Users must ensure payment requests, approvals, receipts, and supporting information are accurate and authorized according to their organization policies.",
  },
  {
    title: "Service Availability",
    body: "We work to provide reliable access, but services may be interrupted for maintenance, upgrades, third-party provider issues, security events, or circumstances beyond our control.",
  },
  {
    title: "Contact",
    body: "For questions about these terms, contact us at contact@fastopay.in.",
  },
];

export const authSlides = [
  "Simplifying payments within your organization — employees pay vendors directly, while managers track and verify everything in real time.",
  "FastoPay is a smart mediator that makes organizational payments simple and transparent. Managers can easily track, verify, and approve transactions.",
  "Direct vendor payments, manager verification & control, and seamless tracking — all in one place for stress-free finances.",
];

export const aboutSectionStats = [
  { value: 500, suffix: "+", label: "Users Served" },
  { value: 99.9, suffix: "%", decimals: 1, label: "Uptime" },
  { value: 500, prefix: "₹", suffix: "K+", label: "Processed" },
  { text: "Priority", label: "Support" },
];

export const aboutSectionValues = [
  {
    icon: ShieldCheck,
    title: "Compliance First",
    desc: "Built with FCRA regulations at the core, ensuring your organization stays compliant.",
  },
  {
    icon: Users,
    title: "User-Centric Design",
    desc: "Intuitive interfaces designed for both tech-savvy and non-technical users.",
  },
  {
    icon: Zap,
    title: "Efficiency Focused",
    desc: "Streamlined processes that reduce administrative overhead and increase productivity.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    desc: "Rigorous testing and quality assurance to ensure reliable, secure operations.",
  },
];

export const aboutSectionBusinessReasons = [
  "Trusted by corporates and Customers alike for effortless, compliant payments",
  "Unified platform for all small and decentralized business spends",
  "Empower your team with control, speed, and transparency, no manual reimbursements needed",
  "Flexible and affordable plans for organizations of all sizes",
];

export const aboutSectionTechnicalReasons = [
  "Enterprise-grade data security and encryption",
  "Cloud infrastructure built for scale and reliability",
  "Regular product enhancements based on user feedback",
  "Open APIs for ERP, HRMS, and accounting integrations",
];

export const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "contact@fastopay.in",
    className: "bg-blue-100 text-blue-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 97693 23616",
    className: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Mumbai, Maharashtra, India",
    className: "bg-violet-100 text-violet-600",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon-Fri: 9:00 AM - 6:00 PM IST",
    className: "bg-orange-100 text-orange-600",
  },
];

export const quickActions = [
  { icon: Users, label: "Request Pricing Quote" },
  { icon: Building2, label: "Download Brochure" },
];

export const supportCards = [
  {
    icon: MessageSquare,
    title: "24-Hour Response",
    desc: "Quick replies during business days",
    className: "bg-blue-100 text-blue-600",
  },
  {
    icon: Calendar,
    title: "Free Consultation",
    desc: "30-minute discussion",
    className: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "Business payment specialists",
    className: "bg-violet-100 text-violet-600",
  },
];

export const contactSelects: ContactSelectConfig[] = [
  {
    name: "organizationType",
    label: "Organization Type *",
    options: [
      "Select organization type",
      "Startup",
      "SME",
      "Enterprise",
      "Foundation",
    ],
  },
  {
    name: "employeeCount",
    label: "Number of Employees",
    options: ["Select employee count", "1-5", "6-25", "26-100", "100+"],
  },
  {
    name: "requestType",
    label: "Request Type",
    options: [
      "What can we help you with?",
      "Pricing quote",
      "Product demo",
      "Partnership",
      "Support",
    ],
  },
];

export const adminCards = [
  {
    title: "Month - November",
    value: "₹ 0.00",
    domestic: "₹ 0.00 (0)",
    foreign: "₹ 0.00 (0)",
  },
  {
    title: "Quarter - Q3",
    value: "₹ 1.00",
    domestic: "₹ 1.00 (0)",
    foreign: "₹ 0.00 (0)",
  },
  {
    title: "Year - 2025",
    value: "₹ 1.00",
    domestic: "₹ 1.00 (0)",
    foreign: "₹ 0.00 (0)",
  },
];

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const adminPanels = [
  {
    label: "Total Managers",
    value: "1",
    className: "text-pink-600 bg-pink-100",
  },
  {
    label: "Total Banks",
    value: "1",
    className: "text-emerald-600 bg-emerald-100",
  },
  {
    label: "Total Employees",
    value: "2",
    className: "text-blue-600 bg-blue-100",
  },
  {
    label: "Total Projects",
    value: "1",
    className: "text-orange-600 bg-orange-100",
  },
];

export const statusOptions = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Recovered",
];

export const mobileScreens = [
  {
    src: "/demo/mobile-login.png",
    alt: "FastoPay mobile login screen",
    width: 456,
    height: 848,
    badge: "Login Screen",
    desc: "Secure authentication with role-based access",
    color: "text-blue-600",
    badgeClass: "bg-blue-600",
  },
  {
    src: "/demo/mobile-upi.png",
    alt: "FastoPay scan and pay interface",
    width: 404,
    height: 788,
    badge: "Payment Interface",
    desc: "UPI & bank transfer with limit tracking",
    color: "text-emerald-600",
    badgeClass: "bg-emerald-600",
  },
  {
    src: "/demo/mobile-transactions.png",
    alt: "FastoPay transaction history screen",
    width: 444,
    height: 876,
    badge: "Transaction History",
    desc: "Real-time status and payment history",
    color: "text-violet-600",
    badgeClass: "bg-violet-600",
  },
  {
    src: "/demo/mobile-dashboard.png",
    alt: "FastoPay mobile dashboard with limits",
    width: 480,
    height: 860,
    badge: "Profile & Limits",
    desc: "View spending limits and account details",
    color: "text-orange-600",
    badgeClass: "bg-orange-600",
  },
];

export const adminShowcases = [
  {
    title: "User Management",
    desc: "Role assignment & limit configuration",
    badgeClass: "bg-indigo-600",
  },
  {
    title: "Reports",
    desc: "Comprehensive audit trails & analytics",
    badgeClass: "bg-teal-600",
  },
  {
    title: "Transactions",
    desc: "Real-time transaction monitoring and management",
    badgeClass: "bg-slate-600",
    wide: true,
  },
];

export const interfaceFeatures = [
  {
    icon: Smartphone,
    title: "Intuitive Mobile UI",
    desc: "User-friendly interface designed for quick payments",
    className: "bg-blue-600",
  },
  {
    icon: Monitor,
    title: "Powerful Dashboard",
    desc: "Comprehensive admin controls and analytics",
    className: "bg-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Real-time Tracking",
    desc: "Live transaction monitoring and status updates",
    className: "bg-violet-600",
  },
  {
    icon: Users,
    title: "Role-based Access",
    desc: "Customized interfaces for different user roles",
    className: "bg-orange-600",
  },
];

export const features = [
  {
    icon: Building2,
    title: "Corporate Payment Accounts",
    points: [
      "Connect your company bank account securely",
      "Define employee-level payment limits",
      "Enable instant payments without advances",
    ],
  },
  {
    icon: SlidersHorizontal,
    title: "Smart Payment Controls",
    points: [
      "Pre-approval and post-approval workflows",
      "Auto recovery from salary for unapproved spends",
      "Custom rules and spend policies per department",
    ],
    highlighted: true,
  },
  {
    icon: Smartphone,
    title: "Employee Mobile Payment App",
    points: [
      "Pay vendors, travel, or event costs directly",
      "Upload receipts instantly via mobile app",
      "Supports both UPI and NEFT payments",
    ],
  },
  {
    icon: ListChecks,
    title: "Approval Workflows",
    points: [
      "Configure multi-level approval matrices",
      "Custom roles for admins, finance teams, and managers",
      "Real-time alerts for pending approvals",
    ],
  },
  {
    icon: FileText,
    title: "Comprehensive Reporting",
    points: [
      "Automated reconciliation reports",
      "Transaction-wise audit trails",
      "Spend summaries by employee, project, or vendor",
    ],
  },
  {
    icon: BriefcaseBusiness,
    title: "Compliance & Security",
    points: [
      "Bank-grade encryption and secure APIs",
      "Dual authentication for payments",
      "Separate employee and corporate funds",
    ],
  },
];

export const steps = [
  {
    number: "1",
    title: "Setup & Configure",
    desc: "Connect your company's bank account and assign roles, spending limits, and approval flows. Our secure setup process takes just minutes.",
    className: "bg-blue-600",
  },
  {
    number: "2",
    title: "Authorise Employees",
    desc: "Add employees and define who can make payments on behalf of the company. Set individual limits and permissions for each team member.",
    className: "bg-emerald-600",
  },
  {
    number: "3",
    title: "Make Payments",
    desc: "Employees pay instantly via UPI or NEFT using the FastoPay mobile app. Upload receipts and add transaction details on the go.",
    className: "bg-violet-600",
  },
  {
    number: "4",
    title: "Track & Approve",
    desc: "Managers review payments, approve spends, and generate real-time reports, all in one dashboard. Full visibility and control at your fingertips.",
    className: "bg-orange-600",
  },
];

export const heroSlides = [
  {
    title: "Smarter Way to Manage",
    highlight: "Business Payments",
    desc: "Give Your Team the Power to Manage Business Payments, With Built-in Controls and Transparency. FastoPay enables authorized employees to make verified payments on behalf of the company using secure digital workflows, eliminating cash advances, delays, and reconciliations.",
  },
  {
    title: "Corporate Business Payments",
    highlight: "Made Easy!",
    desc: "Make Company Payments Seamless, Without Tying Up Employee Salaries. FastoPay connects a secure mobile app to your corporate account, allowing authorized employees to make business spends under preset limits. Every payment is tracked, verified, and approved in real time.",
  },
  {
    title: "Empower Employees",
    highlight: "Without Losing Control",
    desc: "Empower Employees to Spend for the Company, Without Giving Out Advances. FastoPay lets your team make secure business payments through a mobile app linked to your corporate account. Set limits, track every transaction, and eliminate the hassle of advances and reimbursements.",
  },
  {
    title: "Say Goodbye to Employee Advances",
    highlight: "and Manual Reconciliations",
    desc: "Experience the future of corporate payments with FastoPay, simple, transparent, and fully controlled. FastoPay replaces traditional advance-and-reconcile systems with a secure payment app. Employees can make approved company payments instantly, while you maintain complete oversight and control.",
  },
];

export const heroCards = [
  {
    icon: Shield,
    title: "Smart Spend Control",
    desc: "Empower your employees to make business payments directly from your corporate bank account with predefined limits and instant approvals.",
    className: "bg-blue-600",
  },
  {
    icon: Zap,
    title: "Instant Payments",
    desc: "UPI or bank transfers made securely within seconds, with built-in approval workflows and spend tracking.",
    className: "bg-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Complete Transparency",
    desc: "Gain real-time visibility on every employee spend, know where, when, and why each transaction happens.",
    className: "bg-violet-600",
  },
];

export const pricePlans = [
  {
    name: "Basic",
    price: "Free",
    setupFee: "One-Time Setup Fee",
    desc: "Perfect for small organizations and foundations getting started",
    action: "Start Now",
    href: "/auth/register",
    features: [
      "Up to 5 employee accounts",
      "Basic UPI & bank transfers",
      "Standard approval workflows",
      "Email support",
      "Monthly transaction reports",
      "Basic API access",
      "Mobile app access",
      "Standard security features",
    ],
  },
  {
    name: "Professional",
    price: "Contact Sales",
    setupFee: "One-Time Setup Fee",
    desc: "Ideal for growing organizations with advanced needs",
    action: "Contact Sales",
    href: "#contact",
    badge: "Most Popular",
    featured: true,
    features: [
      "Up to 100 employee accounts",
      "Advanced payment controls",
      "Multi-level approval workflows",
      "Priority email & phone support",
      "Real-time reporting & analytics",
      "Full API suite",
      "Advanced security & compliance",
      "Bulk user management",
      "Custom spending limits",
      "Integration support",
    ],
  },
  {
    name: "Enterprise",
    price: "Contact Sales",
    setupFee: "One-Time Setup Fee",
    desc: "Tailored solutions for large organizations",
    action: "Contact Sales",
    href: "#contact",
    badge: "Best Value",
    features: [
      "Unlimited employee accounts",
      "Custom payment workflows",
      "Dedicated approval processes",
      "24/7 dedicated support",
      "Custom reporting & dashboards",
      "White-label API solutions",
      "Fully branded mobile apps",
      "Enterprise-grade security",
      "Custom integrations",
      "On-premise deployment option",
      "Training & onboarding",
      "SLA guarantees",
    ],
  },
];

export const socialLinks = [
  { label: "Email", href: "mailto:contact@fastopay.in", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "X", href: "https://x.com", icon: Twitter },
  { label: "Facebook", href: "https://www.facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
];

export const productLinks = [
  { label: "Features", href: "/", sectionId: "features" },
  { label: "Pricing", href: "/", sectionId: "pricing" },
  { label: "Demo", href: "/", sectionId: "demo" },
  {
    label: "Account Deletion Request",
    href: "mailto:contact@fastopay.in?subject=Account%20Deletion%20Request",
    danger: true,
  },
];

export const supportLinks = [
  { label: "Contact Us", href: "/", sectionId: "contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  {
    label: "Refund and Cancellation Policy",
    href: "/refund-and-cancellation-policy",
  },
];

export const navItems = [
  { label: "Features", href: "/", id: "features" },
  { label: "Demo", href: "/", id: "demo" },
  { label: "About", href: "/", id: "about" },
  { label: "Pricing", href: "/", id: "pricing" },
  { label: "Contact", href: "/", id: "contact" },
];
