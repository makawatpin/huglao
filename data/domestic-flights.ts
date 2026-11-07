export const DOMESTIC_FLIGHT_PATH = "/services/laos-domestic-flights/";
export const FLIGHT_AIRPORTS = [
  { code: "VTE", city: "เวียงจันทน์", airport: "สนามบินวัตไต", note: "จุดเชื่อมต่อเที่ยวบินภายในลาว" },
  { code: "LPQ", city: "หลวงพระบาง", airport: "สนามบินหลวงพระบาง", note: "ตรวจเที่ยวจากเวียงจันทน์ หรือเส้นทางต่อปากเซ" },
  { code: "PKZ", city: "ปากเซ", airport: "สนามบินปากเซ แขวงจำปาสัก", note: "วางแผนเดินทางต่อไปลาวใต้" },
  { code: "ZVK", city: "สะหวันนะเขต", airport: "สนามบินสะหวันนะเขต", note: "ตรวจวันที่เปิดขายก่อนจัดแผน" },
  { code: "XKH", city: "เชียงขวาง", airport: "สนามบินเชียงขวาง / โพนสะหวัน", note: "ใช้รหัส XKH ตรวจให้ตรงกับตั๋ว" },
  { code: "LXG", city: "หลวงน้ำทา", airport: "สนามบินหลวงน้ำทา", note: "ตรวจวันบินและสิทธิสัมภาระของเที่ยวที่เลือก" },
  { code: "NEU", city: "หัวพัน / ซำเหนือ", airport: "พื้นที่หัวพัน / ซำเหนือ", note: "ยืนยันชื่อสนามบินและจุดรับ–ส่งบนตั๋วก่อนจัดรถต่อ" },
  { code: "BOR", city: "บ่อแก้ว", airport: "สนามบินนานาชาติบ่อแก้ว", note: "ตรวจรหัส BOR ไม่สับสนกับสนามบินห้วยทรายเดิม" },
] as const;
export const FLIGHT_SOURCES = [
  { label: "Lao Airlines — ตารางบิน 25 ต.ค. 2569–27 มี.ค. 2570", url: "https://laoairlines.com/en/flight-schedule/" },
  { label: "Lao Airlines — ประเภทค่าโดยสารและสิทธิสัมภาระ", url: "https://laoairlines.com/en/fare-type-rules/" },
  { label: "Lao Airlines — ตั๋วอิเล็กทรอนิกส์และ PNR", url: "https://laoairlines.com/en/e-ticket/" },
  { label: "Lao Airlines — เวลาเช็กอิน", url: "https://laoairlines.com/en/check-in-time/" },
  { label: "Lanexang Airways — ข้อมูลและช่องทางจอง", url: "https://lxairways.com/eng/" },
  { label: "Lao Skyway — ตรวจเที่ยวบินที่เปิดขาย", url: "https://www.laoskyway.com/" },
] as const;
