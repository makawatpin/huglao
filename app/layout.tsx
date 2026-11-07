import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BottomTabBar from "@/components/BottomTabBar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { SITE } from "@/data/site";

const notoSerifThai = localFont({
  src: "./fonts/NotoSerifThai-Variable.woff2",
  variable: "--font-serif-thai",
  weight: "100 900",
  display: "swap",
});

const notoSansThai = localFont({
  src: "./fonts/NotoSansThai-Variable.woff2",
  variable: "--font-sans-thai",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.website),
  title: {
    default: "เที่ยวลาว ทริปส่วนตัว และบริการเดินทาง | HUGLAO",
    template: "%s | HUGLAO",
  },
  description: "วางแผนเที่ยวลาวและการเดินทางส่วนตัวกับ HUGLAO เริ่มจากเวียงจันทน์ วังเวียง หรือหลวงพระบาง พร้อมเส้นทางแนะนำ รถพร้อมคนขับ และบริการเสริมตามแผน",
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
    title: "เที่ยวลาว ทริปส่วนตัว และบริการเดินทาง | HUGLAO",
    description: "วางแผนเที่ยวลาว เลือกเมืองเริ่มต้น เส้นทาง และบริการเดินทางให้เหมาะกับคุณกับ HUGLAO",
    url: SITE.website,
    siteName: SITE.name,
    locale: "th_TH",
    type: "website",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "HUGLAO รถพร้อมคนขับเที่ยวลาว" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "เที่ยวลาว ทริปส่วนตัว และบริการเดินทาง | HUGLAO",
    description: "เลือกเส้นทาง เวลา และจุดแวะได้ตามแผนของคุณ",
    images: ["/og.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE.website}/#organization`,
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.website,
  logo: `${SITE.website}/assets/huglao-emblem.png`,
  slogan: SITE.slogan,
  sameAs: [SITE.lineUrl],
  areaServed: [
    { "@type": "City", name: "Vientiane" },
    { "@type": "Country", name: "Laos" },
  ],
  telephone: "+66-95-983-2525",
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
    "HUGLAO ให้บริการวางแผนเที่ยวลาวและการเดินทางส่วนตัว มีบริการเริ่มรับในเวียงจันทน์ วังเวียง และหลวงพระบาง พร้อมรถพร้อมคนขับและบริการเสริมตามรายการที่ตกลง",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+66-95-983-2525",
    availableLanguage: ["Thai", "Lao"],
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
        <div id="main-content">
          {children}
          <SiteFooter />
        </div>
        <BottomTabBar />
        <GoogleAnalytics />
      </body>
    </html>
  );
}


