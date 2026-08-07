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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArticle(entry: any): Article {
  const fields = entry.fields;
  const searchText = `${fields.slug ?? ""} ${fields.title ?? ""} ${fields.category ?? ""}`.toLocaleLowerCase("th-TH");
  const cover = searchText.includes("รถไฟ") || searchText.includes("train")
    ? getMedia("khamsavathStation").src
    : searchText.includes("รถตู้") || searchText.includes("van")
      ? getMedia("vehicleVan").src
      : searchText.includes("รถ") || searchText.includes("car")
        ? getMedia("vehicleSedan").src
        : searchText.includes("วังเวียง") || searchText.includes("vang")
          ? getMedia("vangVieng").src
          : searchText.includes("น้ำงึม") || searchText.includes("nam ngum")
            ? getMedia("namNgum").src
            : getMedia("vientianePatuxai").src;
  return {
    title: fields.title ?? "",
    slug: fields.slug ?? "",
    cover,
    author: fields.author ?? "",
    publishDate: fields.publishDate ?? "",
    tags: String(fields.category ?? "")
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    excerpt: fields.excerpt ?? "",
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
