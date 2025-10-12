import React, { ComponentType } from 'react';
import { FaqSectionClient, type FaqItem } from '../client/FaqSectionClient';

const DEFAULT_BASE_URL = 'https://adminfast-prod-backend-ere5z.ondigitalocean.app';

export type { FaqItem };

export interface AdminFastFaqsServerComponentProps {
  appId: string;
  locale: string;
  baseUrl?: string;
  section_id?: string;
  revalidate?: number;
  renderComponent?: ComponentType<{
    title: string;
    items: FaqItem[];
    path?: string;
    section_id?: string;
    is_section?: boolean;
  }>;
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
  revalidate = 86400,
  renderComponent: RenderComponent = FaqSectionClient,
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
