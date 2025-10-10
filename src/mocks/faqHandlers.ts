import { http, HttpResponse } from "msw";

// Mock FAQ data based on backend API response format
export const mockFaqItems = [
  {
    id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
    translation_id: "faq-trans-1",
    title: "How do I get started?",
    description: "Getting started is easy! Simply sign up for an account and follow our onboarding guide. You'll be up and running in minutes.",
    seo_title: "Getting Started Guide - Your App",
    seo_description: "Learn how to get started with our platform in just a few simple steps",
    seo_keywords: "getting started, onboarding, setup, tutorial",
    is_translated: true,
    locale_code: "en",
  },
  {
    id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
    translation_id: "faq-trans-2",
    title: "What payment methods do you accept?",
    description: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers.",
    seo_title: "Payment Methods - Your App",
    seo_description: "Learn about all the payment options we support",
    seo_keywords: "payment, credit card, paypal, billing",
    is_translated: true,
    locale_code: "en",
  },
  {
    id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
    translation_id: "faq-trans-3",
    title: "How can I cancel my subscription?",
    description: "You can cancel your subscription at any time from your account settings. Navigate to Billing > Subscription and click 'Cancel Subscription'. Your access will continue until the end of your billing period.",
    seo_title: "Cancel Subscription - Your App",
    seo_description: "Step-by-step guide to canceling your subscription",
    seo_keywords: "cancel, subscription, billing, account",
    is_translated: true,
    locale_code: "en",
  },
  {
    id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
    translation_id: "faq-trans-4",
    title: "Is my data secure?",
    description: "Yes! We use industry-standard encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Our infrastructure is SOC 2 Type II certified and we perform regular security audits.",
    seo_title: "Data Security - Your App",
    seo_description: "Learn about our security measures and data protection",
    seo_keywords: "security, encryption, data protection, privacy",
    is_translated: true,
    locale_code: "en",
  },
  {
    id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
    translation_id: "faq-trans-5",
    title: "Do you offer a free trial?",
    description: "Yes, we offer a 14-day free trial with full access to all features. No credit card required. After the trial, you can choose a plan that fits your needs.",
    seo_title: "Free Trial - Your App",
    seo_description: "Try our platform free for 14 days with no credit card required",
    seo_keywords: "free trial, demo, test, no credit card",
    is_translated: true,
    locale_code: "en",
  },
  {
    id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
    translation_id: "faq-trans-6",
    title: "Can I export my data?",
    description: "Absolutely! You can export all your data at any time in standard formats (CSV, JSON, XML). Go to Settings > Data Export and select the format you prefer.",
    seo_title: "Data Export - Your App",
    seo_description: "Export your data in multiple formats",
    seo_keywords: "export, data, csv, json, download",
    is_translated: true,
    locale_code: "en",
  },
];

export const faqHandlers = [
  // GET FAQs by locale
  http.get("*/api/v1/apps/:appId/faqs/locale/:locale", async ({ params }) => {
    const { locale } = params;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      success: true,
      data: mockFaqItems.map(item => ({
        ...item,
        locale_code: locale as string,
      })),
    });
  }),
];
