# HUGLAO project and SEO audit — 8 November 2026

## Verified scope
- Read AGENTS.md, Next.js metadata guide, project configuration, sitemap and robots generation.
- Crawled 50 production sitemap URLs: all returned HTTP 200. One (minibus/bus) explicitly had noindex, nofollow.
- Inspected 58 exported index.html files, including error/placeholder/redirect pages: all actual content pages had a title, description and one H1; no missing local href/src targets were found by the HTML scan. JSON-LD blocks parsed as JSON. This does not substitute for Google's structured data eligibility validation.
- No duplicate content-page titles found. Duplicate titles belonged to noindex redirect/error pages.
- Mobile checks at 390×844: homepage, Vientiane, Vang Vieng, Luang Prabang, travel-with-us, train-ticket and article listing. All had one H1, no horizontal document overflow, and no img elements missing an alt attribute. Vientiane screenshot inspected. Attribute presence is not a full accessibility audit.

## Fixes completed locally
1. Removed the explicitly noindex minibus-bus page from sitemap; preserved its existing noindex status rather than silently opening it to indexing. If this page is intended for organic search, review and approve its content first, then enable indexing and restore it to sitemap together.
2. Removed duplicated HUGLAO suffixes and gave the two retired partner article redirect pages distinct titles.
3. Added .tmp/** to ESLint ignores. The previous full lint scanned copied deployment bundles and temporary scripts: 40 errors and 10,392 warnings from generated/temporary files. Actual source lint already passed. Full lint now passes, 110 files, 0 errors, 0 warnings.
4. Production build with webpack passes, including TypeScript validation.

## Findings requiring follow-up
- Partner service pages temporary-border-pass and xl-parking remain intentionally noindex, nofollow, excluded from sitemap. The bus page also remains noindex. These pages cannot be treated as SEO landing pages while this remains in place.
- The static Contentful route creates __no-articles-yet__ when there are no CMS articles. Its output is a noindex not-found placeholder, excluded from sitemap; it is not a content landing page or a critical SEO defect.
- Recent article edits, three new articles and photos remain uncommitted in the workspace. Do not treat the previous GitHub backup as a backup of all current work.
- Static export uses unoptimized images; several photos exceed 500 KB. Consider responsive pre-generated sizes where they materially reduce mobile transfer. No performance score or Core Web Vitals claim was made.
- City and route URLs have distinct titles/canonicals. Similar price sections alone do not establish a duplicate-page penalty; maintain clear differences between city pickup service pages, vehicle selection pages and trip itineraries.

## Not verified / limits
- Search Console index coverage, Google-selected canonical, search queries, clicks, impressions and ranking: no authenticated Search Console data available in this session.
- Field Core Web Vitals and Lighthouse lab performance: not measured.
- External business pages/maps/LINE destinations and all interactive controls were not exhaustively clicked. Local target existence and seven-page mobile checks are narrower checks.
- This audit did not re-verify historical facts, third-party prices or every editorial claim against original sources.
- Fixes above are local and built successfully; not deployed or pushed as part of this audit.

## Evidence
Temporary machine-readable results: .tmp/seo-audit.json, .tmp/seo-live-audit.json, .tmp/seo-final-lint.json and .tmp/seo-build.log. The live crawl precedes the local sitemap fix (50 live URLs vs 49 after the fix).

## Next operational checks
1. In Search Console, inspect homepage, the three city pages, train-ticket, domestic flights and newly added articles; compare declared and Google-selected canonical and review indexing exclusions.
2. Submit the production sitemap after publishing the corrections; use URL inspection for priority pages rather than requesting every page repeatedly.
3. Measure mobile performance on homepage, a city price page and an image-heavy article, then optimize the largest transfer/LCP contributors based on results.
4. Decide whether the three intentionally noindex service/vehicle pages are ready to become search landing pages.

References: https://developers.google.com/search/docs/fundamentals/seo-starter-guide and https://developers.google.com/search/docs/crawling-indexing/canonicalization


## Release follow-up — 8 November 2026
Authorized release includes restoring border-pass indexing and sitemap membership, adding permanent redirects from /luangprabang[/] and /van/luangprabang[/] to /luang-prabang/, and publishing the preceding audit fixes. See the release record for deployment and Git commit verification. Earlier observations above describe the pre-release state.
