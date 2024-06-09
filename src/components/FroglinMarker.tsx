import { useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import { Froglin } from "types";

import MapCoordinates from "types/MapCoordinates";

export default function FroglinMarker({
  location,
  revealed = false,
  froglin,
}: {
  location: MapCoordinates;
  froglin?: Froglin;
  revealed?: boolean;
}) {
  const [message, setMessage] = useState<string>("");

  function showStats() {
    if (revealed) {
      setMessage("Catch me if you can!");
    } else {
      setMessage("Maybe there's a froglin here?");
    }
    setTimeout(() => {
      setMessage("");
    }, 1500);
  }

  if (!location) return null;

  return (
    <Marker
      longitude={location.longitude}
      latitude={location.latitude}
    >
      <div
        className="h-[40px] rounded-full flex justify-center z-0"
        onClick={showStats}
      >
        {revealed ? (
          <div className="absolute -top-4 text-white text-[8px] whitespace-nowrap bg-green-400 px-2 leading-3 tracking-wider"></div>
        ) : null}
        {message ? (
          <div className="absolute -top-4 text-white text-[8px] whitespace-nowrap bg-green-400 px-2 leading-3 tracking-wider">
            {message}
          </div>
        ) : null}

        <div>
          <img
            className="rounded-full"
            src={`/images/froglin${revealed ? froglin?.type : "1"}.png`}
            width={`${revealed ? "3" : "2"}0px`}
            height={`${revealed ? "3" : "2"}0px`}
            alt=""
          />
        </div>
      </div>
    </Marker>
  );
}
