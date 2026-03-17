"use client";

import { useAdminFast } from "@pamfilico/adminfast-ui";

/**
 * Client component that reads from AdminFastProvider via useAdminFast().
 * Demonstrates the provider is working.
 */
export function AdminFastAppInfo() {
  const { appId, apiBaseUrl, locale, blogBasePath } = useAdminFast();

  return (
    <div
      style={{
        padding: "0.5rem 1rem",
        background: "#f5f5f5",
        fontSize: "0.85rem",
        borderBottom: "1px solid #eee",
      }}
    >
      <strong>AdminFastProvider config:</strong> appId={appId} | locale={locale}{" "}
      | blogBasePath={blogBasePath} | apiBaseUrl=
      {apiBaseUrl.length > 40 ? `${apiBaseUrl.slice(0, 40)}...` : apiBaseUrl}
    </div>
  );
}
