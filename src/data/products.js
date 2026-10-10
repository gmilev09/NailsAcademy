
const PRODUCT_IMG =
  "https://raw.githubusercontent.com/gmilev09/NailsAcademy/main/public/Products";

/* ================= ПРОМОЦИЯ =================
   Електроуредите са с −20% намаление. Цените в каталога по-долу са
   редовните, а във витрината се показва промо цена, изчислена
   автоматично и закръглена до цяло число. За да спреш промоцията —
   сложи PROMO_ACTIVE = false. */
export const PROMO_ACTIVE = true;
export const PROMO_CATEGORY = "електроуреди";
export const PROMO_DISCOUNT_PERCENT = 20;

const rawProducts = [
  {
    id: "36",
    name: "NAIL MASTER - Професионална електрическа пила",
    price: 160,
    category: "електроуреди",
    in_stock: true,
    image_url: `${PRODUCT_IMG}/417/%E6%B8%B2%E6%9F%93%E5%9B%BE%20(4).jpg`,
    image_url_2: `${PRODUCT_IMG}/417/%E5%8C%85%E8%A3%85%E5%AE%9E%E7%89%A9%E5%9B%BE.jpg`,
    description: `NAIL MASTER ES-417

Професионална електрическа пила • 110W • Безчетков мотор • до 40 000 оборота/мин

Мощност, стабилност и прецизност в едно професионално устройство.

Nail Master ES-417 е създадена за професионалисти, които не правят компромис с контрола и комфорта по време на работа. Със своя 110W безчетков мотор, до 40 000 оборота в минута и изключително стабилна работа, тя осигурява прецизност дори при интензивно салонно натоварване.

⚡ Технология, която прави разликата

ИНТЕЛИГЕНТЕН КОНТРОЛ ПРИ ОБРАТЕН ХОД

Една от отличителните характеристики на Nail Master е автоматичното адаптиране на оборотите при смяна на посоката на въртене.

При превключване между посока напред и обратна посока пилата интелигентно регулира оборотите, за да осигури плавен преход и по-добър контрол, без неприятен рязък старт.

Това е особено важно при работа около кутикулата и при техники, при които често се сменя посоката на въртене.

✨ Защо Nail Master ES-417?

110W професионална мощност
Стабилна работа и достатъчен резерв от мощност за различни техники и материали.

Безчетков мотор
Осигурява плавна, надеждна и ефективна работа.

До 40 000 оборота/мин
Фин контрол на оборотите според процедурата, материала и техниката.

Минимални вибрации
Комфортна работа и по-добър контрол при продължителни процедури.

Интелигентен контрол при обратен ход
Автоматично адаптиране на оборотите при смяна на посоката.

Впечатляващ професионален дизайн
Компактно тяло, интуитивно управление и дизайн в бяло и златно, създаден да стои естествено във всеки салон.

ПРОФЕСИОНАЛЕН КОНТРОЛ. БЕЗ ИЗЛИШНО УСИЛИЕ.

Nail Master ES-417 е подходяща за маникюр, педикюр, подготовка на нокътната плочка, премахване на материал, корекции и изграждане.

Това е пила за професионалиста, който търси не просто високи обороти, а контрол, стабилност и прецизност при всяко движение.

ТЕХНИЧЕСКИ ХАРАКТЕРИСТИКИ
• Модел: ES-417
• Мощност: 110W
• Мотор: безчетков
• Обороти: 0–40 000 оборота/мин
• Посока на въртене: напред / обратно
• Автоматична адаптация на оборотите при смяна на посоката
• Цвят: бяло / златно
• Тегло на накрайника: 0.14 кг

NAIL MASTER ES-417

Когато мощността трябва да бъде под контрол.`
  },
  {
    id: "37",
    name: "NAIL MASTER - Професионална UV/LED лампа",
    price: 106,
    category: "електроуреди",
    in_stock: true,
    image_url: `${PRODUCT_IMG}/601%20601P/601%20%E7%99%BD.jpg`,
    image_url_2: `${PRODUCT_IMG}/601%20601P/601%E5%86%85%E8%85%94%E5%9B%BE.jpg`,
    image_url_3: `${PRODUCT_IMG}/601%20601P/%E6%B8%B2%E6%9F%93%E5%9C%BA%E6%99%AF%E5%9B%BE%20(1).jpg`,
    description: `NAIL MASTER
Професионална UV/LED лампа • 96W • 2600 mAh

Компактна форма. Професионална производителност.

⚡ 96W МОЩНОСТ
🔋 2600 mAh БАТЕРИЯ
⚡ МИГНОВЕН СЕНЗОР

Мигновен сензор

Поставяте ръката — сензорът реагира автоматично и стартира полимеризацията.

Без излишни движения. Повече удобство при работа.

⚡ 365–395 nm UV/LED спектър

Професионален спектър за ефективна полимеризация на съвременни UV/LED гел системи — база, гел лак, топ и изграждащи материали.

↔ ИНТЕЛИГЕНТЕН ДИСПЛЕЙ

Дисплеят може да променя посоката си с един бутон.

Към клиента или към маникюриста.

Малък детайл, който прави работата значително по-удобна.

🔋 Работа с батерия

Вградената 2600 mAh батерия позволява по-свободно позициониране на лампата и по-малко кабели върху работната маса.

✨ Компактна, но професионална

ES-601 е отличен избор за маникюристи, които искат функционална професионална лампа, без да заемат излишно пространство.

ТЕХНИЧЕСКИ ХАРАКТЕРИСТИКИ
• Модел: ES-601
• Мощност: 96W
• LED диоди: 48 бр.
• Батерия: 2600 mAh
• Спектър: 365–395 nm
• Мигновен сензор
• LED дисплей с променяща се посока
• Цвят: бял

NAIL MASTER Компактна. Интелигентна. Готова за професионална работа.`
  },
  {
    id: "38",
    name: "NAIL MASTER PRO - Професионална UV/LED лампа",
    price: 124,
    category: "електроуреди",
    in_stock: true,
    image_url: `${PRODUCT_IMG}/601%20601P/601p%E7%BB%84%E5%90%88%20.jpg`,
    image_url_2: `${PRODUCT_IMG}/601%20601P/%E6%B8%B2%E6%9F%93%E5%9C%BA%E6%99%AF%E5%9B%BE%20(1).jpg`,
    image_url_3: `${PRODUCT_IMG}/601%20601P/601P%E5%86%85%E8%85%94%E5%9B%BE.jpg`,
    description: `NAIL MASTER PRO

Професионална UV/LED лампа • 120W • 5200 mAh

Повече мощност. Повече свобода. Повече контрол.

⚡ 120W МОЩНОСТ
🔋 5200 mAh БАТЕРИЯ
⚡ МИГНОВЕН СЕНЗОР

⚡ 120W професионална мощност

601 PRO е създадена за професионална и интензивна салонна работа.

48 LED диода + 120W мощност за бърза и равномерна полимеризация на подходящи UV/LED продукти.

⚡ 365–395 nm UV/LED спектър

Професионален спектър, подходящ за работа с:

гел лак • база • топ • изграждащ гел • гел типсове • горни форми

⚡ Мигновен сензор

Поставяте ръката.

Сензорът реагира автоматично.

Полимеризацията започва без необходимост от натискане на бутон.

↔ ИНТЕЛИГЕНТЕН ДИСПЛЕЙ

С един бутон променяте посоката на дисплея.

Към клиента → или → към маникюриста.

🔋 5200 mAh батерия

Мощна батерия за по-голяма свобода на работното място и по-малко зависимост от кабели.

🌸 Дизайн, който се забелязва

601 PRO се предлага в розово — отличителен акцент за модерно професионално работно място.

ТЕХНИЧЕСКИ ХАРАКТЕРИСТИКИ
• Модел: ES-601 PRO
• Мощност: 120W
• LED диоди: 48 бр.
• Батерия: 5200 mAh
• Спектър: 365–395 nm
• Мигновен сензор
• LED дисплей с променяща се посока
• Цвят: розов

NAIL MASTER PRO
Повече мощност. Повече свобода. Повече контрол`
  },
  {
    id: "39",
    name: "NAIL LAMP PRO - Професионална UV/LED лампа",
    price: 110,
    category: "електроуреди",
    in_stock: true,
    image_url: `${PRODUCT_IMG}/e607/%E6%B8%B2%E6%9F%93%E7%99%BD%E5%BA%95%E5%9B%BE-%E7%99%BD%E8%89%B2.png`,
    image_url_2: `${PRODUCT_IMG}/e607/%E4%BA%A7%E5%93%81%E5%AE%9E%E6%8B%8D%20%E7%99%BD%E8%89%B2.jpg`,
    description: `NAIL LAMP PRO

Професионална UV/LED лампа • 96W • 5200 mAh

Мощност, свобода и дизайн в едно професионално решение.

⚡ 96W МОЩНОСТ
🔋 5200 mAh БАТЕРИЯ
↔ ИНТЕЛИГЕНТЕН ДИСПЛЕЙ

Защо Nail Lamp PRO?

365–395 nm професионален UV/LED спектър
Оптимизиран за ефективна полимеризация на UV/LED гел системи — гел лак, база, топ, изграждащи гелове, гел типсове и горни форми.

⚡ Бърза и прецизна полимеризация

Мощната LED система осигурява бързо и равномерно втвърдяване на материала. Особено практична при работа с гел типсове и горни форми, където бързата фиксация помага материалът да остане стабилен още при първоначалното позициониране.

↔ Дисплей, който се обръща

Една от отличителните функции на Nail Lamp PRO.

С натискането на бутон променяте посоката на цифрите на дисплея — към клиента или към маникюриста.

🔋 5200 mAh батерия

Работете по-свободно и без излишни кабели около работната зона.

🤍 Дизайн с практична дръжка

Елегантен бял корпус, компактен формат и вградена дръжка, която улеснява пренасянето.

ТЕХНИЧЕСКИ ХАРАКТЕРИСТИКИ
• Модел: ES-E607
• Мощност: 96W
• LED диоди: 48 бр.
• Батерия: 5200 mAh
• Спектър: 365–395 nm
• LED дисплей с променяща се посока
• Вградена дръжка
• Цвят: бял

NAIL LAMP PRO Професионална мощност. Свобода без кабел. Дизайн без компромис.`
  },
  {
    id: "40",
    name: "NAIL TURBO - Професионален прахоуловител",
    price: 119,
    category: "електроуреди",
    in_stock: true,
    image_url: "https://ae01.alicdn.com/kf/S2ed36052861f4496ac755dd36c049c15F.jpg",
    image_url_2: "https://ae01.alicdn.com/kf/Sb0d0265f910b4c3c81e060724b925f4cn.jpg",
    image_url_3: "https://ae01.alicdn.com/kf/S91b63083317d445c8290b4c0238a858bx.jpg",
    description: `NAIL TURBO
Професионален прахоуловител • Twin Turbo система

Чист въздух. Безопасна среда. Професионална работа.

Twin Turbo технология с два вентилатора, създадени специално за нуждите на професионалния маникюр и ноктопластика.

Мощна абсорбция на прах - устройството улавя ефективно праха от пилене и поддържа въздуха чист.

Основни характеристики:
• Двойна турбо система с два мощни вентилатора
• Безчетков мотор за по-дълъг живот
• 5 степени на работа
• LED дисплей
• Компактен и ергономичен дизайн
• Стабилна конструкция за професионална употреба

NAIL TURBO - инструмент за чистота, комфорт и професионално ниво на услугите.`
  },
  {
    id: "41",
    name: "Професионална LED лампа за маникюр и педикюр",
    price: 84,
    category: "електроуреди",
    in_stock: true,
    image_url: `${PRODUCT_IMG}/lamp/viber_image_2026-10-10_11-42-01-854.jpg`,
    description: `Професионална LED лампа за маникюр и педикюр

Перфектната светлина за прецизна работа и безупречни резултати!

💡 38W мощност • 3000 lm светлинен поток
☀️ 4 степени на яркост – 25%, 50%, 75% и 100%
↗️ Регулируемо рамо за удобно позициониране
🔆 112 LED диода за равномерно осветяване
🔩 Стабилно закрепване към работния плот
💅 Подходяща за маникюр, педикюр, миглопластика и други козметични процедури.

Осигурете си комфорт, добра видимост и повече прецизност във всяка процедура.`
  },
  {
    id: "2",
    name: "LED/UV лампа",
    price: 27.9,
    category: "електроуреди",
    in_stock: true,
    image_url: "https://i.postimg.cc/8cj36h3d/Ekranna-snimka-2026-03-01-204502.png",
    image_url_2: "https://i.postimg.cc/VvphBJPf/Ekranna-snimka-2026-03-01-204526.png",
    description: "UV/LED лампа с 45 диода."
  },
  {
    id: "3",
    name: "Прахоуловител",
    price: 99.9,
    category: "електроуреди",
    in_stock: true,
    image_url: "https://ae01.alicdn.com/kf/S2ed36052861f4496ac755dd36c049c15F.jpg",
    image_url_2: "https://ae01.alicdn.com/kf/Sb0d0265f910b4c3c81e060724b925f4cn.jpg",
    image_url_3: "https://ae01.alicdn.com/kf/S91b63083317d445c8290b4c0238a858bx.jpg",
    description: `Професионален прахоулавител с два вентилатора - Twin Turbo система

Осигурете си чиста и безопасна работна среда с този мощен прахоулавител с два вентилатора, създаден специално за нуждите на професионалния маникюр и ноктопластика. Благодарение на Twin Turbo технологията, устройството улавя ефективно праха от пилене, като поддържа въздуха чист и предпазва както Вас, така и Вашите клиенти.

Основни характеристики:

• Двойна турбо система с два мощни вентилатора
• Висока степен на абсорбиране на прах
• Безчетков мотор за по-дълъг живот
• Компактен и ергономичен дизайн
• Лесен за поддръжка и почистване
• Стабилна конструкция за професионална употреба

Предимства:

• Минимизира разпространението на прах в работната зона
• 5 степени на работа
• LED дисплей
• Осигурява по-хигиенична и здравословна среда
• Подобрява комфорта по време на работа
• Подходящ за интензивна салонна натовареност

Това е незаменим инструмент за всеки маникюрист, който държи на чистотата, комфорта и професионалното ниво на услугите си.`
  },
  {
    id: "4",
    name: "Ергономична поставка за ръце",
    price: 33,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/x1zcfMF5/ea1a423f-c4f0-4fe6-b2ed-4278f1a91ca4.jpg",
    description: "Стабилна и удобна поставка за ръце за комфорт по време на работа."
  },
   {
    id: "5",
    name: "UV лампа с щипка с USB",
    price: 8.9,
    category: "електроуреди",
    in_stock: true,
    image_url: "https://i.postimg.cc/rpZNtvLg/Ekranna-snimka-2026-03-01-203954.png",
    description: ""
  },
  {
    id: "6",
    name: "UV/LED фенер",
    price: 6.9,
    category: "електроуреди",
    in_stock: true,
    image_url: "https://i.postimg.cc/fRn91MwW/Ekranna-snimka-2026-03-01-210936.png",
    description: ""
  },
  {
    id: "8",
    name: "Горни форми за изграждане",
    price: 8.5,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/hjqTxgYg/Ekranna-snimka-2026-03-01-205431.png",
    description: "Горни форми за изграждане - 120бр."
      },
   {
    id: "9",
    name: "Фибро стъкло ",
    price: 1.49,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/Hk9gHtC8/Ekranna-snimka-2026-03-01-204912.png",
    description: "Фибро стъкло за лепене на счупени нокти"
  },
   {
    id: "10",
    name: "Органаизер за фрези с четка за почистване",
    price: 4.5,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/T3vSKX32/Ekranna-snimka-2026-03-01-201437.png", image_url_2: "https://i.postimg.cc/xd04PyHY/Ekranna-snimka-2026-03-01-201459.png",
    description: "С капацитет за 30 накраиника"
  },
   {
    id: "11",
    name: "Огледален пигмент - 6 цвята",
    price: 8.9,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/Nfs2BK17/Ekranna-snimka-2026-03-01-201117.png", image_url_2:"https://i.postimg.cc/sXP1Rzxw/Ekranna-snimka-2026-03-01-201138.png",
    description: ""
  },
   {
    id: "12",
    name: "Хартиени форми за изграждане",
    price: 7.9,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/63dPtjdX/Ekranna-snimka-2026-03-01-192942.png", image_url_2:"https://i.postimg.cc/GhM5Lssk/Ekranna-snimka-2026-03-01-193034.png", image_url_3:"https://i.postimg.cc/4xq2tk5W/Ekranna-snimka-2026-03-01-193000.png",
    description: "100бр."
  },
   {
    id: "13",
    name: "Розово фолио ",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/MKZ7pPy3/471333708-615367804306499-3080603529564129633-n.jpg",
    description: ""
  },
   {
    id: "14",
    name: "Златно фолио",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/gJY97bZZ/471568956-615366800973266-4051339064563387387-n.jpg",
    description: ""
  },
   {
    id: "15",
    name: "Сребърно фолио ",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/PqDrHHJV/471695978-615366910973255-3947372836038095415-n.jpg",
    description: ""
  },
   {
    id: "16",
    name: "Розово-златно фолио ",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/m2TcSPkF/471756113-615366804306599-6347641468749741882-n.jpg",
    description: ""
  },
  {
    id: "17",
    name: "Златно фолио ",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/8zKrcTTY/471872643-615368094306470-1997504274679167585-n.jpg",
    description: ""
  },
   {
    id: "18",
    name: "Синьо фолио ",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/dtcRcQ06/471682639-615366787639934-5173947010396223195-n.jpg",
    description: ""
  },
   {
    id: "19",
    name: "Червено фолио ",
    price: 1.99,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/rpMW7DZd/471850100-615367930973153-3910663256230308150-n.jpg",
    description: ""
  },
   {
    id: "20",
    name: "Метална четка за почистване на фрези",
    price: 2.9,
    category: "четки",
    in_stock: true,
    image_url: "https://i.postimg.cc/Z5N7msPZ/Ekranna-snimka-2026-03-01-200520.png",
    description: ""
  },
   {
    id: "21",
    name: "Четка за гел",
    price: 6.9,
    category: "четки",
    in_stock: true,
    image_url: "https://i.postimg.cc/k4RdPv5Y/Ekranna-snimka-2026-03-01-193957.png",
    description: "Четка - котешко езиче за гел и акрил"
  },
   {
    id: "22",
    name: "Тънка четка за декорации",
    price: 6.9,
    category: "четки",
    in_stock: true,
    image_url: "https://i.postimg.cc/3w7hpv9q/Ekranna-snimka-2026-03-01-194625.png",
    description: "Хамелеонова четка за рисуване - 9мм"
  },
   {
    id: "23",
    name: "Тънка четка за декорации",
    price: 6.9,
    category: "четки",
    in_stock: true,
    image_url: "https://i.postimg.cc/8kb6rR4T/Ekranna-snimka-2026-03-01-193957.png",
    description: "Хамелеонова четка за рисуване - 11мм"
  },
   {
    id: "24",
    name: "Гъбички за омбре с щипка",
    price: 4.9,
    category: "четки",
    in_stock: true,
    image_url: "https://i.postimg.cc/TPhyzBv1/Ekranna-snimka-2026-03-01-193651.png",image_url_2:"https://i.postimg.cc/ht1bDkYT/Ekranna-snimka-2026-03-01-193034.png",image_url_3: "https://i.postimg.cc/650yyB9v/Ekranna-snimka-2026-03-01-193358.png",
    description: ""
  },
   {
    id: "25",
    name: "Четка за декорации и гел",
    price: 6.9,
    category: "четки",
    in_stock: true,
    image_url: "https://i.postimg.cc/g2zm5RbJ/Ekranna-snimka-2026-03-01-192716.png",
    description: ""
  },
   {
    id: "26",
    name: "Златен резец за удължители",
    price: 4.9,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/Gm9W0jts/Ekranna-snimka-2026-03-01-202958.png",
    description: ""
  },
   {
    id: "27",
    name: "Гелотина ",
    price: 4.5,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/VNW5x1dj/Ekranna-snimka-2026-03-01-202448.png",image_url_2: "https://i.postimg.cc/8c21Fn7D/Ekranna-snimka-2026-03-01-202528.png", image_url_3: "https://i.postimg.cc/xTmjrYZz/Ekranna-snimka-2026-03-01-202502.png",
    description: "Гелотина от неръждаема стомана за скъсяване на нокти и удължители"
  },
   {
    id: "28",
    name: "Силиконов полировчик",
    price: 2.9,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/YqMD7znQ/Ekranna-snimka-2026-03-01-202049.png",
    description: ""
  },
   {
    id: "29",
    name: "Буфер блок пила",
    price: 1.5,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/J7bzyR15/Ekranna-snimka-2026-03-01-200004.png",
    description: ""
  },
   {
    id: "30",
    name: "Керамичен накраиник за електрическа пила с червена насечка",
    price: 9.9,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/xTJNpwYJ/Ekranna-snimka-2026-03-01-195555.png",
    description: ""
  },
   {
    id: "31",
    name: "Керамичен накраиник за електричвска пила с жълта насечка",
    price: 9.9,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/N011JW6R/Ekranna-snimka-2026-03-01-195609.png",
    description: ""
  },
   {
    id: "32",
    name: "Избутвач ",
    price: 2.9,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://i.postimg.cc/59XhXgbt/Ekranna-snimka-2026-03-01-193957.png",image_url_2: "https://i.postimg.cc/BQxwFwyX/Ekranna-snimka-2026-03-01-194209.png",image_url_3: "https://i.postimg.cc/QMn6sLB0/Ekranna-snimka-2026-03-01-194019.png",
    description: "Избутвач от неръждаема стомана"
  },
   {
    id: "33",
    name: "Хартиени пили 100/180",
    price: 0.99,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://ae01.alicdn.com/kf/Se2812b34e81b4c029328cd5b4ebb7e44j.jpg",
    description: ""
  },
   {
    id: "34",
    name: "Дървени пили за маникюр 100/180",
    price: 0.99,
    category: "инструменти_пили",
    in_stock: true,
    image_url: "https://ae01.alicdn.com/kf/S378316ffa374451abeb161596780849fA.jpg?width=900&height=900&hash=1800",
    description: ""
  },
   {
    id: "35",
    name: "Масажни свещи AYA",
    price: 15.99,
    category: "масажни_свещи",
    in_stock: true,
    image_url: "https://i.postimg.cc/7L3KdG2w/12779591-3cf1-4d68-abc5-4b9abd7a5670.jpg",
    image_url_2: "https://i.postimg.cc/3R6nVPZ0/18ba628e-8a04-4b9e-b432-10b6b2c8e45e.jpg",
    image_url_3: "https://i.postimg.cc/xdpRNWBq/a2448134-f14c-4379-8008-2925ddc3e595.jpg",
    description: `AYA Skin Ritual Candle
Чист ритуал за кожа като коприна

Тази луксозна масажна свещ се разтопява в топло, копринено масло, което подхранва кожата и превръща грижата за тялото в истински SPA ритуал у дома.

Създадена от внимателно подбрани съставки, формулата обгръща кожата с мекота, деликатен аромат и усещане за комфорт.

✨ Силата на чистите съставки

Пчелен восък
защитава • запечатва влагата • омекотява

Масло от карите
подхранва • възстановява • подобрява еластичността

Кокосово масло
хидратира • омекотява • придава копринено усещане

Масло от гроздови семки
придава еластичност • мекота • попива леко

Масло от жожоба
подхранва • регенерира • омекотява • защитава кожата

Витамин Е
антиоксидант • поддържа кожата гладка и жизнена

Нето количество: 70 g

AYA – топлина, аромат и естествена грижа за кожата.`
  }
];

/**
 * Маркетингова промоция: текущата цена остава като промоционална,
 * a „редовната" се генерира автоматично като +20% и се закръглява
 * до цяло евро. При −20% офертата си е чиста стойност.
 */
/**
 * Маркетингова промоция: сегашната цена остава като промоционална,
 * a „редовната" се генерира автоматично като +20% и СЕ ЗАКРЪГЛЯВА
 * до цяло евро. И двете цени са чисти числа.
 */
export const shopProducts = rawProducts.map((product) => {
  if (!PROMO_ACTIVE || product.category !== PROMO_CATEGORY) return product;

  const salePrice = product.price;
  const oldPrice = Math.round(Number(product.price) * (100 / (100 - PROMO_DISCOUNT_PERCENT)));

  return {
    ...product,
    price: salePrice,
    old_price: oldPrice,
    discount_percent: PROMO_DISCOUNT_PERCENT,
    on_sale: true,
  };
});

/* ================= ВАРИАНТИ НА ПРОДУКТИ =================
   Продукти, които са един и същ модел с различни специфики/цветове,
   се показват като ЕДНА карта в магазина, а в детайлната страница
   може да се избере конкретният вариант. */
export const productGroups = [
  {
    id: "group-foil",
    name: "Фолио за ноктодизайн",
    category: "аксесоари",
    selectorLabel: "Цвят",
    variants: [
      { productId: "13", label: "Розово", swatch: "#F5A3B7" },
      { productId: "14", label: "Златно", swatch: "#D9B24A" },
      { productId: "15", label: "Сребърно", swatch: "#C9CDD2" },
      { productId: "16", label: "Розово-златно", swatch: "#E5B299" },
      { productId: "17", label: "Златно №2", swatch: "#C9A227" },
      { productId: "18", label: "Синьо", swatch: "#5B8DD9" },
      { productId: "19", label: "Червено", swatch: "#D64541" },
    ],
  },
  {
    id: "group-thin-brush",
    name: "Тънка четка за декорации",
    category: "четки",
    selectorLabel: "Размер",
    variants: [
      { productId: "22", label: "9 мм" },
      { productId: "23", label: "11 мм" },
    ],
  },
  {
    id: "group-ceramic-bit",
    name: "Керамичен накраиник за електрическа пила",
    category: "инструменти_пили",
    selectorLabel: "Насечка",
    variants: [
      { productId: "30", label: "Червена насечка", swatch: "#DC2626" },
      { productId: "31", label: "Жълта насечка", swatch: "#EAB308" },
    ],
  },
  {
    id: "group-files",
    name: "Пили за маникюр 100/180",
    category: "инструменти_пили",
    selectorLabel: "Материал",
    variants: [
      { productId: "33", label: "Хартиена" },
      { productId: "34", label: "Дървена" },
    ],
  },
  {
    id: "group-601",
    name: "NAIL MASTER - Професионална UV/LED лампа",
    category: "електроуреди",
    selectorLabel: "Модел",
    variants: [
      { productId: "37", label: "601" },
      { productId: "38", label: "601P" },
    ],
  },
];

/** Връща групата, към която принадлежи даден продукт (или null). */
export function getGroupForProduct(productId) {
  const key = String(productId);
  return (
    productGroups.find((group) =>
      group.variants.some((variant) => String(variant.productId) === key)
    ) || null
  );
}

/**
 * Връща списъка за показване в магазина:
 * всяка група се показва веднъж (с първия си вариант), на мястото на първия вариант.
 * Останалите продукти са непроменени.
 */
export function getDisplayProducts() {
  const firstVariantOfGroup = new Map(
    productGroups
      .filter((group) => group.variants.length > 0)
      .map((group) => [String(group.variants[0].productId), group])
  );
  const allVariantIds = new Set(
    productGroups.flatMap((group) => group.variants.map((variant) => String(variant.productId)))
  );

  return shopProducts
    .map((product) => {
      const key = String(product.id);
      if (firstVariantOfGroup.has(key)) {
        const group = firstVariantOfGroup.get(key);
        return { ...product, name: group.name, group };
      }
      if (allVariantIds.has(key)) return null; // не-първи вариант — скрит в списъка
      return product;
    })
    .filter(Boolean);
}
