import React, { ComponentType } from 'react';
import { FaqSectionVariant1 } from '@pamfilico/uicomponents/material/home';

const DEFAULT_BASE_URL = 'https://adminfast-prod-backend-ere5z.ondigitalocean.app';

export interface FaqItem {
  id: string;
  translation_id?: string | null;
  title: string;
  description: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  is_translated?: boolean;
  locale_code: string;
}

export interface AdminFastFaqsServerComponentProps {
  appId: string;
  locale: string;
  baseUrl?: string;
  section_id?: string;
  renderComponent?: ComponentType<{
    title: string;
    items: FaqItem[];
    path?: string;
    section_id?: string;
    is_section?: boolean;
  }>;
  revalidate?: number;
}

export async function fetchFaqsFromUrl(
  appId: string,
  locale: string,
  baseUrl: string = DEFAULT_BASE_URL,
  revalidate: number = 86400
): Promise<FaqItem[]> {
  const url = `${baseUrl}/api/v1/apps/${appId}/faqs/locale/${locale}`;
  const res = await fetch(url, {
    next: { revalidate }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }

  const json = await res.json();
  return json.data || [];
}

export default async function AdminFastFaqsServerComponent({
  appId,
  locale,
  baseUrl = DEFAULT_BASE_URL,
  section_id = "faqs_section",
  renderComponent: RenderComponent = FaqSectionVariant1,
  revalidate = 86400,
}: AdminFastFaqsServerComponentProps) {
  const faqs = await fetchFaqsFromUrl(appId, locale, baseUrl, revalidate);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <RenderComponent
      title="FAQs"
      items={faqs}
      path="faqs"
      section_id={section_id}
      is_section={true}
    />
  );
}
