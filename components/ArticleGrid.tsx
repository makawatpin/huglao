"use client";

import ArticleCard from "@/components/ArticleCard";

import { useState } from "react";
import { ARTICLE_CATEGORIES, getArticleCategory, type ArticlePreview } from "@/data/articles";

export default function ArticleGrid({ articles }: { articles: ArticlePreview[] }) {
  const categories = ["ทั้งหมด", ...ARTICLE_CATEGORIES.filter(category => articles.some(article => getArticleCategory(article) === category))];

  const [active, setActive] = useState("ทั้งหมด");

  const filtered = active === "ทั้งหมด" ? articles : articles.filter((a) => getArticleCategory(a) === active);

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <div
          className="flex flex-nowrap gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [-webkit-overflow-scrolling:touch]"
          role="group"
          aria-label="กรองบทความตามหมวดหมู่"
        >
          {categories.map((name) => {
            const on = name === active;
            const count = name === "ทั้งหมด" ? articles.length : articles.filter((a) => getArticleCategory(a) === name).length;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setActive(name)}
                aria-pressed={on}
                className={`inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border px-4 text-[.85rem] font-semibold transition-colors sm:justify-center sm:text-[.92rem] ${
                  on
                    ? "border-[#0a2d20] bg-[#0a2d20] text-white shadow-[0_8px_20px_rgba(10,45,32,.18)]"
                    : "border-[#e0d9c8] bg-white text-[#4f574f] hover:border-[#d8af4a] hover:text-[#0a2d20]"
                }`}
              >
                {name}
                <span className={`text-[.72rem] font-bold ${on ? "text-[#efd276]" : "text-[#a39d8c]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <p role="status" className="sr-only">{active}: {filtered.length} บทความ</p>
      {filtered.length === 0 ? (
        <div className="text-center py-[70px] px-6 text-text-muted">
          <div className="text-[2rem] mb-2.5">📝</div>
          <p className="m-0 text-[1.05rem]">ไม่พบบทความ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          <div className="contents">
            {filtered.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
