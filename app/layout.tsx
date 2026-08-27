import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BottomTabBar from "@/components/BottomTabBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/data/site";

const notoSerifThai = localFont({
  src: "./fonts/NotoSerifThai-Variable.ttf",
  variable: "--font-serif-thai",
  weight: "100 900",
  display: "swap",
});

const notoSansThai = localFont({
  src: "./fonts/NotoSansThai-Variable.ttf",
  variable: "--font-sans-thai",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.website),
  title: {
    default: "รถพร้อมคนขับเที่ยวลาว ทริปส่วนตัว | HUGLAO",
    template: "%s | HUGLAO",
  },
  description: "HUGLAO ช่วยจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์สำหรับทริปส่วนตัวในลาว เลือกเส้นทาง เวลา และจุดแวะได้ตามแผนของคุณ",
  applicationName: SITE.name,
  keywords: [
    "รถพร้อมคนขับลาว",
    "เช่ารถพร้อมคนขับเวียงจันทน์",
    "เที่ยวลาวด้วยตัวเอง",
    "รถตู้ลาว",
    "HUGLAO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "รถพร้อมคนขับเที่ยวลาว ทริปส่วนตัว | HUGLAO",
    description: "บริการตัวกลางจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์ เลือกเส้นทาง เวลา และจุดแวะได้ตามแผนของคุณ",
    url: SITE.website,
    siteName: SITE.name,
    locale: "th_TH",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "HUGLAO รถพร้อมคนขับเที่ยวลาว" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "รถพร้อมคนขับเที่ยวลาว ทริปส่วนตัว | HUGLAO",
    description: "เลือกเส้นทาง เวลา และจุดแวะได้ตามแผนของคุณ",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.website}/#organization`,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.website,
  logo: `${SITE.website}/assets/huglao-emblem.png`,
  slogan: SITE.slogan,
  telephone: "+66-95-596-2525",
  email: SITE.email,
  identifier: SITE.registrationNumber,
  address: {
    "@type": "PostalAddress",
    streetAddress: "25 ถนนโนนใบบัวสาม",
    addressLocality: "อำเภอบัวใหญ่",
    addressRegion: "นครราชสีมา",
    postalCode: "30120",
    addressCountry: "TH",
  },
  description:
    "บริษัทตัวกลางจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์ สำหรับทริปส่วนตัวจากเวียงจันทน์และการเดินทางในลาว",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+66-95-596-2525",
    availableLanguage: ["Thai"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.website}/#website`,
  name: SITE.name,
  url: `${SITE.website}/`,
  inLanguage: "th",
  publisher: { "@id": `${SITE.website}/#organization` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${notoSerifThai.variable} ${notoSansThai.variable}`}>
      <body>
        <a href="#main-content" className="hl-skip-link">ข้ามไปยังเนื้อหาหลัก</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <SiteHeader />
        <div id="main-content" className="pb-[74px] md:pb-0">
          {children}
          <SiteFooter />
        </div>
        <BottomTabBar />
        <GoogleAnalytics />
      </body>
    </html>
  );
}


