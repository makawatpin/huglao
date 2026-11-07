# Article navigation update

Four categories: ที่เที่ยว, ร้านอาหารและคาเฟ่, การเดินทาง, รีวิวทริป. All button retained. Category controls use one horizontally scrollable row; no city filter. Pickup and border-document articles merged under travel.

Shared ArticleCard used on homepage and article index: image left, city label, concise display title clamped to two lines, read-more action. Removed excerpts, repeated category labels, author/date from these cards; canonical article titles and metadata unchanged. City labeling supports Vientiane, Vang Vieng, Luang Prabang, Muang Feuang and multiple cities; general border-document guide labeled ข้อมูลทั่วไป.

Checks: scoped ESLint and TypeScript passed; static webpack build passed. Browser at 390x844: no horizontal page overflow, category row scrolls, attraction filter returns 5 and restaurant filter 4; all 18 articles remain available. Preview only.
