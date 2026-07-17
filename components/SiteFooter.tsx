import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#08160d] text-[#cfc9b8] px-[clamp(20px,5vw,48px)] pt-[clamp(48px,6vw,72px)] pb-[30px]">
      <div className="max-w-[1200px] mx-auto grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        <div className="max-w-[340px]">
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/assets/huglao-emblem.png"
              alt="HUGLAO ฮักลาว กรุ๊ป โลโก้พระธาตุหลวง"
              height={54}
              width={54}
              className="h-[54px] w-auto drop-shadow-[0_2px_6px_rgba(0,0,0,.45)]"
            />
            <span className="flex flex-col leading-none">
              <span className="font-serif-th font-bold text-[1.45rem] tracking-[.3em] text-[#f4ecd7] pl-[.3em]">
                HUGLAO
              </span>
              <span className="text-[.6rem] tracking-[.32em] text-gold mt-[3px] pl-[.32em]">
                GROUP CO., LTD.
              </span>
            </span>
          </div>
          <p className="m-0 text-[.92rem] leading-[1.7] text-[#9a9588]">
            บริษัท ฮักลาว กรุ๊ป จำกัด — ผู้เชี่ยวชาญเที่ยวลาวครบวงจร รถตู้ VIP ลาว
            จองรถตู้ลาว ตั๋วรถไฟลาว–จีน และไกด์นำเที่ยว เชื่อมไทย–ลาวเข้าด้วยกัน
          </p>
          <p className="mt-3.5 italic text-gold-light text-[1.05rem]">
            Connecting Thailand &amp; Laos
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-[#f4ecd7] text-base font-semibold">บริการ</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px] text-[.92rem]">
            <li><Link href="/#vans" className="no-underline text-[#b6b1a2] hover:text-gold-light">รถตู้ VIP ลาว / จองรถตู้ลาว</Link></li>
            <li><Link href="/#services" className="no-underline text-[#b6b1a2] hover:text-gold-light">จองตั๋วรถไฟลาว–จีน</Link></li>
            <li><Link href="/#services" className="no-underline text-[#b6b1a2] hover:text-gold-light">ไกด์นำเที่ยวลาว</Link></li>
            <li><Link href="/#explore" className="no-underline text-[#b6b1a2] hover:text-gold-light">แพ็กเกจเที่ยวลาว</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[#f4ecd7] text-base font-semibold">เส้นทางยอดนิยม</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px] text-[.92rem]">
            <li><Link href="/#explore" className="no-underline text-[#b6b1a2] hover:text-gold-light">เที่ยวเวียงจันทน์</Link></li>
            <li><Link href="/#explore" className="no-underline text-[#b6b1a2] hover:text-gold-light">เที่ยวหลวงพระบาง</Link></li>
            <li><Link href="/#explore" className="no-underline text-[#b6b1a2] hover:text-gold-light">เที่ยววังเวียง</Link></li>
            <li><Link href="/#explore" className="no-underline text-[#b6b1a2] hover:text-gold-light">ปากเซ–โบโลเวน</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[#f4ecd7] text-base font-semibold">ติดต่อเรา</h4>
          <ul className="list-none p-0 m-0 flex flex-col gap-[11px] text-[.92rem] text-[#b6b1a2]">
            <li>LINE: <span className="text-gold-light">@huglao</span></li>
            <li>โทร: 095-596-2525</li>
            <li>huglao@gmail.com</li>
            <li>เวียงจันทน์ สปป.ลาว · หนองคาย ประเทศไทย</li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-gold-light/15 flex flex-wrap gap-2.5 justify-between text-[#7d7a6e] text-[.82rem]">
        <span>© 2026 บริษัท ฮักลาว กรุ๊ป จำกัด (HUGLAO GROUP CO., LTD.) สงวนลิขสิทธิ์</span>
        <span>เที่ยวลาว · รถตู้ลาว · จองรถตู้ลาว · ตั๋วรถไฟลาว–จีน</span>
      </div>
    </footer>
  );
}
