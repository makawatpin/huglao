"use client";

import { useState } from "react";

const inputClass =
  "w-full px-4 py-[14px] rounded-[11px] border border-[#d8d3c4] bg-[#fbf9f4] font-[inherit] text-[.98rem] text-[#25271f] focus:outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(200,148,31,.15)]";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        e.currentTarget.reset();
      }}
      className="bg-white/[.97] rounded-[22px] p-[clamp(26px,4vw,38px)] shadow-[0_30px_70px_rgba(0,0,0,.3)] border border-gold-light/30"
    >
      <h3 className="m-0 mb-1 font-serif-th text-[1.4rem] text-deep-green-2 font-semibold">
        ขอใบเสนอราคา / จองรถตู้ลาว
      </h3>
      <p className="m-0 mb-[22px] text-[#6b6f64] text-[.9rem]">
        กรอกรายละเอียด เราจะติดต่อกลับโดยเร็ว
      </p>
      <div className="flex flex-col gap-3.5">
        <input required type="text" placeholder="ชื่อ-นามสกุล" className={inputClass} />
        <input required type="tel" placeholder="เบอร์โทร / LINE ID" className={inputClass} />
        <div className="grid grid-cols-2 gap-3.5">
          <input type="text" placeholder="ต้นทาง" className={inputClass} />
          <input type="text" placeholder="ปลายทาง" className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          <input type="date" className={inputClass} />
          <select className={inputClass} defaultValue="">
            <option value="">บริการที่สนใจ</option>
            <option>รถตู้ VIP ลาว</option>
            <option>ตั๋วรถไฟลาว–จีน</option>
            <option>ไกด์นำเที่ยว</option>
            <option>แพ็กเกจครบทริป</option>
          </select>
        </div>
        <textarea
          rows={3}
          placeholder="รายละเอียดเพิ่มเติม (จำนวนคน, แผนเที่ยว ฯลฯ)"
          className={`${inputClass} resize-y`}
        />
        <button
          type="submit"
          className="w-full py-4 rounded-[11px] border-none font-bold text-[1.05rem] text-deep-green cursor-pointer font-[inherit] shadow-[0_12px_28px_rgba(200,148,31,.35)] hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(200,148,31,.5)] transition-all"
          style={{ background: "linear-gradient(135deg,#a87815,#e3bd63 55%,#c8941f)" }}
        >
          ส่งคำขอจอง
        </button>
        <p className="m-0 text-center text-[#1b7a4a] text-[.9rem] font-semibold min-h-[1.1em]">
          {sent ? "✓ ส่งคำขอเรียบร้อย! ทีมฮักลาว กรุ๊ป จะติดต่อกลับโดยเร็ว" : ""}
        </p>
      </div>
    </form>
  );
}
