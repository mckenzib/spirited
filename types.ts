
export enum ObjectType {
  Car = 'car',
  Boat = 'boat',
  Airplane = 'airplane',
  Deer = 'deer',
  Helicopter = 'helicopter',
  Motorcycle = 'motorcycle',
  Rabbit = 'rabbit',
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface PossessableObjectState {
  id: string;
  type: ObjectType;
  position: Vector2D;
  velocity: Vector2D;
  rotation: number; // in degrees, 0 = East, 90 = South
  speed: number;
  maxSpeed: number;
  acceleration: number;
  turnSpeed: number;
  friction: number;
  altitude: number; // 0 = ground, >0 = air
}

export enum GameState {
    SELECTING = 'SELECTING',
    CONTROLLING = 'CONTROLLING',
}

export interface Controls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export interface SpiritState {
  position: Vector2D;
  velocity: Vector2D;
  speed: number;
}

export interface WorldProp {
  id: string;
  x: number;
  y: number;
  scale: number;
  type: 'tree' | 'rock';
  radius: number;
}

export const WORLD_SIZE = 5000;

// Define Lake Geometry for Physics and Rendering
export const LAKE_CENTER = { x: 3500, y: 3000 };
export const LAKE_RADIUS = 1200;

export interface RoadSegment {
  start: Vector2D;
  end: Vector2D;
  width: number;
}

// Grid layout with a bridge over the lake
export const ROADS: RoadSegment[] = [
  // Outer Perimeter
  { start: {x: 200, y: 200}, end: {x: 4800, y: 200}, width: 160 },
  { start: {x: 4800, y: 200}, end: {x: 4800, y: 4800}, width: 160 },
  { start: {x: 4800, y: 4800}, end: {x: 200, y: 4800}, width: 160 },
  { start: {x: 200, y: 4800}, end: {x: 200, y: 200}, width: 160 },
  
  // The Bridge (Horizontal across lake at y=3000)
  { start: {x: 200, y: 3000}, end: {x: 4800, y: 3000}, width: 160 },
  
  // Vertical Highway
  { start: {x: 1500, y: 200}, end: {x: 1500, y: 4800}, width: 160 },
];
