"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/contentful";

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  const categories = useMemo(() => {
    const set: string[] = [];
    articles.forEach((a) => a.tags.forEach((t) => { if (!set.includes(t)) set.push(t); }));
    return ["ทั้งหมด", ...set];
  }, [articles]);

  const [active, setActive] = useState("ทั้งหมด");

  const filtered = active === "ทั้งหมด" ? articles : articles.filter((a) => a.tags.includes(active));

  return (
    <>
      <div className="flex flex-wrap gap-2.5 justify-center mb-[clamp(34px,5vw,52px)]">
        {categories.map((name) => {
          const on = name === active;
          return (
            <button
              key={name}
              onClick={() => setActive(name)}
              className="cursor-pointer font-semibold text-[.92rem] px-5 py-[9px] rounded-full transition-all"
              style={{
                border: `1.5px solid ${on ? "transparent" : "#e0d9c8"}`,
                background: on ? "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" : "#fff",
                color: on ? "#0a1f14" : "#5e6258",
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-[70px] px-6 text-text-muted">
          <div className="text-[2rem] mb-2.5">📝</div>
          <p className="m-0 text-[1.05rem]">ไม่พบบทความ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-[22px] lg:grid-cols-3 lg:gap-7">
          <div className="contents">
            {filtered.map((a) => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="group no-underline flex flex-col bg-white border border-border rounded-[18px] overflow-hidden shadow-[0_14px_34px_rgba(10,31,20,.08)] hover:-translate-y-1.5 hover:shadow-[0_26px_54px_rgba(10,31,20,.16)] transition-all"
              >
                <div className="relative bg-[#e8e3d6]" style={{ aspectRatio: "16/10" }}>
                  {a.cover && (
                    <Image src={a.cover} alt={a.title} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" className="object-cover" />
                  )}
                  {a.tags[0] && (
                    <span
                      className="absolute top-3 left-3 text-[.7rem] tracking-[.14em] font-bold uppercase text-deep-green px-[13px] py-1.5 rounded-full shadow-[0_4px_12px_rgba(10,31,20,.25)]"
                      style={{ background: "linear-gradient(135deg,#e3bd63,#c8941f)" }}
                    >
                      {a.tags[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-col flex-1 px-4 pt-4 pb-4 md:px-[22px] md:pt-[22px] md:pb-6">
                  <div className="flex items-center gap-2 text-[#8a8474] text-[.76rem] md:text-[.8rem] font-medium mb-2 md:mb-2.5">
                    <span className="text-gold-dark">{a.author}</span>
                    <span className="opacity-50">·</span>
                    <span>{a.publishDate}</span>
                  </div>
                  <h3 className="m-0 mb-2 md:mb-2.5 font-serif-th font-bold text-[1.05rem] md:text-[1.26rem] leading-[1.3] md:leading-[1.35] text-deep-green-2">
                    {a.title}
                  </h3>
                  <p className="m-0 mb-3 md:mb-[18px] text-text-muted text-[.86rem] md:text-[.95rem] leading-[1.55] md:leading-[1.65] flex-1">{a.excerpt}</p>
                  <div className="flex flex-wrap gap-[7px]">
                    {a.tags.map((t) => (
                      <span key={t} className="text-[.74rem] text-[#7a7565] bg-[#f4f0e6] border border-border px-[11px] py-1 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
