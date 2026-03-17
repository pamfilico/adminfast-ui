import type { Metadata } from "next";
import { AdminFastProvider } from "@pamfilico/adminfast-ui";
import { AdminFastAppInfo } from "./components/AdminFastAppInfo";

const MOCK_API_URL =
  process.env.BLOG_TEST_API_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3007");

export const metadata: Metadata = {
  title: "Blog Test App - AdminFast UI",
  description: "Test app for @pamfilico/adminfast-ui blog components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        <AdminFastProvider
          appId="test-app"
          apiBaseUrl={MOCK_API_URL}
          locale="en"
          revalidate={60}
          blogBasePath="/blogs"
        >
          <AdminFastAppInfo />
          {children}
        </AdminFastProvider>
      </body>
    </html>
  );
}
