import React, { ComponentType } from 'react';

interface FaqItem {
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

interface FaqsServerComponentProps {
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

export default async function FaqsServerComponent({
  locale,
  appId,
  adminPanelBaseDomain,
  renderComponent: RenderComponent,
  revalidate = 86400,
}: FaqsServerComponentProps) {
  const res = await fetch(`${adminPanelBaseDomain}/api/v1/apps/${appId}/faqs/locale/${locale}`);

  if (!res.ok) {
    throw new Error('Failed to fetch FAQs');
  }

  const json = await res.json();
  const faqs: FaqItem[] = json.data || [];

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
