import { SITE } from "@/data/site";

type LineCtaProps = {
  title?: string;
  description?: string;
};

export default function LineCta({
  title = "มีแผนเดินทางแล้วหรือยัง?",
  description = "ส่งวันเดินทาง จำนวนคน สัมภาระ และปลายทาง ทีม HUGLAO จะช่วยตรวจรถและจัดทำข้อเสนอให้",
}: LineCtaProps) {
  return (
    <section className="hl-grid-pattern bg-[#0a2d20] px-5 py-[clamp(72px,9vw,110px)] text-white">
      <div className="mx-auto grid max-w-[1120px] items-center gap-10 rounded-[30px] border border-white/10 bg-[#071d13]/60 p-[clamp(28px,5vw,56px)] shadow-[0_30px_90px_rgba(0,0,0,.18)] lg:grid-cols-[1fr_auto]">
        <div>
          <span className="hl-kicker !text-[#efd276]">เริ่มวางแผนกับ HUGLAO</span>
          <h2 className="mt-5 font-serif-th text-[clamp(2.1rem,5vw,4rem)] font-bold leading-tight">{title}</h2>
          <p className="mt-5 max-w-[700px] text-lg leading-8 text-[#c8d3cc]">{description}</p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#aebcb3]">
            <span>เริ่มจากเวียงจันทน์</span><span>•</span><span>ตรวจรถก่อนยืนยัน</span><span>•</span><span>เลือกแผนเอง</span>
          </div>
        </div>
        <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hl-button-primary min-h-14 px-8 lg:min-w-[220px]">ส่งรายละเอียดผ่าน LINE</a>
      </div>
    </section>
  );
}
