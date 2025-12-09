export interface GamePlayer {
  id?: number;
  userId: number | null;
  spiritId?: number | null;
  aspectId?: number | null;
  notes?: string | null;
}

export interface Game {
  id?: number;
  creatorUserId: number;
  datePlayed: string; // ISO string
  adversaryId?: number | null;
  adversaryLevelId?: number | null;
  scenarioId?: number | null;
  difficulty?: number | null;
  boardSetup?: string | null;
  result: 'win' | 'loss';
  endReason?: string | null;
  turns?: number | null;
  comment?: string | null;
  blightedIsland?: boolean;
  players: GamePlayer[];
}
