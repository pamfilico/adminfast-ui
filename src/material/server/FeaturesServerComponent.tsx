import React, { ComponentType } from 'react';

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

export interface FeaturesServerComponentProps {
  locale: string;
  appId: string;
  adminPanelBaseDomain: string;
  renderComponent: ComponentType<{
    title?: string;
    features: FeatureItem[];
    section_id?: string;
  }>;
  revalidate?: number;
}

export async function fetchFeatures(
  locale: string,
  appId: string,
  adminPanelBaseDomain: string
): Promise<FeatureItem[]> {
  const res = await fetch(`${adminPanelBaseDomain}/api/v1/apps/${appId}/features/locale/${locale}`, {
    next: { revalidate: 86400 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch features');
  }

  const json = await res.json();
  return json.data || [];
}

export default async function FeaturesServerComponent({
  locale,
  appId,
  adminPanelBaseDomain,
  renderComponent: RenderComponent,
  revalidate = 86400,
}: FeaturesServerComponentProps) {
  const features = await fetchFeatures(locale, appId, adminPanelBaseDomain);

  if (features.length === 0) {
    return null;
  }

  return (
    <RenderComponent
      title="Features"
      features={features}
      section_id="features_section"
    />
  );
}
