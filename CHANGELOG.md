# Changelog

All notable changes to the "Spirited" project will be documented in this file.

## [Unreleased]

### Added
- **New Vehicles & Animals**:
    - **Helicopter**: VTOL physics, hovers, ignores terrain friction.
    - **Motorcycle**: Faster than car, high acceleration, risky on grass.
    - **Rabbit**: Hopping mechanics (burst movement), fast acceleration/friction.
    - **Deer**: Fast on grass, slows down on roads and water.
- **World Features**:
    - **MiniMap**: Overlay showing player position, roads, lake, and all possessable objects.
    - **Bridge**: Visual layering allows cars to drive *over* the bridge while boats pass *under*.
    - **Props**: Trees and rocks with collision detection for ground vehicles.
- **Mobile Support**:
    - Touch controls for movement.
    - "Tap to Possess" button.
    - Mobile-specific HUD instructions.
- **Visuals**:
    - "Floaty" ghost physics for the Spirit.
    - Custom animations: `bunnyHop` and `deerPrance`.
    - Speed indicator now shows MPH.
    - Improved "Shadow separation" for flying objects to indicate altitude.

### Changed
- **World Size**: Expanded to 5000x5000 units.
- **Physics**:
    - **Coordinate System**: Fixed "sideways" movement; 0 degrees is now East.
    - **Terrain**: Cars slow down off-road (grass) and sink in water. Boats drag on land.
    - **Flight**: Airplanes require speed to takeoff; controls changed to Thrust/Bank.
- **Spawn Locations**: Distributed objects across the map to encourage exploration.
- **Camera**: Switched to a top-down view that follows the player without rotating the world.

## [Initial Version] - Vibe Coding Session
- Basic "Spirit" mechanic to possess objects.
- Initial 100x100 world.
- Basic Car, Boat, and Airplane implementations.
