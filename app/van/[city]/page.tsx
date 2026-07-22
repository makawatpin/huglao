import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCityBySlug } from "@/data/cities";

export async function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return {};
  return {
    title: `${city.metaTitle} (ย้ายที่อยู่แล้ว)`,
    robots: { index: false, follow: true },
    alternates: { canonical: `/${city.slug}` },
  };
}

/** หน้านี้เก็บไว้เพราะ URL /van/[city] เคย live มาก่อน — เปลี่ยนที่อยู่ถาวรไปเป็น /[city] แล้ว */
export default async function OldCityVanRedirect({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const target = `/${city.slug}`;

  return (
    <>
      {/* Intentional: no generateMetadata option exists for http-equiv refresh; Next hoists this <meta> into <head> at render. Don't move/remove this comment when refactoring. */}
      <meta httpEquiv="refresh" content={`0;url=${target}`} />
      <div style={{ maxWidth: 640, margin: "80px auto", padding: 24, textAlign: "center" }}>
        <p>
          หน้านี้ย้ายไปที่{" "}
          <Link href={target} className="text-gold-dark font-semibold underline">
            {target}
          </Link>
        </p>
      </div>
    </>
  );
}
