import { getNormalizedPointFromMouseEvent } from "../utils/imageCoordinates.ts";

type EyeCoordinatePickerProps = {
  imageSrc: string;
};

export default function EyeCoordinatePicker({
  imageSrc,
}: EyeCoordinatePickerProps) {
  const handleClick = (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    const point =
      getNormalizedPointFromMouseEvent(e);

    console.log("eye point:", {
      x: Number(point.x.toFixed(4)),
      y: Number(point.y.toFixed(4)),
    });
  };

  return (
    <img
      src={imageSrc}
      onClick={handleClick}
      style={{
        height: "74vh",
        cursor: "crosshair",
      }}
    />
  );
}