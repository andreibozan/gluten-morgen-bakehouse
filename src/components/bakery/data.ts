import pTaraneasca from "@/assets/p-taraneasca.jpg";
import pIntegrala from "@/assets/p-integrala.jpg";
import pSeminte from "@/assets/p-seminte.jpg";
import pMasline from "@/assets/p-masline.jpg";
import pNuci from "@/assets/p-nuci.jpg";
import pBaguette from "@/assets/p-baguette.jpg";
import pFocaccia from "@/assets/p-focaccia.jpg";
import pChifle from "@/assets/p-chifle.jpg";

import gMaia from "@/assets/g-maia.jpg";
import gFaina from "@/assets/g-faina.jpg";
import gAluat from "@/assets/g-aluat.jpg";
import gCuptor from "@/assets/g-cuptor.jpg";
import gSectiune from "@/assets/g-sectiune.jpg";
import gMicDejun from "@/assets/g-micdejun.jpg";

export type Product = {
  slug: string;
  name: string;
  image: string;
  description: string;
  long: string;
  pairing: string;
  weight: string;
  ingredients: string;
  allergens: string;
  fermentation: string;
  price: number;
  freshToday: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    slug: "paine-taraneasca",
    name: "Pâine Țărănească",
    image: pTaraneasca,
    description: "Clasicul casei: coajă groasă, caramelizată, miez elastic și un gust ușor acrișor.",
    long: "Rețeta cu care am început. Aluatul se odihnește peste noapte la rece, apoi este copt pe vatră de piatră, cu abur, până când coaja devine adânc caramelizată. Miezul rămâne elastic și umed, cu alveole neregulate — semnul unei fermentații lente, nu al drojdiei.",
    pairing: "Merge perfect cu unt de fermă, ouă ochiuri sau o supă groasă de legume.",
    weight: "900 g",
    ingredients: "Făină albă tip 650, apă, maia naturală, sare de mare",
    allergens: "Conține gluten (grâu).",
    fermentation: "24 de ore",
    price: 24,
    freshToday: true,
    stock: 12,
  },
  {
    slug: "paine-integrala",
    name: "Pâine Integrală",
    image: pIntegrala,
    description: "Făină integrală măcinată la piatră, fermentată 36 de ore. Densă, aromată, sățioasă.",
    long: "Folosim făină integrală măcinată la piatră, care păstrează tărâțele și germenele bobului. Fermentația de 36 de ore descompune o parte din fitați, iar pâinea devine mai ușor de digerat și bogată în aromă de alună coaptă.",
    pairing: "Excelentă cu brânză proaspătă, avocado sau miere de salcâm.",
    weight: "800 g",
    ingredients: "Făină integrală de grâu, apă, maia naturală, sare de mare",
    allergens: "Conține gluten (grâu).",
    fermentation: "36 de ore",
    price: 26,
    freshToday: true,
    stock: 8,
  },
  {
    slug: "paine-cu-seminte",
    name: "Pâine cu Semințe",
    image: pSeminte,
    description: "Floarea-soarelui, in, susan și dovleac, hidratate peste noapte pentru un miez umed.",
    long: "Semințele sunt prăjite ușor și hidratate peste noapte, astfel încât să nu absoarbă apa din aluat. Rezultatul este un miez umed, care se păstrează proaspăt zile bune, și o coajă presărată generos cu susan și in.",
    pairing: "Ideală pentru sandvișuri consistente și pentru mic dejun cu ou.",
    weight: "850 g",
    ingredients: "Făină tip 650, semințe, apă, maia naturală, sare",
    allergens: "Conține gluten (grâu) și susan.",
    fermentation: "24 de ore",
    price: 28,
    freshToday: true,
    stock: 6,
  },
  {
    slug: "paine-masline-rozmarin",
    name: "Pâine cu Măsline și Rozmarin",
    image: pMasline,
    description: "Măsline Kalamata și rozmarin proaspăt. Perfectă lângă un ulei de măsline bun.",
    long: "Măslinele Kalamata sunt împăturite în aluat la final, ca să rămână întregi, iar rozmarinul proaspăt este tocat mărunt pentru o aromă discretă, mediteraneeană. O pâine care nu are nevoie de nimic altceva decât de ulei de măsline.",
    pairing: "Cu ulei de măsline extravirgin, roșii coapte și mozzarella.",
    weight: "750 g",
    ingredients: "Făină tip 650, măsline Kalamata, rozmarin, apă, maia, sare",
    allergens: "Conține gluten (grâu).",
    fermentation: "28 de ore",
    price: 32,
    freshToday: true,
    stock: 4,
  },
  {
    slug: "paine-nuci-merisoare",
    name: "Pâine cu Nuci și Merișoare",
    image: pNuci,
    description: "Dulce-sărată, cu nuci românești și merișoare. Ideală cu brânzeturi maturate.",
    long: "Un amestec de făină de grâu și secară dă culoarea închisă și aroma ușor pământoasă. Nucile românești și merișoarele creează contrastul dulce-sărat care face din această pâine vedeta platourilor de brânzeturi.",
    pairing: "Cu brânzeturi maturate, gorgonzola sau pate de casă.",
    weight: "750 g",
    ingredients: "Făină tip 650 și secară, nuci, merișoare, apă, maia, sare",
    allergens: "Conține gluten (grâu, secară) și nuci.",
    fermentation: "30 de ore",
    price: 34,
    freshToday: false,
    stock: 0,
  },
  {
    slug: "baguette-cu-maia",
    name: "Baguette cu Maia",
    image: pBaguette,
    description: "Crocantă la exterior, aerată în interior. Coaptă în două serii pe zi.",
    long: "Modelată manual și crestată cu lama, bagheta noastră este coaptă în două serii — dimineața la 6 și după-amiaza la 16 — ca să o prinzi mereu caldă. Coajă subțire și zgomotoasă, miez aerat.",
    pairing: "Cu unt și dulceață dimineața, sau lângă o farfurie de paste seara.",
    weight: "320 g",
    ingredients: "Făină tip 550, apă, maia naturală, sare de mare",
    allergens: "Conține gluten (grâu).",
    fermentation: "18 ore",
    price: 14,
    freshToday: true,
    stock: 20,
  },
  {
    slug: "focaccia",
    name: "Focaccia",
    image: pFocaccia,
    description: "Aluat hidratat 85%, ulei de măsline extravirgin, sare grunjoasă și rozmarin.",
    long: "Aluat cu hidratare de 85%, lăsat să dospească în tavă și adâncit cu degetele înainte de copt. Ulei de măsline extravirgin din belșug, sare grunjoasă și rozmarin — atât.",
    pairing: "Perfectă de rupt cu mâna, lângă un pahar de vin alb.",
    weight: "500 g",
    ingredients: "Făină tip 00, ulei de măsline, apă, maia, sare, rozmarin",
    allergens: "Conține gluten (grâu).",
    fermentation: "20 de ore",
    price: 25,
    freshToday: true,
    stock: 9,
  },
  {
    slug: "chifle-artizanale",
    name: "Chifle artizanale",
    image: pChifle,
    description: "Set de 4 chifle cu maia, coapte dimineața. Pentru mic dejun sau sandvișuri.",
    long: "Aluat îmbogățit cu puțin unt, modelat în chifle mici și copt până la o culoare aurie. Se vând în set de 4 și sunt cele mai bune în prima zi, ușor încălzite.",
    pairing: "Pentru burgeri de casă, sandvișuri de prânz sau mic dejun în familie.",
    weight: "4 × 110 g",
    ingredients: "Făină tip 650, apă, maia naturală, sare, unt",
    allergens: "Conține gluten (grâu) și lapte.",
    fermentation: "16 ore",
    price: 18,
    freshToday: false,
    stock: 0,
  },
];

export const contact = {
  phone: "0745 987 108",
  phoneHref: "tel:+40745987108",
  whatsapp: "https://wa.me/40745987108",
  email: "glutenmorgenbakery@gmail.com",
  addressStreet: "Str. Depozitelor nr. 7",
  addressCity: "Deva",
  addressFull: "Str. Depozitelor nr. 7, Deva",
};


export const gallery = [
  { src: gMaia, alt: "Maia naturală într-un borcan de sticlă" },
  { src: gFaina, alt: "Făină premium și boabe de grâu" },
  { src: gAluat, alt: "Mâinile brutarului modelând aluatul" },
  { src: gCuptor, alt: "Cuptor de piatră cu pâini la copt" },
  { src: gSectiune, alt: "Secțiune prin miezul aerat al pâinii cu maia" },
  { src: gMicDejun, alt: "Mic dejun cu pâine cu maia, unt și gem" },
];

export const steps = [
  { title: "Amestecăm ingredientele", text: "Făină, apă, sare și maia. Nimic altceva." },
  { title: "Fermentare lentă", text: "24–48 de ore la temperatură controlată." },
  { title: "Modelare manuală", text: "Fiecare pâine este modelată de mână, una câte una." },
  { title: "Dospire la rece", text: "O noapte în frig, pentru aromă și digestibilitate." },
  { title: "Coacere pe piatră", text: "Cuptor cu vatră de piatră, la 250°C, cu abur." },
  { title: "Livrare proaspătă", text: "Din cuptor la ușa ta, în aceeași dimineață." },
];

export const schedule = [
  { day: "Luni", item: "Pâine Albă" },
  { day: "Miercuri", item: "Integrală" },
  { day: "Vineri", item: "Cu Semințe" },
  { day: "Sâmbătă", item: "Ediție Specială" },
];

export const faqs = [
  {
    q: "Cât rezistă pâinea?",
    a: "Pâinea cu maia se păstrează proaspătă 4–5 zile datorită fermentației naturale, fără niciun conservant.",
  },
  {
    q: "Cum se păstrează?",
    a: "În pungă de hârtie sau într-un prosop de bumbac, la temperatura camerei. Evită punga de plastic — înmoaie coaja.",
  },
  {
    q: "Livrați la domiciliu?",
    a: "Da, livrăm local în fiecare dimineață între 08:00 și 12:00. Poți alege și ridicarea din brutărie.",
  },
  {
    q: "Pot congela pâinea?",
    a: "Sigur. Feliază pâinea, congeleaz-o în pungă etanșă și încălzește feliile direct la prăjitor sau 5 minute în cuptor.",
  },
  {
    q: "Cum comand?",
    a: "Alegi produsele din secțiunea Produse, plasezi comanda până la ora 20:00 și o primești a doua zi dimineața, proaspăt coaptă.",
  },
];

export const reviews = [
  { text: "Cea mai bună pâine cu maia pe care am mâncat-o.", author: "Andreea M." },
  { text: "Crocanță perfectă și miez incredibil.", author: "Radu P." },
  { text: "Comandăm în fiecare săptămână.", author: "Familia Ionescu" },
];
