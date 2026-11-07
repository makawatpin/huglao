type Props = {
  items: readonly (readonly [string, string])[];
  headingLevel?: "h2" | "h3" | "h4";
};

export default function ServiceTermsList({ items, headingLevel: Heading = "h4" }: Props) {
  return <ol className="overflow-hidden rounded-[20px] border border-[#ddd4c1] bg-white">
    {items.filter(([title]) => title !== "รับจากฝั่งไทย").map(([title, detail], index) => <li key={title || detail} className="flex items-start gap-4 border-b border-[#e8e4db] px-4 py-4 even:bg-[#faf8f2] last:border-b-0 sm:px-5 sm:py-5">
      <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0a2d20] text-sm font-semibold text-[#efd276]">{index + 1}</span>
      <div className="min-w-0 flex-1">
        {title && <Heading className="text-sm font-bold leading-6 text-[#0a2d20] sm:text-base">{title}</Heading>}
        <p className="mt-1 text-sm leading-7 text-[#59645d]">{detail}</p>
      </div>
    </li>)}
  </ol>;
}
