"use client";

import { FormEvent, useState } from "react";
import { PICKUP_POINTS, READY_SERVICES, ROUTE_GROUPS, SITE, VEHICLE_GROUPS } from "@/data/site";

const fieldClass =
  "mt-2 min-h-12 w-full rounded-[14px] border border-[#d8d0be] bg-white px-4 py-3 text-[#17231c] outline-none transition focus:border-[#9b711c] focus:ring-2 focus:ring-[#d8af4a]/25";

export default function QuoteForm() {
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const services = form.getAll("services").join(", ") || "ไม่ระบุ";

    const message = [
      "คำขอราคา HUGLAO",
      `ชื่อผู้ติดต่อ: ${form.get("contactName") || "-"}`,
      `เบอร์โทร / LINE: ${form.get("contactChannel") || "-"}`,
      `วันที่และเวลารับ: ${form.get("startAt") || "-"}`,
      `วันที่สิ้นสุดบริการ: ${form.get("endDate") || "-"}`,
      `จุดรับ: ${form.get("pickup") || "-"}`,
      `จุดส่ง: ${form.get("dropoff") || "-"}`,
      `จำนวนผู้โดยสาร: ${form.get("passengers") || "-"}`,
      `เด็ก / ผู้สูงอายุ: ${form.get("specialPassengers") || "ไม่ระบุ"}`,
      `จำนวนกระเป๋า: ${form.get("luggage") || "-"}`,
      `ประเภทรถ: ${form.get("vehicle") || "-"}`,
      `เส้นทาง: ${form.get("route") || "-"}`,
      `แผนเที่ยว: ${form.get("plan") || "ไม่ระบุ"}`,
      `บริการเสริม: ${services}`,
      `ความต้องการพิเศษ: ${form.get("specialRequest") || "ไม่ระบุ"}`,
      "",
      "หมายเหตุ: ข้อมูลนี้เป็นคำขอราคา ยังไม่ใช่การยืนยันจอง",
    ].join("\n");

    setSummary(message);
    setCopied(false);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
      <form onSubmit={handleSubmit} className="rounded-[30px] border border-[#ddd4c1] bg-white p-[clamp(24px,4vw,44px)] shadow-[0_22px_70px_rgba(27,49,37,.07)]">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#0a2d20]">ชื่อผู้ติดต่อ *<input required name="contactName" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">เบอร์โทรหรือ LINE *<input required name="contactChannel" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">วันที่และเวลารับ *<input required type="datetime-local" name="startAt" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">วันที่สิ้นสุดบริการ *<input required type="date" name="endDate" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">จุดรับ *
            <select required name="pickup" defaultValue="" className={fieldClass}>
              <option value="" disabled>เลือกจุดรับ</option>
              {PICKUP_POINTS.map((point) => <option key={point.slug} value={point.name}>{point.name}</option>)}
              <option value="จุดอื่นในเวียงจันทน์">จุดอื่นในเวียงจันทน์</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-[#0a2d20]">จุดส่ง *<input required name="dropoff" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">จำนวนผู้โดยสาร *<input required min="1" type="number" name="passengers" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">เด็กหรือผู้สูงอายุ<input name="specialPassengers" placeholder="เช่น เด็ก 1 คน ผู้สูงอายุ 1 คน" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">จำนวนกระเป๋า *<input required min="0" type="number" name="luggage" className={fieldClass} /></label>
          <label className="text-sm font-semibold text-[#0a2d20]">ประเภทรถ *
            <select required name="vehicle" defaultValue="" className={fieldClass}>
              <option value="" disabled>เลือกประเภทรถ</option>
              {VEHICLE_GROUPS.map((vehicle) => <option key={vehicle.slug} value={vehicle.name}>{vehicle.name}</option>)}
              <option value="ขอให้ HUGLAO แนะนำ">ขอให้ HUGLAO แนะนำ</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-[#0a2d20] md:col-span-2">เส้นทางที่สนใจ *
            <select required name="route" defaultValue="" className={fieldClass}>
              <option value="" disabled>เลือกเส้นทาง</option>
              {ROUTE_GROUPS.map((route) => <option key={route.slug} value={route.name}>{route.name}</option>)}
              <option value="เส้นทางอื่น เริ่มจากเวียงจันทน์">เส้นทางอื่น เริ่มจากเวียงจันทน์</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-[#0a2d20] md:col-span-2">แผนเที่ยวโดยสังเขป<textarea name="plan" rows={4} className={fieldClass} /></label>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-[#0a2d20]">บริการเสริมที่สนใจ</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {READY_SERVICES.map((service) => (
              <label key={service} className="flex items-center gap-3 rounded-[14px] border border-[#e4ddcd] p-4 text-sm text-[#59645d]">
                <input type="checkbox" name="services" value={service} className="h-4 w-4 accent-[#9b711c]" />{service}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="mt-6 block text-sm font-semibold text-[#0a2d20]">ความต้องการพิเศษ<textarea name="specialRequest" rows={3} className={fieldClass} /></label>
        <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-[#59645d]">
          <input required type="checkbox" className="mt-1 h-4 w-4 accent-[#9b711c]" />
          <span>ฉันเข้าใจว่าการส่งข้อมูลนี้เป็นคำขอราคา ยังไม่ใช่การยืนยันจอง และ HUGLAO ต้องตรวจรถก่อนเสนอราคา</span>
        </label>
        <button type="submit" className="mt-7 min-h-14 w-full rounded-full bg-[#0a2d20] px-7 font-bold text-white transition hover:bg-[#0d4932]">สร้างสรุปคำขอราคา</button>
      </form>

      <aside className="self-start rounded-[30px] bg-[#0a2d20] p-[clamp(24px,4vw,40px)] text-white lg:sticky lg:top-24">
        <span className="text-xs font-bold uppercase tracking-[.18em] text-[#efd276]">สรุปสำหรับส่ง LINE</span>
        {summary ? (
          <>
            <textarea readOnly value={summary} rows={18} className="mt-5 w-full resize-none rounded-[18px] border border-white/10 bg-black/15 p-5 text-sm leading-7 text-[#edf1ed]" />
            <button type="button" onClick={copySummary} className="mt-4 min-h-12 w-full rounded-full border border-white/20 font-semibold hover:bg-white/10">{copied ? "คัดลอกแล้ว" : "คัดลอกข้อความสรุป"}</button>
            <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-[#d8af4a] px-6 font-bold text-[#092217] hover:bg-[#efd276]">เปิด LINE OA</a>
            <p className="mt-4 text-xs leading-6 text-[#9fb0a5]">คัดลอกสรุปแล้ววางในแชต LINE OA เพื่อส่งคำขอให้ทีม HUGLAO</p>
          </>
        ) : (
          <div className="mt-5 rounded-[20px] border border-dashed border-white/20 p-7 text-sm leading-7 text-[#aebcb3]">กรอกข้อมูลด้านซ้าย แล้วกด “สร้างสรุปคำขอราคา” ข้อมูลจะปรากฏตรงนี้ก่อนส่ง</div>
        )}
      </aside>
    </div>
  );
}
