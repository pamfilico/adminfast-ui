import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FeatureSectionVariant1 } from "@pamfilico/uicomponents/material/home";

const DEFAULT_APP_ID = "ee361e83-9a8a-4645-befc-ea46f93a2776";
const DEFAULT_ADMIN_PANEL_BASE_DOMAIN = "http://localhost:5000";

// Client-side wrapper for Storybook
const FeaturesClientWrapper = ({ locale, appId, adminPanelBaseDomain, renderComponent: RenderComponent }: any) => {
  const [features, setFeatures] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${adminPanelBaseDomain}/api/v1/apps/${appId}/features/locale/${locale}`)
      .then((res) => res.json())
      .then((json) => {
        setFeatures(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale, appId, adminPanelBaseDomain]);

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <RenderComponent
      title="Features"
      features={features}
      section_id="features_section"
    />
  );
};

const meta = {
  title: "Server/FeaturesServerComponent",
  component: FeaturesClientWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeaturesClientWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locale: "en",
    appId: DEFAULT_APP_ID,
    adminPanelBaseDomain: DEFAULT_ADMIN_PANEL_BASE_DOMAIN,
    renderComponent: FeatureSectionVariant1,
    revalidate: 86400,
  },
};

export const SpanishLocale: Story = {
  args: {
    locale: "es",
    appId: DEFAULT_APP_ID,
    adminPanelBaseDomain: DEFAULT_ADMIN_PANEL_BASE_DOMAIN,
    renderComponent: FeatureSectionVariant1,
    revalidate: 86400,
  },
};
