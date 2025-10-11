import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FaqSectionVariant1 } from "@pamfilico/uicomponents/material/home";

const DEFAULT_APP_ID = "ee361e83-9a8a-4645-befc-ea46f93a2776";
const PRODUCTION_API_URL = "https://adminfast-prod-backend-ere5z.ondigitalocean.app";

// Client-side wrapper for Storybook
const AdminFastFaqsClientWrapper = ({ fetchFromUrl, renderComponent: RenderComponent }: any) => {
  const [faqs, setFaqs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(fetchFromUrl)
      .then((res) => res.json())
      .then((json) => {
        setFaqs(json.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [fetchFromUrl]);

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
  title: "Server/AdminFastFaqsServerComponent",
  component: AdminFastFaqsClientWrapper,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdminFastFaqsClientWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductionEnglish: Story = {
  args: {
    fetchFromUrl: `${PRODUCTION_API_URL}/api/v1/apps/${DEFAULT_APP_ID}/faqs/locale/en`,
    renderComponent: FaqSectionVariant1,
    revalidate: 86400,
  },
};

export const ProductionSpanish: Story = {
  args: {
    fetchFromUrl: `${PRODUCTION_API_URL}/api/v1/apps/${DEFAULT_APP_ID}/faqs/locale/es`,
    renderComponent: FaqSectionVariant1,
    revalidate: 86400,
  },
};

export const LocalDevelopment: Story = {
  args: {
    fetchFromUrl: `http://localhost:5000/api/v1/apps/${DEFAULT_APP_ID}/faqs/locale/en`,
    renderComponent: FaqSectionVariant1,
    revalidate: 86400,
  },
};

export const ShortRevalidation: Story = {
  args: {
    fetchFromUrl: `${PRODUCTION_API_URL}/api/v1/apps/${DEFAULT_APP_ID}/faqs/locale/en`,
    renderComponent: FaqSectionVariant1,
    revalidate: 60, // 1 minute
  },
};
