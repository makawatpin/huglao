# HUGLAO Website

เว็บไซต์ทางการของ HUGLAO สำหรับบริการรถพร้อมคนขับและการวางแผนทริปส่วนตัวในลาว สร้างด้วย Next.js App Router และส่งออกเป็น static site

## เริ่มพัฒนา

```bash
npm install
npm run dev
```

เปิด `http://localhost:3000`

## Environment variables

สร้าง `.env.local` และกำหนดค่าต่อไปนี้:

```dotenv
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_access_token
```

ทั้งสองค่าจำเป็นสำหรับ production build เพราะบทความจาก Contentful จะถูกสร้างเป็น static HTML ระหว่าง build

## ตรวจสอบก่อนเผยแพร่

```bash
npm run lint
node_modules/.bin/tsc --noEmit --incremental false
```

สร้าง production build และ static export:

```powershell
npm.cmd run build
```

Next.js 16.3 แยกพื้นที่ของ dev server และ production build ให้โดยอัตโนมัติ จึงรัน build ระหว่างเปิด dev server ได้ ไฟล์เว็บไซต์ที่พร้อมเผยแพร่จะอยู่ใน `out/`

## การเผยแพร่

โปรเจกต์ใช้ `output: "export"` และ `trailingSlash: true` จึงนำโฟลเดอร์ `out/` ไปวางบน static hosting ได้โดยตรง ก่อน build บน CI หรือผู้ให้บริการโฮสต์ ต้องตั้งค่า Contentful ทั้งสองค่าให้ครบ

โดเมน production ที่กำหนดใน metadata คือ `https://huglao.com`
