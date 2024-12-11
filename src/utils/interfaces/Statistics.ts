export interface IStatistics {
  exams: number;
  groups: number;
  teachers?: number;
  students?: number;
}

export interface IReport {
  type?: string;
  score?: number;
  count?: number;
}
