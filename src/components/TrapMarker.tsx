import { useEffect, useRef, useState } from "react";
import { Marker } from "react-map-gl";

import { MapCoordinates } from "types";
import { PLAYER } from "settings";

type Props = {
  ordinal: number;
  location: MapCoordinates;
  duplicate?: boolean;
};

export default function TrapMarker(props: Props) {
  const trapLabelRef = useRef(`Trap ${props.ordinal}`);

  const [text, setText] = useState(trapLabelRef.current);

  useEffect(
    () => {
      if (!props.duplicate) return;

      setText(PLAYER.TRAP.DUPLICATE_TEXT);

      const timer = setTimeout(
        setText,
        PLAYER.TRAP.DUPLICATE_TEXT_TIMEOUT,
        trapLabelRef.current,
      );

      return () => {
        clearTimeout(timer);
      };
    }, //
    [props.duplicate],
  );

  return (
    <Marker
      longitude={props.location.longitude}
      latitude={props.location.latitude}
      style={{ zIndex: 9998 }}
    >
      <div className="relative -top-[48px] text-gray-800 text-[10px] whitespace-nowrap bg-green-400 p-1.5 rounded-sm leading-3 tracking-wider z-0">
        {text}
      </div>
      <div
        className="relative text-[56px] -top-[18px]"
        style={{
          filter:
            "sepia(1) hue-rotate(220deg) saturate(5) brightness(0.7) contrast(1.2)",
        }}
      >
        📍
      </div>
    </Marker>
  );
}
