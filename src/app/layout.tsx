import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOUL MATE | Beauty Salon & Spa",
  description:
    "صفحة هبوط لصالون وسبا SOUL MATE الفاخر في الدمام، مصممة لجذب عميلات جديدات وزيادة الحجوزات.",
  openGraph: {
    type: "website",
    title: "SOUL MATE | Beauty Salon & Spa",
    description:
      "صفحة هبوط لصالون وسبا SOUL MATE الفاخر في الدمام، مصممة لجذب عميلات جديدات وزيادة الحجوزات.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
