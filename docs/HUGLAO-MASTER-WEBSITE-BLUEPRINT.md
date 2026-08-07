# HUGLAO Master Website Blueprint

สถานะเอกสาร: Working master specification
แหล่งข้อมูลหลัก: ข้อกำหนดล่าสุดจากทีมงาน HUGLAO
หลักสำคัญ: ห้ามสร้างราคา รุ่นรถ เงื่อนไข หรือบริการขึ้นเอง

## Implementation status

- สร้างหน้าแรก ระบบนำทาง และ CTA ใหม่แล้ว
- สร้างหน้ารถ 5 กลุ่มและหน้าเส้นทาง 7 กลุ่มแล้ว
- สร้างหน้าบริการที่พร้อมประสาน 4 กลุ่มแล้ว
- สร้างแบบฟอร์มคำขอราคาและขั้นตอนคัดลอกสรุปไป LINE OA แล้ว
- เชื่อมตัวอ่านราคาสาธารณะจาก Contentful โดยกรองรายการภายในออกแล้ว
- รวมบทความไว้ที่ `/articles/[slug]` และยกเลิกโครงบทความรายเมืองแล้ว
- หน้า `/articles` แสดงเฉพาะบทความจริงจาก Contentful และกรอง slug/ชื่อเรื่องซ้ำแล้ว
- สร้าง FAQ, เงื่อนไขบริการ, นโยบายความเป็นส่วนตัว, Sitemap และ structured data แล้ว
- หน้าและ URL เก่าที่ต้องรักษาไว้ถูกตั้ง noindex และส่งลูกค้าไปยังโครงใหม่
- รวมหน้าเส้นทางทั้งหมดไว้ใน `/travel-with-us` และให้ `/routes` ส่งต่อมายังส่วนเส้นทางแล้ว
- ยังไม่เผยแพร่ราคา เพราะต้องตรวจ Master Price และนำข้อมูลเข้าชุด Contentful จริง

## 1. Product definition

เว็บไซต์ HUGLAO เป็นเว็บไซต์ขายและรับลูกค้า ไม่ใช่เพียงเว็บไซต์แนะนำบริษัท โดยต้องช่วยให้ลูกค้า:

1. เข้าใจว่า HUGLAO จัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์
2. เข้าใจว่าไม่ใช่กรุ๊ปทัวร์และลูกค้าเป็นผู้กำหนดแผน
3. เลือกประเภทรถ จุดรับ และเส้นทางจากเวียงจันทน์
4. เห็นเฉพาะราคาและเงื่อนไขที่อนุมัติให้เผยแพร่
5. ส่งคำขอราคาและติดต่อ LINE OA ได้ง่าย

การส่งข้อมูลทุกช่องทางมีสถานะเป็น “คำขอราคา” จนกว่า HUGLAO จะตรวจรถ ส่งข้อเสนอ และได้รับการยืนยันจากลูกค้า

## 2. Confirmed business facts

| หัวข้อ | ข้อมูลหลัก |
|---|---|
| รูปแบบธุรกิจ | บริษัทจัดหาและประสานรถพร้อมคนขับจากพาร์ตเนอร์ |
| เจ้าของรถ | HUGLAO ไม่ได้เป็นเจ้าของรถทั้งหมด |
| รูปแบบทริป | ลูกค้ากำหนดปลายทาง เวลา และจังหวะเอง |
| จุดเริ่มบริการ | จุดรับฝั่งเวียงจันทน์ |
| CTA | เที่ยวลาวกับเรา และติดต่อผ่าน LINE OA |
| LINE OA | https://lin.ee/sUDSXs5 |
| โทรศัพท์ | 095-596-2525 |
| อีเมล | huglaogroup@gmail.com |
| แบรนด์ | เขียวเข้ม–ทอง–ขาว/ครีม, Premium & Elegant |
| สโลแกน | Connecting Thailand & Laos |

## 3. Sitemap and URL

| หน้า | URL | เป้าหมาย |
|---|---|---|
| หน้าแรก | `/` | อธิบายสินค้าและพาลูกค้าสู่คำขอราคา |
| จองรถพร้อมคนขับ | `/car-with-driver` | เปรียบเทียบกลุ่มรถ |
| รถเก๋งและ SUV | `/car-with-driver/sedan-suv` | รายละเอียดรถกลุ่มเล็ก |
| รถ MPV | `/car-with-driver/mpv` | รายละเอียด MPV แยกจาก SUV |
| รถตู้ | `/car-with-driver/van` | รายละเอียดรถตู้มาตรฐาน |
| รถตู้ VIP | `/car-with-driver/van-vip` | รายละเอียดรถตู้ VIP |
| มินิบัสและรถบัส | `/car-with-driver/minibus-bus` | รายละเอียดรถกลุ่มใหญ่ |
| รายละเอียดเส้นทาง | `/routes/[slug]` | หนึ่งหน้าต่อกลุ่มเส้นทาง ไม่แยกหน้าตามจำนวนวัน |
| บริการอื่น | `/services` | แสดงเฉพาะบริการที่เปิดรับจริง |
| เที่ยวลาวกับเรา | `/travel-with-us` | อธิบายแนวคิด รวมเส้นทางจากเวียงจันทน์ จุดรับ และข้อมูลสำหรับขอราคา |
| บทความ | `/articles` | SEO และการเตรียมทริป |
| เกี่ยวกับ | `/about` | ความน่าเชื่อถือและเรื่องราวของเรา |
| ติดต่อ | `/contact` | ช่องทางติดต่อ |
| FAQ | `/faq` | ตอบข้อกังวลก่อนซื้อ |
| เงื่อนไข | `/terms` | ขอบเขตและเงื่อนไขบริการ |
| ความเป็นส่วนตัว | `/privacy` | การใช้ข้อมูลลูกค้า |

## 4. Confirmed vehicle taxonomy

1. รถเก๋งและ SUV อยู่กลุ่มเดียวกัน
2. MPV แยกจาก SUV และมีราคาเป็นของตัวเอง
3. รถตู้มาตรฐานแยกจากรถตู้ VIP
4. มินิบัสและรถบัสอยู่กลุ่มคณะขนาดใหญ่

ทุกรุ่นต้องใช้ข้อความ: “รุ่นรถและปีรถขึ้นอยู่กับรถที่ว่างในวันเดินทาง โดย HUGLAO จะแจ้งรายละเอียดก่อนลูกค้ายืนยัน”

## 5. Confirmed route groups

1. เที่ยวในนครหลวงเวียงจันทน์
2. เวียงจันทน์–น้ำงึม
3. เวียงจันทน์–วังเวียง
4. เวียงจันทน์–เมืองเฟือง
5. เวียงจันทน์–น้ำงึม–วังเวียง
6. เวียงจันทน์–เมืองเฟือง–วังเวียง
7. เวียงจันทน์–น้ำงึม–เมืองเฟือง–วังเวียง

ห้ามเพิ่มหลวงพระบาง ท่าแขก สะหวันนะเขต ปากเซ หรือเมืองอื่นเป็นหน้าขายจนกว่าจะมีราคาและยืนยันเปิดบริการ

## 6. Pickup points

1. จุดนัดหมายด่านท่านาแล้งฝั่งลาว หลังผ่านขั้นตอนตรวจคนเข้าเมือง
2. สนามบินนานาชาติวัตไต
3. สถานีรถไฟฝั่งเวียงจันทน์/คำสะหวาด

สถานะ: โครงสร้างยืนยันแล้ว แต่ต้องตรวจชื่อทางการ พิกัด จุดนัดพบ และคำอธิบายก่อนเผยแพร่จริง

## 7. Master Price

ตารางราคามีอยู่แล้ว งานที่ต้องทำคือระบุไฟล์ฉบับล่าสุดเป็น Master Price และนำเข้า Contentful

ไฟล์ที่อาจเป็น Master ปัจจุบัน: `C:\Users\USER\Desktop\preview.xlsx`
สถานะ: รอยืนยันว่าเป็นฉบับ Master และรอตรวจค่าภายในไฟล์ก่อนนำเข้าระบบ

Price record ต้องมี:

- Route
- Duration
- Vehicle category
- Number of days
- Selling price
- Included items
- Excluded items
- Surcharges
- Effective from
- Effective until
- Publish status
- Last updated
- Internal-only flag

กฎสำคัญ:

- ราคาสาธารณะต้องมี `publishStatus = published`
- ต้นทุน คอมมิชชัน กำไร และข้อมูลพาร์ตเนอร์ห้ามออกสู่หน้าเว็บ
- ทุกหน้าต้องอ่านราคาจากแหล่งเดียว
- MPV ห้ามใช้แถวราคาของ SUV
- หน้าเว็บต้องแสดงวันที่อัปเดตราคาล่าสุด

## 8. Contentful content model

### vehicleCategory

`name`, `slug`, `summary`, `recommendedPassengers`, `luggageGuidance`, `suitableFor`, `features`, `sampleVehicles`, `images`, `faq`, `publishStatus`, `sortOrder`

### route

`name`, `slug`, `origin`, `destinations`, `summary`, `suitableFor`, `durations`, `optionalStops`, `samplePlans`, `supportedVehicles`, `pickupPoints`, `faq`, `images`, `publishStatus`

### routeDuration

`label`, `days`, `nights`, `serviceHours`, `driverAccommodationRule`, `overtimeRule`

### price

`route`, `routeDuration`, `vehicleCategory`, `sellingPrice`, `currency`, `included`, `excluded`, `surcharges`, `effectiveFrom`, `effectiveUntil`, `publishStatus`, `internalOnly`, `updatedAt`

### pickupPoint

`name`, `slug`, `officialName`, `address`, `mapUrl`, `meetingInstructions`, `verificationStatus`, `publishStatus`

### additionalService

`name`, `slug`, `description`, `operationalStatus`, `pricingMode`, `terms`, `publishStatus`

### faq

`question`, `answer`, `category`, `relatedVehicle`, `relatedRoute`, `publishStatus`, `sortOrder`

### siteSettings

`companyName`, `companyNameEn`, `registrationNumber`, `registeredAddress`, `phone`, `email`, `lineUrl`, `businessHours`, `responseTime`, `emergencySupport`, `logo`, `socialImage`

## 9. Quote flow

### Fields

ชื่อผู้ติดต่อ, เบอร์โทร/LINE, วันที่และเวลารับ, วันที่สิ้นสุด, จุดรับ, จุดส่ง, จำนวนผู้โดยสาร, เด็ก/ผู้สูงอายุ, จำนวนกระเป๋า, ประเภทรถ, เส้นทาง, แผนเที่ยว, บริการเสริม, ความต้องการพิเศษ

### Current phase

หน้า `/travel-with-us` สร้างข้อความสรุปในเบราว์เซอร์ ให้ลูกค้าคัดลอกและเปิด LINE OA ข้อมูลยังไม่ถูกส่งเข้าระบบอัตโนมัติ

### Target phase

1. ส่งข้อมูลเข้าสู่ระบบ lead ของ HUGLAO
2. บันทึก consent และเวลา
3. สร้าง lead status: ลูกค้าใหม่ → ตรวจรายละเอียด → ส่งราคา → รอยืนยัน → ยืนยันจอง → เตรียมเดินทาง → ให้บริการแล้ว → ติดตามผล
4. เปิด LINE OA พร้อมข้อความสรุป

การทำ Target phase ต้องเลือก CRM/ฐานข้อมูลและ endpoint ที่รับข้อมูลก่อน ไม่ควรใช้ Contentful เป็นระบบ CRM โดยตรง

## 10. SEO specification

- ทุกหน้ามี Title และ Description ไม่ซ้ำ
- H1 หนึ่งจุด
- URL อ่านง่าย
- Breadcrumb
- Alt text อธิบายภาพจริง
- FAQ ที่ตอบคำถามซื้อจริง
- Internal links เชื่อมรถ–เส้นทาง–บทความ
- Structured data: Organization, Service, Article, FAQPage
- ห้ามสร้างหน้าซ้ำโดยเปลี่ยนเพียงชื่อเมืองหรือจำนวนวัน
- ติดตั้ง Google Analytics และ Search Console หลังได้รับ Measurement ID และสิทธิ์ยืนยันโดเมน

## 11. Verification gate before production

เงื่อนไขราคาที่ได้รับการยืนยัน:

- ราคารวมค่าคนขับและน้ำมัน
- เวลาบริการประมาณ 08.00–18.00 น.
- เกินเวลาคิด 200 บาท/ชั่วโมง
- มัดจำ 15–25% ของยอดรวมตามรายการ

- [ ] ระบุ Master Price ฉบับล่าสุด
- [ ] ตรวจราคา SUV, MPV, รถตู้, รถตู้ VIP, มินิบัส/รถบัส
- [ ] ตรวจสิ่งที่รวม/ไม่รวมและค่าใช้จ่ายเพิ่มเติม
- [ ] ตรวจเวลาใช้รถ ค่าเกินเวลา และที่พักคนขับ
- [ ] อนุมัติเงื่อนไขมัดจำ ยกเลิก คืนเงิน
- [ ] เพิ่มรูปตัวอย่างรถจริงและข้อจำกัดจำนวนกระเป๋า
- [ ] ตรวจชื่อทางการและพิกัดจุดรับสามแห่ง
- [ ] เพิ่มเลขทะเบียนและที่อยู่บริษัท
- [ ] เพิ่มเวลาทำการ ระยะเวลาตอบกลับ และวิธีช่วยเหลือระหว่างเดินทาง
- [ ] ทดสอบว่าการแก้ราคาใน Contentful อัปเดตทุกหน้าจากแหล่งเดียว
