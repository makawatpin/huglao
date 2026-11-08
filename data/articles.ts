import { NEW_PLACE_ARTICLES } from "./new-place-articles";
import { LANDMARKS } from "./vientiane-landmarks";
import { PICKUP_GUIDES, getPickupPhotos, CITY_NAMES } from "./pickup-guides";

export const ARTICLE_CATEGORIES = ["ที่เที่ยว", "ร้านอาหารและคาเฟ่", "การเดินทาง", "รีวิวทริป"] as const;
export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export type ArticlePreview = {
  title: string;
  slug: string;
  cover: string | null;
  coverAlt?: string;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
  category?: ArticleCategory;
};

export function getArticleCategory(article: ArticlePreview): ArticleCategory {
  if (article.category) return article.category;
  const text = [article.title, ...article.tags].join(" ");
  if (/คาเฟ่|Cafe|ร้านอาหาร|เฝอ|หมูกระทะ/i.test(text)) return "ร้านอาหารและคาเฟ่";
  if (/รีวิว|ประสบการณ์|ทริปจริง/.test(text)) return "รีวิวทริป";
  if (/บัตรผ่านแดน|พาสปอร์ต|เอกสาร|ข้ามด่าน|เตรียม|วิธีเดินทาง|เลือกรถ/.test(text)) return "การเดินทาง";
  if (/คาเฟ่|Cafe|วัด|น้ำตก|ธรรมชาติ|สถานที่|น้ำเปี่ยน|จุดชมวิว/i.test(text)) return "ที่เที่ยว";
  return "การเดินทาง";
}

export const LOCAL_ARTICLES: ArticlePreview[] = [
  ...Object.entries(NEW_PLACE_ARTICLES).map(([slug,p]): ArticlePreview => ({title:p.title,slug,cover:p.photos[0].src,coverAlt:p.photos[0].alt,author:"HUGLAO",publishDate:"8 พฤศจิกายน 2569",tags:["เวียงจันทน์"],category:p.category,excerpt:p.description})),
  { title: "ลาวอาร์ตมิวเซียม เวียงจันทน์ ค่าเข้า เช่าชุด และแผนเที่ยว", slug: "lao-art-museum-vientiane", category: "ที่เที่ยว", cover: "/images/lao-art-museum/golden-hall.webp", coverAlt: "โถงเสาแกะสลักและเพดานลวดลายสีทองของลาวอาร์ตมิวเซียม", author: "HUGLAO", publishDate: "7 พฤศจิกายน 2569", tags: ["เวียงจันทน์", "ลาวอาร์ตมิวเซียม"], excerpt: "เที่ยว Lao Art Museum พร้อมค่าเข้า แผนที่ การแต่งชุดลาว และราคาเหมารถเต็มวันรวมลาวอาร์ต" },
  { title: "ฟ้าใสหมูกระทะ เวียงจันทน์ มื้อเย็นชิ้นดาดลาว (Sindard Farsai)", slug: "farsai-mookata-vientiane", category: "ร้านอาหารและคาเฟ่", cover: "/images/farsai-vientiane/table-and-grill.webp", coverAlt: "เตาชิ้นดาดพร้อมจานเนื้อและเครื่องเคียงที่ร้านฟ้าใส", author: "HUGLAO", publishDate: "7 พฤศจิกายน 2569", tags: ["เวียงจันทน์", "ร้านอาหาร", "หมูกระทะ"], excerpt: "รู้จักชิ้นดาดฟ้าใส พร้อมภาพอาหารจริง วิธีวางแผนมื้อเย็น แผนที่ เวลาเปิดและเบอร์โทรก่อนแวะ" },
  ...Object.values(LANDMARKS).map((p): ArticlePreview => ({ title: p.title, slug: p.slug, category: "ที่เที่ยว", cover: p.photos[0].src, coverAlt: p.photos[0].alt, author: "HUGLAO", publishDate: "7 พฤศจิกายน 2569", tags: ["เวียงจันทน์", p.name], excerpt: p.description })),
  { title: "เฝอแซ่บ เวียงจันทน์ ร้านแนะนำใกล้ประตูชัย (Pho Zap)", slug: "pho-zap-vientiane", category: "ร้านอาหารและคาเฟ่", cover: "/images/pho-zap-vientiane/pho-meal.webp", coverAlt: "เฝอ ปอเปี๊ยะทอด และเครื่องเคียงจากมื้อที่ไปกินร้านเฝอแซ่บ", author: "HUGLAO", publishDate: "7 พฤศจิกายน 2569", tags: ["เวียงจันทน์", "ร้านอาหาร", "เฝอแซ่บ"], excerpt: "ร้านเฝอที่ HUGLAO เคยแวะกินใกล้ประตูชัย พร้อมเมนู งบประมาณ และข้อมูลเลือกสาขาก่อนเดินทาง" },
  ...PICKUP_GUIDES.map((p): ArticlePreview => ({ title: `${p.name}: แผนที่ ประวัติ และข้อมูลนัดรับ`, slug: p.slug, category: "การเดินทาง", cover: getPickupPhotos(p)[0].src, coverAlt: getPickupPhotos(p)[0].alt, author: "HUGLAO", publishDate: "6 พฤศจิกายน 2569", tags: [CITY_NAMES[p.city], "จุดรับ", "การเดินทาง"], excerpt: p.description })),
  {
    title: "ถ้ำจัง วังเวียง (Tham Chang Cave) เดินชมถ้ำและธรรมชาติ",
    slug: "tham-chang-cave-vang-vieng",
    category: "ที่เที่ยว",
    cover: "/images/tham-chang-vang-vieng/cave-stairs.webp",
    coverAlt: "บันไดขึ้นถ้ำจังและป้าย Jang Cave ท่ามกลางต้นไม้",
    author: "HUGLAO",
    publishDate: "6 พฤศจิกายน 2569",
    tags: ["วังเวียง", "ถ้ำจัง", "ธรรมชาติ"],
    excerpt: "ขึ้นบันไดชมถ้ำหินปูนและพักกับธรรมชาติด้านล่าง พร้อมภาพ วิดีโอ แผนที่ และข้อควรรู้เรื่องเวลาและค่าเข้า",
  },
  {
    title: "BanNam Cafe & Restaurant บ้านน้ำคาเฟ่ วังเวียง",
    slug: "bannam-cafe-vang-vieng",
    category: "ร้านอาหารและคาเฟ่",
    cover: "/images/bannam-cafe-vang-vieng/cafe-counter-sign.webp",
    coverAlt: "เคาน์เตอร์และป้าย BanNam cafe บนผนังสีเหลือง",
    author: "HUGLAO",
    publishDate: "6 พฤศจิกายน 2569",
    tags: ["วังเวียง", "คาเฟ่", "สถานที่แนะนำ"],
    excerpt: "แวะบ้านน้ำคาเฟ่ วังเวียง เลือกนั่งในร้านหรือริมน้ำ พร้อมแผนที่และข้อแนะนำสำหรับจัดเวลาแวะ",
  },
  {
    title: "The Mini Cafe & Restaurant วังเวียง คาเฟ่วิวภูเขาและทุ่งนา",
    slug: "the-mini-cafe-vang-vieng",
    category: "ร้านอาหารและคาเฟ่",
    cover: "/images/mini-cafe-vang-vieng/cafe-exterior.webp",
    coverAlt: "ป้ายหน้าร้าน The Mini Cafe & Restaurant วังเวียง",
    author: "HUGLAO",
    publishDate: "6 พฤศจิกายน 2569",
    tags: ["วังเวียง", "คาเฟ่", "สถานที่แนะนำ"],
    excerpt: "คาเฟ่และร้านอาหารวิวภูเขา มีทางเดินไม้กลางทุ่งนา พร้อมภาพบรรยากาศ เวลาเปิด แผนที่ และข้อแนะนำก่อนแวะ",
  },
  {
    title: "ทำบัตรผ่านแดนชั่วคราวหนองคาย: เอกสารและค่าบริการ",
    slug: "temporary-border-pass-xl-parking",
    category: "การเดินทาง",
    cover: "/assets/xl-parking/border-pass.webp",
    coverAlt: "ภาพประกอบหนังสือเดินทางและบัตรผ่านแดนจาก XL parking",
    author: "HUGLAO",
    publishDate: "4 พฤศจิกายน 2569",
    tags: ["บัตรผ่านแดน", "ด่านหนองคาย", "การเดินทาง"],
    excerpt: "เอกสารที่ต้องเตรียม ข้อมูลค่าบริการ และขั้นตอนให้ HUGLAO ประสาน XL parking ก่อนข้ามด่านหนองคายไปลาว",
  },
  {
    title: "ฝากรถหน้าด่านหนองคายที่ XL parking: ค่าจอดและรถรับส่งด่านไทย–ลาว",
    slug: "xl-parking-nong-khai",
    category: "การเดินทาง",
    cover: "/assets/xl-parking/aerial.webp",
    coverAlt: "ภาพมุมสูงลานจอด XL parking หน้าด่านหนองคาย",
    author: "HUGLAO",
    publishDate: "4 พฤศจิกายน 2569",
    tags: ["ที่จอดรถ", "ด่านหนองคาย", "การเดินทาง"],
    excerpt: "ค่าฝากรถวันเดียว 50 บาท ค้างคืน 100 บาท/คืน รถรับส่งฟรีถึงด่านไทย และประสานรถส่งด่านลาวผ่าน HUGLAO",
  },
  {
    title: "รีวิวเที่ยวเหมาเวียงจันทน์ 1 วัน 2,500 บาท กับรถตู้ HUGLAO: ลูกค้าเลือกเส้นทางเอง ปรับได้ตามใจ",
    slug: "review-one-day-trip-vientiane-2500",
    category: "รีวิวทริป",
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
    category: "การเดินทาง",
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
    category: "ที่เที่ยว",
    cover: "/assets/huglao-wat-si-muang-cover.webp",
    coverAlt: "วัดสีเมือง เวียงจันทน์ รีวิวไหว้ขอพรเรื่องงาน หลักเมือง และวิธีเดินทาง",
    author: "HUGLAO",
    publishDate: "1 ตุลาคม 2569",
    tags: ["วัดสีเมือง", "ไหว้พระ", "เวียงจันทน์"],
    excerpt: "รีวิวไหว้วัดสีเมืองจากประสบการณ์จริง ประวัติหลักเมือง ความเชื่อเรื่องขอพรการงาน ขั้นตอนไหว้ และการเดินทางพร้อมรถคนขับ",
  },
  {
    title: "น้ำเปี่ยนยอละปา: วางแผนทริปป่าฝนและกิจกรรมผจญภัยจากเวียงจันทน์",
    slug: "nam-pien-yorla-pa",
    category: "ที่เที่ยว",
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
  const serviceSlugs = new Set(["temporary-border-pass-xl-parking", "xl-parking-nong-khai"]);
  return [...LOCAL_ARTICLES.filter((article) => !serviceSlugs.has(article.slug)), ...articles.filter((article) => !localSlugs.has(article.slug) && !serviceSlugs.has(article.slug))];
}
