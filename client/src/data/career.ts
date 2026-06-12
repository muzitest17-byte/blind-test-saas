import type { Campaign } from '../types';

export const campaigns: Campaign[] = [
  {
    id: 'c40',
    name: 'Les Années 40',
    subtitle: 'Jazz, Swing & Chanson',
    emoji: '🎷',
    decade: '1940s',
    color: 'from-amber-600 to-yellow-500',
    unlocked: true,
    levels: [
      { id: 'c40-1', name: 'Débutant', description: 'Les plus grands succès jazz de la décennie', songCount: 5, decadeFilter: ['1940s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c40-2', name: 'Amateur', description: 'Standards jazz et chanson française', songCount: 7, decadeFilter: ['1940s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c40-3', name: 'Expert', description: 'Les grandes voix de l\'époque', songCount: 8, decadeFilter: ['1940s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c50',
    name: 'Rock\'n\'Roll',
    subtitle: 'L\'explosion des années 50',
    emoji: '🎸',
    decade: '1950s',
    color: 'from-red-600 to-orange-500',
    unlocked: true,
    levels: [
      { id: 'c50-1', name: 'Débutant', description: 'Les hymnes incontournables du rock\'n\'roll', songCount: 6, decadeFilter: ['1950s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c50-2', name: 'Amateur', description: 'Elvis, Chuck Berry et les pionniers', songCount: 7, decadeFilter: ['1950s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c50-3', name: 'Expert', description: 'Les raretés de la décennie', songCount: 8, decadeFilter: ['1950s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c60',
    name: 'Peace & Love',
    subtitle: 'L\'âge d\'or des sixties',
    emoji: '☮️',
    decade: '1960s',
    color: 'from-emerald-600 to-teal-500',
    unlocked: true,
    levels: [
      { id: 'c60-1', name: 'Débutant', description: 'Beatles, Stones et tubes des 60s', songCount: 6, decadeFilter: ['1960s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c60-2', name: 'Amateur', description: 'Soul, jazz et chanson française', songCount: 8, decadeFilter: ['1960s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c60-3', name: 'Expert', description: 'Les grandes œuvres de la décennie', songCount: 10, decadeFilter: ['1960s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c70',
    name: 'Disco & Rock',
    subtitle: 'Les groovy seventies',
    emoji: '🪩',
    decade: '1970s',
    color: 'from-purple-600 to-pink-500',
    unlocked: true,
    levels: [
      { id: 'c70-1', name: 'Débutant', description: 'Queen, Led Zep, ABBA et le disco', songCount: 7, decadeFilter: ['1970s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c70-2', name: 'Amateur', description: 'Soul, funk et rock progressif', songCount: 8, decadeFilter: ['1970s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c70-3', name: 'Expert', description: 'Les trésors cachés des 70s', songCount: 10, decadeFilter: ['1970s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c80',
    name: 'New Wave',
    subtitle: 'La décennie synth-pop',
    emoji: '🕹️',
    decade: '1980s',
    color: 'from-cyan-600 to-blue-500',
    unlocked: true,
    levels: [
      { id: 'c80-1', name: 'Débutant', description: 'Michael Jackson, Madonna et les tubes', songCount: 7, decadeFilter: ['1980s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c80-2', name: 'Amateur', description: 'Rock, métal et synth-pop', songCount: 8, decadeFilter: ['1980s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c80-3', name: 'Expert', description: 'Les raretés des eighties', songCount: 10, decadeFilter: ['1980s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c90',
    name: 'Alternative 90s',
    subtitle: 'Grunge, techno & eurodance',
    emoji: '⚡',
    decade: '1990s',
    color: 'from-lime-600 to-green-500',
    unlocked: true,
    levels: [
      { id: 'c90-1', name: 'Débutant', description: 'Nirvana, Spice Girls et hits 90s', songCount: 7, decadeFilter: ['1990s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c90-2', name: 'Amateur', description: 'Grunge, dance et R&B', songCount: 8, decadeFilter: ['1990s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c90-3', name: 'Expert', description: 'Les gems cachées des 90s', songCount: 10, decadeFilter: ['1990s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c00',
    name: 'Années 2000',
    subtitle: 'L\'ère des boybands',
    emoji: '💿',
    decade: '2000s',
    color: 'from-indigo-600 to-violet-500',
    unlocked: true,
    levels: [
      { id: 'c00-1', name: 'Débutant', description: 'Les grands tubes du millénaire', songCount: 7, decadeFilter: ['2000s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c00-2', name: 'Amateur', description: 'Hip-hop, pop et dance', songCount: 8, decadeFilter: ['2000s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c00-3', name: 'Expert', description: 'Les pépites oubliées', songCount: 10, decadeFilter: ['2000s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'c10',
    name: 'Années 2010',
    subtitle: 'L\'ère du streaming',
    emoji: '📱',
    decade: '2010s',
    color: 'from-rose-600 to-red-500',
    unlocked: true,
    levels: [
      { id: 'c10-1', name: 'Débutant', description: 'Adele, Ed Sheeran et les hits du moment', songCount: 8, decadeFilter: ['2010s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c10-2', name: 'Amateur', description: 'Pop, électro et hip-hop', songCount: 9, decadeFilter: ['2010s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c10-3', name: 'Expert', description: 'Toute la diversité des 2010s', songCount: 10, decadeFilter: ['2010s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'libres',
    name: 'Libre de Droit',
    subtitle: 'Blues · Folk · Gospel · Trad. · Opéra',
    emoji: '📜',
    decade: '1940s',
    color: 'from-amber-700 to-yellow-600',
    unlocked: true,
    levels: [
      {
        id: 'libres-1',
        name: 'Incontournables',
        description: 'Les airs les plus célèbres du domaine public mondial',
        songCount: 10,
        genreFilter: ['blues','folk','gospel','trad','operette'],
        difficultyMax: 1,
        stars: 0,
        unlocked: true,
      },
      {
        id: 'libres-2',
        name: 'Blues & Gospel',
        description: 'W.C. Handy, Bessie Smith, Robert Johnson, spirituals…',
        songCount: 12,
        genreFilter: ['blues','gospel'],
        difficultyMax: 3,
        stars: 0,
        unlocked: false,
      },
      {
        id: 'libres-3',
        name: 'Folk & Traditions du Monde',
        description: 'Chants traditionnels de tous les continents',
        songCount: 12,
        genreFilter: ['folk','trad'],
        difficultyMax: 3,
        stars: 0,
        unlocked: false,
      },
      {
        id: 'libres-4',
        name: 'Opéra & Opérette',
        description: 'Verdi, Bizet, Offenbach, Rossini, Puccini, Mozart…',
        songCount: 12,
        genreFilter: ['operette'],
        difficultyMax: 3,
        stars: 0,
        unlocked: false,
      },
      {
        id: 'libres-5',
        name: 'Maître du Domaine Public',
        description: 'Toutes les musiques libres — niveau expert',
        songCount: 15,
        genreFilter: ['blues','folk','gospel','trad','operette'],
        difficultyMax: 5,
        stars: 0,
        unlocked: false,
      },
    ],
  },
  {
    id: 'classique',
    name: 'Musique Classique',
    subtitle: 'Baroque, Classicisme, Romantisme, Moderne',
    emoji: '🎻',
    decade: '1940s',
    color: 'from-yellow-600 to-amber-500',
    unlocked: true,
    levels: [
      {
        id: 'classique-1',
        name: 'Incontournables',
        description: 'Les œuvres les plus connues du répertoire classique',
        songCount: 10,
        genreFilter: ['classique'],
        difficultyMax: 1,
        stars: 0,
        unlocked: true,
      },
      {
        id: 'classique-2',
        name: 'Baroque & Classicisme',
        description: 'Bach, Vivaldi, Mozart, Beethoven…',
        songCount: 12,
        genreFilter: ['classique'],
        decadeFilter: ['1940s', '1950s'],
        difficultyMax: 3,
        stars: 0,
        unlocked: false,
      },
      {
        id: 'classique-3',
        name: 'Romantisme',
        description: 'Chopin, Tchaïkovski, Wagner, Verdi, Brahms…',
        songCount: 12,
        genreFilter: ['classique'],
        decadeFilter: ['1960s'],
        difficultyMax: 3,
        stars: 0,
        unlocked: false,
      },
      {
        id: 'classique-4',
        name: 'Époque Moderne',
        description: 'Debussy, Ravel, Satie, Gershwin, Orff…',
        songCount: 10,
        genreFilter: ['classique'],
        decadeFilter: ['1970s'],
        difficultyMax: 3,
        stars: 0,
        unlocked: false,
      },
      {
        id: 'classique-5',
        name: 'Maître Classique',
        description: 'Tout le répertoire · Niveau expert',
        songCount: 15,
        genreFilter: ['classique'],
        difficultyMax: 5,
        stars: 0,
        unlocked: false,
      },
    ],
  },
  {
    id: 'c20',
    name: 'Années 2020',
    subtitle: 'Taylor Swift, Bad Bunny, Olivia Rodrigo…',
    emoji: '🔥',
    decade: '2020s',
    color: 'from-violet-600 to-fuchsia-500',
    unlocked: true,
    levels: [
      { id: 'c20-1', name: 'Débutant', description: 'Les tubes incontournables des 2020s', songCount: 8, decadeFilter: ['2020s'], difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'c20-2', name: 'Amateur', description: 'Pop, hip-hop, latin et R&B', songCount: 10, decadeFilter: ['2020s'], difficultyMax: 3, stars: 0, unlocked: false },
      { id: 'c20-3', name: 'Expert', description: 'Tout le meilleur des 2020s', songCount: 12, decadeFilter: ['2020s'], difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
  {
    id: 'mix',
    name: 'All Decades',
    subtitle: 'Le grand mix toutes époques',
    emoji: '🌟',
    decade: '2020s',
    color: 'from-fuchsia-600 to-pink-500',
    unlocked: true,
    levels: [
      { id: 'mix-1', name: 'Mix Novice', description: 'Les plus grands classiques de toutes les décennies', songCount: 10, difficultyMax: 2, stars: 0, unlocked: true },
      { id: 'mix-2', name: 'Mix Expert', description: 'Un vrai challenge multi-génération', songCount: 12, difficultyMax: 4, stars: 0, unlocked: false },
      { id: 'mix-3', name: 'Mix Maître', description: 'Seulement pour les vrais connaisseurs', songCount: 15, difficultyMax: 5, stars: 0, unlocked: false },
    ],
  },
];

const SAVE_KEY = 'blindtest-career-v2';

interface SaveData {
  campaigns: Record<string, {
    unlocked: boolean;
    levels: Record<string, { stars: number; unlocked: boolean }>;
  }>;
}

export function loadCareerSave(): Campaign[] {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return campaigns.map(c => ({ ...c, levels: c.levels.map(l => ({ ...l })) }));
    const saved = JSON.parse(raw) as SaveData;
    return campaigns.map(camp => ({
      ...camp,
      unlocked: saved.campaigns?.[camp.id]?.unlocked ?? camp.unlocked,
      levels: camp.levels.map(lv => ({
        ...lv,
        stars: (saved.campaigns?.[camp.id]?.levels?.[lv.id]?.stars ?? lv.stars) as 0|1|2|3,
        unlocked: saved.campaigns?.[camp.id]?.levels?.[lv.id]?.unlocked ?? lv.unlocked,
      })),
    }));
  } catch {
    return campaigns.map(c => ({ ...c, levels: c.levels.map(l => ({ ...l })) }));
  }
}

export function saveCareer(camps: Campaign[]) {
  const data: SaveData = { campaigns: {} };
  camps.forEach(c => {
    data.campaigns[c.id] = { unlocked: c.unlocked, levels: {} };
    c.levels.forEach(l => { data.campaigns[c.id].levels[l.id] = { stars: l.stars, unlocked: l.unlocked }; });
  });
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function totalStars(camps: Campaign[]) {
  return camps.reduce((acc, c) => acc + c.levels.reduce((a, l) => a + l.stars, 0), 0);
}
