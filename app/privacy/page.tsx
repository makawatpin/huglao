import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว",
  description: "แนวทางการใช้ข้อมูลคำขอราคาและข้อมูลการใช้งานเว็บไซต์ HUGLAO",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main>
      <PageHero eyebrow="Privacy" title="นโยบายความเป็นส่วนตัว" description="เราเก็บและใช้ข้อมูลเท่าที่จำเป็นสำหรับตรวจรายละเอียด ประสานบริการ และตอบคำขอราคาของคุณ" breadcrumbs={[{ label: "หน้าแรก", href: "/" }, { label: "นโยบายความเป็นส่วนตัว" }]} />
      <section className="bg-[#f7f3e9] py-[clamp(64px,8vw,110px)]">
        <div className="hl-shell max-w-[900px] rounded-[28px] border border-[#ddd4c1] bg-white p-[clamp(26px,5vw,52px)] text-[#59645d]">
          <div className="space-y-8 leading-8">
            <section><h2 className="text-xl font-bold text-[#0a2d20]">ข้อมูลที่ใช้</h2><p className="mt-3">ข้อมูลติดต่อ วันเดินทาง จุดรับ จุดส่ง จำนวนผู้โดยสาร สัมภาระ ประเภทรถ เส้นทาง บริการเสริม และความต้องการพิเศษที่คุณเลือกส่ง</p></section>
            <section><h2 className="text-xl font-bold text-[#0a2d20]">วัตถุประสงค์</h2><p className="mt-3">ใช้เพื่อตรวจรายละเอียดทริป ประสานรถหรือบริการกับพาร์ตเนอร์ จัดทำข้อเสนอ ติดต่อกลับ และดูแลการเดินทางที่ได้รับการยืนยัน</p></section>
            <section><h2 className="text-xl font-bold text-[#0a2d20]">แบบฟอร์มบนเว็บไซต์</h2><p className="mt-3">แบบฟอร์มคำขอราคาเวอร์ชันปัจจุบันสร้างข้อความสรุปภายในอุปกรณ์ของคุณและไม่ส่งข้อมูลเข้าฐานข้อมูล HUGLAO โดยอัตโนมัติ ข้อมูลจะถูกส่งเมื่อคุณนำข้อความไปส่งผ่าน LINE OA</p></section>
            <section>
              <h2 className="text-xl font-bold text-[#0a2d20]">ข้อมูลการใช้งานเว็บไซต์</h2>
              <p className="mt-3">เว็บไซต์ใช้ Google Analytics เพื่อวัดจำนวนการเข้าชม แหล่งที่มา หน้าที่เปิด และการใช้งานปุ่มติดต่อหรือแบบฟอร์มในภาพรวม โดย HUGLAO ไม่ส่งชื่อ เบอร์โทร เนื้อหาคำขอราคา หรือข้อความที่คุณกรอกให้ Google Analytics</p>
              <p className="mt-3">Google Analytics อาจใช้คุกกี้และข้อมูลทางเทคนิค เช่น ประเภทอุปกรณ์ เบราว์เซอร์ และตำแหน่งโดยประมาณ คุณสามารถจำกัดหรือลบคุกกี้ได้จากการตั้งค่าเบราว์เซอร์ และอ่านรายละเอียดเพิ่มเติมได้จาก <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#9b711c]">นโยบายความเป็นส่วนตัวของ Google</a></p>
            </section>
            <section><h2 className="text-xl font-bold text-[#0a2d20]">การติดต่อเกี่ยวกับข้อมูล</h2><p className="mt-3">หากต้องการสอบถามหรือขอแก้ไขข้อมูล โปรดติดต่อ <a href={`mailto:${SITE.email}`} className="font-semibold text-[#9b711c]">{SITE.email}</a></p></section>
          </div>
        </div>
      </section>
    </main>
  );
}

