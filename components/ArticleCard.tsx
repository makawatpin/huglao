import Image from "next/image";
import Link from "next/link";
import type { ArticlePreview } from "@/data/articles";

const CARD_TITLES: Record<string, string> = {
  "lao-art-museum-vientiane": "ลาวอาร์ตมิวเซียม ค่าเข้าและแผนเที่ยว",
  "patuxai-vientiane": "ประตูชัย ชมวิวและลวดลายใต้ซุ้ม",
  "pha-that-luang-vientiane": "พระธาตุหลวง ประวัติและข้อควรรู้ก่อนแวะ",
  "pho-zap-vientiane": "เฝอแซ่บ ร้านแนะนำใกล้ประตูชัย",
  "farsai-mookata-vientiane": "ฟ้าใสหมูกระทะ มื้อเย็นชิ้นดาดลาว",
  "bannam-cafe-vang-vieng": "บ้านน้ำคาเฟ่ พักริมแม่น้ำ",
  "the-mini-cafe-vang-vieng": "The Mini คาเฟ่วิวภูเขาและทุ่งนา",
  "tham-chang-cave-vang-vieng": "ถ้ำจัง เดินชมถ้ำและธรรมชาติ",
  "thanaleng-border": "ด่านท่านาแล้งฝั่งลาว จุดรับและการเดินทาง",
  "wattay-airport": "สนามบินวัตไต แผนที่และการนัดรับ",
  "khamsavath-rail-station": "สถานีคำสะหวาด รถไฟไทย–ลาว",
  "vientiane-railway-station": "สถานีเวียงจันทน์ รถไฟลาว–จีน",
  "vang-vieng-railway-station": "สถานีรถไฟวังเวียง แผนที่และการนัดรับ",
  "luang-prabang-railway-station": "สถานีรถไฟหลวงพระบาง จุดรับและแผนที่",
  "luang-prabang-airport": "สนามบินหลวงพระบาง แผนที่และการนัดรับ",
  "border-pass-vs-passport-laos": "ไปลาว ใช้บัตรผ่านแดนหรือพาสปอร์ต?",
  "review-one-day-trip-vientiane-2500": "รีวิวเที่ยวเวียงจันทน์ 1 วัน",
  "wat-si-muang-vientiane": "วัดสีเมือง ไหว้หลักเมืองเวียงจันทน์",
  "nam-pien-yorla-pa": "น้ำเปี่ยนยอละปา ธรรมชาติและกิจกรรม",
};

function cityLabel(article: ArticlePreview) {
  if (article.slug === "border-pass-vs-passport-laos") return "ข้อมูลทั่วไป";
  const text = [article.title, ...article.tags].join(" ");
  const cities = [
    [/เวียงจันท[น์ร์]*|vientiane/i, "เวียงจันทน์"],
    [/วังเวียง|vang.?vieng/i, "วังเวียง"],
    [/หลวงพระบาง|luang.?prabang/i, "หลวงพระบาง"],
    [/เมืองเฟือง|muang.?f[eu]ang/i, "เมืองเฟือง"],
  ] as const;
  return cities.filter(([pattern]) => pattern.test(text)).map(([, name]) => name).join(" · ") || "ข้อมูลทั่วไป";
}

export default function ArticleCard({ article }: { article: ArticlePreview }) {
  return <Link href={`/articles/${article.slug}/`} className="group flex min-w-0 overflow-hidden rounded-[18px] border border-[#e4ddcd] bg-white shadow-[0_4px_18px_rgba(10,45,32,.045)] transition-colors hover:border-[#b18a2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b18a2f]">
    <div className="relative w-[34%] shrink-0 overflow-hidden bg-[#e9e3d7]">{article.cover && <Image src={article.cover} alt={article.coverAlt || article.title} fill sizes="(max-width: 639px) 32vw, 20vw" className="object-cover transition duration-500 group-hover:scale-105" />}</div>
    <div className="flex min-w-0 flex-1 flex-col px-4 py-3 sm:py-4"><span className="mb-1 text-[11px] font-semibold leading-5 text-[#687169]">{cityLabel(article)}</span><h3 className="line-clamp-2 text-[15px] font-bold leading-6 text-[#0a2d20] sm:text-base sm:leading-7">{CARD_TITLES[article.slug] || article.title}</h3><span className="mt-2 inline-flex items-center gap-2 text-xs font-bold leading-6 text-[#86611a]">อ่านต่อ <span aria-hidden="true">→</span></span></div>
  </Link>;
}
