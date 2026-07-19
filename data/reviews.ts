// data/reviews.ts
// Single source of truth สำหรับรีวิวลูกค้า แก้ไข/เพิ่มรีวิวได้ที่ไฟล์นี้ไฟล์เดียว

export interface Review {
  /** ชื่อผู้รีวิว (ย่อได้ เช่น "คุณสมชาย ว.") */
  name: string;
  /** เส้นทางที่ไป เช่น "เวียงจันทน์–วังเวียง" */
  route: string;
  /** เดือน/ปีที่เดินทาง เช่น "มิ.ย. 2569" */
  date: string;
  body: string;
  source: "Google" | "Facebook" | "LINE";
  /**
   * true เฉพาะรีวิวที่ verify ได้จริงจากแหล่งข้อมูลจริง (เช่น คัดลอกมาจาก Google Reviews จริง)
   * เท่านั้น — ค่านี้ใช้ตัดสินว่าจะสร้าง Review schema (JSON-LD) ให้รีวิวนั้นหรือไม่
   * ห้ามตั้งเป็น true กับรีวิวที่แต่งขึ้นเอง เพราะการใส่ Review schema กับรีวิวปลอมผิดหลัก
   * Google และเสี่ยงโดนลงโทษ ถ้าไม่แน่ใจให้เว้น false ไว้ก่อน
   */
  verified: boolean;
}

export const reviews: Review[] = [
  {
    name: "(ระบุชื่อลูกค้าจริง)",
    route: "เวียงจันทน์–วังเวียง",
    date: "(ระบุเดือน/ปี)",
    body: "คนขับใจดี ชำนาญเส้นทางมาก รถสะอาดสะดวกสบายตลอดทริปเวียงจันทน์-วังเวียง",
    source: "Google",
    verified: false,
  },
  {
    name: "(ระบุชื่อลูกค้าจริง)",
    route: "(ระบุเส้นทางที่ไป)",
    date: "(ระบุเดือน/ปี)",
    body: "จัดโปรแกรมให้ตรงตามที่ต้องการ ราคาชัดเจนไม่มีแอบแฝง แนะนำเลยครับ",
    source: "Facebook",
    verified: false,
  },
  {
    name: "(ระบุชื่อลูกค้าจริง)",
    route: "หลวงพระบาง",
    date: "(ระบุเดือน/ปี)",
    body: "พาครอบครัวไปหลวงพระบาง 4 วัน คนขับดูแลดีมาก ปลอดภัยสบายใจ",
    source: "Google",
    verified: false,
  },
];

/**
 * ใส่ Google Place ID ตรงนี้เมื่อพร้อมฝัง Google Reviews widget จริง
 * (หาได้จาก https://developers.google.com/maps/documentation/places/web-service/place-id)
 * เมื่อตั้งค่าแล้ว การ์ด "ดูรีวิวทั้งหมดบน Google" ในหน้ารีวิวจะลิงก์ไปหน้ารีวิวจริงให้อัตโนมัติ
 */
export const googlePlaceId: string | null = null;
