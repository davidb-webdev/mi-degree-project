import { MouseEvent, useState } from "react";

interface FloorPlanImageProps {
  src: string;
  onLoad?: () => void;
  onClick?: () => void;
  onContext?: (x: number, y: number) => void;
  onLongPress?: (x: number, y: number) => void;
  longPressDuration?: number;
}

const FloorPlanImage = ({
  src,
  onLoad,
  onClick,
  onContext,
  onLongPress,
  longPressDuration = 500
}: FloorPlanImageProps) => {
  const [isLongPress, setIsLongPress] = useState(false);

  let pressTimer: number | undefined = undefined;

  const handleImageContext = (event: MouseEvent<HTMLImageElement>) => {
    if (onContext !== undefined) {
      event.preventDefault();
      event.stopPropagation();
      const rect = event.currentTarget.getBoundingClientRect();
      const imageWidth = rect.width;
      const imageHeight = rect.height;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPercent = (x / imageWidth) * 100;
      const yPercent = (y / imageHeight) * 100;
      onContext(xPercent, yPercent);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();

    pressTimer = setTimeout(() => {
      setIsLongPress(true);
      if (onLongPress !== undefined) {
        const imageWidth = rect.width;
        const imageHeight = rect.height;
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const xPercent = (x / imageWidth) * 100;
        const yPercent = (y / imageHeight) * 100;
        onLongPress(xPercent, yPercent);
      }
    }, longPressDuration);
  };

  const handleTouchEnd = () => {
    clearTimeout(pressTimer);
    if (!isLongPress) {
      if (onClick !== undefined) {
        onClick();
      }
    }
    setIsLongPress(false);
  };

  const handleTouchCancel = () => {
    clearTimeout(pressTimer);
    setIsLongPress(false);
  };

  return (
    <>
      <img
        src={src}
        id={`fp-${src}`}
        alt="Floor plan"
        style={{
          width: "500px",
          height: "500px",
          display: "block",
          pointerEvents: "auto"
        }}
        onLoad={onLoad}
        onContextMenu={handleImageContext}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      />
    </>
  );
};

export default FloorPlanImage;
