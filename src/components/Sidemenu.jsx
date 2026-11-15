import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "@fontsource/ubuntu";
import {
  ArrowDownTrayIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ChevronLeftIcon,
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useScrollPosition } from "../hooks/useScrollPosition";

const APPOINTMENT_URL = "https://appointment.populardiagnostic.com/appointment";

const ICONS = {
  phone: PhoneIcon,
  download: ArrowDownTrayIcon,
  "user-doctor": UserIcon,
  calendar: CalendarIcon,
  "map-pin": MapPinIcon,
  heart: HeartIcon,
  "question-circle": QuestionMarkCircleIcon,
  building: BuildingOfficeIcon,
};

const appointment = (id, label, description, priority = "high") => ({
  id,
  label,
  description,
  priority,
  icon: "calendar",
  href: APPOINTMENT_URL,
  external: true,
  type: priority === "high" ? "primary" : "secondary",
});

// Same per-page table the smart menu had, with time-of-day, tracking and
// suggestions removed. Array order is display order, highest priority first.
const pageActions = (path) => {
  if (path === "/") {
    return [
      { id: "report-download", label: "Download Reports", icon: "download", href: "/patient_portal", priority: "high", type: "primary", description: "Access and download your medical reports" },
      { id: "find-doctor", label: "Find Doctor", icon: "user-doctor", href: "/our-doctors", priority: "high", type: "primary", description: "Search for doctors and consultants" },
      appointment("book-appointment", "Book Appointment", "Schedule your medical appointment online"),
    ];
  }
  if (path.includes("/our-doctors")) {
    return [
      appointment("book-appointment", "Book Appointment", "Schedule appointment with selected doctor"),
      { id: "find-branch", label: "Find Branch", icon: "map-pin", href: "/our-branches", priority: "medium", type: "secondary", description: "Locate nearest branch for consultation" },
    ];
  }
  if (path.includes("/our-branches")) {
    return [
      { id: "branch-hotlines", label: "Branch Hotlines", icon: "phone", href: "/hotlines", priority: "high", type: "primary", description: "Get contact numbers for all branches" },
      { id: "health-packages", label: "Health Packages", icon: "heart", href: "/health", priority: "medium", type: "secondary", description: "Explore health packages for Dhanmondi" },
    ];
  }
  if (path.includes("/health")) {
    return [
      appointment("book-health-appointment", "Book Package", "Book your health package appointment"),
      { id: "dhanmondi-branch", label: "Dhanmondi Branch", icon: "building", href: "/our-branches", priority: "medium", type: "secondary", description: "Find Dhanmondi branch location and details" },
    ];
  }
  if (path.includes("/patient_portal")) {
    return [
      { id: "support-complain", label: "Need Support?", icon: "question-circle", href: "https://complain.populardiagnostic.com/", external: true, priority: "high", type: "primary", description: "Submit complaints or get help" },
      appointment("follow-up-appointment", "Follow-up Appointment", "Book follow-up consultation", "medium"),
    ];
  }
  if (path.includes("/hotlines")) {
    return [
      appointment("online-appointment", "Online Booking", "Book appointment online instead of calling"),
      { id: "find-branches", label: "All Branches", icon: "building", href: "/our-branches", priority: "medium", type: "secondary", description: "View all branch locations and services" },
    ];
  }
  return [];
};

// On the hotlines page the numbers are already on screen, so the button calls.
const hotlineAction = (path) => ({
  id: "hotline",
  label: "Medical Hotline",
  icon: "phone",
  priority: "high",
  type: "primary",
  ...(path === "/hotlines"
    ? { href: "tel:10636", external: true, description: "Call for medical consultation" }
    : { to: "/hotlines", description: "View hotline numbers and information" }),
});

const ActionButton = ({ action, isExpanded }) => {
  const Icon = ICONS[action.icon];
  const face = (
    <span
      className={clsx(
        "relative flex items-center justify-center rounded-xl border bg-white/95 p-3 shadow-depth-3 group-hover:shadow-depth-4",
        action.type === "primary"
          ? "border-PDCL-green/30 text-PDCL-green hover:border-PDCL-green/50 hover:bg-emerald-50"
          : "border-gray-200/80 text-gray-700 hover:border-PDCL-green/30 hover:bg-gray-50 hover:text-PDCL-green"
      )}>
      <Icon className="h-5 w-5" />
      {action.priority === "high" && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-PDCL-green ring-2 ring-white" />
      )}
    </span>
  );

  return (
    <div className="group relative flex items-center justify-end">
      <div
        className={clsx(
          "absolute right-full z-20 mr-3 select-none whitespace-nowrap rounded-xl border border-PDCL-green/20 bg-white/95 px-3.5 py-2 font-ubuntu text-xs font-semibold text-gray-900 shadow-depth-2",
          isExpanded ? "opacity-100" : "pointer-events-none opacity-0 group-hover:opacity-100"
        )}>
        {action.label}
      </div>
      {action.to ? (
        <Link to={action.to} aria-label={action.description}>
          {face}
        </Link>
      ) : (
        <a
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener noreferrer" : undefined}
          aria-label={action.description}>
          {face}
        </a>
      )}
    </div>
  );
};

const Sidemenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { pathname } = useLocation();
  const { direction, y } = useScrollPosition();

  useEffect(() => {
    if (direction === "up" && y > 200) {
      setIsExpanded(false);
    }
  }, [direction, y]);

  const actions = [hotlineAction(pathname), ...pageActions(pathname)];

  return (
    <aside className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 sm:block" aria-label="Quick actions">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            "absolute top-1/2 z-10 -translate-y-1/2 rounded-full border border-PDCL-green/30 bg-white/95 p-2 text-PDCL-green shadow-depth-2 hover:border-PDCL-green hover:text-PDCL-green-light focus:outline-none focus:ring-2 focus:ring-PDCL-green/40",
            isExpanded ? "-left-56" : "-left-10"
          )}
          aria-label={isExpanded ? "Collapse quick actions" : "Expand quick actions"}>
          <ChevronLeftIcon className={clsx("h-4 w-4", isExpanded && "rotate-180")} />
        </button>
        <div className="space-y-3">
          {actions.map((action) => (
            <ActionButton key={action.id} action={action} isExpanded={isExpanded} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidemenu;
