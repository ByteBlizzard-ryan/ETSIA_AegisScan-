export type LinkAnalysisResult = {
  url: string;
  niveau_risque: 'sûr' | 'suspect' | 'dangereux';
  score_risque: number;
  analyse_verdict_final: string;
  statut: 'autorisé' | 'bloqué';
  cached?: boolean;
};

export type LinkInterceptionEvent = {
  url: string;
  source: string;
};