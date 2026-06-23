export type ScreenType = 'home' | 'portfolio' | 'services' | 'estimator' | 'contact';

export interface ProjectType {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'landscape' | 'interior';
  location: string;
  description: string;
  image: string;
  size: string;
  year: string;
  architect: string;
  highlights: string[];
}

export interface ServiceType {
  id: string;
  type: 'residential' | 'commercial' | 'flexible';
  tag: string;
  name: string;
  description: string;
  estimateBaseRateRef: number; // in INR per sqft
  details: string[];
  image: string;
}

export interface ReviewType {
  id: string;
  name: string;
  rating: number;
  comment: string;
  projectType: string;
  date: string;
}

export interface BlueprintCoordinate {
  label: string;
  x: string;
  y: string;
  notes: string;
}
