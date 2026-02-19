const shipBaseUrl = "images/ship/";

const ships = [
  {
    id: 1,
    name: "Canot",
    Recherche: "Canot",
    image: shipBaseUrl + "ship_001.png"
  },
  {
    id: 2,
    name: "Vogue Merry",
    Recherche: "Vogue Merry",
    image: shipBaseUrl + "ship_002.png"
  },
  {
    id: 3,
    name: "Navire de la Marine",
    Recherche: "Navire de la Marine",
    image: shipBaseUrl + "ship_003.png"
  },
  {
    id: 4,
    name: "Baratie",
    Recherche: "Baratie",
    image: shipBaseUrl + "ship_004.png"
  },
  {
    id: 5,
    name: "Barque Mortuaire",
    Recherche: "Barque Mortuaire",
    image: shipBaseUrl + "ship_005.png"
  },
  {
    id: 6,
    name: "Miss Love Duck",
    Recherche: "Miss Love Duck",
    image: shipBaseUrl + "ship_006.png"
  },
  {
    id: 7,
    name: "Vogue Merry Volant",
    Recherche: "Vogue Merry Volant",
    image: shipBaseUrl + "ship_007.png"
  },
  {
    id: 8,
    name: "Moby Dick",
    Recherche: "Moby Dick",
    image: shipBaseUrl + "ship_008.png"
  },
  {
    id: 9,
    name: "Big Top",
    Recherche: "Big Top",
    image: shipBaseUrl + "ship_009.png"
  },
  {
    id: 10,
    name: "Bezan Black",
    Recherche: "Bezan Black",
    image: shipBaseUrl + "ship_010.png"
  },
  {
    id: 11,
    name: "Velo d'Aokiji",
    Recherche: "Velo d'Aokiji",
    image: shipBaseUrl + "ship_011.png"
  },
  {
    id: 12,
    name: "Striker",
    Recherche: "Striker",
    image: shipBaseUrl + "ship_012.png"
  },
  {
    id: 13,
    name: "Thousand Sunny",
    Recherche: "Thousand Sunny",
    image: shipBaseUrl + "ship_013.png"
  },
  {
    id: 14,
    name: "Dreadnaught Sabre",
    Recherche: "Dreadnaught Sabre",
    image: shipBaseUrl + "ship_014.png"
  },
  {
    id: 15,
    name: "Navire de l'equipage des Kuja",
    Recherche: "Navire de l'equipage des Kuja",
    image: shipBaseUrl + "ship_015.png"
  },
  {
    id: 16,
    name: "Arche Maxim",
    Recherche: "Arche Maxim",
    image: shipBaseUrl + "ship_016.png"
  },
  {
    id: 17,
    name: "Red Force",
    Recherche: "Red Force",
    image: shipBaseUrl + "ship_017.png"
  },
  {
    id: 18,
    name: "Thousand Sunny - Modele special 2e anniverssaire",
    Recherche: "Thousand Sunny - Modele special 2e anniverssaire",
    image: shipBaseUrl + "ship_018.png"
  },
  {
    id: 19,
    name: "Navire de l'equipage des pirates du Soleil",
    Recherche: "Navire de l'equipage des pirates du Soleil",
    image: shipBaseUrl + "ship_019.png"
  },
  {
    id: 20,
    name: "Navire de l'equipage de Don Quijote",
    Recherche: "Navire de l'equipage de Don Quijote",
    image: shipBaseUrl + "ship_020.png"
  },
  {
    id: 21,
    name: "Rocketman",
    Recherche: "Rocketman",
    image: shipBaseUrl + "ship_021.png"
  },
  {
    id: 22,
    name: "Moby Dick - Figure Heroique de la Guerre au Sommet",
    Recherche: "Moby Dick - Figure Heroique de la Guerre au Sommet",
    image: shipBaseUrl + "ship_022.png"
  },
  {
    id: 23,
    name: "Navire de Garp",
    Recherche: "Navire de Garp",
    image: shipBaseUrl + "ship_023.png"
  },
  {
    id: 24,
    name: "Polar Tang",
    Recherche: "Polar Tang",
    image: shipBaseUrl + "ship_024.png"
  },
  {
    id: 25,
    name: "Big Top - Modele Special",
    Recherche: "Big Top - Modele Special",
    image: shipBaseUrl + "ship_025.png"
  },
  {
    id: 26,
    name: "Thousand Sunny - Navire Revetu",
    Recherche: "Thousand Sunny - Navire Revetu",
    image: shipBaseUrl + "ship_026.png"
  },
  {
    id: 27,
    name: "Boulet de Canon du debarquement et de la declaration de Guerre de Kizaru",
    Recherche: "Boulet de Canon du debarquement et de la declaration de Guerre de Kizaru",
    image: shipBaseUrl + "ship_027.png"
  },
  {
    id: 28,
    name: "Vogue M'sieur Luffy",
    Recherche: "Vogue M'sieur Luffy",
    image: shipBaseUrl + "ship_028.png"
  },
  {
    id: 29,
    name: "Thriller Bark",
    Recherche: "Thriller Bark",
    image: shipBaseUrl + "ship_029.png"
  },
  {
    id: 30,
    name: "Le Corbeau",
    Recherche: "Le Corbeau",
    image: shipBaseUrl + "ship_030.png"
  },
   {
    id: 31,
    name: "Thousand Sunny - Modele Special Commemoratif",
    Recherche: "Thousand Sunny - Modele Special Commemoratif",
    image: shipBaseUrl + "ship_031.png"
  },
  {
    id: 32,
    name: "Hollandais Volant",
    Recherche: "Hollandais Volant",
    image: shipBaseUrl + "ship_032.png"
  },
  {
    id: 33,
    name: "Navire pirate de Marshall D. Teach",
    Recherche: "Navire pirate de Marshall D. Teach",
    image: shipBaseUrl + "ship_033.png"
  },
  {
    id: 34,
    name: "Oiseau noir de l'Armee revolutionnaire",
    Recherche: "Oiseau noir de l'Armee revolutionnaire",
    image: shipBaseUrl + "ship_034.png"
  },
  {
    id: 35,
    name: "Zunesh",
    Recherche: "Zunesh",
    image: shipBaseUrl + "ship_035.png"
  },
  {
    id: 36,
    name: "Sexy Foxy",
    Recherche: "Sexy Foxy",
    image: shipBaseUrl + "ship_036.png"
  },
  {
    id: 37,
    name: "Laboon",
    Recherche: "Laboon",
    image: shipBaseUrl + "ship_037.png"
  },
  {
    id: 38,
    name: "Thousand Sunny - Modele special 4e anniversaire",
    Recherche: "Thousand Sunny - Modele special 4e anniversaire",
    image: shipBaseUrl + "ship_038.png"
  },
  {
    id: 39,
    name: "Nostra Castello",
    Recherche: "Nostra Castello",
    image: shipBaseUrl + "ship_039.png"
  },
  {
    id: 40,
    name: "Queen Mamma Chanteur",
    Recherche: "Queen Mamma Chanteur",
    image: shipBaseUrl + "ship_040.png"
  },
  {
    id: 41,
    name: "Germa 66",
    Recherche: "Germa 66",
    image: shipBaseUrl + "ship_041.png"
  },
  {
    id: 42,
    name: "Going Merry - Modele special 5e anniversaire",
    Recherche: "Going Merry - Modele special 5e anniversaire",
    image: shipBaseUrl + "ship_042.png"
  },
  {
    id: 43,
    name: "Hoe",
    Recherche: "Hoe",
    image: shipBaseUrl + "ship_043.png"
  },
  {
    id: 44,
    name: "Megalo",
    Recherche: "Megalo",
    image: shipBaseUrl + "ship_044.png"
  },
  {
    id: 45,
    name: "Thousand Sunny - Modele Volant",
    Recherche: "Thousand Sunny - Modele Volant",
    image: shipBaseUrl + "ship_045.png"
  },
  {
    id: 46,
    name: "Peace of Spadil",
    Recherche: "Peace of Spadil",
    image: shipBaseUrl + "ship_046.png"
  },
  {
    id: 47,
    name: "Carpe Geante",
    Recherche: "Carpe Geante",
    image: shipBaseUrl + "ship_047.png"
  },
  {
    id: 48,
    name: "Grudge Dolph",
    Recherche: "Grudge Dolph",
    image: shipBaseUrl + "ship_048.png"
  },
  {
    id: 49,
    name: "Vogue Merry - Dernier instant",
    Recherche: "Vogue Merry - Dernier instant",
    image: shipBaseUrl + "ship_049.png"
  },
  {
    id: 50,
    name: "Shark Superb",
    Recherche: "Shark Superb",
    image: shipBaseUrl + "ship_050.png"
  },
  {
    id: 51,
    name: "Thousand Sunny - Modele special 6e anniversaire",
    Recherche: "Thousand Sunny - Modele special 6e anniversaire",
    image: shipBaseUrl + "ship_051.png"
  },
  {
    id: 52,
    name: "Victoria Punk",
    Recherche: "Victoria Punk",
    image: shipBaseUrl + "ship_052.png"
  },
  {
    id: 53,
    name: "Liberal Hind",
    Recherche: "Liberal Hind",
    image: shipBaseUrl + "ship_053.png"
  },
  {
    id: 54,
    name: "Nostra Castello - Vehicule Amphibie",
    Recherche: "Nostra Castello - Vehicule Amphibie",
    image: shipBaseUrl + "ship_054.png"
  },
  {
    id: 55,
    name: "Oro Jackson",
    Recherche: "Oro Jackson",
    image: shipBaseUrl + "ship_055.png"
  },
  {
    id: 56,
    name: "Thousand Sunny - Modele special 7e anniversaire",
    Recherche: "Thousand Sunny - Modele special 7e anniversaire",
    image: shipBaseUrl + "ship_056.png"
  },
    {
    id: 57,
    name: "Thousand Sunny - Modele special 8e anniversaire",
    Recherche: "Thousand Sunny - Modele special 8e anniversaire",
    image: shipBaseUrl + "ship_057.png"
  },
    {
    id: 58,
    name: "Requins-Baleines",
    Recherche: "Requins-Baleines",
    image: shipBaseUrl + "ship_058.png"
  },
    {
    id: 59,
    name: "Thousand Sunny - Modele special 9e anniversaire",
    Recherche: "Thousand Sunny - Modele special 9e anniversaire",
    image: shipBaseUrl + "ship_059.png"
  },
    {
    id: 60,
    name: "L'Ile-Navire de Shiki",
    Recherche: "L'Ile-Navire de Shiki",
    image: shipBaseUrl + "ship_060.png"
  },
     {
    id: 61,
    name: "White Tiger",
    Recherche: "White Tiger",
    image: shipBaseUrl + "ship_061.png"
  },
     {
    id: 62,
    name: "Catapulte",
    Recherche: "Catapulte",
    image: shipBaseUrl + "ship_062.png"
  },
     {
    id: 63,
    name: "Gran Tesoro",
    Recherche: "Gran Tesoro",
    image: shipBaseUrl + "ship_063.png"
  },
     {
    id: 64,
    name: "Thousand Sunny - Modele special 10e anniversaire",
    Recherche: "Thousand Sunny - Modele special 10e anniversaire",
    image: shipBaseUrl + "ship_064.png"
  },
     {
    id: 65,
    name: "Fusee",
    Recherche: "Fusee",
    image: shipBaseUrl + "ship_065.png"
  },
     {
    id: 66,
    name: "Thousand Sunny - Modele special 11e anniversaire",
    Recherche: "Thousand Sunny - Modele special 11e anniversaire",
    image: shipBaseUrl + "ship_066.png"
  },
     {
    id: 67,
    name: "Jewelry Margherita",
    Recherche: "Jewelry Margherita",
    image: shipBaseUrl + "ship_067.png"
  },
];