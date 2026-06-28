export type ScreenType = 'home' | 'portfolio' | 'services' | 'estimator' | 'contact';

export interface ProjectType {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  size: string;
  year: string;
  architect: string;
  highlights: string[];
  galleryImages: string[];
  materialsUsed: string[];
  challengeSolved: string;
}

export interface ReviewType {
  id: string;
  name: string;
  rating: number;
  comment: string;
  projectType: string;
  date: string;
}

export interface ServiceType {
  id: string;
  type: string;
  tag: string;
  name: string;
  description: string;
  estimateBaseRateRef: number;
  details: string[];
  image: string;
}

export interface BlueprintCoordinate {
  label: string;
  x: string;
  y: string;
  notes: string;
}

export type TimeOfDay = 'day' | 'sunset' | 'night';

export type MaterialTheme = 'modern-white' | 'warm-beige' | 'industrial-slate';

export interface HotspotData {
  id: string;
  name: string;
  description: string;
  position: [number, number, number]; // [x, y, z] in 3D space
  info: string;
}

export interface BuildingSpecs {
  title: string;
  value: string;
  icon: string;
}
