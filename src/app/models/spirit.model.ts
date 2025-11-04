export interface Spirit {
  id: number;
  name: string;
  description: string;
  complexity: 'Low' | 'Moderate' | 'High';
  aspects?: string[];
}
