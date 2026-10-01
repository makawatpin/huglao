export type ArticlePreview = {
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
};

export const LOCAL_ARTICLES: ArticlePreview[] = [
  {
    title: "วัดสีเมือง (ວັດສີເມືອງ) เวียงจันทน์ รีวิว ไหว้ขอพรเรื่องงาน หลักเมือง และวิธีเดินทาง",
    slug: "wat-si-muang-vientiane",
    cover: "/assets/wat-si-muang-front.webp",
    author: "HUGLAO",
    publishDate: "1 ตุลาคม 2569",
    tags: ["วัดสีเมือง", "ไหว้พระ", "เวียงจันทน์"],
    excerpt: "รีวิวไหว้วัดสีเมืองจากประสบการณ์จริง ประวัติหลักเมือง ความเชื่อเรื่องขอพรการงาน ขั้นตอนไหว้ และการเดินทางพร้อมรถคนขับ",
  },
  {
    title: "น้ำเปี่ยนยอละปา: วางแผนทริปป่าฝนและกิจกรรมผจญภัยจากเวียงจันทน์",
    slug: "nam-pien-yorla-pa",
    cover: "/assets/commons-waterfall-forest.webp",
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
