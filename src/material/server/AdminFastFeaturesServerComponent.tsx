import React from 'react';
import { FeatureSectionClient, type FeatureItem } from '../client/FeatureSectionClient';

const DEFAULT_BASE_URL = 'https://adminfast-prod-backend-ere5z.ondigitalocean.app';

export type { FeatureItem };

export interface AdminFastFeaturesServerComponentProps {
  appId: string;
  locale: string;
  baseUrl?: string;
  section_id?: string;
  revalidate?: number;
}

export async function fetchFeaturesFromUrl(
  appId: string,
  locale: string,
  baseUrl: string = DEFAULT_BASE_URL,
  revalidate: number = 86400
): Promise<FeatureItem[]> {
  const url = `${baseUrl}/api/v1/apps/${appId}/features/locale/${locale}`;
  console.log('[AdminFastFeaturesServerComponent] Fetching from URL:', url);

  const res = await fetch(url, {
    next: { revalidate }
  });

  if (!res.ok) {
    console.error('[AdminFastFeaturesServerComponent] Fetch failed with status:', res.status);
    throw new Error('Failed to fetch features');
  }

  const json = await res.json();
  console.log('[AdminFastFeaturesServerComponent] Response received:', json);
  return json.data || [];
}

export default async function AdminFastFeaturesServerComponent({
  appId,
  locale,
  baseUrl = DEFAULT_BASE_URL,
  section_id = "features_section",
  revalidate = 86400,
}: AdminFastFeaturesServerComponentProps) {
  const features = await fetchFeaturesFromUrl(appId, locale, baseUrl, revalidate);

  console.log('[AdminFastFeaturesServerComponent] Features fetched:', features.length, features);

  if (features.length === 0) {
    console.log('[AdminFastFeaturesServerComponent] No features found, returning null');
    return null;
  }

  console.log('[AdminFastFeaturesServerComponent] Rendering features section');
  return (
    <FeatureSectionClient
      title="Features"
      features={features}
      section_id={section_id}
    />
  );
}
