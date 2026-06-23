import { ProjectType, ServiceType, ReviewType, BlueprintCoordinate } from './types';

export const COMPLETED_PROJECTS: ProjectType[] = [
  {
    id: 'proj-1',
    title: 'Eidgha Road Residence',
    category: 'residential',
    location: 'Eidgha Road, Shahjahanpur, UP',
    description: 'A masterpiece of contemporary interior architecture. Combining rich natural wood panels, hidden state-of-the-art workspace corners, and seamless warm ambient lighting that accentuates the clients collection of modern Indian artwork.',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGuxR6jt5vnYgzoHB8BwfHGXMxxs2gnNQAnRXWyMDCiJmfKm_mdIIjDLfR-QGAZMy1xsLxsXJ-Utx_0Txr359bZ648atDUZ2ja2RVJatQtahCoUt1KWepyrlpVkJYAIbUuZ3rks=s680-w680-h510-rw',
    size: '3,200 sq. ft.',
    year: '2024',
    architect: 'VS Architect Studio',
    highlights: ['Warm minimalist textures', 'Smart concealed storage', 'Tailored ergonomic layout', 'Bespoke custom joinery']
  },
  {
    id: 'proj-2',
    title: 'The Courtyard Villa',
    category: 'residential',
    location: 'Saddar Bazar, Shahjahanpur, UP',
    description: 'A striking luxury residential project with an integrated central courtyard. It bridges classical design principles with slick modern metal-and-glass frames, maximizing daylight while maintaining natural microclimate cooling.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
    size: '4,500 sq. ft.',
    year: '2025',
    architect: 'VS Architect Studio',
    highlights: ['Natural ventilation micro-shaft', 'Central green oasis', 'Local double-brick masonry', 'Off-white textured plaster']
  },
  {
    id: 'proj-3',
    title: 'Nirvana Corporate Hub',
    category: 'commercial',
    location: 'Kanth Road, Moradabad Bypass',
    description: 'A compact and highly efficient corporate workspace focusing on flexible co-working sections, sleek acoustic partition boards, sound-insulated cabins, and dynamic LED lighting structures.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
    size: '1,800 sq. ft.',
    year: '2025',
    architect: 'VS Architect Studio',
    highlights: ['Co-working flex layouts', 'Integrated automation', 'Acoustic modular ceilings', 'Branding color themes']
  },
  {
    id: 'proj-4',
    title: 'Gourmet Culinary Studio',
    category: 'interior',
    location: 'Civil Lines, Shahjahanpur, UP',
    description: 'A modular luxury kitchen design styled around warm earth tones and brass linear details. Focused on maximum kitchen work-triangle efficiency paired with highly elegant stone worktops.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
    size: '450 sq. ft.',
    year: '2024',
    architect: 'VS Architect Studio',
    highlights: ['Premium quartz countertop', 'Soft-close hidden drawers', 'Built-in appliance layout', 'Brass accents & lighting']
  },
  {
    id: 'proj-5',
    title: 'Terrace Meadow Garden',
    category: 'landscape',
    location: 'Lodiipur Enclave, Shahjahanpur, UP',
    description: 'A lush rooftop terrace designed as a extension of the living lounge. Multi-level planter beds are stocked with local native shrubs, stone tiling paths, and automatic ambient spotlighting for night relaxation.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
    size: '1,200 sq. ft.',
    year: '2023',
    architect: 'VS Architect Studio',
    highlights: ['Automated drip irrigation', 'Native drought-tolerant flora', 'Architectural stone pergolas', 'Low-voltage copper deck uplights']
  },
  {
    id: 'proj-6',
    title: 'Minimalist Monolithic Office',
    category: 'commercial',
    location: 'Town Hall Sq., Shahjahanpur, UP',
    description: 'A boutique professional legal firm office. High-contrast ash grey partitions paired with natural oak seating and minimalist details form an workspace that exudes quiet luxury and intellectual confidence.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
    size: '1,100 sq. ft.',
    year: '2024',
    architect: 'VS Architect Studio',
    highlights: ['Microcement seamless flooring', 'Custom walnut desks', 'Warm linear light bars', 'Glass partitions for airflow']
  }
];

export const DESIGN_SERVICES: ServiceType[] = [
  {
    id: 'svc-1',
    type: 'residential',
    tag: 'Residential Flat & Home',
    name: 'Complete Home Design',
    description: 'Complete high-end interior decoration and layout planning for apartments, bungalows, and flats — turning everyday living spaces into beautifully personalized sanctuaries.',
    estimateBaseRateRef: 180, // INR per sqft
    details: [
      'Comprehensive spatial layouts',
      'Personalized mood-boarding',
      'Plumbing & electrical plans',
      'Material sourcing curation'
    ],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'svc-2',
    type: 'residential',
    tag: 'Master Bedrooms',
    name: 'Bespoke Bedroom Architecture',
    description: 'Restful, sensory bedroom spaces designed around your light preferences, sleep habits, and layout — featuring customized closets and intelligent layout orientation.',
    estimateBaseRateRef: 150,
    details: [
      'Ergonomic furniture layouts',
      'Custom acoustic insulation options',
      'Warm indirect ambient lighting',
      'Integrated walk-in wardrobes'
    ],
    image: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGuxR6jt5vnYgzoHB8BwfHGXMxxs2gnNQAnRXWyMDCiJmfKm_mdIIjDLfR-QGAZMy1xsLxsXJ-Utx_0Txr359bZ648atDUZ2ja2RVJatQtahCoUt1KWepyrlpVkJYAIbUuZ3rks=s680-w680-h510-rw'
  },
  {
    id: 'svc-3',
    type: 'residential',
    tag: 'Modular Kitchens',
    name: 'Smart Kitchen Interior',
    description: 'A blend of visual elegance and functional storage. Designed using state-of-the-art drawer fittings, water-resistant base modular materials, and custom stone counter slabs.',
    estimateBaseRateRef: 240,
    details: [
      'Optimized kitchen work-triangle',
      'Hydraulic soft-close modular fixtures',
      'Concealed dry spice storage systems',
      'Dedicated warm spot lights'
    ],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'svc-4',
    type: 'residential',
    tag: 'Landscape & Greenery',
    name: 'Lush Garden Design',
    description: 'Outdoor gardens, terrace lounge pergolas, and vertical green partitions conceived as natural living extensions of your structural home.',
    estimateBaseRateRef: 110,
    details: [
      'Rooftop water barriers',
      'Bespoke visual stone walkways',
      'Ambient copper weather-proof lights',
      'Low upkeep planting scheme'
    ],
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'svc-5',
    type: 'commercial',
    tag: 'Corporate & Boutiques',
    name: 'Small Office Interiors',
    description: 'Workspaces that inspire focus, visual branding, and comfortable collaboration — custom built with premium glass barriers and lighting.',
    estimateBaseRateRef: 210,
    details: [
      'Acoustic conference rooms',
      'Modular desk routing channels',
      'Ergonomic client waiting lounges',
      'Energy-saving lighting setups'
    ],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=500'
  },
  {
    id: 'svc-6',
    type: 'flexible',
    tag: 'Architectural Consultation',
    name: 'Full Implementation & Oversight',
    description: 'Full layout drafting, architectural blueprints, structural analysis, 3D visualization walks, and premium site progress monitoring.',
    estimateBaseRateRef: 300,
    details: [
      'Comprehensive 3D Walkthrough creation',
      'AutoCAD and Revit blueprint set',
      'Vendor management & procurement checks',
      'Milestone site audit visits'
    ],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=500'
  }
];

export const INITIAL_REVIEWS: ReviewType[] = [
  {
    id: 'rev-1',
    name: 'Rajinder Kumar Prasad',
    rating: 5,
    comment: 'Exceptional service for our home near Eidgha Road. VS Architect transformed our congested space into a bright, airy master design. The lighting work is absolutely brilliant.',
    projectType: 'Flat & Home Interiors',
    date: 'May 12, 2026'
  },
  {
    id: 'rev-2',
    name: 'Anjali Sharma',
    rating: 5,
    comment: 'The 3D visualizations gave us complete confidence before any brick was laid. The final bedroom and modular kitchen setup came out exactly matching the renders!',
    projectType: 'Modular Kitchen & Bedroom',
    date: 'April 03, 2026'
  },
  {
    id: 'rev-3',
    name: 'Advocate Verma',
    rating: 4,
    comment: 'VS designed our small legal desk layout at Town Hall Square. Outstanding spatial planning and highly professional workflow. They strictly optimized for our fast material delivery timeline.',
    projectType: 'Small Office Interiors',
    date: 'Feb 19, 2026'
  }
];

export const BLUEPRINT_COORDINATES: BlueprintCoordinate[] = [
  { label: 'Site Center', x: '28.6100° N', y: '79.9099° E', notes: 'Eidgha Road architectural focal origin.' },
  { label: 'Primary Elevation Axis', x: 'Offset 12.4m S', y: '90° Azimuth', notes: 'Main light clearance facing East-Southeast.' },
  { label: 'Terrace Garden Deck', x: 'Roof Level (+11.2m)', y: 'Zone C (Northwest)', notes: 'Wind load optimized architectural pergola.' },
  { label: 'Modular Kitchen Span', x: 'Ground Level (+0.4m)', y: 'Zone A (Southwest)', notes: 'Water main access & electrical riser junction.' }
];
