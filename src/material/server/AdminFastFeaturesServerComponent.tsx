import React, { ComponentType } from 'react';
import { FeatureSectionVariant1 } from '@pamfilico/uicomponents/material/home';

const DEFAULT_BASE_URL = 'https://adminfast-prod-backend-ere5z.ondigitalocean.app';

export interface FeatureItem {
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

export interface AdminFastFeaturesServerComponentProps {
  appId: string;
  locale: string;
  baseUrl?: string;
  section_id?: string;
  renderComponent?: ComponentType<{
    title?: string;
    features: FeatureItem[];
    section_id?: string;
  }>;
  revalidate?: number;
}

export async function fetchFeaturesFromUrl(
  appId: string,
  locale: string,
  baseUrl: string = DEFAULT_BASE_URL,
  revalidate: number = 86400
): Promise<FeatureItem[]> {
  const url = `${baseUrl}/api/v1/apps/${appId}/features/locale/${locale}`;
  const res = await fetch(url, {
    next: { revalidate }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch features');
  }

  const json = await res.json();
  return json.data || [];
}

export default async function AdminFastFeaturesServerComponent({
  appId,
  locale,
  baseUrl = DEFAULT_BASE_URL,
  section_id = "features_section",
  renderComponent: RenderComponent = FeatureSectionVariant1,
  revalidate = 86400,
}: AdminFastFeaturesServerComponentProps) {
  const features = await fetchFeaturesFromUrl(appId, locale, baseUrl, revalidate);

  if (features.length === 0) {
    return null;
  }

  return (
    <RenderComponent
      title="Features"
      features={features}
      section_id={section_id}
    />
  );
}
