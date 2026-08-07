import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center bg-[#f7f3e9] px-5 pb-20 pt-32 text-center">
      <div className="mx-auto max-w-[680px]">
        <span className="text-sm font-bold tracking-[.18em] text-[#9b711c]">404</span>
        <h1 className="mt-5 font-serif-th text-[clamp(2.5rem,6vw,4.8rem)] font-bold leading-tight text-[#071d13]">ไม่พบหน้าที่คุณกำลังค้นหา</h1>
        <p className="mt-5 text-lg leading-8 text-[#59645d]">หน้านี้อาจถูกย้ายเข้าสู่โครงสร้างรถหรือเส้นทางใหม่ของ HUGLAO</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-[#0a2d20] px-6 py-3 font-bold text-white">กลับหน้าแรก</Link>
          <Link href="/travel-with-us#routes" className="rounded-full border border-[#0a2d20]/20 px-6 py-3 font-bold text-[#0a2d20]">ดูเส้นทาง</Link>
        </div>
      </div>
    </main>
  );
}
