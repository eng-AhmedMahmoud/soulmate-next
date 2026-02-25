import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOUL MATE | Beauty Salon & Spa",
  description:
    "صفحة هبوط لصالون وسبا SOUL MATE الفاخر في الدمام، مصممة لجذب عميلات جديدات وزيادة الحجوزات.",
  icons: {
    icon: "/images/soulmate-logo-fav.png",
    apple: "/images/soulmate-logo-fav.png",
  },
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5CG7XGZ5');`,
          }}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5CG7XGZ5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
