export interface Case {
  cin: string;
  defendantName: string;
  defendantAddress: string;
  crimeType: string;
  crimeDate: string;
  crimeLocation: string;
  arrestingOfficer: string;
  arrestDate: string;
  presidingJudge: string;
  publicProsecutor: string;
  startDate: string;
  expectedCompletionDate: string;
  status: 'PENDING' | 'CLOSED';
  summary: string; // For snippets
}

export interface User {
  role: 'REGISTRAR' | 'JUDGE' | 'LAWYER';
  name: string;
}