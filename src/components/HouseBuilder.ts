import * as THREE from 'three';
import { MaterialTheme, TimeOfDay } from '../types';

// Palette definition based on active theme
export function getThemeColors(theme: MaterialTheme) {
  switch (theme) {
    case 'warm-beige':
      return {
        wall: 0xf5ebd9,      // Warm cream
        wood: 0x5c2c16,      // Dark mahogany
        metal: 0xca8a04,     // Warm brass
        glass: 0xfef08a,     // Warm amber glass
        louvers: 0x3e2723,   // Deep bronze
        gateWood: 0x854d0e,  // Medium oak
        trim: 0x3e2723,      // Bronze trim
        light: 0xfef08a,     // Warm yellow
      };
    case 'industrial-slate':
      return {
        wall: 0x475569,      // Cool slate gray
        wood: 0x334155,      // Smoked dark ash wood
        metal: 0x0f172a,     // Matte black metal
        glass: 0x94a3b8,     // Smoked glass
        louvers: 0x020617,   // Midnight black
        gateWood: 0x1e293b,  // Dark charcoal gate
        trim: 0x020617,      // Black trim
        light: 0xa5f3fc,     // Cyan/cool white
      };
    case 'modern-white':
    default:
      return {
        wall: 0xf8fafc,      // Bright white concrete
        wood: 0x78350f,      // Rich warm brown wood (matches image)
        metal: 0x94a3b8,     // Polished steel / chrome
        glass: 0xe0f2fe,     // Light sky blue tint
        louvers: 0x1e293b,   // Charcoal gray louvers (matches image)
        gateWood: 0xa16207,  // Rich teak gate
        trim: 0x0f172a,      // Midnight dark framing
        light: 0xfde047,     // Golden/warm glow
      };
  }
}

// Interface for materials used across the builder
interface HouseMaterials {
  wall: THREE.Material;
  wood: THREE.Material;
  metal: THREE.Material;
  glass: THREE.Material;
  louvers: THREE.Material;
  gateWood: THREE.Material;
  trim: THREE.Material;
  lawn: THREE.Material;
  road: THREE.Material;
  sidewalk: THREE.Material;
  hedge: THREE.Material;
  emissiveLight: THREE.Material;
  windowFrame: THREE.Material;
}

// Create materials based on theme and time of day
function createMaterials(colors: ReturnType<typeof getThemeColors>, timeOfDay: TimeOfDay): HouseMaterials {
  const isNight = timeOfDay === 'night';

  const wallMat = new THREE.MeshStandardMaterial({
    color: colors.wall,
    roughness: 0.5,
    metalness: 0.1,
  });

  const woodMat = new THREE.MeshStandardMaterial({
    color: colors.wood,
    roughness: 0.7,
    metalness: 0.05,
  });

  const metalMat = new THREE.MeshStandardMaterial({
    color: colors.metal,
    roughness: 0.2,
    metalness: 0.9,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: colors.glass,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.5,
    emissive: isNight ? colors.light : 0x000000,
    emissiveIntensity: isNight ? 0.7 : 0,
  });

  const louversMat = new THREE.MeshStandardMaterial({
    color: colors.louvers,
    roughness: 0.4,
    metalness: 0.3,
  });

  const gateWoodMat = new THREE.MeshStandardMaterial({
    color: colors.gateWood,
    roughness: 0.6,
    metalness: 0.1,
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: colors.trim,
    roughness: 0.3,
    metalness: 0.5,
  });

  const lawnMat = new THREE.MeshStandardMaterial({
    color: 0x15803d, // Emerald green
    roughness: 0.9,
    metalness: 0.05,
  });

  const roadMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Dark asphalt gray
    roughness: 0.8,
    metalness: 0.1,
  });

  const sidewalkMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0, // Light gray concrete
    roughness: 0.7,
    metalness: 0.05,
  });

  const hedgeMat = new THREE.MeshStandardMaterial({
    color: 0x166534, // Forest green
    roughness: 0.95,
    metalness: 0.02,
  });

  const emissiveLightMat = new THREE.MeshStandardMaterial({
    color: colors.light,
    emissive: colors.light,
    emissiveIntensity: isNight ? 2.5 : 0.1,
  });

  const windowFrameMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b, // Charcoal framing
    roughness: 0.3,
    metalness: 0.6,
  });

  return {
    wall: wallMat,
    wood: woodMat,
    metal: metalMat,
    glass: glassMat,
    louvers: louversMat,
    gateWood: gateWoodMat,
    trim: trimMat,
    lawn: lawnMat,
    road: roadMat,
    sidewalk: sidewalkMat,
    hedge: hedgeMat,
    emissiveLight: emissiveLightMat,
    windowFrame: windowFrameMat,
  };
}

// Create a single staircase flight
function createStaircase(
  materials: HouseMaterials,
  width: number,
  height: number,
  depth: number,
  stepsCount: number,
  isLeftToRight: boolean = true
): THREE.Group {
  const stairGroup = new THREE.Group();

  const stepHeight = height / stepsCount;
  const stepDepth = depth / stepsCount;

  // Create steps
  for (let i = 0; i < stepsCount; i++) {
    const stepGeom = new THREE.BoxGeometry(width, stepHeight, stepDepth);
    const step = new THREE.Mesh(stepGeom, materials.wall);
    step.castShadow = true;
    step.receiveShadow = true;

    // Positioning steps ascending
    const zOffset = -depth / 2 + (i + 0.5) * stepDepth;
    const yOffset = -height / 2 + (i + 0.5) * stepHeight;

    step.position.set(0, yOffset, zOffset);
    stairGroup.add(step);
  }

  // Create solid concrete banisters on the outer side
  const banisterWidth = 0.05;
  const banisterHeight = 0.8;

  // Metal railing running along stairs
  const railGeom = new THREE.BoxGeometry(0.02, 0.02, depth);
  const railing = new THREE.Mesh(railGeom, materials.metal);
  railing.position.set(isLeftToRight ? width / 2 : -width / 2, 0.4, 0);
  railing.rotation.x = -Math.atan(height / depth);
  stairGroup.add(railing);

  // Vertical spindles
  for (let i = 0; i < stepsCount; i += 2) {
    const spindleGeom = new THREE.CylinderGeometry(0.01, 0.01, banisterHeight);
    const spindle = new THREE.Mesh(spindleGeom, materials.metal);
    spindle.castShadow = true;
    const zOffset = -depth / 2 + (i + 0.5) * stepDepth;
    const yOffset = -height / 2 + (i + 0.5) * stepHeight + banisterHeight / 2;
    spindle.position.set(isLeftToRight ? width / 2 : -width / 2, yOffset, zOffset);
    stairGroup.add(spindle);
  }

  return stairGroup;
}

// Create a sliding glass door with a dark frame
function createSlidingGlassDoor(materials: HouseMaterials, width: number, height: number): THREE.Group {
  const doorGroup = new THREE.Group();

  // Outermost frame
  const frameThickness = 0.08;
  const horizontalFrameGeom = new THREE.BoxGeometry(width, frameThickness, 0.1);
  const verticalFrameGeom = new THREE.BoxGeometry(frameThickness, height, 0.1);

  // Top frame
  const topFrame = new THREE.Mesh(horizontalFrameGeom, materials.windowFrame);
  topFrame.position.set(0, height / 2 - frameThickness / 2, 0);
  doorGroup.add(topFrame);

  // Bottom frame
  const bottomFrame = new THREE.Mesh(horizontalFrameGeom, materials.windowFrame);
  bottomFrame.position.set(0, -height / 2 + frameThickness / 2, 0);
  doorGroup.add(bottomFrame);

  // Left frame
  const leftFrame = new THREE.Mesh(verticalFrameGeom, materials.windowFrame);
  leftFrame.position.set(-width / 2 + frameThickness / 2, 0, 0);
  doorGroup.add(leftFrame);

  // Right frame
  const rightFrame = new THREE.Mesh(verticalFrameGeom, materials.windowFrame);
  rightFrame.position.set(width / 2 - frameThickness / 2, 0, 0);
  doorGroup.add(rightFrame);

  // Center vertical divider
  const centerDivider = new THREE.Mesh(verticalFrameGeom, materials.windowFrame);
  centerDivider.position.set(0, 0, 0.01);
  doorGroup.add(centerDivider);

  // Glass panes
  const paneWidth = (width - frameThickness * 3) / 2;
  const paneHeight = height - frameThickness * 2;
  const glassGeom = new THREE.BoxGeometry(paneWidth, paneHeight, 0.02);

  // Left glass
  const leftGlass = new THREE.Mesh(glassGeom, materials.glass);
  leftGlass.position.set(-paneWidth / 2 - frameThickness / 2, 0, 0);
  doorGroup.add(leftGlass);

  // Right glass
  const rightGlass = new THREE.Mesh(glassGeom, materials.glass);
  rightGlass.position.set(paneWidth / 2 + frameThickness / 2, 0, 0);
  doorGroup.add(rightGlass);

  // Elegant horizontal window dividers (muntins/mullions) for a high-end multi-pane architectural look
  const dividerGeom = new THREE.BoxGeometry(paneWidth - 0.02, 0.015, 0.035);
  const divisionLevels = [-0.25, 0.25]; // divide pane into three beautiful horizontal sections
  
  divisionLevels.forEach((levelY) => {
    // Left divider
    const divL = new THREE.Mesh(dividerGeom, materials.windowFrame);
    divL.position.set(-paneWidth / 2 - frameThickness / 2, levelY * paneHeight, 0.012);
    doorGroup.add(divL);

    // Right divider
    const divR = new THREE.Mesh(dividerGeom, materials.windowFrame);
    divR.position.set(paneWidth / 2 + frameThickness / 2, levelY * paneHeight, 0.012);
    doorGroup.add(divR);
  });

  return doorGroup;
}

// Create standard metallic railing around a balcony with luxury glass balustrade panels
function createBalconyRailing(
  materials: HouseMaterials,
  width: number,
  depth: number,
  height: number = 0.85
): THREE.Group {
  const railingGroup = new THREE.Group();

  const barThickness = 0.03;

  // Front handrail (sleek metal)
  const frontRailGeom = new THREE.BoxGeometry(width, barThickness, barThickness);
  const frontRail = new THREE.Mesh(frontRailGeom, materials.metal);
  frontRail.position.set(0, height, depth / 2);
  frontRail.castShadow = true;
  railingGroup.add(frontRail);

  // Left handrail
  const leftRailGeom = new THREE.BoxGeometry(barThickness, barThickness, depth);
  const leftRail = new THREE.Mesh(leftRailGeom, materials.metal);
  leftRail.position.set(-width / 2, height, 0);
  leftRail.castShadow = true;
  railingGroup.add(leftRail);

  // Right handrail
  const rightRailGeom = new THREE.BoxGeometry(barThickness, barThickness, depth);
  const rightRail = new THREE.Mesh(rightRailGeom, materials.metal);
  rightRail.position.set(width / 2, height, 0);
  rightRail.castShadow = true;
  railingGroup.add(rightRail);

  // Glass balustrade panels
  const glassHeight = height - 0.12;
  const glassThickness = 0.015;

  // Front glass panel (leaving gap for corner posts)
  const frontGlassGeom = new THREE.BoxGeometry(width - 0.12, glassHeight, glassThickness);
  const frontGlass = new THREE.Mesh(frontGlassGeom, materials.glass);
  frontGlass.position.set(0, height / 2, depth / 2);
  frontGlass.castShadow = false;
  frontGlass.receiveShadow = true;
  railingGroup.add(frontGlass);

  // Left glass panel
  const leftGlassGeom = new THREE.BoxGeometry(glassThickness, glassHeight, depth - 0.12);
  const leftGlass = new THREE.Mesh(leftGlassGeom, materials.glass);
  leftGlass.position.set(-width / 2, height / 2, 0);
  leftGlass.castShadow = false;
  leftGlass.receiveShadow = true;
  railingGroup.add(leftGlass);

  // Right glass panel
  const rightGlassGeom = new THREE.BoxGeometry(glassThickness, glassHeight, depth - 0.12);
  const rightGlass = new THREE.Mesh(rightGlassGeom, materials.glass);
  rightGlass.position.set(width / 2, height / 2, 0);
  rightGlass.castShadow = false;
  rightGlass.receiveShadow = true;
  railingGroup.add(rightGlass);

  // Vertical support posts (corners and intervals)
  const postGeom = new THREE.CylinderGeometry(0.02, 0.02, height);

  // Four corner/interval posts
  const postPositions = [
    [-width / 2, depth / 2],
    [width / 2, depth / 2],
    [-width / 2, -depth / 2],
    [width / 2, -depth / 2],
    [0, depth / 2], // Front center post
  ];

  postPositions.forEach(([px, pz]) => {
    const post = new THREE.Mesh(postGeom, materials.metal);
    post.position.set(px, height / 2, pz);
    post.castShadow = true;
    railingGroup.add(post);
  });

  return railingGroup;
}

// Helper to create a decorative outdoor wall light
function createWallSconce(materials: HouseMaterials): THREE.Group {
  const sconce = new THREE.Group();

  // Back plate
  const backPlateGeom = new THREE.BoxGeometry(0.05, 0.15, 0.02);
  const backPlate = new THREE.Mesh(backPlateGeom, materials.trim);
  backPlate.position.set(0, 0, 0.01);
  sconce.add(backPlate);

  // Black light cylinder casing (long narrow modern vertical light)
  const bulbCasingGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.22);
  const bulbCasing = new THREE.Mesh(bulbCasingGeom, materials.trim);
  bulbCasing.position.set(0, 0, 0.04);
  bulbCasing.castShadow = true;
  sconce.add(bulbCasing);

  // Emissive glowing rings on top and bottom
  const glowGeom = new THREE.CylinderGeometry(0.028, 0.028, 0.02);
  const glowTop = new THREE.Mesh(glowGeom, materials.emissiveLight);
  glowTop.position.set(0, 0.11, 0.04);
  sconce.add(glowTop);

  const glowBottom = new THREE.Mesh(glowGeom, materials.emissiveLight);
  glowBottom.position.set(0, -0.11, 0.04);
  sconce.add(glowBottom);

  return sconce;
}

// Helper to create a single floor segment of the signature right column louvers stack
function createLouverSegment(materials: HouseMaterials, floorHeight: number): THREE.Group {
  const louverGroup = new THREE.Group();

  const columnWidth = 1.3;
  const columnDepth = 0.55;

  // The outer main white frame (back, left, right borders)
  // Left wall of column
  const wallLGeom = new THREE.BoxGeometry(0.12, floorHeight, columnDepth);
  const wallL = new THREE.Mesh(wallLGeom, materials.wall);
  wallL.position.set(-columnWidth / 2 + 0.06, floorHeight / 2, 0);
  wallL.castShadow = true;
  wallL.receiveShadow = true;
  louverGroup.add(wallL);

  // Right wall of column
  const wallRGeom = new THREE.BoxGeometry(0.12, floorHeight, columnDepth);
  const wallR = new THREE.Mesh(wallRGeom, materials.wall);
  wallR.position.set(columnWidth / 2 - 0.06, floorHeight / 2, 0);
  wallR.castShadow = true;
  wallR.receiveShadow = true;
  louverGroup.add(wallR);

  // Top header or molding band (on front outer edge)
  const moldingGeom = new THREE.BoxGeometry(columnWidth + 0.1, 0.15, columnDepth + 0.05);
  const molding = new THREE.Mesh(moldingGeom, materials.wall);
  molding.position.set(0, floorHeight - 0.075, 0.025);
  molding.castShadow = true;
  louverGroup.add(molding);

  // The inner dark recess panel
  const backPanelWidth = columnWidth - 0.24;
  const panelGeom = new THREE.BoxGeometry(backPanelWidth, floorHeight, 0.05);
  const panel = new THREE.Mesh(panelGeom, materials.trim);
  panel.position.set(0, floorHeight / 2, -columnDepth / 2 + 0.1);
  panel.receiveShadow = true;
  louverGroup.add(panel);

  // Decorative dark metal fixtures on side borders (matches small details in image)
  const fixtureGeom = new THREE.BoxGeometry(0.06, 0.1, 0.04);
  const fixTopLeft = new THREE.Mesh(fixtureGeom, materials.trim);
  fixTopLeft.position.set(-columnWidth / 2 + 0.02, floorHeight * 0.8, columnDepth / 2 + 0.01);
  louverGroup.add(fixTopLeft);

  const fixBottomLeft = new THREE.Mesh(fixtureGeom, materials.trim);
  fixBottomLeft.position.set(-columnWidth / 2 + 0.02, floorHeight * 0.2, columnDepth / 2 + 0.01);
  louverGroup.add(fixBottomLeft);

  // Create horizontal louvers (charcoal grey)
  const louverWidth = backPanelWidth - 0.02;
  const louverThickness = 0.015;
  const louverHeight = 0.05;
  const louverSpacing = 0.12;
  const numLouvers = Math.floor(floorHeight / louverSpacing);

  const louverGeom = new THREE.BoxGeometry(louverWidth, louverHeight, louverThickness);

  for (let i = 1; i < numLouvers - 1; i++) {
    // Skip louvers where windows are located in this vertical stack
    const relativeY = i * louverSpacing;

    // We will place tall, thin vertical windows within the stack for Level 1, 2, 3
    const isWindowArea = relativeY > floorHeight * 0.35 && relativeY < floorHeight * 0.65;

    if (isWindowArea) {
      if (i === Math.floor(numLouvers / 2)) {
        // Place a nice tall narrow window pane
        const winWidth = louverWidth - 0.08;
        const winHeight = floorHeight * 0.32;
        const windowFrameGeom = new THREE.BoxGeometry(winWidth, winHeight, 0.04);
        const winFrame = new THREE.Mesh(windowFrameGeom, materials.windowFrame);
        winFrame.position.set(0, floorHeight / 2, -columnDepth / 2 + 0.15);
        louverGroup.add(winFrame);

        const glassGeom = new THREE.BoxGeometry(winWidth - 0.08, winHeight - 0.08, 0.02);
        const glass = new THREE.Mesh(glassGeom, materials.glass);
        glass.position.set(0, floorHeight / 2, -columnDepth / 2 + 0.16);
        louverGroup.add(glass);
      }
    } else {
      // Normal charcoal louvers
      const louver = new THREE.Mesh(louverGeom, materials.louvers);
      louver.position.set(0, relativeY, -columnDepth / 2 + 0.16);
      louver.rotation.x = Math.PI / 6; // Angle them downwards
      louver.castShadow = true;
      louverGroup.add(louver);
    }
  }

  return louverGroup;
}

// Build the complete 3D House Group
export function createHouse(
  theme: MaterialTheme,
  timeOfDay: TimeOfDay,
  explodeOffset: number,
  selectedHotspot: string | null
): THREE.Group {
  const houseGroup = new THREE.Group();

  const colors = getThemeColors(theme);
  const materials = createMaterials(colors, timeOfDay);

  const floorHeight = 2.2;
  const buildingWidth = 3.6;
  const buildingDepth = 4.8;

  // Let's create an array of groups, each representing a floor (0 to 4)
  // This allows beautiful dynamic layout explosion!
  const floorGroups: THREE.Group[] = [];

  for (let i = 0; i < 5; i++) {
    const fGroup = new THREE.Group();
    fGroup.name = `floor_${i}`;
    floorGroups.push(fGroup);
    houseGroup.add(fGroup);
  }

  // --- FLOOR 0: GROUND LEVEL ---
  const f0 = floorGroups[0];
  {
    // Main foundation slab
    const slabGeom = new THREE.BoxGeometry(buildingWidth + 0.4, 0.15, buildingDepth + 0.4);
    const foundation = new THREE.Mesh(slabGeom, materials.wall);
    foundation.position.set(-0.2, 0.075, 0);
    foundation.receiveShadow = true;
    f0.add(foundation);

    // Left outer concrete wall
    const wallLGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth);
    const wallL = new THREE.Mesh(wallLGeom, materials.wall);
    wallL.position.set(-buildingWidth / 2 - 0.1, floorHeight / 2, 0);
    wallL.castShadow = true;
    wallL.receiveShadow = true;
    f0.add(wallL);

    // Rear concrete wall
    const wallBGeom = new THREE.BoxGeometry(buildingWidth + 0.2, floorHeight, 0.18);
    const wallB = new THREE.Mesh(wallBGeom, materials.wall);
    wallB.position.set(-0.1, floorHeight / 2, -buildingDepth / 2);
    wallB.castShadow = true;
    wallB.receiveShadow = true;
    f0.add(wallB);

    // Right concrete columns/recess
    const wallRGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth * 0.7);
    const wallR = new THREE.Mesh(wallRGeom, materials.wall);
    wallR.position.set(buildingWidth / 2 + 0.1, floorHeight / 2, -buildingDepth * 0.15);
    wallR.castShadow = true;
    wallR.receiveShadow = true;
    f0.add(wallR);

    // Large main sliding glass door to front balcony
    const slidingDoor = createSlidingGlassDoor(materials, 1.8, 1.85);
    slidingDoor.position.set(-0.3, 1.85 / 2 + 0.075, buildingDepth / 2 - 0.5);
    f0.add(slidingDoor);

    // Simple entrance door (wooden, on the right ground section)
    const doorGeom = new THREE.BoxGeometry(0.9, 1.8, 0.06);
    const mainDoor = new THREE.Mesh(doorGeom, materials.wood);
    mainDoor.position.set(0.6, 1.8 / 2 + 0.075, buildingDepth / 2 - 0.4);
    mainDoor.castShadow = true;
    f0.add(mainDoor);

    const doorTrimGeom = new THREE.BoxGeometry(1.0, 1.9, 0.1);
    const doorTrim = new THREE.Mesh(doorTrimGeom, materials.windowFrame);
    doorTrim.position.set(0.6, 1.9 / 2 + 0.05, buildingDepth / 2 - 0.45);
    f0.add(doorTrim);

    // Add first staircase segment (left external stairs leading up to Level 1)
    const stairs1 = createStaircase(materials, 0.55, floorHeight - 0.15, 2.2, 11, true);
    stairs1.position.set(-buildingWidth / 2 - 0.45, (floorHeight - 0.15) / 2 + 0.075, 0.4);
    f0.add(stairs1);
  }

  // --- FLOOR 1: FIRST FLOOR ---
  const f1 = floorGroups[1];
  {
    // Floor slab (acting as Level 1 floor)
    const slabGeom = new THREE.BoxGeometry(buildingWidth + 0.4, 0.15, buildingDepth + 0.4);
    const slab = new THREE.Mesh(slabGeom, materials.wall);
    slab.position.set(-0.2, 0.075, 0);
    slab.receiveShadow = true;
    slab.castShadow = true;
    f1.add(slab);

    // Left outer concrete wall
    const wallLGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth);
    const wallL = new THREE.Mesh(wallLGeom, materials.wall);
    wallL.position.set(-buildingWidth / 2 - 0.1, floorHeight / 2, 0);
    wallL.castShadow = true;
    wallL.receiveShadow = true;
    f1.add(wallL);

    // Rear concrete wall
    const wallBGeom = new THREE.BoxGeometry(buildingWidth + 0.2, floorHeight, 0.18);
    const wallB = new THREE.Mesh(wallBGeom, materials.wall);
    wallB.position.set(-0.1, floorHeight / 2, -buildingDepth / 2);
    wallB.castShadow = true;
    wallB.receiveShadow = true;
    f1.add(wallB);

    // Front wall left section
    const frontWallLGeom = new THREE.BoxGeometry(1.6, floorHeight, 0.18);
    const frontWallL = new THREE.Mesh(frontWallLGeom, materials.wall);
    frontWallL.position.set(-0.8, floorHeight / 2, buildingDepth / 2 - 0.09);
    frontWallL.castShadow = true;
    frontWallL.receiveShadow = true;
    f1.add(frontWallL);

    // Sliding window on Ground Floor
    const glassGeom = new THREE.BoxGeometry(0.8, 1.1, 0.04);
    const groundWindow = new THREE.Mesh(glassGeom, materials.glass);
    groundWindow.position.set(-0.8, floorHeight * 0.55, buildingDepth / 2 - 0.02);
    f1.add(groundWindow);

    const winFrameGeom = new THREE.BoxGeometry(0.85, 1.15, 0.08);
    const winFrame = new THREE.Mesh(winFrameGeom, materials.windowFrame);
    winFrame.position.set(-0.8, floorHeight * 0.55, buildingDepth / 2 - 0.05);
    f1.add(winFrame);

    // Sconces
    const sconce = createWallSconce(materials);
    sconce.position.set(0.9, 1.4, buildingDepth / 2 - 0.55);
    f1.add(sconce);

    // Add signature Right Louver Stack Segment
    const louverSeg = createLouverSegment(materials, floorHeight);
    louverSeg.position.set(buildingWidth / 2 + 0.22, 0.075, 0.8);
    f1.add(louverSeg);
  }

  // --- FLOOR 2: SECOND FLOOR ---
  const f2 = floorGroups[2];
  {
    const slabGeom = new THREE.BoxGeometry(buildingWidth + 0.4, 0.15, buildingDepth + 0.4);
    const slab = new THREE.Mesh(slabGeom, materials.wall);
    slab.position.set(-0.2, 0.075, 0);
    slab.receiveShadow = true;
    slab.castShadow = true;
    f2.add(slab);

    // Left outer concrete wall
    const wallLGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth);
    const wallL = new THREE.Mesh(wallLGeom, materials.wall);
    wallL.position.set(-buildingWidth / 2 - 0.1, floorHeight / 2, 0);
    wallL.castShadow = true;
    wallL.receiveShadow = true;
    f2.add(wallL);

    // Rear concrete wall
    const wallBGeom = new THREE.BoxGeometry(buildingWidth + 0.2, floorHeight, 0.18);
    const wallB = new THREE.Mesh(wallBGeom, materials.wall);
    wallB.position.set(-0.1, floorHeight / 2, -buildingDepth / 2);
    wallB.castShadow = true;
    wallB.receiveShadow = true;
    f2.add(wallB);

    // Right concrete columns
    const wallRGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth * 0.7);
    const wallR = new THREE.Mesh(wallRGeom, materials.wall);
    wallR.position.set(buildingWidth / 2 + 0.1, floorHeight / 2, -buildingDepth * 0.15);
    wallR.castShadow = true;
    wallR.receiveShadow = true;
    f2.add(wallR);

    // Slat overlay
    const woodBlockGeom = new THREE.BoxGeometry(1.6, floorHeight, 0.1);
    const woodBlock = new THREE.Mesh(woodBlockGeom, materials.wood);
    woodBlock.position.set(0.4, floorHeight / 2, buildingDepth / 2 - 0.48);
    woodBlock.castShadow = true;
    f2.add(woodBlock);

    const numSlats = 14;
    const slatHeight = 0.08;
    const slatGap = 0.06;
    const slatGeom = new THREE.BoxGeometry(1.62, slatHeight, 0.02);
    for (let j = 0; j < numSlats; j++) {
      const slat = new THREE.Mesh(slatGeom, materials.wood);
      slat.position.set(0.4, 0.1 + j * (slatHeight + slatGap), buildingDepth / 2 - 0.42);
      slat.castShadow = true;
      f2.add(slat);
    }

    // Side window on left-recessed part
    const winLGeom = new THREE.BoxGeometry(0.04, 1.1, 0.7);
    const winL = new THREE.Mesh(winLGeom, materials.glass);
    winL.position.set(-buildingWidth / 2 - 0.1, floorHeight * 0.55, 0.5);
    f2.add(winL);

    // Louver column stack segment
    const louverSeg = createLouverSegment(materials, floorHeight);
    louverSeg.position.set(buildingWidth / 2 + 0.22, 0.075, 0.8);
    louverSeg.rotation.y = -Math.PI / 2;
    f2.add(louverSeg);
  }

  // --- FLOOR 3: THIRD FLOOR ---
  const f3 = floorGroups[3];
  {
    const slabGeom = new THREE.BoxGeometry(buildingWidth + 0.4, 0.15, buildingDepth + 0.4);
    const slab = new THREE.Mesh(slabGeom, materials.wall);
    slab.position.set(-0.2, 0.075, 0);
    slab.receiveShadow = true;
    slab.castShadow = true;
    f3.add(slab);

    // Left concrete wall
    const wallLGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth);
    const wallL = new THREE.Mesh(wallLGeom, materials.wall);
    wallL.position.set(-buildingWidth / 2 - 0.1, floorHeight / 2, 0);
    wallL.castShadow = true;
    wallL.receiveShadow = true;
    f3.add(wallL);

    // Rear concrete wall
    const wallBGeom = new THREE.BoxGeometry(buildingWidth + 0.2, floorHeight, 0.18);
    const wallB = new THREE.Mesh(wallBGeom, materials.wall);
    wallB.position.set(-0.1, floorHeight / 2, -buildingDepth / 2);
    wallB.castShadow = true;
    wallB.receiveShadow = true;
    f3.add(wallB);

    // Right concrete columns
    const wallRGeom = new THREE.BoxGeometry(0.18, floorHeight, buildingDepth * 0.7);
    const wallR = new THREE.Mesh(wallRGeom, materials.wall);
    wallR.position.set(buildingWidth / 2 + 0.1, floorHeight / 2, -buildingDepth * 0.15);
    wallR.castShadow = true;
    wallR.receiveShadow = true;
    f3.add(wallR);

    // Sliding window
    const glassGeom = new THREE.BoxGeometry(1.6, 1.1, 0.04);
    const slidingWin = new THREE.Mesh(glassGeom, materials.glass);
    slidingWin.position.set(-0.3, floorHeight * 0.55, buildingDepth / 2 - 0.1);
    f3.add(slidingWin);

    const winFrameGeom = new THREE.BoxGeometry(1.65, 1.15, 0.08);
    const winFrame = new THREE.Mesh(winFrameGeom, materials.windowFrame);
    winFrame.position.set(-0.3, floorHeight * 0.55, buildingDepth / 2 - 0.12);
    f3.add(winFrame);

    // Louver column stack segment
    const louverSeg = createLouverSegment(materials, floorHeight);
    louverSeg.position.set(buildingWidth / 2 + 0.22, 0.075, 0.8);
    louverSeg.rotation.y = -Math.PI / 2;
    f3.add(louverSeg);
  }

  // --- FLOOR 4: ROOFTOP TERRACE & PERGOLA ---
  const f4 = floorGroups[4];
  {
    // Roof concrete slab
    const slabGeom = new THREE.BoxGeometry(buildingWidth + 0.4, 0.15, buildingDepth + 0.4);
    const slab = new THREE.Mesh(slabGeom, materials.wall);
    slab.position.set(-0.2, 0.075, 0);
    slab.receiveShadow = true;
    slab.castShadow = true;
    f4.add(slab);

    // Safety railings around the roof edges (except the staircase zone on the left-back)
    const roofRailing = createBalconyRailing(materials, buildingWidth + 0.2, buildingDepth + 0.2, 0.85);
    roofRailing.position.set(-0.2, 0.12, 0);
    f4.add(roofRailing);

    // Pergola Structure (modern trellis, matches top of the image)
    const pergolaGroup = new THREE.Group();
    pergolaGroup.position.set(0.3, 0.075, 0.8);

    const pillarHeight = 1.9;
    const pillarGeom = new THREE.BoxGeometry(0.12, pillarHeight, 0.12);

    // 4 corner pillars
    const p1 = new THREE.Mesh(pillarGeom, materials.wall);
    p1.position.set(-1.0, pillarHeight / 2, -1.2);
    p1.castShadow = true;
    pergolaGroup.add(p1);

    const p2 = new THREE.Mesh(pillarGeom, materials.wall);
    p2.position.set(1.0, pillarHeight / 2, -1.2);
    p2.castShadow = true;
    pergolaGroup.add(p2);

    const p3 = new THREE.Mesh(pillarGeom, materials.wall);
    p3.position.set(-1.0, pillarHeight / 2, 1.2);
    p3.castShadow = true;
    pergolaGroup.add(p3);

    const p4 = new THREE.Mesh(pillarGeom, materials.wall);
    p4.position.set(1.0, pillarHeight / 2, 1.2);
    p4.castShadow = true;
    pergolaGroup.add(p4);

    // Rafter frame on top (perimeter beams)
    const sideBeamGeom = new THREE.BoxGeometry(0.08, 0.12, 2.52);
    const beamL = new THREE.Mesh(sideBeamGeom, materials.wall);
    beamL.position.set(-1.0, pillarHeight + 0.06, 0);
    beamL.castShadow = true;
    pergolaGroup.add(beamL);

    const beamR = new THREE.Mesh(sideBeamGeom, materials.wall);
    beamR.position.set(1.0, pillarHeight + 0.06, 0);
    beamR.castShadow = true;
    pergolaGroup.add(beamR);

    const frontBeamGeom = new THREE.BoxGeometry(2.16, 0.12, 0.08);
    const beamF = new THREE.Mesh(frontBeamGeom, materials.wall);
    beamF.position.set(0, pillarHeight + 0.06, 1.2);
    beamF.castShadow = true;
    pergolaGroup.add(beamF);

    const beamB = new THREE.Mesh(frontBeamGeom, materials.wall);
    beamB.position.set(0, pillarHeight + 0.06, -1.2);
    beamB.castShadow = true;
    pergolaGroup.add(beamB);

    // Horizontal louvers/beams running across the top frame (pergola trellis rafters)
    const numRafters = 7;
    const rafterGeom = new THREE.BoxGeometry(2.0, 0.04, 0.08);
    for (let r = 0; r < numRafters; r++) {
      const rafter = new THREE.Mesh(rafterGeom, materials.wall);
      // Evenly spaced from Z = -1.0 to Z = 1.0
      rafter.position.set(0, pillarHeight + 0.1, -1.0 + r * 0.33);
      rafter.castShadow = true;
      pergolaGroup.add(rafter);
    }

    f4.add(pergolaGroup);

    // Double Sun Lounge Chair
    const loungeGroup = new THREE.Group();
    loungeGroup.position.set(-0.5, 0.075, 0.8);
    loungeGroup.rotation.y = Math.PI / 5;

    const baseGeom = new THREE.BoxGeometry(0.75, 0.08, 1.5);
    const loungeBase = new THREE.Mesh(baseGeom, materials.wood);
    loungeBase.position.set(0, 0.04, 0);
    loungeBase.castShadow = true;
    loungeGroup.add(loungeBase);

    const seatGeom = new THREE.BoxGeometry(0.71, 0.08, 0.95);
    const cushionSeat = new THREE.Mesh(seatGeom, materials.wall);
    cushionSeat.position.set(0, 0.12, 0.25);
    cushionSeat.castShadow = true;
    loungeGroup.add(cushionSeat);

    const backrestGeom = new THREE.BoxGeometry(0.71, 0.08, 0.6);
    const cushionBack = new THREE.Mesh(backrestGeom, materials.wall);
    cushionBack.position.set(0, 0.22, -0.45);
    cushionBack.rotation.x = -Math.PI / 7;
    cushionBack.castShadow = true;
    loungeGroup.add(cushionBack);

    f4.add(loungeGroup);

    // Rooftop planter with a cute green foliage tree
    const planterGeom = new THREE.BoxGeometry(0.7, 0.45, 0.7);
    const planter = new THREE.Mesh(planterGeom, materials.wall);
    planter.position.set(0.8, 0.225 + 0.075, -1.3);
    planter.castShadow = true;
    f4.add(planter);

    const trunkGeom = new THREE.CylinderGeometry(0.03, 0.03, 0.5);
    const trunk = new THREE.Mesh(trunkGeom, materials.wood);
    trunk.position.set(0.8, 0.65, -1.3);
    trunk.castShadow = true;
    f4.add(trunk);

    const leavesGeom = new THREE.SphereGeometry(0.35, 8, 8);
    const leaves = new THREE.Mesh(leavesGeom, materials.hedge);
    leaves.position.set(0.8, 0.95, -1.3);
    leaves.castShadow = true;
    f4.add(leaves);

    // Louver column stack topper molding
    const louverTopperGeom = new THREE.BoxGeometry(1.4, 0.15, 0.65);
    const louverTopper = new THREE.Mesh(louverTopperGeom, materials.wall);
    louverTopper.position.set(buildingWidth / 2 + 0.22, 0.15, 0.8);
    louverTopper.rotation.y = -Math.PI / 2;
    louverTopper.castShadow = true;
    f4.add(louverTopper);
  }

  // --- HEIGHT OFFSET CALCULATION (FOR EXPLODED VIEW) ---
  for (let i = 0; i < 5; i++) {
    const f = floorGroups[i];
    const baseY = i * floorHeight;
    f.position.y = baseY + i * explodeOffset;
  }

  // --- GROUND FLOORBASE (NON-EXPLODING) ---
  const floorBase = new THREE.Group();
  floorBase.name = 'floor_base_non_exploding';

  const baseWidth = 14;
  const baseDepth = 14;

  const lawnGeom = new THREE.PlaneGeometry(baseWidth, baseDepth);
  const lawn = new THREE.Mesh(lawnGeom, materials.lawn);
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.set(0, 0, 0);
  lawn.receiveShadow = true;
  floorBase.add(lawn);

  // Stepping stones
  const stoneGeom = new THREE.BoxGeometry(0.7, 0.02, 0.4);
  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8, // Flagstone Grey
    roughness: 0.9,
    metalness: 0.05
  });
  const stonePositions = [
    [0.6, 3.0],
    [0.6, 2.4],
    [0.6, 1.8],
    [0.6, 1.2],
    [0.6, 0.6],
    [0.6, 0.0]
  ];
  stonePositions.forEach(([sx, sz]) => {
    const stone = new THREE.Mesh(stoneGeom, stoneMat);
    stone.position.set(sx, 0.015, sz);
    stone.receiveShadow = true;
    stone.castShadow = true;
    floorBase.add(stone);
  });

  const roadGeom = new THREE.PlaneGeometry(baseWidth, 4.0);
  const road = new THREE.Mesh(roadGeom, materials.road);
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.01, 6.5);
  road.receiveShadow = true;
  floorBase.add(road);

  const sideGeom = new THREE.PlaneGeometry(baseWidth, 1.2);
  const sidewalk = new THREE.Mesh(sideGeom, materials.sidewalk);
  sidewalk.rotation.x = -Math.PI / 2;
  sidewalk.position.set(0, 0.02, 3.9);
  sidewalk.receiveShadow = true;
  floorBase.add(sidewalk);

  const driveGeom = new THREE.PlaneGeometry(2.4, 1.6);
  const driveway = new THREE.Mesh(driveGeom, materials.sidewalk);
  driveway.rotation.x = -Math.PI / 2;
  driveway.position.set(0.6, 0.025, 4.5);
  driveway.receiveShadow = true;
  floorBase.add(driveway);

  // Boundary Wall
  const bWallGroup = new THREE.Group();
  bWallGroup.position.set(0, 0, 3.3);

  const bWallHeight = 0.95;

  const bWallLGeom = new THREE.BoxGeometry(4.2, bWallHeight, 0.15);
  const bWallL = new THREE.Mesh(bWallLGeom, materials.wall);
  bWallL.position.set(-2.6, bWallHeight / 2, 0);
  bWallL.castShadow = true;
  bWallL.receiveShadow = true;
  bWallGroup.add(bWallL);

  const bWallRGeom = new THREE.BoxGeometry(1.8, bWallHeight, 0.15);
  const bWallR = new THREE.Mesh(bWallRGeom, materials.wall);
  bWallR.position.set(2.8, bWallHeight / 2, 0);
  bWallR.castShadow = true;
  bWallR.receiveShadow = true;
  bWallGroup.add(bWallR);

  const pillarGeom = new THREE.BoxGeometry(0.25, 1.2, 0.25);
  const pillarL = new THREE.Mesh(pillarGeom, materials.wall);
  pillarL.position.set(-0.5, 1.2 / 2, 0);
  pillarL.castShadow = true;
  pillarL.receiveShadow = true;
  bWallGroup.add(pillarL);

  const pillarR = new THREE.Mesh(pillarGeom, materials.wall);
  pillarR.position.set(1.7, 1.2 / 2, 0);
  pillarR.castShadow = true;
  pillarR.receiveShadow = true;
  bWallGroup.add(pillarR);

  const sconceL = createWallSconce(materials);
  sconceL.position.set(-0.5, 0.8, 0.14);
  bWallGroup.add(sconceL);

  const sconceR = createWallSconce(materials);
  sconceR.position.set(1.7, 0.8, 0.14);
  bWallGroup.add(sconceR);

  // Sliding Gate
  const gateGroup = new THREE.Group();
  gateGroup.name = 'main_gate';
  gateGroup.position.set(0.6, 0, 0);

  const gateWidth = 2.1;
  const gateHeight = 1.0;

  const gateFrameGeom = new THREE.BoxGeometry(gateWidth, gateHeight, 0.06);
  const gateFrame = new THREE.Mesh(gateFrameGeom, materials.windowFrame);
  gateFrame.position.set(0, gateHeight / 2 + 0.05, 0);
  gateFrame.castShadow = true;
  gateGroup.add(gateFrame);

  const gatePlankGeom = new THREE.BoxGeometry(gateWidth - 0.1, gateHeight - 0.1, 0.03);
  const gatePlank = new THREE.Mesh(gatePlankGeom, materials.gateWood);
  gatePlank.position.set(0, gateHeight / 2 + 0.05, 0.01);
  gatePlank.castShadow = true;
  gateGroup.add(gatePlank);

  const numGateLines = 5;
  const lineGeom = new THREE.BoxGeometry(0.02, gateHeight - 0.1, 0.04);
  for (let k = 0; k < numGateLines; k++) {
    const vLine = new THREE.Mesh(lineGeom, materials.windowFrame);
    vLine.position.set(-gateWidth / 2 + 0.2 + k * 0.42, gateHeight / 2 + 0.05, 0.02);
    gateGroup.add(vLine);
  }

  bWallGroup.add(gateGroup);

  // Green hedges along walls
  const hedgeGroup = new THREE.Group();

  const createHedgeRow = (startX: number, endX: number, pZ: number) => {
    const hedgeLength = Math.abs(endX - startX);
    const numHedgeBlocks = Math.ceil(hedgeLength / 0.5);
    const hedgeWidth = 0.45;
    const hedgeHeight = 0.4;

    const blockGeom = new THREE.BoxGeometry(0.55, hedgeHeight, hedgeWidth);

    for (let h = 0; h < numHedgeBlocks; h++) {
      const block = new THREE.Mesh(blockGeom, materials.hedge);
      const px = startX + h * 0.5 + 0.25;
      block.scale.set(
        0.9 + Math.random() * 0.2,
        0.95 + Math.random() * 0.15,
        0.9 + Math.random() * 0.2
      );
      block.rotation.y = (Math.random() - 0.5) * 0.1;
      block.position.set(px, hedgeHeight / 2 + 0.02, pZ);
      block.castShadow = true;
      block.receiveShadow = true;
      hedgeGroup.add(block);
    }
  };

  createHedgeRow(-4.6, -0.6, 3.6);
  createHedgeRow(1.8, 4.6, 3.6);

  floorBase.add(bWallGroup);
  floorBase.add(hedgeGroup);

  houseGroup.add(floorBase);

  // --- VISUAL HOTSPOT HIGHLIGHT INDICATORS ---
  if (selectedHotspot) {
    let targetPos = new THREE.Vector3();
    let size = 1.0;

    switch (selectedHotspot) {
      case 'gate':
        targetPos.set(0.6, 0.5, 3.3);
        size = 1.8;
        break;
      case 'stairs':
        targetPos.set(-buildingWidth / 2 - 0.45, floorHeight * 1.5, 0);
        size = 2.5;
        break;
      case 'balcony':
        targetPos.set(-0.3, floorHeight + 0.4, buildingDepth / 2 + 0.35);
        size = 2.0;
        break;
      case 'terrace':
        targetPos.set(0.3, floorHeight * 4.4, 0.8);
        size = 2.5;
        break;
      case 'louvers':
        targetPos.set(buildingWidth / 2 + 0.22, floorHeight * 2, 0.8);
        size = 1.5;
        break;
    }

    const ringGeom = new THREE.RingGeometry(size * 0.5, size * 0.55, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan glow
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.position.copy(targetPos);
    ring.lookAt(new THREE.Vector3(5, 5, 10));
    houseGroup.add(ring);
  }

  houseGroup.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.material === materials.glass) {
        child.castShadow = false;
        child.receiveShadow = true;
      }
    }
  });

  return houseGroup;
}
