import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FeatureSectionVariant1 } from "@pamfilico/uicomponents/material/home";

const DEFAULT_APP_ID = "ee361e83-9a8a-4645-befc-ea46f93a2776";
const PRODUCTION_API_URL = "https://adminfast-prod-backend-ere5z.ondigitalocean.app";

// Client-side wrapper for Storybook
const AdminFastFeaturesClientWrapper = ({ appId, locale, baseUrl, renderComponent: RenderComponent, section_id }: any) => {
  const [features, setFeatures] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const url = `${baseUrl}/api/v1/apps/${appId}/features/locale/${locale}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setFeatures(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [appId, locale, baseUrl]);

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <RenderComponent
      title="Features"
      features={features}
      section_id={section_id || "features_section"}
    />
  );
};

const meta = {
  title: "Server/AdminFastFeaturesServerComponent",
  component: AdminFastFeaturesClientWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdminFastFeaturesClientWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductionEnglish: Story = {
  args: {
    appId: DEFAULT_APP_ID,
    locale: "en",
    baseUrl: PRODUCTION_API_URL,
    renderComponent: FeatureSectionVariant1,
    revalidate: 86400,
  },
};

export const ProductionSpanish: Story = {
  args: {
    appId: DEFAULT_APP_ID,
    locale: "es",
    baseUrl: PRODUCTION_API_URL,
    renderComponent: FeatureSectionVariant1,
    revalidate: 86400,
  },
};

export const LocalDevelopment: Story = {
  args: {
    appId: DEFAULT_APP_ID,
    locale: "en",
    baseUrl: "http://localhost:5000",
    renderComponent: FeatureSectionVariant1,
    revalidate: 86400,
  },
};
