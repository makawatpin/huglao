# Google Search Console audit — HUGLAO — 8 November 2026

Access verified in Google Search Console using huglaogroup@gmail.com, domain property sc-domain:huglao.com. Both the domain property and https://www.huglao.com/ URL-prefix property were visible; this audit used the domain property.

## Search performance
Web search, last 28 days shown by report: 10 October–6 November 2026. Last update displayed: 3 hours ago.
- Clicks: 321
- Impressions: 10.2K (rounded UI value)
- CTR: 3.2%
- Average position: 6.9 (aggregate across queries; not the ranking of any specific keyword)

Three-month report, 9 August–6 November 2026: 530 clicks, 14.9K impressions, 3.5% CTR, average position 7.1. Different window lengths are not a like-for-like growth comparison.

Top pages shown for 28 days:
| Page | Clicks | Impressions |
|---|---:|---:|
| /services/temporary-border-pass/ | 70 | 3,192 |
| / | 45 | 494 |
| /vientiane/ | 36 | 452 |
| /articles/border-pass-vs-passport-laos/ | 33 | 2,706 |
| /services/local-guide/ | 19 | 354 |
| /van-laos/ | 17 | 321 |
| /car-with-driver/ | 16 | 228 |
| /articles/wat-si-muang-vientiane/ | 14 | 517 |
| /articles/border-pass-vs-passport-laos (without slash) | 13 | 783 |
| https://huglao.com/van-vip/ | 12 | 208 |

Query table includes รถตู้เที่ยวลาว, รถตู้ เวียงจันทน์, เช่ารถพร้อมคนขับ เวียงจันทน์, border-pass questions and จ้างไกด์ส่วนตัว ลาว. Visible query totals do not reconcile to total clicks; do not infer that omitted queries have no clicks.

## Index coverage
Report last updated 23 October 2026, so these totals do not describe all newly published November pages.
- Indexed: 39
- Not indexed: 78
  - Redirect: 57
  - Noindex: 8
  - 404: 4
  - Alternate with proper canonical: 1
  - Crawled, currently not indexed: 6
  - Duplicate, Google chose different canonical: 2

The six crawled-not-indexed examples include three font URLs, two favicon URLs and https://huglao.com/luangprabang/. They are not six current article pages.
Different-canonical examples: https://huglao.com/about/ and https://huglao.com/van/luangprabang/, both last crawled 20 July 2026. No assertion was made about their Google-selected target without inspecting those URLs individually.

## Confirmed priority finding
/services/temporary-border-pass/ is the highest-click page in the displayed 28-day table (70 clicks). Google Index inspection says URL is on Google, but the LIVE TEST on 8 November 2026 at 18:19 reports:
- Page fetch successful, crawl allowed.
- Cannot be indexed: excluded by noindex tag.
- Indexing allowed: No, noindex detected in robots meta.
- Declared canonical: https://www.huglao.com/services/temporary-border-pass/

This is an active indexing blocker for a page with demonstrated organic traffic. Recommended priority: review its content, remove the unintended noindex if the service should be searchable, publish, restore it to sitemap and run live test again before requesting indexing. No code, deployment or Search Console submission was changed during this read-only audit.

## URL inspection: Vientiane
https://www.huglao.com/vientiane/ is on Google, page indexed. Last crawl 28 October 2026 00:23:20 (as displayed), Googlebot smartphone, fetch successful, crawl and indexing allowed. Declared canonical matches inspected URL; Google-selected canonical is Inspected URL. Breadcrumbs: one valid item.

## Sitemap and experience
- https://www.huglao.com/sitemap.xml: Success; submitted 28 August 2026, last read 4 November 2026, discovered pages 30.
- Published sitemap had 50 URLs in the preceding HTTP audit. The local sitemap fix produces 49. The Search Console count is from its older read; it is not proof the newer URLs have been processed.
- Overview: Core Web Vitals has no mobile or desktop data. This is not a passing performance result.
- HTTPS report: 29 HTTPS URLs, 0 non-HTTPS, no critical issues, last update 8 November 2026.
- Overview Breadcrumbs enhancement: 27 valid, 0 invalid.

## Old URLs checked against current production
The 404 examples in Search Console were checked with HTTP redirects followed:
- https://www.huglao.com/luangprabang → /luangprabang/ → 404 (still broken).
- https://www.huglao.com/car-with-driver/van-vip → /van-laos/ → 200 (already redirected).
- https://huglao.com/car-with-driver/van-vip/ → /van-laos/ → 200 (already redirected).
- https://www.huglao.com/articles.html → /articles/ → 200 (already redirected).
Additional old coverage examples https://huglao.com/van/luangprabang/ and https://huglao.com/luangprabang/ still end at 404. Recommended explicit redirects to the matching current /luang-prabang/ service page after confirming equivalent intent.

## Limits and next steps
- Did not inspect every URL individually, inspect manual actions/security reports, export every query or compare equal prior periods.
- No indexing requests, sitemap resubmissions, ownership changes or permissions changes performed.
- Priorities: temporary-border-pass noindex; legacy Luang Prabang redirects; publish local audit fixes; then refresh sitemap and inspect important new service/article URLs.

Reports:
- https://search.google.com/u/1/search-console/performance/search-analytics?resource_id=sc-domain%3Ahuglao.com&num_of_days=28
- https://search.google.com/u/1/search-console/index?resource_id=sc-domain%3Ahuglao.com
- https://search.google.com/u/1/search-console/sitemaps?resource_id=sc-domain%3Ahuglao.com


## Release follow-up — 8 November 2026
Authorized release includes restoring border-pass indexing and sitemap membership, adding permanent redirects from /luangprabang[/] and /van/luangprabang[/] to /luang-prabang/, and publishing the preceding audit fixes. See the release record for deployment and Git commit verification. Earlier observations above describe the pre-release state.
