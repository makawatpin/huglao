import type { Metadata } from "next";
import { SITE } from "@/data/site";
export type CitySlug = "vientiane" | "vang-vieng" | "luang-prabang";
export type LocalCity = Exclude<CitySlug, "vientiane">;
export type CityPrice = { id: string; category: "transfer" | "charter"; name: string; min: number; max?: number; hours?: number; duration: string; note?: string };
export const LOCAL_VAN_TERMS = {
  vehicle: "รถตู้ 13 ที่นั่ง รองรับลูกค้า 8–10 คนพร้อมสัมภาระ",
  luggage: "ต้องตรวจจำนวนและขนาดกระเป๋าก่อนยืนยัน พื้นที่สัมภาระขึ้นอยู่กับรถคันจริงและจำนวนผู้โดยสาร",
  fullDay: "08.00–18.00 น.", halfDayHours: 5, overtime: 200,
  includes: "รถ คนขับ น้ำมัน และค่าอาหารคนขับ",
  excludes: "ค่าเข้าสถานที่ กิจกรรม อาหารและที่พักของลูกค้า",
  unit: "บาทต่อคัน", vehicleType: "standardVan",
} as const;
// Owner-confirmed local prices; Vientiane remains in data/pricing.ts.
export const CITY_PRICES: Record<LocalCity, CityPrice[]> = {
  "vang-vieng": [
    { id: "vv-station", category: "transfer", name: "สถานีรถไฟ ↔ โรงแรมในตัวเมือง", min: 800, duration: "เที่ยวเดียว" },
    { id: "vv-half", category: "charter", name: "เหมาครึ่งวัน", min: 1800, hours: LOCAL_VAN_TERMS.halfDayHours, duration: `ไม่เกิน ${LOCAL_VAN_TERMS.halfDayHours} ชั่วโมง`, note: "ตกลงเวลารับ–ส่งก่อนจอง" },
    { id: "vv-day", category: "charter", name: "เหมาเต็มวัน", min: 2500, hours: 10, duration: LOCAL_VAN_TERMS.fullDay, note: "รวมรับ–ส่งสถานีรถไฟภายในวันและเวลาบริการ ไม่คิดซ้ำ" },
  ],
  "luang-prabang": [
    { id: "lp-airport", category: "transfer", name: "สนามบิน ↔ โรงแรมในตัวเมือง", min: 800, duration: "เที่ยวเดียว" },
    { id: "lp-station", category: "transfer", name: "สถานีรถไฟ ↔ โรงแรมในตัวเมือง", min: 1000, max: 1200, duration: "เที่ยวเดียว", note: "ยืนยันยอดตามจุดรับ–ส่งก่อนจอง" },
    { id: "lp-city", category: "charter", name: "เหมาเที่ยวเฉพาะภายในเมือง เต็มวัน", min: 2000, hours: 10, duration: LOCAL_VAN_TERMS.fullDay },
    { id: "lp-kuang-si", category: "charter", name: "เหมารถเต็มวัน เส้นทางในเมืองและตาดกวางสี", min: 2500, hours: 10, duration: LOCAL_VAN_TERMS.fullDay },
  ],
};
export const priceLabel = (row: CityPrice) => `${row.min.toLocaleString("en-US")}${row.max ? `–${row.max.toLocaleString("en-US")}` : ""}`;
type Photo = { src: string; alt: string };
export type CityService = { slug: CitySlug; name: string; heading: string; title: string; description: string; intro: string; pickups: string[]; routes: string[]; scope: string; photos: Photo[] };
const photo = (city: string, file: string, alt: string) => ({ src: `/images/${city}/${file}.webp`, alt });
export const CITY_SERVICES: Record<CitySlug, CityService> = {
  vientiane: {
    slug: "vientiane", name: "เวียงจันทน์", heading: "เหมารถตู้เวียงจันทร์ พร้อมคนขับ",
    title: "เหมารถตู้เวียงจันทร์ พร้อมคนขับ รับด่าน สนามบิน สถานีรถไฟ | HUGLAO",
    description: "เหมารถตู้เวียงจันทร์พร้อมคนขับ และบริการเหมารถเที่ยวเวียงจันทร์แบบส่วนตัว มีเก๋ง/SUV มินิบัสและรถบัส รับด่าน สนามบิน สถานีรถไฟ ดูราคาและตัวเลือกรถก่อนจอง",
    intro: "เหมารถเที่ยวเวียงจันทร์พร้อมคนขับ เลือกรถตู้ เก๋ง/SUV หรือมินิบัส/รถบัสให้เหมาะกับกลุ่มของคุณ เช่ารถตู้เวียงจันทน์สำหรับครอบครัวและกลุ่มเพื่อน เลือกแผนเที่ยวและจุดแวะเองได้ ทั้งรับ–ส่งเที่ยวเดียวและเหมารถตู้เที่ยวเวียงจันทร์รายวัน ตรวจรถ ราคา และจุดรับก่อนยืนยัน",
    photos: [{ src: "/assets/huglao-hiace-front-quarter.webp", alt: "รถตู้ Toyota Hiace สีขาวของทีม HUGLAO มุมด้านหน้า" }, { src: "/assets/huglao-hiace-seat-rows.webp", alt: "แถวเบาะผู้โดยสารภายในรถตู้ HUGLAO" }, { src: "/assets/huglao-hiace-luggage-space.webp", alt: "พื้นที่สัมภาระท้ายรถตู้ HUGLAO เมื่อพับเบาะแถวหลังขึ้น" }],
    pickups: ["ด่านท่านาแล้งฝั่งลาว หลังผ่านขั้นตอนตรวจคนเข้าเมือง", "สนามบินวัตไต — แจ้งเที่ยวบินและเวลาถึง", "สถานีรถไฟคำสะหวาด หรือสถานีรถไฟเวียงจันทน์ (ลาว–จีน) — ระบุสถานีและขบวนให้ชัดเจน", "โรงแรมหรือจุดนัดหมายในนครหลวงเวียงจันทน์ที่ตกลงกัน"],
    routes: ["ประตูชัย + พระธาตุหลวง + วัดสีเมือง", "แวะคาเฟ่และริมโขงตามเวลาที่ตกลง", "รับด่านหรือสนามบิน → เที่ยวในเมือง → ส่งโรงแรม"],
    scope: "เส้นทางออกนอกเมือง เช่น วังเวียง น้ำงึม และเมืองเฟือง ให้เลือกรายการในตารางและยืนยันแผนก่อนจอง ราคาจากเวียงจันทน์แยกจากบริการที่เริ่มรับในวังเวียง",
  },
  "vang-vieng": {
    slug: "vang-vieng", name: "วังเวียง", heading: "เหมารถตู้เที่ยววังเวียง พร้อมคนขับ",
    title: "เหมารถตู้เที่ยววังเวียง พร้อมคนขับ รับสถานีรถไฟ | HUGLAO",
    description: "เหมารถตู้เที่ยววังเวียงแบบส่วนตัว รับจากสถานีรถไฟหรือโรงแรม เลือกเที่ยวบลูลากูน ผาหนามไซ ถ้ำนางฟ้า และคาเฟ่ พร้อมตารางราคาและเงื่อนไขก่อนจอง",
    intro: "เริ่มรับในวังเวียงจากสถานีรถไฟหรือโรงแรม เดินทางด้วยรถตู้ส่วนตัว เลือกแผนเที่ยวและเวลาที่เหมาะกับกลุ่มของคุณ พร้อมตกลงจุดแวะก่อนจอง",
    photos: [photo("vang-vieng", "van-exterior", "รถตู้ Toyota Hiace สีขาว มุมด้านหน้าและด้านข้าง"), photo("vang-vieng", "van-passenger-seats", "เบาะผู้โดยสารสีเทาและทางเดินภายในรถตู้"), photo("vang-vieng", "van-front-cabin", "ห้องคนขับและเบาะคู่หน้าของรถตู้สีขาว"), photo("vang-vieng", "van-rear-luggage-space", "ท้ายรถตู้เมื่อเปิดประตู แสดงพื้นที่หลังเบาะแถวสุดท้าย"), photo("vang-vieng", "van-with-driver", "คนขับยืนข้างรถตู้ Toyota Hiace สีขาว")],
    pickups: ["สถานีรถไฟวังเวียง — แจ้งขบวนและเวลาถึงเพื่อนัดจุดพบรถ", "โรงแรมในตัวเมืองวังเวียง — แจ้งชื่อโรงแรมและตำแหน่งก่อนจอง"],
    routes: ["ผาหนามไซ + บลูลากูน 1 หรือ 2", "ถ้ำนางฟ้า + สะพานสีฟ้า + คาเฟ่", "ถ้ำจังและสถานที่ใกล้เมืองตามเวลา", "รับสถานี → เที่ยว → ส่งโรงแรม", "รับโรงแรม → เที่ยว → ส่งสถานี"],
    scope: "บลูลากูน 3–4 ถ้ำน้ำ และเส้นทางนอกขอบเขต ต้องตรวจเส้นทางและราคาก่อนยืนยัน บริการหลายวันให้ขอราคาตามแผน",
  },
  "luang-prabang": {
    slug: "luang-prabang", name: "หลวงพระบาง", heading: "เหมารถตู้เที่ยวหลวงพระบาง พร้อมคนขับ",
    title: "เหมารถตู้เที่ยวหลวงพระบาง พร้อมคนขับ รับสนามบิน–สถานีรถไฟ | HUGLAO",
    description: "เหมารถตู้เที่ยวหลวงพระบางพร้อมคนขับ รับสนามบิน สถานีรถไฟ หรือโรงแรม เลือกเที่ยวในเมือง น้ำตกตาดกวางสี และสถานที่ตามแผน พร้อมราคาและเงื่อนไขก่อนจอง",
    intro: "เริ่มรับจากสนามบิน สถานีรถไฟ หรือโรงแรมในหลวงพระบาง ใช้รถตู้ส่วนตัวพร้อมคนขับ เลือกเที่ยวในเมืองหรือน้ำตกตาดกวางสีตามแผนของคุณ",
    photos: [photo("luang-prabang", "van-exterior", "รถตู้ Toyota Hiace สีเงินจอดริมถนน"), photo("luang-prabang", "van-passenger-seats", "เบาะผู้โดยสารสีส้ม–ครีมและเพดานบุนวมสีครีม"), photo("luang-prabang", "van-front-cabin", "ห้องโดยสารด้านหน้าและเพดานบุนวมของรถตู้สีเงิน")],
    pickups: ["สนามบินหลวงพระบาง — แจ้งเที่ยวบินและเวลาถึง", "สถานีรถไฟหลวงพระบาง — แจ้งขบวนรถไฟและจุดส่งเพื่อยืนยันราคา", "โรงแรมในตัวเมือง — แจ้งชื่อโรงแรมและจุดพบรถก่อนจอง"],
    routes: ["เที่ยวเฉพาะในเมืองตามจุดแวะที่ตกลง", "น้ำตกตาดกวางสี + ฟาร์มควาย/คาเฟ่ตามทาง + เที่ยวในเมืองตามเวลา", "รับสนามบินหรือสถานี → เที่ยว → ส่งโรงแรม", "รับโรงแรม → เที่ยว → ส่งสนามบินหรือสถานี"],
    scope: "น้ำตกตาดกวางสีห่างตัวเมืองประมาณ 30–32 กิโลเมตร ใช้เวลาเดินทางประมาณ 45–60 นาทีต่อเที่ยว ขึ้นกับสภาพการเดินทาง ถ้ำปากอูและเส้นทางอื่นนอกขอบเขต รวมถึงบริการหลายวัน ต้องขอราคาตามแผน ไม่รวมไว้ในราคาเที่ยวน้ำตก",
  },
};
export function cityMetadata(slug: CitySlug): Metadata {
  const c = CITY_SERVICES[slug];
  return { title: { absolute: c.title }, description: c.description, alternates: { canonical: `${SITE.website}/${slug}/` }, openGraph: { title: c.title, description: c.description, url: `${SITE.website}/${slug}/`, type: "website", images: [{ url: c.photos[0].src, alt: c.photos[0].alt }] }, twitter: { card: "summary_large_image", title: c.title, description: c.description, images: [c.photos[0].src] } };
}
