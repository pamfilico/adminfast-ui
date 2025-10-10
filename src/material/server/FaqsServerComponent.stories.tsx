import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FaqSectionVariant1 } from "@pamfilico/uicomponents/material/home";

const DEFAULT_APP_ID = "ee361e83-9a8a-4645-befc-ea46f93a2776";
const DEFAULT_ADMIN_PANEL_BASE_DOMAIN = "http://localhost:5000";

// Client-side wrapper for Storybook
const FaqsClientWrapper = ({ locale, appId, adminPanelBaseDomain, renderComponent: RenderComponent }: any) => {
  const [faqs, setFaqs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`${adminPanelBaseDomain}/api/v1/apps/${appId}/faqs/locale/${locale}`)
      .then((res) => res.json())
      .then((json) => {
        setFaqs(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [locale, appId, adminPanelBaseDomain]);

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <RenderComponent
      title="FAQs"
      items={faqs}
      path="faqs"
      section_id="faqs_section"
      is_section={true}
    />
  );
};

const meta = {
  title: "Server/FaqsServerComponent",
  component: FaqsClientWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FaqsClientWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locale: "en",
    appId: DEFAULT_APP_ID,
    adminPanelBaseDomain: DEFAULT_ADMIN_PANEL_BASE_DOMAIN,
    renderComponent: FaqSectionVariant1,
    revalidate: 86400,
  },
};

export const SpanishLocale: Story = {
  args: {
    locale: "es",
    appId: DEFAULT_APP_ID,
    adminPanelBaseDomain: DEFAULT_ADMIN_PANEL_BASE_DOMAIN,
    renderComponent: FaqSectionVariant1,
    revalidate: 86400,
  },
};

export const ShortRevalidation: Story = {
  args: {
    locale: "en",
    appId: DEFAULT_APP_ID,
    adminPanelBaseDomain: DEFAULT_ADMIN_PANEL_BASE_DOMAIN,
    renderComponent: FaqSectionVariant1,
    revalidate: 60, // 1 minute
  },
};
