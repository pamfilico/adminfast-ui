import type { ComponentType, ReactNode } from "react";

export interface AdminFastLinkProps {
  href: string;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export type AdminFastLinkComponent = ComponentType<AdminFastLinkProps>;

/**
 * Config provided by AdminFastProvider. Link and notFound cannot be passed
 * through the provider (not serializable server→client). Server components
 * (BlogList, BlogPost) receive Link and notFound as props from the page.
 */
export interface AdminFastContextValue {
  appId: string;
  apiBaseUrl: string;
  locale: string;
  revalidate?: number;
  blogBasePath?: string;
}
