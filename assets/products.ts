import { BaitProductType, Carrier, TelcelProductType } from "@/types/Carriers";

const TELCEL_PRODUCTS: Record<TelcelProductType, Record<number, string>> = {
  [TelcelProductType.SALDO]: {
    10: "Vigencia de 3 dias Whatsapp 200 MB.",
    20: "Vigencia de 3 dias. 100 MB libres. 200 MB para Facebook, Messenger y Twitter. Whatsapp Ilimitado.",
    30: "Vigencia de 3 dias. 120 MB libres. 300 MB para Facebook, Messenger y Twitter. Whatsapp Ilimitado.",
    50: "Vigencia de 7 dias. 400 MB libres. 750 MB para Facebook, Messenger y Twitter, Instagram, Snapchat. Whatsapp Ilimitado.",
    80: "Vigencia de 13 dias. 500 MB libres. 1 GB para Facebook, Messenger, Twitter, Instagram y Snapchat. Whatsapp Ilimitado.",
    100: "Vigencia de 15 dias. 1.3 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    150: "Vigencia de 26 dias. 2 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    200: "Vigencia de 30 dias. 3 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    300: "Vigencia de 30 dias. 4 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    500: "Vigencia de 30 dias. 6 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
  },
  [TelcelProductType.PAQUETE]: {
    10: "Vigencia de 1 día. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 50 MB libres. WhatsApp Ilimitado.",
    20: "Vigencia de 2 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 100 MB libres. 200 MB para Facebook, Messenger y Twitter. WhatsApp Ilimitado.",
    30: "Vigencia de 3 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 160 MB libres. 300 MB para Facebook, Messenger y Twitter. WhatsApp Ilimitado.",
    50: "Vigencia de 7 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 500 MB libres. 1 GB para Facebook, Messenger, Twitter, Instagram y Snapchat. WhatsApp Ilimitado.",
    80: "Vigencia de 13 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 800 MB libres. 1.5 GB para Facebook, Messenger, Twitter, Instagram y Snapchat. WhatsApp Ilimitado.",
    100: "Vigencia de 15 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 1.5 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    150: "Vigencia de 25 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 2.5 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    200: "Vigencia de 30 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 3.5 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    270: "Vigencia de 30 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 3.5 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    300: "Vigencia de 30 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 5.5 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    400: "Vigencia de 30 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 5.5 GB libres. WhatsApp, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    500: "Vigencia de 30 días. SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 8 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    1200: "Vigencia de 6 meses (6 paquetes de 30 días). SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 7 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
    2400: "Vigencia de 12 Meses (12 paquetes de 30 días). SMS y Minutos ilimitados (México, Estados Unidos y Canadá). 7 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y WhatsApp Ilimitado.",
  },
  [TelcelProductType.INTERNET]: {
    10: "Vigencia de 1 día. 70 MB libres. WhatsApp Ilimitado.",
    20: "Vigencia de 2 días. 140 MB libres. 200 MB para Facebook, Messenger y Twitter. WhatsApp Ilimitado.",
    30: "Vigencia de 3 días. 220 MB libres. 300 MB para Facebook, Messenger y Twitter. WhatsApp Ilimitado.",
    50: "Vigencia de 7 días. 600 MB libres. 1 GB para Facebook, Messenger, Twitter, Instagram y Snapchat. WhatsApp Ilimitado.",
    80: "Vigencia de 12 días. 1 GB libres. 1.5 GB para Facebook, Messenger, Twitter, Instagram y Snapchat. WhatsApp Ilimitado.",
    100: "Vigencia de 15 días. 1.8 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    150: "Vigencia de 25 días. 3 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    200: "Vigencia de 30 días. 4 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    300: "Vigencia de 30 días. 6.5 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
    500: "Vigencia de 30 días. 10 GB libres. Facebook, Messenger, Twitter, Instagram, Snapchat y Whatsapp Ilimitados.",
  },
  [TelcelProductType.INTERNET_POR_TIEMPO]: {
    10: "Vigencia de 1 hora. GB ilimitados a máxima velocidad.",
    15: "Vigencia de 2 horas. GB ilimitados a máxima velocidad.",
  },
};

const ATT_PRODUCTS: Record<number, string> = {
  10: "Vigencia de 1 día. 100 MB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  15: "Vigencia de 1 día. 150 MB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  20: "Vigencia de 1 día. 200 MB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  30: "Vigencia de 3 días. 300 MB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  50: "Vigencia de 5 días. 750 MB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  70: "Vigencia de 10 días. 1.5 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  100: "Vigencia de 14 días. 2 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  120: "Vigencia de 21 días. 2.5 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  150: "Vigencia de 25 días. 3 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  200: "Vigencia de 30 días. 4 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  300: "Vigencia de 30 días. 6 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  500: "Vigencia de 30 días. 10 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
  1000: "Vigencia de 30 días. 20 GB libres. SMS y Minutos ilimitados (México y Estados Unidos). Facebook, Messenger, Twitter, Instagram, WhatsApp y Maps Ilimitados.",
};

const MOVISTAR_PRODUCTS: Record<number, string> = {
  10: "",
  20: "",
  30: "",
  40: "",
  50: "",
  60: "",
  70: "",
  80: "",
  100: "",
  120: "",
  150: "",
  200: "",
  250: "",
  300: "",
  400: "",
  500: "",
};

const BAIT_PRODUCTS: Record<BaitProductType, Record<number, string>> = {
  [BaitProductType.SALDO]: {
    30: "",
    50: "",
    60: "",
    100: "",
    120: "",
    125: "",
    200: "",
    230: "",
    300: "",
  },
  [BaitProductType.PAQUETE]: {
    550: "",
    800: "",
    1000: "",
    1500: "",
    2000: "",
    2300: "",
    2900: "",
  },
  [BaitProductType.INTERNET_EN_CASA]: {
    99: "",
    349: "",
  },
  [BaitProductType.INTERNET_PORTATIL]: {
    110: "",
    210: "",
    410: "",
  },
};

type ProductInfo = {
  amounts: number[],
  benefits: Record<number, string>
}

type CarrierProducts = {
  multiple: boolean,
  productsList: TelcelProductType[] | BaitProductType[],
  products: Record<string, ProductInfo>
};

export const PRODUCTS: Record<Carrier, CarrierProducts> = {
  [Carrier.TELCEL]: {
    multiple: true,
    productsList: Object.keys(TelcelProductType) as TelcelProductType[],
    products: {
      [TelcelProductType.SALDO]: {
        amounts: Object.keys(TELCEL_PRODUCTS[TelcelProductType.SALDO]).map(Number),
        benefits: TELCEL_PRODUCTS[TelcelProductType.SALDO],
      },
      [TelcelProductType.PAQUETE]: {
        amounts: Object.keys(TELCEL_PRODUCTS[TelcelProductType.PAQUETE]).map(Number),
        benefits: TELCEL_PRODUCTS[TelcelProductType.PAQUETE],
      },
      [TelcelProductType.INTERNET]: {
        amounts: Object.keys(TELCEL_PRODUCTS[TelcelProductType.INTERNET]).map(Number),
        benefits: TELCEL_PRODUCTS[TelcelProductType.INTERNET],
      },
      [TelcelProductType.INTERNET_POR_TIEMPO]: {
        amounts: Object.keys(TELCEL_PRODUCTS[TelcelProductType.INTERNET_POR_TIEMPO]).map(Number),
        benefits: TELCEL_PRODUCTS[TelcelProductType.INTERNET_POR_TIEMPO],
      },
    },
  },
  [Carrier.ATT]: {
    multiple: false,
    productsList: ['SALDO'],
    products: {
      [TelcelProductType.SALDO]: {
        amounts: Object.keys(ATT_PRODUCTS).map(Number),
        benefits: ATT_PRODUCTS,
      },
    },
  },
  [Carrier.MOVISTAR]: {
    multiple: false,
    productsList: ['SALDO'],
    products: {
      [TelcelProductType.SALDO]: {
        amounts: Object.keys(MOVISTAR_PRODUCTS).map(Number),
        benefits: MOVISTAR_PRODUCTS,
      },
    },
  },
  [Carrier.BAIT]: {
    multiple: true,
    productsList: Object.keys(BaitProductType) as BaitProductType[],
    products: {
      [BaitProductType.SALDO]: {
        amounts: Object.keys(BAIT_PRODUCTS[BaitProductType.SALDO]).map(Number),
        benefits: BAIT_PRODUCTS[BaitProductType.SALDO],
      },
      [BaitProductType.PAQUETE]: {
        amounts: Object.keys(BAIT_PRODUCTS[BaitProductType.PAQUETE]).map(Number),
        benefits: BAIT_PRODUCTS[BaitProductType.PAQUETE],
      },
      [BaitProductType.INTERNET_EN_CASA]: {
        amounts: Object.keys(BAIT_PRODUCTS[BaitProductType.INTERNET_EN_CASA]).map(Number),
        benefits: BAIT_PRODUCTS[BaitProductType.INTERNET_EN_CASA],
      },
      [BaitProductType.INTERNET_PORTATIL]: {
        amounts: Object.keys(BAIT_PRODUCTS[BaitProductType.INTERNET_PORTATIL]).map(Number),
        benefits: BAIT_PRODUCTS[BaitProductType.INTERNET_PORTATIL],
      },
    },
  },
} as const;