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
    highlights: ['Warm minimalist textures', 'Smart concealed storage', 'Tailored ergonomic layout', 'Bespoke custom joinery'],
    galleryImages: [
      'https://lh3.googleusercontent.com/gps-cs-s/APNQkAGuxR6jt5vnYgzoHB8BwfHGXMxxs2gnNQAnRXWyMDCiJmfKm_mdIIjDLfR-QGAZMy1xsLxsXJ-Utx_0Txr359bZ648atDUZ2ja2RVJatQtahCoUt1KWepyrlpVkJYAIbUuZ3rks=s680-w680-h510-rw',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?auto=format&fit=crop&q=80&w=1000'
    ],
    materialsUsed: [
      'Premium Burmese Teak paneling',
      'Concealed warm-spectrum 2700K smart LEDs',
      'Natural Italian Travertine tile inserts',
      'Matte charcoal-powdered acoustic steel mounts',
      'Anti-reflective architectural gallery glass'
    ],
    challengeSolved: 'The primary architectural challenge was to design a highly functional dual-office workspace within a compact family living room without cluttering the spatial circulation. By building bespoke, concealed double-fold teak partition panels and integrated cable routing conduits, we allowed the workspace to vanish completely into the wall when off-duty, restoring full room volume for family gatherings.'
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
    highlights: ['Natural ventilation micro-shaft', 'Central green oasis', 'Local double-brick masonry', 'Off-white textured plaster'],
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1000'
    ],
    materialsUsed: [
      'Hand-molded local double-burnt bricks',
      'Powder-coated dual-glazed low-emissivity glass panels',
      'Polished white Kota stone flagging',
      'Reclaimed solid cedarwood beams',
      'Breathable lime-wash microcement exterior stucco'
    ],
    challengeSolved: 'Located in the highly dense, noisy core of Saddar Bazar, the site suffered from restricted daylight and trapped urban summer heat. We solved this by carving out a 15-foot structural central courtyard. The double-height open shaft pulls natural cool air from the shaded base and pushes hot air out, lowering internal ambient temperatures by 6°C entirely through passive convection.'
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
    highlights: ['Co-working flex layouts', 'Integrated automation', 'Acoustic modular ceilings', 'Branding color themes'],
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1000'
    ],
    materialsUsed: [
      'High-performance acoustic wood-wool boards',
      'Anodized aluminum frame profiles',
      'Electrochromic smart glass partitions',
      'Recycled nylon woven carpet tiles (NRC 0.85)',
      'Tunable White (2700K - 6500K) linear luminaires'
    ],
    challengeSolved: 'With only 1,800 square feet available to house up to 25 staff members and private conference rooms, sound leaking was a severe concern. Our studio implemented double-pane glass wall dividers on dampening tracks and custom high-absorption modular wood-wool ceiling clouds, ensuring full speech privacy inside private offices while preserving visual links.'
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
    highlights: ['Premium quartz countertop', 'Soft-close hidden drawers', 'Built-in appliance layout', 'Brass accents & lighting'],
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1556909212-d5b604d7c992?auto=format&fit=crop&q=80&w=1000'
    ],
    materialsUsed: [
      'Stain-resistant engineered Calacatta quartz',
      'Pre-tensioned hydraulic soft-close drawer fixtures',
      'Anti-fingerprint thermal laminate cabinet doors',
      'Brushed brass profile strips and pull handles',
      'Water-resistant birch ply sub-cabinet cores'
    ],
    challengeSolved: 'The kitchen suffered from awkward structural load-bearing concrete pillars running through the primary counter line. We designed an integrated wrap-around Calacatta quartz countertop and customized pantry shelving that fully absorbs the masonry pillars into the cabinetry, creating a seamless visual plane and expanding the active prep surface.'
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
    highlights: ['Automated drip irrigation', 'Native drought-tolerant flora', 'Architectural stone pergolas', 'Low-voltage copper deck uplights'],
    galleryImages: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1530745342582-0795f23ec976?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1563714193019-1bb06f5a42e9?auto=format&fit=crop&q=80&w=1000'
    ],
    materialsUsed: [
      'Multi-ply bituminous root-barrier membrane layers',
      'Lightweight volcanic pumice planting soils',
      'Pressure-treated modular teak decking modules',
      'Cor-Ten weathering steel border retention walls',
      'Solid structural sandstone pillar blocks'
    ],
    challengeSolved: 'The primary technical hurdle was the roofs critical load limit which prevented standard soil weight and potential moisture leakage into the plaster rooms below. Our landscape squad engineered a custom lightweight volcanic soil mix combined with high-performance multi-ply root barriers and an integrated gravity-assisted drainage grid, fully resolving leak risks.'
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
    highlights: ['Microcement seamless flooring', 'Custom walnut desks', 'Warm linear light bars', 'Glass partitions for airflow'],
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000'
    ],
    materialsUsed: [
      'Seamless self-leveling industrial microcement',
      'Eco-certified solid European walnut logs',
      'Satin-finished single-piece partition glass sheets',
      'Charcoal-dyed high-density acoustic board backing',
      'Architectural recessed 3000K dark-light downlights'
    ],
    challengeSolved: 'Facing a low-ceiling space (8.2 ft clearance) with single-aspect windows, the office risked feeling cramped. We eliminated central partitions in favor of clear full-height acoustic glass sheets, coupled with a seamless light gray microcement floor that reflects and maximizes ambient light throughout the space.'
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
