import React, { ComponentType } from 'react';

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

export interface FaqsServerComponentProps {
  locale: string;
  appId: string;
  adminPanelBaseDomain: string;
  renderComponent: ComponentType<{
    title: string;
    items: FaqItem[];
    path?: string;
    section_id?: string;
    is_section?: boolean;
  }>;
  revalidate?: number;
}

export async function fetchFaqs(
  locale: string,
  appId: string,
  adminPanelBaseDomain: string
): Promise<FaqItem[]> {
  const res = await fetch(`${adminPanelBaseDomain}/api/v1/apps/${appId}/faqs/locale/${locale}`, {
    next: { revalidate: 86400 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }

  const json = await res.json();
  return json.data || [];
}

export default async function FaqsServerComponent({
  locale,
  appId,
  adminPanelBaseDomain,
  renderComponent: RenderComponent,
  revalidate = 86400,
}: FaqsServerComponentProps) {
  const faqs = await fetchFaqs(locale, appId, adminPanelBaseDomain);

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
