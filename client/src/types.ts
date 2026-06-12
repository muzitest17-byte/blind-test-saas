export type Genre =
  | 'jazz' | 'classique' | 'rock' | 'pop' | 'reggae'
  | 'electronic' | 'hiphop' | 'soul' | 'disco' | 'metal'
  | 'french' | 'funk' | 'rnb' | 'variete'
  | 'blues' | 'folk' | 'gospel' | 'operette' | 'trad';

export type Decade =
  | '1940s' | '1950s' | '1960s' | '1970s' | '1980s'
  | '1990s' | '2000s' | '2010s' | '2020s';

export type DifficultyLevel = 'novice' | 'amateur' | 'intermediaire' | 'expert' | 'maitre';

export interface Song {
  id: number;
  title: string;
  artist: string;
  year: number;
  genre: Genre;
  decade: Decade;
  difficulty: 1 | 2 | 3 | 4 | 5;
  deezerQuery: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  buzzes: number;
  correct: number;
  wrong: number;
}

export type RoomStatus = 'lobby' | 'playing' | 'question' | 'buzzed' | 'revealed' | 'finished';

export interface GameEvent {
  players: Player[];
  status: RoomStatus;
}

// ─── Career ───
export interface CareerLevel {
  id: string;
  name: string;
  description: string;
  songCount: number;
  genreFilter?: Genre[];
  decadeFilter?: Decade[];
  difficultyMax: number;
  stars: 0 | 1 | 2 | 3;
  unlocked: boolean;
}

export interface Campaign {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  decade: Decade;
  color: string;
  levels: CareerLevel[];
  unlocked: boolean;
}

export interface CareerSave {
  campaigns: Record<string, {
    levels: Record<string, { stars: 0 | 1 | 2 | 3; unlocked: boolean }>;
  }>;
  totalStars: number;
  xp: number;
}
