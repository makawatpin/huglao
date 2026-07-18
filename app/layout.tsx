import type { Metadata } from "next";
import { Noto_Serif_Thai, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-serif-thai",
  weight: ["500", "600", "700"],
  subsets: ["thai", "latin"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-sans-thai",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://huglao.com"),
  title: "HUGLAO GROUP | เที่ยวลาว รถตู้ VIP จองรถตู้ลาว ตั๋วรถไฟลาว-จีน ไกด์นำเที่ยว",
  description:
    "ฮักลาว กรุ๊ป (HUGLAO GROUP) ผู้เชี่ยวชาญเที่ยวลาวครบวงจร บริการนายหน้าจัดหารถตู้ VIP ลาว จองรถตู้ลาวพร้อมคนขับ จองตั๋วรถไฟลาว-จีน และไกด์นำเที่ยวมืออาชีพ ทีมไทย-ลาว ดูแลตลอดทริป",
  keywords: [
    "เที่ยวลาว",
    "รถตู้ลาว",
    "จองรถตู้ลาว",
    "รถตู้ VIP ลาว",
    "ตั๋วรถไฟลาว-จีน",
    "ไกด์ลาว",
    "ทัวร์ลาว",
    "เที่ยวเวียงจันทน์",
    "เที่ยววังเวียง",
    "เที่ยวหลวงพระบาง",
    "HUGLAO",
  ],
  openGraph: {
    title: "HUGLAO GROUP | เที่ยวลาว รถตู้ VIP จองรถตู้ลาว",
    description:
      "เที่ยวลาวครบจบในที่เดียว รถตู้ VIP จองตั๋วรถไฟลาว-จีน และไกด์นำเที่ยวมืออาชีพ",
    type: "website",
    images: [{ url: "/assets/van-hero.webp", width: 750, height: 422 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${notoSerifThai.variable} ${notoSansThai.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TravelAgency",
              name: "บริษัท ฮักลาว กรุ๊ป จำกัด (HUGLAO GROUP CO., LTD.)",
              description:
                "บริการเที่ยวลาวครบวงจร นายหน้าจัดหารถตู้ VIP ลาว จองรถตู้ลาว จองตั๋วรถไฟลาว-จีน และไกด์นำเที่ยว",
              areaServed: ["Laos", "Thailand"],
              slogan: "Connecting Thailand & Laos",
              makesOffer: [
                { "@type": "Offer", name: "รถตู้ VIP ลาว / จองรถตู้ลาว" },
                { "@type": "Offer", name: "จองตั๋วรถไฟลาว-จีน" },
                { "@type": "Offer", name: "ไกด์นำเที่ยวลาว" },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
