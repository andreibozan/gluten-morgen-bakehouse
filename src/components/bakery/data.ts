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
  name: string;
  image: string;
  description: string;
  weight: string;
  ingredients: string;
  price: number;
  freshToday: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    name: "Pâine Țărănească",
    image: pTaraneasca,
    description: "Clasicul casei: coajă groasă, caramelizată, miez elastic și un gust ușor acrișor.",
    weight: "900 g",
    ingredients: "Făină albă tip 650, apă, maia naturală, sare de mare",
    price: 24,
    freshToday: true,
    stock: 12,
  },
  {
    name: "Pâine Integrală",
    image: pIntegrala,
    description: "Făină integrală măcinată la piatră, fermentată 36 de ore. Densă, aromată, sățioasă.",
    weight: "800 g",
    ingredients: "Făină integrală de grâu, apă, maia naturală, sare de mare",
    price: 26,
    freshToday: true,
    stock: 8,
  },
  {
    name: "Pâine cu Semințe",
    image: pSeminte,
    description: "Floarea-soarelui, in, susan și dovleac, hidratate peste noapte pentru un miez umed.",
    weight: "850 g",
    ingredients: "Făină tip 650, semințe, apă, maia naturală, sare",
    price: 28,
    freshToday: true,
    stock: 6,
  },
  {
    name: "Pâine cu Măsline și Rozmarin",
    image: pMasline,
    description: "Măsline Kalamata și rozmarin proaspăt. Perfectă lângă un ulei de măsline bun.",
    weight: "750 g",
    ingredients: "Făină tip 650, măsline Kalamata, rozmarin, apă, maia, sare",
    price: 32,
    freshToday: true,
    stock: 4,
  },
  {
    name: "Pâine cu Nuci și Merișoare",
    image: pNuci,
    description: "Dulce-sărată, cu nuci românești și merișoare. Ideală cu brânzeturi maturate.",
    weight: "750 g",
    ingredients: "Făină tip 650 și secară, nuci, merișoare, apă, maia, sare",
    price: 34,
    freshToday: false,
    stock: 0,
  },
  {
    name: "Baguette cu Maia",
    image: pBaguette,
    description: "Crocantă la exterior, aerată în interior. Coaptă în două serii pe zi.",
    weight: "320 g",
    ingredients: "Făină tip 550, apă, maia naturală, sare de mare",
    price: 14,
    freshToday: true,
    stock: 20,
  },
  {
    name: "Focaccia",
    image: pFocaccia,
    description: "Aluat hidratat 85%, ulei de măsline extravirgin, sare grunjoasă și rozmarin.",
    weight: "500 g",
    ingredients: "Făină tip 00, ulei de măsline, apă, maia, sare, rozmarin",
    price: 25,
    freshToday: true,
    stock: 9,
  },
  {
    name: "Chifle artizanale",
    image: pChifle,
    description: "Set de 4 chifle cu maia, coapte dimineața. Pentru mic dejun sau sandvișuri.",
    weight: "4 × 110 g",
    ingredients: "Făină tip 650, apă, maia naturală, sare, unt",
    price: 18,
    freshToday: false,
    stock: 0,
  },
];

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
