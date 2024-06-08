import { Position } from "geojson";
import { LngLatBoundsLike } from "mapbox-gl";

import { MapCoordinates } from "types";

type GameEvent = {
  location: MapCoordinates;
  bounds: Position[][];
  epochs: number;
  timePerEpoch: number;
  startTime: number;
  froglinCoordinates: MapCoordinates[];
  getLngLatBoundsLike: () => LngLatBoundsLike;
};

export default GameEvent;
