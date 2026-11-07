import VanAlbum from "@/components/VanAlbum";
import { getMedia, type MediaId } from "@/data/media";
import { VEHICLE_GROUPS } from "@/data/site";

const VEHICLES = [...VEHICLE_GROUPS].sort((a, b) => Number(b.slug === "van") - Number(a.slug === "van"));
const ALBUMS = VEHICLES.map(vehicle => {
  const ids: MediaId[] = vehicle.slug === "van"
    ? [...vehicle.mediaIds, "huglaoHiaceSeatRows", "huglaoHiaceLuggageSpace"]
    : [...vehicle.mediaIds];
  return {
    title: vehicle.shortName,
    items: ids.map(id => {
      const media = getMedia(id);
      return { src: media.src, alt: media.alt, caption: media.alt };
    }),
  };
});

export default function VientianeVehicleOptions() {
  return (
    <section id="vehicles" className="city-section scroll-mt-24 bg-[#f7f3e9]">
      <div className="hl-shell">



        <div className="">
          <h2 className="font-serif-th text-2xl font-bold text-[#0a2d20] sm:text-3xl">อัลบั้มรถแต่ละประเภท</h2>
          <p className="mt-3 text-sm leading-7">เลื่อนดูรูปบนมือถือ แตะเพื่อขยาย และปัดซ้าย–ขวาเพื่อดูรูปถัดไป</p>
          <VanAlbum label="อัลบั้มรถเที่ยวเวียงจันทน์" imageFit="contain" groups={ALBUMS} />
        </div>
        <p className="mt-6 text-sm leading-7 text-[#59645d]">ภาพตัวอย่างรถในทีมและพาร์ตเนอร์ ยืนยันรถคันจริง ผังเบาะ และจำนวน/ขนาดกระเป๋าก่อนจอง ภาพพื้นที่สัมภาระที่พับเบาะไม่ได้หมายถึงใช้ที่นั่งครบพร้อมพื้นที่กระเป๋าเท่ากัน</p>
      </div>
    </section>
  );
}
