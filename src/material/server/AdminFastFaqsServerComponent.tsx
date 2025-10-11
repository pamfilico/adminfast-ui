import React, { ComponentType } from 'react';
import { FaqSectionVariant1 } from '@pamfilico/uicomponents/material/home';

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
  fetchFromUrl: string;
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
  fetchFromUrl: string,
  revalidate: number = 86400
): Promise<FaqItem[]> {
  const res = await fetch(fetchFromUrl, {
    next: { revalidate }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }

  const json = await res.json();
  return json.data || [];
}

export default async function AdminFastFaqsServerComponent({
  fetchFromUrl,
  renderComponent: RenderComponent = FaqSectionVariant1,
  revalidate = 86400,
}: AdminFastFaqsServerComponentProps) {
  const faqs = await fetchFaqsFromUrl(fetchFromUrl, revalidate);

  if (faqs.length === 0) {
    return null;
  }

  return (
    <RenderComponent
      title="FAQs"
      items={faqs}
      path="faqs"
      section_id="faqs_section"
      is_section={true}
    />
  );
}
