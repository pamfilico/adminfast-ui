"use client";

import { useContext } from "react";
import { AdminFastContext } from "./AdminFastContext";
import type { AdminFastContextValue } from "./types";

export function useAdminFast(): AdminFastContextValue {
  const ctx = useContext(AdminFastContext);
  if (!ctx) {
    throw new Error(
      "useAdminFast must be used within AdminFastProvider. Wrap your app (or the relevant section) with <AdminFastProvider>."
    );
  }
  return ctx;
}
