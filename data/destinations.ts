// data/destinations.ts
// การ์ดจุดหมายเที่ยวลาว ใช้ร่วมกันระหว่างหน้าแรก (ส่วน Explore) และหน้า /laos-travel

export interface Destination {
  name: string;
  citySlug: string | null;
  tag: string | null;
  desc: string;
  gradient: string;
  image: string;
}

export const DESTINATIONS: Destination[] = [
  { name: "เวียงจันทน์", citySlug: "vientiane", tag: "เมืองหลวง", desc: "พระธาตุหลวง · ประตูชัย · วัดสีเมือง · ตลาดกลางคืนริมโขง", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-vientiane.webp" },
  { name: "หลวงพระบาง", citySlug: "luangprabang", tag: "มรดกโลก", desc: "วัดเชียงทอง · ตักบาตรข้าวเหนียว · น้ำตกตาดกวางสี · พูสี", gradient: "linear-gradient(165deg,#a87815,#7a5510)", image: "/assets/dest-luangprabang.webp" },
  { name: "วังเวียง", citySlug: "vangvieng", tag: "ผจญภัย", desc: "บลูลากูน · ล่องเรือแม่น้ำซอง · บอลลูน · ถ้ำปูคำ", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)", image: "/assets/dest-vangvieng.webp" },
  { name: "เมืองเฟือง", citySlug: "muangfeuang", tag: null, desc: "ถ้ำเจียง · ภูเขาหินปูน · เงียบสงบกว่าวังเวียง", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-muangfeuang.webp" },
  { name: "ปากเซ · โบโลเวน", citySlug: null, tag: null, desc: "ที่ราบสูงไร่กาแฟ · น้ำตกตาดฟาน · ปราสาทวัดพู", gradient: "linear-gradient(165deg,#2c5a3c,#123524)", image: "/assets/dest-pakse.webp" },
  { name: "เชียงขวาง", citySlug: null, tag: null, desc: "ทุ่งไหหิน · ประวัติศาสตร์ · ธรรมชาติบนที่สูง", gradient: "linear-gradient(165deg,#a87815,#7a5510)", image: "/assets/dest-xiengkhouang.webp" },
  { name: "บ่อเต็น (ชายแดนจีน)", citySlug: null, tag: null, desc: "ปลายทางรถไฟลาว–จีน · เขตการค้าชายแดน", gradient: "linear-gradient(165deg,#1b4a32,#0a1f14)", image: "/assets/dest-boten.webp" },
];
