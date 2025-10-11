'use client';

import React from 'react';
import { FeatureSectionVariant1 } from '@pamfilico/uicomponents/material/home';

export interface FeatureItem {
  id: string;
  translation_id?: string | null;
  title: string;
  description: string;
  image?: string;
  seo_title?: string;
  seo_description?: string;
  seo_keywords?: string;
  is_translated?: boolean;
  locale_code: string;
}

export interface FeatureSectionClientProps {
  title?: string;
  features: FeatureItem[];
  section_id?: string;
}

export function FeatureSectionClient(props: FeatureSectionClientProps) {
  return <FeatureSectionVariant1 {...props} />;
}
