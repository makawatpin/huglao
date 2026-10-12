export type ArticlePreview = {
  title: string;
  slug: string;
  cover: string | null;
  coverAlt?: string;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
};

export const LOCAL_ARTICLES: ArticlePreview[] = [
  {
    title: "รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท กับรถตู้ HUGLAO: ลูกค้าเลือกเส้นทางเอง ปรับได้ตามใจ",
    slug: "review-one-day-trip-vientiane-2500",
    cover: "/assets/review-oneday-cover.webp",
    coverAlt: "ภาพปกรีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท กับรถตู้ HUGLAO",
    author: "HUGLAO",
    publishDate: "11 ตุลาคม 2569",
    tags: ["รีวิวลูกค้า", "เหมารถตู้", "เวียงจันทน์"],
    excerpt: "รีวิวทริปเหมารถตู้เที่ยวเวียงจันทน์ 1 วัน โปรโมชั่น 2,500 บาท ตั้งแต่ไหว้พระ ตลาดเช้า ประตูชัย ถึงพระธาตุหลวง ลูกค้าเลือกจุดเที่ยวเองและปรับได้ตามใจ",
  },
  {
    title: "ข้ามด่านหนองคายไปลาว ใช้บัตรผ่านแดนหรือพาสปอร์ต? เอกสาร เงื่อนไข และขั้นตอน",
    slug: "border-pass-vs-passport-laos",
    cover: "/assets/huglao-border-pass-cover.webp",
    coverAlt: "ข้ามด่านหนองคายไปลาว ใช้บัตรผ่านแดนหรือพาสปอร์ต",
    author: "HUGLAO",
    publishDate: "1 ตุลาคม 2569",
    tags: ["บัตรผ่านแดน", "ด่านหนองคาย", "เวียงจันทน์"],
    excerpt: "เทียบบัตรผ่านแดนกับพาสปอร์ต เที่ยวได้ที่ไหน อยู่ได้กี่วัน เอกสารสำหรับเด็ก และขั้นตอนข้ามด่านหนองคายถึงจุดรับรถฝั่งลาว",
  },
  {
    title: "วัดสีเมือง (ວັດສີເມືອງ) เวียงจันทน์ รีวิว ไหว้ขอพรเรื่องงาน หลักเมือง และวิธีเดินทาง",
    slug: "wat-si-muang-vientiane",
    cover: "/assets/wat-si-muang-front.webp",
    coverAlt: "ซุ้มประตูสิมวัดสีเมืองสีแดงทอง พร้อมพระพุทธรูปยืนและป้ายชื่อวัด",
    author: "HUGLAO",
    publishDate: "1 ตุลาคม 2569",
    tags: ["วัดสีเมือง", "ไหว้พระ", "เวียงจันทน์"],
    excerpt: "รีวิวไหว้วัดสีเมืองจากประสบการณ์จริง ประวัติหลักเมือง ความเชื่อเรื่องขอพรการงาน ขั้นตอนไหว้ และการเดินทางพร้อมรถคนขับ",
  },
  {
    title: "น้ำเปี่ยนยอละปา: วางแผนทริปป่าฝนและกิจกรรมผจญภัยจากเวียงจันทน์",
    slug: "nam-pien-yorla-pa",
    cover: "/assets/commons-waterfall-forest.webp",
    coverAlt: "ภาพวิวน้ำตกกลางป่า ใช้ประกอบบทความน้ำเปี่ยนยอละปา",
    author: "HUGLAO",
    publishDate: "8 สิงหาคม 2569",
    tags: ["น้ำเปี่ยนยอละปา", "ธรรมชาติ", "เวียงจันทน์"],
    excerpt: "รู้จักน้ำเปี่ยนยอละปา กิจกรรมเด่น ช่วงเวลาเดินทาง สิ่งที่ควรเตรียม และราคารถรับ–ส่งจากเวียงจันทน์",
  },
];

export function mergeArticlePreviews<T extends ArticlePreview>(articles: T[]): ArticlePreview[] {
  const localSlugs = new Set(LOCAL_ARTICLES.map((article) => article.slug));
  return [...LOCAL_ARTICLES, ...articles.filter((article) => !localSlugs.has(article.slug))];
}
