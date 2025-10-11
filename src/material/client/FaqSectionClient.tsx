'use client';

import React from 'react';
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

export interface FaqSectionClientProps {
  title: string;
  items: FaqItem[];
  path?: string;
  section_id?: string;
  is_section?: boolean;
}

export function FaqSectionClient(props: FaqSectionClientProps) {
  return <FaqSectionVariant1 {...props} />;
}
