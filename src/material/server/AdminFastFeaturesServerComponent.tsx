import React, { ComponentType } from 'react';
import { FeatureSectionVariant1 } from '@pamfilico/uicomponents/material/home';

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
  fetchFromUrl: string;
  renderComponent?: ComponentType<{
    title?: string;
    features: FeatureItem[];
    section_id?: string;
  }>;
  revalidate?: number;
}

export async function fetchFeaturesFromUrl(
  fetchFromUrl: string,
  revalidate: number = 86400
): Promise<FeatureItem[]> {
  const res = await fetch(fetchFromUrl, {
    next: { revalidate }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch features');
  }

  const json = await res.json();
  return json.data || [];
}

export default async function AdminFastFeaturesServerComponent({
  fetchFromUrl,
  renderComponent: RenderComponent = FeatureSectionVariant1,
  revalidate = 86400,
}: AdminFastFeaturesServerComponentProps) {
  const features = await fetchFeaturesFromUrl(fetchFromUrl, revalidate);

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
