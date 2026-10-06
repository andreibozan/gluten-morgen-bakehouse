import pTaraneasca from "@/assets/p-taraneasca.jpg";
import pIntegrala from "@/assets/p-integrala.jpg";
import pCheddar from "@/assets/p-cheddar.jpg";
import pUsturoi from "@/assets/p-usturoi.jpg";
import pRosii from "@/assets/p-rosii.jpg";
import pBaguette from "@/assets/p-baguette.jpg";
import pChifle from "@/assets/p-chifle.jpg";
import pSaptamanii from "@/assets/p-saptamanii.jpg";

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
  preorderOnly?: boolean;
  badge?: "Bestseller" | "Signature" | "Weekly drop" | "Everyday";
};

export const products: Product[] = [
  {
    slug: "paine-taraneasca", badge: "Bestseller", name: "Pâine țărănească", image: pTaraneasca,
    description: "Clasicul casei: coajă groasă, caramelizată, miez elastic și un gust ușor acrișor.",
    long: "Rețeta cu care am început. Aluatul se odihnește peste noapte la rece, apoi este copt pe vatră, cu abur, până când coaja devine adânc caramelizată. Miezul rămâne elastic și umed, cu alveole neregulate — semnul unei fermentații lente.",
    pairing: "Cu unt de fermă, ouă ochiuri sau o supă groasă de legume.",
    weight: "900 g", ingredients: "Făină albă tip 650, apă, maia naturală, sare de mare",
    allergens: "Conține gluten (grâu).", fermentation: "24 de ore", price: 28, freshToday: true, stock: 12,
  },
  {
    slug: "paine-cheddar-jalapenos", badge: "Signature", name: "Pâine cu cheddar și jalapeños", image: pCheddar,
    description: "Cheddar maturat topit în coajă și jalapeños pentru un final ușor iute.",
    long: "Cuburi de cheddar maturat sunt împăturite în aluat, iar o parte se topesc pe coajă în cuptor, caramelizându-se. Feliile de jalapeños adaugă prospețime și o căldură plăcută, fără să acopere gustul maielei.",
    pairing: "Cu bere artizanală, chili, ouă jumări sau prăjită pe grătar.",
    weight: "800 g", ingredients: "Făină tip 650, cheddar, jalapeños, apă, maia naturală, sare",
    allergens: "Conține gluten (grâu) și lapte.", fermentation: "24 de ore", price: 35, freshToday: true, stock: 6,
  },
  {
    slug: "paine-usturoi-rozmarin", name: "Pâine cu usturoi și rozmarin", image: pUsturoi,
    description: "Usturoi copt, dulceag, și rozmarin proaspăt într-o coajă crocantă.",
    long: "Coacem căței întregi de usturoi până devin cremoși și dulci, apoi îi împăturim în aluat împreună cu rozmarin proaspăt tocat. Aroma umple bucătăria când o încălzești.",
    pairing: "Lângă friptură, paste, supă cremă sau doar cu ulei de măsline.",
    weight: "800 g", ingredients: "Făină tip 650, usturoi, rozmarin, apă, maia naturală, sare",
    allergens: "Conține gluten (grâu).", fermentation: "24 de ore", price: 32, freshToday: true, stock: 6,
  },
  {
    slug: "paine-rosii-busuioc", name: "Pâine cu roșii uscate și busuioc", image: pRosii,
    description: "Roșii uscate la soare și busuioc — o felie de vară mediteraneeană.",
    long: "Roșiile uscate la soare sunt tocate și adăugate la final, alături de busuioc, ca să rămână vizibile în miez. Rezultatul: o pâine aromată, ușor dulce, cu miez colorat.",
    pairing: "Cu mozzarella, burrata, ulei de măsline sau pentru bruschete.",
    weight: "800 g", ingredients: "Făină tip 650, roșii uscate, busuioc, apă, maia naturală, sare",
    allergens: "Conține gluten (grâu).", fermentation: "24 de ore", price: 32, freshToday: true, stock: 6,
  },
  {
    slug: "chifle-artizanale", badge: "Everyday", name: "Chifle artizanale 110 g", image: pChifle,
    description: "Chifle cu maia de 110 g, coapte dimineața. Pentru mic dejun sau burgeri.",
    long: "Aluat cu maia, modelat manual în chifle de 110 g și copt până la o culoare aurie. Cele mai bune în prima zi, ușor încălzite.",
    pairing: "Pentru burgeri de casă, sandvișuri sau mic dejun în familie.",
    weight: "110 g / bucată", ingredients: "Făină tip 650, apă, maia naturală, sare",
    allergens: "Conține gluten (grâu).", fermentation: "16 ore", price: 5, freshToday: true, stock: 30,
  },
  {
    slug: "bagheta-rustica", name: "Baghetă rustică", image: pBaguette,
    description: "Crocantă la exterior, aerată în interior, cu coajă subțire și zgomotoasă.",
    long: "Modelată manual și crestată cu lama, bagheta rustică are o coajă subțire și crocantă și un miez aerat, cu gust profund datorită fermentației lente.",
    pairing: "Cu unt și dulceață dimineața, sau lângă brânzeturi și vin seara.",
    weight: "300 g", ingredients: "Făină tip 550, apă, maia naturală, sare de mare",
    allergens: "Conține gluten (grâu).", fermentation: "18 ore", price: 14, freshToday: true, stock: 15,
  },
  {
    slug: "paine-integrala", name: "Pâine integrală", image: pIntegrala,
    description: "Făină integrală, fermentație lungă. Densă, aromată, sățioasă.",
    long: "Făina integrală păstrează tărâțele și germenele bobului. Fermentația lungă îi dă o aromă bogată, de alună coaptă.",
    pairing: "Cu brânză proaspătă, avocado sau miere.",
    weight: "800 g", ingredients: "Făină integrală de grâu, apă, maia naturală, sare de mare",
    allergens: "Conține gluten (grâu).", fermentation: "36 de ore", price: 26, freshToday: true, stock: 8,
  },
  {
    slug: "painea-saptamanii", badge: "Weekly drop", name: "Pâinea săptămânii", image: pSaptamanii,
    description: "O rețetă nouă în fiecare săptămână — se anunță lunea, doar pe precomandă.",
    long: "În fiecare luni anunțăm pâinea săptămânii: o rețetă specială, de sezon sau experimentală, coaptă în cantitate limitată. Se face doar pe bază de precomandă — urmărește-ne lunea și rezervă-ți bucata.",
    pairing: "Surpriza săptămânii — îți spunem lunea cu ce merge cel mai bine.",
    weight: "variabil", ingredients: "Se anunță în fiecare luni",
    allergens: "Se anunță odată cu rețeta.", fermentation: "24–36 de ore", price: 40, freshToday: false, stock: 0,
    preorderOnly: true,
  },
];

export const contact = {
  phone: "0745 987 108",
  phoneHref: "tel:+40745987108",
  whatsapp: "https://wa.me/40745987108",
  email: "glutenmorgenbakery@gmail.com",
  instagram: "https://instagram.com/glutenmorgen.bake",
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
  { title: "Maia", text: "Pregătim maiaua naturală." },
  { title: "Mixare", text: "Făină, apă, sare și maia." },
  { title: "Fermentare", text: "Aluatul este lăsat să se dezvolte lent." },
  { title: "Modelare", text: "Fiecare pâine este modelată manual." },
  { title: "Dospire", text: "Pâinea își petrece timpul la rece." },
  { title: "Cuptor", text: "Coacere la temperatură ridicată." },
  { title: "Dimineața ta", text: "Pâinea ajunge proaspătă la tine." },
];

/** Single source of truth for the weekly baking schedule. weekday: 0 = duminică … 6 = sâmbătă */
export const schedule = [
  { weekday: 1, day: "Luni", item: "Pâinea Casei" },
  { weekday: 3, day: "Miercuri", item: "Integrală" },
  { weekday: 5, day: "Vineri", item: "Pâine cu semințe" },
  { weekday: 6, day: "Sâmbătă", item: "Ediția Specială" },
];
export const BAKE_HOUR = 6;

/** Real customer reviews only — add entries as they come in (e.g. from Google). */
export type Review = { rating: number; text: string; name: string; date?: string; source?: string };
export const reviews: Review[] = [];
/** Public Google Business Profile reviews URL — set once the profile is approved. */
export const googleReviewsUrl = "";
export const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Gluten Morgen, Str. Depozitelor 7, Deva");

export const faqs = [
  { q: "Cât timp se păstrează pâinea?", a: "Pâinea cu maia rămâne bună 3–5 zile, în funcție de sortiment și de modul de păstrare." },
  { q: "Cum trebuie păstrată?", a: "În pungă de hârtie sau într-un prosop de bumbac, la temperatura camerei. Punga de plastic înmoaie coaja." },
  { q: "Pot congela pâinea?", a: "Da. Feliaz-o, congeleaz-o în pungă etanșă și încălzește feliile direct la prăjitor sau câteva minute în cuptor." },
  { q: "Livrați în Deva?", a: "Da, livrăm în Deva și în județul Hunedoara, în intervalul orar ales la comandă." },
  { q: "Care este taxa de livrare?", a: "Taxa depinde de localitate și îți este comunicată telefonic, la confirmarea comenzii." },
  { q: "Pot ridica personal comanda?", a: "Da, din brutărie: Str. Depozitelor nr. 7, Deva, în intervalul ales." },
  { q: "Până la ce oră pot comanda?", a: "Comenzile plasate până la ora 20:00 intră în coacerea următoare." },
  { q: "Cu cât timp înainte trebuie să precomand?", a: "Cu cel puțin 24 de ore. Pâinea săptămânii se precomandă după anunțul de luni." },
  { q: "Faceți comenzi pentru evenimente?", a: "Da — nunți, botezuri, petreceri și evenimente corporate. Oferta se face în funcție de cerere; recomandăm cel puțin 5 zile înainte." },
  { q: "Faceți comenzi pentru restaurante și cafenele?", a: "Da, livrăm pâine, baghete și chifle pentru localuri. Cere o ofertă B2B." },
  { q: "Cum funcționează abonamentul?", a: "Alegi planul și ziua, iar noi îți păstrăm pâinea. Ai între 10% și 20% reducere la fiecare bucată; plata se face la ridicare sau livrare." },
];
