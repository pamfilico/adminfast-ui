"use client";

import React from "react";
import { AdminFastContext } from "./AdminFastContext";
import type { AdminFastContextValue } from "./types";

export interface AdminFastProviderProps extends AdminFastContextValue {
  children: React.ReactNode;
}

/**
 * Provides AdminFast config (appId, apiBaseUrl, locale, etc.) to client components
 * via useAdminFast(). Server components (BlogList, BlogPost) receive Link and
 * notFound as props from the page—they cannot be passed through the provider.
 */
export function AdminFastProvider({
  children,
  appId,
  apiBaseUrl,
  locale,
  revalidate,
  blogBasePath = "/blogs",
}: AdminFastProviderProps) {
  const value: AdminFastContextValue = {
    appId,
    apiBaseUrl,
    locale,
    revalidate,
    blogBasePath,
  };

  return (
    <AdminFastContext.Provider value={value}>{children}</AdminFastContext.Provider>
  );
}
