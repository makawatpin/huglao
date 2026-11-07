# Pickup guide delivery — 6 November 2026

Created seven canonical static articles under /articles/, categorized as จุดรับและการเดินทาง. Linked from each city service page; added sitemap and Article/Place plus existing BreadcrumbList data. Hotels remain pickup descriptions only.

## Verification
- TypeScript passed; scoped ESLint passed. Webpack static build passed (53 pages).
- Seven new built routes have one H1, canonical and sitemap entries. Internal href targets exist in static export.
- Browser checked all seven at 390×844: no horizontal overflow or broken loaded images. Khamsavath embedded map rendered; photo dialog opens, advances, closes. Category filter shows seven articles; desktop inspected at 1440×1000.
- LINE and telephone hrefs use existing confirmed site data. No contact form, new price or venue fee was added.

## Images and remaining gaps
- 18 Commons images, three each for Thanaleng, Wattay, Khamsavath, Vientiane LCR, Luang Prabang rail and Luang Prabang airport. License and author metadata: data/pickup-photos.json; credits also shown per article and on /image-credits/. Originals were resized to WebP without changing scene.
- Vang Vieng station: no suitable licensed station-building photo set verified. Uses existing licensed city landscape clearly identified as city context, not a station photo. Still needs 3–4 actual station photos with usage permission.
- Wattay and Luang Prabang airport photos are archival; years are labeled. Fresh terminal/arrival/allowed waiting area photos remain desirable. Do not use these archival images as present-day meeting-point guidance.
- Actual pickup gate/pillar/parking position has not been confirmed by the local operator; pages instruct travelers to confirm it with the team. Map coordinates locate venues, not confirmed car meeting points.
- No hotel article, production deploy, push or merge. Preview retains existing authentication and noindex protection.
