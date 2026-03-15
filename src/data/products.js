export const shopProducts = [
  {
    id: "1",
    name: "Професионална електрическа пила",
    price: 150,
    category: "електроуреди",
    in_stock: true,
    image_url: "https://i.postimg.cc/4xmS2bxf/Ekranna-snimka-2026-03-01-210524.png",
    description: "Професионална електрическа пила - 65W: 35000RPM."
  },
  {
    id: "2",
    name: "LED/UV лампа 4",
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
    description: "Безчетков прахоуловител за маникюр с мощен двоен турбо вентилатор."
  },
  {
    id: "4",
    name: "Ергономична поставка за ръце",
    price: 33,
    category: "аксесоари",
    in_stock: true,
    image_url: "https://i.postimg.cc/x1zcfMF5/ea1a423f-c4f0-4fe6-b2ed-4278f1a91ca4.jpg",
    description: "Стабилна и удобна поставка за ръце за комфорт по време на работа."
  }
];

export const getProductById = (id) => shopProducts.find((product) => product.id === String(id));
