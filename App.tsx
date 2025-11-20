
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { PossessableObjectState, Controls, SpiritState, Vector2D, WorldProp } from './types';
import { GameState, ObjectType, WORLD_SIZE, LAKE_CENTER, LAKE_RADIUS, ROADS } from './types';
import ObjectRenderer from './components/ObjectRenderer';
import ControlPanel from './components/ControlPanel';
import Spirit from './components/Spirit';
import GameWorld, { WorldOverlays } from './components/GameWorld';
import MiniMap from './components/MiniMap';

// Standardize: 0 degrees = East (+X), 90 = South (+Y)
const INITIAL_OBJECTS: PossessableObjectState[] = [
  { 
    id: 'car_1', 
    type: ObjectType.Car, 
    position: { x: 200, y: 3000 }, // West Road
    velocity: { x: 0, y: 0 }, 
    rotation: 0, 
    speed: 0,
    maxSpeed: 18,
    acceleration: 0.4,
    turnSpeed: 3.5,
    friction: 0.96,
    altitude: 0,
  },
  { 
    id: 'motorcycle_1', 
    type: ObjectType.Motorcycle, 
    position: { x: 4800, y: 2000 }, // East Road (Moved from South to spread out)
    velocity: { x: 0, y: 0 }, 
    rotation: 270, // Facing North
    speed: 0,
    maxSpeed: 24, 
    acceleration: 0.8, 
    turnSpeed: 4.5,
    friction: 0.95,
    altitude: 0,
  },
  { 
    id: 'boat_1', 
    type: ObjectType.Boat, 
    position: { x: 3500, y: 3500 }, // Lake (South East)
    velocity: { x: 0, y: 0 }, 
    rotation: 180, 
    speed: 0,
    maxSpeed: 12,
    acceleration: 0.2,
    turnSpeed: 2.0,
    friction: 0.98,
    altitude: 0,
  },
  { 
    id: 'airplane_1', 
    type: ObjectType.Airplane, 
    position: { x: 600, y: 600 }, // Top Left Runway
    velocity: { x: 0, y: 0 }, 
    rotation: 45, 
    speed: 0,
    maxSpeed: 35,
    acceleration: 0.2, 
    turnSpeed: 2.0,
    friction: 0.99,
    altitude: 0,
  },
  {
    id: 'helicopter_1',
    type: ObjectType.Helicopter,
    position: { x: 1200, y: 4200 }, // Bottom Left (Moved from Top Right)
    velocity: { x: 0, y: 0 },
    rotation: 90,
    speed: 0,
    maxSpeed: 20,
    acceleration: 0.3,
    turnSpeed: 4.0, 
    friction: 0.90, 
    altitude: 0,
  },
  {
    id: 'deer_1',
    type: ObjectType.Deer,
    position: { x: 4500, y: 4500 }, // Bottom Right
    velocity: { x: 0, y: 0 },
    rotation: 0,
    speed: 0,
    maxSpeed: 14,
    acceleration: 0.5, 
    turnSpeed: 4.0,
    friction: 0.92,
    altitude: 0,
  },
  {
    id: 'rabbit_1',
    type: ObjectType.Rabbit,
    position: { x: 4000, y: 800 }, // Top Right (Moved from Top Middle)
    velocity: { x: 0, y: 0 },
    rotation: 0,
    speed: 0,
    maxSpeed: 8,
    acceleration: 1.5, 
    turnSpeed: 6.0,
    friction: 0.80, 
    altitude: 0,
  }
];

const POSSESSION_DISTANCE = 150;

// Spirit Physics Constants
const SPIRIT_MAX_SPEED = 12;
const SPIRIT_ACCEL = 0.5;
const SPIRIT_FRICTION = 0.92;

// --- World Generation Logic ---
const generateWorldProps = (): WorldProp[] => {
  const items: WorldProp[] = [];
  const TREE_COUNT = 150;
  const ROCK_COUNT = 50;

  // Trees
  for (let i = 0; i < TREE_COUNT; i++) {
    const x = Math.random() * WORLD_SIZE;
    const y = Math.random() * WORLD_SIZE;
    
    const dist = Math.hypot(x - LAKE_CENTER.x, y - LAKE_CENTER.y);
    // Simple check to not spawn trees on roads
    const onRoad = ROADS.some(r => {
         const minX = Math.min(r.start.x, r.end.x) - r.width;
         const maxX = Math.max(r.start.x, r.end.x) + r.width;
         const minY = Math.min(r.start.y, r.end.y) - r.width;
         const maxY = Math.max(r.start.y, r.end.y) + r.width;
         return x > minX && x < maxX && y > minY && y < maxY;
    });

    if (dist > LAKE_RADIUS + 50 && !onRoad) {
        const scale = 0.8 + Math.random() * 0.7;
        items.push({
          id: `tree_${i}`,
          x,
          y,
          scale,
          type: 'tree',
          radius: 16 * scale, // Approx trunk radius
        });
    }
  }
  
  // Rocks
  for (let i = 0; i < ROCK_COUNT; i++) {
      const x = Math.random() * WORLD_SIZE;
      const y = Math.random() * WORLD_SIZE;
       const dist = Math.hypot(x - LAKE_CENTER.x, y - LAKE_CENTER.y);
       if (dist > LAKE_RADIUS + 20) {
          const scale = 0.5 + Math.random() * 0.5;
          items.push({
              id: `rock_${i}`,
              x,
              y,
              scale,
              type: 'rock',
              radius: 25 * scale,
          });
       }
  }
  return items;
};

// Helper to determine terrain
const getTerrainType = (x: number, y: number): 'water' | 'land' => {
  const dist = Math.hypot(x - LAKE_CENTER.x, y - LAKE_CENTER.y);
  return dist < LAKE_RADIUS ? 'water' : 'land';
};

// Math helper for point to segment distance
const distToSegment = (p: Vector2D, v: Vector2D, w: Vector2D) => {
  const l2 = (v.x - w.x)**2 + (v.y - w.y)**2;
  if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p.x - (v.x + t * (w.x - v.x)), p.y - (v.y + t * (w.y - v.y)));
};

const isOnRoad = (pos: Vector2D): boolean => {
  return ROADS.some(road => {
    const dist = distToSegment(pos, road.start, road.end);
    return dist < road.width / 2;
  });
};

const getObjectRadius = (type: ObjectType): number => {
  switch (type) {
    case ObjectType.Car: return 30;
    case ObjectType.Motorcycle: return 15;
    case ObjectType.Boat: return 40;
    case ObjectType.Deer: return 15;
    case ObjectType.Rabbit: return 10;
    case ObjectType.Airplane: return 30;
    case ObjectType.Helicopter: return 25;
    default: return 20;
  }
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.SELECTING);
  const [objects, setObjects] = useState<PossessableObjectState[]>(INITIAL_OBJECTS);
  const [worldProps] = useState<WorldProp[]>(() => generateWorldProps()); // Initialize once
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const [possessedObjectId, setPossessedObjectId] = useState<string | null>(null);
  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);
  const [spirit, setSpirit] = useState<SpiritState>({
    position: { x: 2500, y: 2500 },
    velocity: { x: 0, y: 0 },
    speed: 0,
  });

  const controls = useRef<Controls>({ forward: false, backward: false, left: false, right: false });
  const spiritRef = useRef(spirit);
  spiritRef.current = spirit;
  const objectsRef = useRef(objects);
  objectsRef.current = objects;
  const worldPropsRef = useRef(worldProps);

  const handlePossess = useCallback((id: string) => {
    setPossessedObjectId(id);
    setGameState(GameState.CONTROLLING);
    setHoveredObjectId(null);
    controls.current = { forward: false, backward: false, left: false, right: false };
  }, []);

  const handleRelease = useCallback(() => {
    const releasedObject = objectsRef.current.find(obj => obj.id === possessedObjectId);
    if (releasedObject) {
      setSpirit(prev => ({ 
          ...prev, 
          position: { x: releasedObject.position.x, y: releasedObject.position.y }, 
          velocity: {x: 0, y: 0} 
      }));
    }
    setPossessedObjectId(null);
    setGameState(GameState.SELECTING);
    controls.current = { forward: false, backward: false, left: false, right: false };
  }, [possessedObjectId]);

  const handleControlChange = useCallback((control: string, state: boolean) => {
    controls.current = { ...controls.current, [control]: state };
  }, []);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const gameLoop = useCallback(() => {
    const currentObjects = objectsRef.current;
    const staticProps = worldPropsRef.current;
    
    if (gameState === GameState.CONTROLLING && possessedObjectId) {
      const updatedObjects = currentObjects.map(obj => {
        if (obj.id === possessedObjectId) {
          let { speed, rotation, position, maxSpeed, acceleration, turnSpeed, friction, type, altitude } = obj;

          // --- Terrain Check ---
          const terrain = getTerrainType(position.x, position.y);
          const onRoad = isOnRoad(position);
          
          // --- Specific Vehicle Physics ---
          let effectiveFriction = friction;
          let effectiveTurnSpeed = turnSpeed;

          // Car Physics
          if (type === ObjectType.Car) {
             if (terrain === 'water' && !onRoad) {
                 effectiveFriction = 0.8; 
                 maxSpeed = 2; 
             } else if (terrain === 'land' && !onRoad) {
                 effectiveFriction = 0.92; 
                 maxSpeed = 10; 
             }
          }

          // Motorcycle Physics
          if (type === ObjectType.Motorcycle) {
            if (terrain === 'water' && !onRoad) {
                effectiveFriction = 0.7; 
                maxSpeed = 2; 
            } else if (terrain === 'land' && !onRoad) {
                // Skids easier on grass
                effectiveFriction = 0.96; 
                maxSpeed = 15; 
            }
          }
          
          // Boat Physics
          if (type === ObjectType.Boat) {
              if (terrain === 'land') {
                  effectiveFriction = 0.7; 
                  maxSpeed = 0; 
              }
          }
          
          // Deer Physics
          if (type === ObjectType.Deer) {
             if (terrain === 'water') {
                 effectiveFriction = 0.85;
                 maxSpeed = 2;
             } 
             else if (onRoad) {
                 effectiveFriction = 0.88;
                 maxSpeed = 7; 
             }
          }

          // Rabbit Physics (Hopping)
          if (type === ObjectType.Rabbit) {
             if (terrain === 'water') {
                 effectiveFriction = 0.8;
                 maxSpeed = 1;
             }
             // High friction creates stop-and-go hopping feel
             effectiveFriction = 0.85;
          }

          // Helicopter Physics
          if (type === ObjectType.Helicopter) {
             // Auto-hover when possessed
             const targetAlt = 50;
             altitude = altitude + (targetAlt - altitude) * 0.05;

             if (controls.current.forward) speed = Math.min(maxSpeed, speed + acceleration);
             if (controls.current.backward) speed = Math.max(-maxSpeed/2, speed - acceleration);

             // Helicopters ignore terrain friction when flying
             effectiveFriction = 0.95;
          }
          
          // Airplane Physics
          else if (type === ObjectType.Airplane) {
              if (speed > 15) {
                  altitude = Math.min(200, (speed - 15) * 8);
              } else {
                  altitude = Math.max(0, altitude - 2);
              }
              if (controls.current.forward) speed = Math.min(maxSpeed, speed + acceleration);
              if (controls.current.backward) speed = Math.max(0, speed - acceleration); 
              
              if (altitude > 10) {
                  effectiveTurnSpeed = 3.0;
              } else {
                  effectiveTurnSpeed = 1.5;
              }
              
              if (altitude > 20) {
                  effectiveFriction = 0.999; 
              }
          } 
          // Ground Vehicle Inputs
          else {
              if (controls.current.forward) speed = Math.min(maxSpeed, speed + acceleration);
              if (controls.current.backward) speed = Math.max(-maxSpeed / 2, speed - acceleration);
          }
          
          const movingFactor = Math.min(1, Math.abs(speed) + 0.2);
          if (controls.current.left) rotation -= effectiveTurnSpeed * movingFactor;
          if (controls.current.right) rotation += effectiveTurnSpeed * movingFactor;

          speed *= effectiveFriction;
          if (Math.abs(speed) < 0.05) speed = 0;

          const radians = rotation * (Math.PI / 180);
          const vx = speed * Math.cos(radians);
          const vy = speed * Math.sin(radians);

          position = { x: position.x + vx, y: position.y + vy };

          // --- Collision Detection with Static Props (Trees/Rocks) ---
          // Only collide if on ground or flying very low
          if ((type !== ObjectType.Airplane && type !== ObjectType.Helicopter) || altitude < 25) {
            const objRadius = getObjectRadius(type);
            for (const prop of staticProps) {
                const dx = position.x - prop.x;
                const dy = position.y - prop.y;
                const dist = Math.hypot(dx, dy);
                const minSeparation = objRadius + prop.radius;

                if (dist < minSeparation) {
                    // Collision Detected
                    const overlap = minSeparation - dist;
                    const angle = Math.atan2(dy, dx);
                    
                    // Push object out of collision
                    position.x += Math.cos(angle) * overlap;
                    position.y += Math.sin(angle) * overlap;

                    // Bounce / Crash Effect
                    speed *= -0.3;
                    
                    // Visual shake could be added here
                }
            }
          }

          // Boundary checks
          position.x = Math.max(0, Math.min(WORLD_SIZE, position.x));
          position.y = Math.max(0, Math.min(WORLD_SIZE, position.y));

          return { ...obj, speed, rotation, position, altitude };
        }
        return obj;
      });
      setObjects(updatedObjects);
    } else {
      // Spirit Movement - Gliding Physics
      let { position, velocity } = spiritRef.current;
      
      // Apply acceleration
      if (controls.current.forward) velocity.y -= SPIRIT_ACCEL;
      if (controls.current.backward) velocity.y += SPIRIT_ACCEL;
      if (controls.current.left) velocity.x -= SPIRIT_ACCEL;
      if (controls.current.right) velocity.x += SPIRIT_ACCEL;

      // Apply friction
      velocity.x *= SPIRIT_FRICTION;
      velocity.y *= SPIRIT_FRICTION;

      // Limit Speed
      const currentSpeed = Math.hypot(velocity.x, velocity.y);
      if (currentSpeed > SPIRIT_MAX_SPEED) {
          const scale = SPIRIT_MAX_SPEED / currentSpeed;
          velocity.x *= scale;
          velocity.y *= scale;
      }
      
      // Stop if very slow
      if (Math.abs(velocity.x) < 0.01) velocity.x = 0;
      if (Math.abs(velocity.y) < 0.01) velocity.y = 0;

      position = {
          x: Math.max(0, Math.min(WORLD_SIZE, position.x + velocity.x)),
          y: Math.max(0, Math.min(WORLD_SIZE, position.y + velocity.y))
      };

      setSpirit({ position, velocity, speed: currentSpeed });

      // Check hovering
      const hovered = objectsRef.current.find(obj => {
        const dist = Math.hypot(obj.position.x - position.x, obj.position.y - position.y);
        return dist < POSSESSION_DISTANCE;
      });
      setHoveredObjectId(hovered ? hovered.id : null);
    }

    requestAnimationFrame(gameLoop);
  }, [gameState, possessedObjectId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') handleControlChange('forward', true);
      if (e.key === 'ArrowDown' || e.key === 's') handleControlChange('backward', true);
      if (e.key === 'ArrowLeft' || e.key === 'a') handleControlChange('left', true);
      if (e.key === 'ArrowRight' || e.key === 'd') handleControlChange('right', true);
      if (e.key === 'e' || e.key === 'Enter') {
        if (gameState === GameState.SELECTING && hoveredObjectId) {
          handlePossess(hoveredObjectId);
        } else if (gameState === GameState.CONTROLLING) {
          handleRelease();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') handleControlChange('forward', false);
      if (e.key === 'ArrowDown' || e.key === 's') handleControlChange('backward', false);
      if (e.key === 'ArrowLeft' || e.key === 'a') handleControlChange('left', false);
      if (e.key === 'ArrowRight' || e.key === 'd') handleControlChange('right', false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    const animationId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationId);
    };
  }, [gameLoop, gameState, hoveredObjectId, handlePossess, handleRelease, handleControlChange]);

  // Camera Logic
  const cameraFocus = possessedObjectId 
    ? objects.find(o => o.id === possessedObjectId)?.position || spirit.position
    : spirit.position;

  // Viewport size
  const vw = typeof window !== 'undefined' ? window.innerWidth : 800;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 600;

  const cameraX = Math.max(0, Math.min(WORLD_SIZE - vw, cameraFocus.x - vw / 2));
  const cameraY = Math.max(0, Math.min(WORLD_SIZE - vh, cameraFocus.y - vh / 2));

  const possessedObject = objects.find(o => o.id === possessedObjectId);
  // Calculate Speed in MPH (Approx 1 unit per tick ~ 2mph scaling factor for fun)
  const displaySpeed = possessedObject ? Math.round(Math.abs(possessedObject.speed) * 5) : 0;

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden font-sans select-none text-white">
      
      {/* Game World Container */}
      <div 
        className="absolute top-0 left-0 will-change-transform"
        style={{
          transform: `translate3d(${-cameraX}px, ${-cameraY}px, 0)`,
        }}
      >
        <GameWorld worldProps={worldProps} />
        
        {/* Render Objects */}
        {objects.map(obj => (
          <ObjectRenderer 
            key={obj.id} 
            object={obj} 
            isPossessed={obj.id === possessedObjectId} 
            isHovered={obj.id === hoveredObjectId}
          />
        ))}

        <WorldOverlays />

        {/* Render Spirit if not possessing */}
        {!possessedObjectId && <Spirit position={spirit.position} />}
      </div>

      {/* HUD */}
      <div className="absolute top-4 left-4 z-50 pointer-events-none">
         <h1 className="text-2xl font-bold drop-shadow-md text-white tracking-wider">SPIRITED</h1>
         <p className="text-gray-300 text-sm drop-shadow-sm">
            {gameState === GameState.SELECTING 
                ? (isTouchDevice ? "Explore. Tap items to possess." : "Explore the world. Press [E] to possess vehicles and animals.")
                : (isTouchDevice ? "Tap Release to exit." : "Press [E] to Release Spirit")}
         </p>
         {possessedObjectId && possessedObject && (
            <div className="mt-2">
                <div className="text-4xl font-black italic text-yellow-400 drop-shadow-lg">
                    {displaySpeed} <span className="text-lg not-italic text-white">MPH</span>
                </div>
                 {possessedObject.type === ObjectType.Airplane && (
                     <div className="text-sm text-gray-300">ALT: {Math.round(possessedObject.altitude)} ft</div>
                 )}
            </div>
         )}
      </div>

      {/* Mini Map */}
      <MiniMap 
        objects={objects} 
        playerPosition={cameraFocus} 
        possessedObjectId={possessedObjectId} 
      />

      {/* On-Screen Controls (Mobile/Touch) */}
      {isTouchDevice && (
        <ControlPanel 
          possessedObjectType={possessedObject?.type || null} 
          onControlChange={handleControlChange}
          onRelease={handleRelease}
        />
      )}
      
      {/* Interaction Hint */}
      {!possessedObjectId && hoveredObjectId && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
             {isTouchDevice ? (
                <button 
                    onClick={() => handlePossess(hoveredObjectId)}
                    className="bg-cyan-600/80 text-white px-6 py-3 rounded-full backdrop-blur-sm border border-cyan-400/50 animate-bounce font-bold shadow-lg active:scale-95 transition-transform"
                >
                    Tap to Possess
                </button>
             ) : (
                <div className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 animate-bounce pointer-events-none">
                    Press <strong>E</strong> to Possess
                </div>
             )}
        </div>
      )}
    </div>
  );
};

export default App;
