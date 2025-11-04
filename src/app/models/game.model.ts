export interface Game {
  id: number;
  date: Date;
  players: { username: string; spirit: string; aspect?: string }[];
  adversary?: string;
  difficulty?: number;
  scenario?: string;
  result: 'win' | 'loss';
  reason?: string;
  turns?: number;
  comment?: string;
}
