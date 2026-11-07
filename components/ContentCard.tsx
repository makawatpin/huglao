import Image from "next/image";
import Link from "next/link";

type Props = { href: string; title: string; description?: string; image?: { src: string; alt: string } | null; eyebrow?: string; meta?: string; action?: string; heading?: "h2" | "h3"; contain?: boolean; variant?: "row" | "tile" };

export default function ContentCard({ href, title, description, image, eyebrow, meta, action = "ดูรายละเอียด", heading: Heading = "h3", contain = false, variant = "row" }: Props) {
  return <Link href={href} className={`hl-touch-card ${image ? "" : "hl-touch-card-text"} ${variant === "tile" ? "hl-touch-card-tile" : ""}`}>
    {image && <div className="hl-touch-card-media"><Image src={image.src} alt={image.alt} fill sizes={variant === "tile" ? "(max-width: 639px) 44vw, (max-width: 1023px) 45vw, 30vw" : "(max-width: 639px) 32vw, (max-width: 1023px) 45vw, 30vw"} className={contain ? "object-contain" : "object-cover"} /></div>}
    <div className="hl-touch-card-content">
      {eyebrow && <span className="hl-touch-card-eyebrow">{eyebrow}</span>}
      <Heading>{title}</Heading>
      {description && <p>{description}</p>}
      {meta && <span className="hl-touch-card-meta">{meta}</span>}
      <span className="hl-touch-card-action">{action} <span aria-hidden="true">→</span></span>
    </div>
  </Link>;
}
