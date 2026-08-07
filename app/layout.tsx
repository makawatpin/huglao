import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import BottomTabBar from "@/components/BottomTabBar";
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
    default: "HUGLAO | รถพร้อมคนขับเที่ยวลาว",
    template: "%s | HUGLAO",
  },
  description: "เที่ยวลาวในแบบของคุณด้วยรถพร้อมคนขับ เลือกปลายทาง เวลา และจังหวะการเดินทางเอง ติดต่อขอราคาผ่าน LINE OA",
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
    title: "HUGLAO | เที่ยวลาวด้วยตัวเอง ให้คนท้องถิ่นพาไป",
    description: "รถพร้อมคนขับแบบส่วนตัว เลือกเส้นทางและเวลาได้เอง",
    url: SITE.website,
    siteName: SITE.name,
    locale: "th_TH",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "HUGLAO รถพร้อมคนขับเที่ยวลาว" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HUGLAO | รถพร้อมคนขับเที่ยวลาว",
    description: "เที่ยวตามแผนและจังหวะของคุณ",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={`${notoSerifThai.variable} ${notoSansThai.variable}`}>
      <body>
        <a href="#main-content" className="hl-skip-link">ข้ามไปยังเนื้อหาหลัก</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SiteHeader />
        <div id="main-content" className="pb-[74px] md:pb-0">
          {children}
          <SiteFooter />
        </div>
        <BottomTabBar />
      </body>
    </html>
  );
}
