
export enum Tone {
  PROFESSIONAL = 'Professional',
  ENTHUSIASTIC = 'Enthusiastic',
  CASUAL = 'Casual',
  CONSTRUCTIVE = 'Constructive',
  CRITICAL = 'Critical',
  HUMOROUS = 'Humorous'
}

export interface Metric {
  id: string;
  label: string;
  icon: string;
}

export interface ReviewRequest {
  businessName: string;
  rating: number;
  tone: Tone;
  metrics: Record<string, 'positive' | 'negative' | 'neutral'>;
  additionalDetails: string;
}

export interface GeneratedReviewData {
  title: string;
  content: string;
  timestamp: number;
}
