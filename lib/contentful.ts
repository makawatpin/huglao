import { createClient } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import { getMedia } from "@/data/media";

export type Article = {
  title: string;
  slug: string;
  cover: string | null;
  author: string;
  publishDate: string;
  tags: string[];
  excerpt: string;
  content: Document;
};

let hasWarnedAboutMissingConfig = false;

function getSafeErrorMessage(error: unknown): string {
  return error instanceof Error && error.message.trim()
    ? error.message.trim()
    : "Unknown Contentful error";
}

function reportContentfulFailure(operation: string, error: unknown): void {
  const message = `Contentful ${operation} failed: ${getSafeErrorMessage(error)}`;

  // Static exports bake article data into the deployed files. Do not publish a
  // successful-looking production build with missing Contentful content.
  if (process.env.NODE_ENV === "production") {
    throw new Error(message);
  }

  console.error(message);
}

function getClient(): ReturnType<typeof createClient> | null {
  const space = process.env.CONTENTFUL_SPACE_ID?.trim();
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN?.trim();

  if (!space || !accessToken) {
    const message =
      "Contentful is disabled: set CONTENTFUL_SPACE_ID and " +
      "CONTENTFUL_ACCESS_TOKEN to load articles.";

    if (process.env.NODE_ENV === "production") {
      throw new Error(message);
    }

    if (!hasWarnedAboutMissingConfig) {
      console.warn(message);
      hasWarnedAboutMissingConfig = true;
    }

    return null;
  }

  return createClient({ space, accessToken });
}

const ARTICLE_FALLBACK_COVERS = [
  getMedia("vientianePatuxai").src,
  getMedia("vangVieng").src,
  getMedia("namNgum").src,
  getMedia("muangFuang").src,
  getMedia("khamsavathStation").src,
] as const;

const ARTICLE_CONTENT_OVERRIDES: Record<string, { title: string; excerpt: string }> = {
  "car-rental-laos": {
    title: "ก่อนเช่ารถพร้อมคนขับเที่ยวลาว: วิธีเลือกและเช็กราคา",
    excerpt: "คู่มือเลือกรถพร้อมคนขับเที่ยวลาว เปรียบเทียบประเภทรถ ราคา และข้อมูลที่ควรตรวจสอบก่อนขอข้อเสนอจาก HUGLAO",
  },
  "laos-currency-and-payment-guide": {
    title: "เที่ยวลาวใช้เงินอะไร? คู่มือเงินกีบและ LAO QR ปี 2026",
    excerpt: "เที่ยวลาวใช้เงินอะไร รวมวิธีใช้เงินกีบ LAO QR การแลกเงิน และข้อควรระวังเรื่องการชำระเงิน อัปเดตปี 2026",
  },
  "laos-high-speed-train-guide": {
    title: "รถไฟลาว–จีน: วิธีจองตั๋วและวางแผนเที่ยว",
    excerpt: "คู่มือรถไฟลาว–จีน วิธีจองตั๋ว การเตรียมตัว และการวางแผนเดินทางระหว่างเวียงจันทน์ วังเวียง และหลวงพระบาง",
  },
  "van-rental-laos": {
    title: "เช่ารถตู้เที่ยวลาว: เอกสาร ราคา และข้อควรรู้",
    excerpt: "คู่มือเลือกรถตู้เที่ยวลาว เอกสาร ราคาโดยประมาณ และข้อมูลที่ควรตรวจสอบกับผู้ให้บริการก่อนยืนยันการเดินทาง",
  },
};

function getContentfulAssetUrl(file: unknown): string | null {
  if (!file || typeof file !== "object" || !("url" in file) || typeof file.url !== "string") {
    return null;
  }

  const url = file.url.trim();
  if (!url) return null;
  return url.startsWith("//") ? `https:${url}` : url;
}

function getFallbackCover(searchText: string, slug: string): string {
  if (searchText.includes("รถไฟ") || searchText.includes("train")) return getMedia("khamsavathStation").src;
  if (searchText.includes("รถตู้") || searchText.includes("van")) return getMedia("vehicleVan").src;
  if (searchText.includes("รถ") || searchText.includes("car")) return getMedia("vehicleSedan").src;
  if (searchText.includes("วังเวียง") || searchText.includes("vang")) return getMedia("vangVieng").src;
  if (searchText.includes("น้ำงึม") || searchText.includes("nam ngum")) return getMedia("namNgum").src;
  if (searchText.includes("เมืองเฟือง") || searchText.includes("muang fuang")) return getMedia("muangFuang").src;

  const hash = Array.from(slug).reduce((total, character) => total + character.codePointAt(0)!, 0);
  return ARTICLE_FALLBACK_COVERS[hash % ARTICLE_FALLBACK_COVERS.length];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(entry: any): Article {
  const fields = entry.fields;
  const searchText = `${fields.slug ?? ""} ${fields.title ?? ""} ${fields.category ?? ""}`.toLocaleLowerCase("th-TH");
  const slug = String(fields.slug ?? "");
  const contentOverride = ARTICLE_CONTENT_OVERRIDES[slug];
  const contentfulCover = getContentfulAssetUrl(fields.cover?.fields?.file);
  const cover = contentfulCover ?? getFallbackCover(searchText, slug);
  return {
    title: contentOverride?.title ?? fields.title ?? "",
    slug,
    cover,
    author: fields.author ?? "",
    publishDate: fields.publishDate ?? "",
    tags: String(fields.category ?? "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    excerpt: contentOverride?.excerpt ?? fields.excerpt ?? "",
    content: fields.content,
  };
}

/** บทความทั้งหมดใช้ URL กลาง /articles/[slug] เพื่อป้องกันหน้าเนื้อหาซ้ำ */
export async function getAllArticles(): Promise<Article[]> {
  const client = getClient();
  if (!client) return [];

  try {
    const res = await client.getEntries({
      content_type: "article",
      order: ["-fields.publishDate"],
    });
    const seenSlugs = new Set<string>();
    const seenTitles = new Set<string>();

    return res.items
      .map(toArticle)
      .filter((article) => article.slug.trim() && article.title.trim())
      .filter((article) => {
        const slugKey = article.slug.trim().toLocaleLowerCase("en-US");
        const titleKey = article.title.trim().replace(/\s+/g, " ").toLocaleLowerCase("th-TH");
        if (seenSlugs.has(slugKey) || seenTitles.has(titleKey)) return false;
        seenSlugs.add(slugKey);
        seenTitles.add(titleKey);
        return true;
      });
  } catch (err) {
    reportContentfulFailure("getAllArticles", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const client = getClient();
  if (!client) return null;

  try {
    const res = await client.getEntries({
      content_type: "article",
      "fields.slug": slug,
      limit: 1,
    });
    if (!res.items.length) return null;
    return toArticle(res.items[0]);
  } catch (err) {
    reportContentfulFailure("getArticleBySlug", err);
    return null;
  }
}
