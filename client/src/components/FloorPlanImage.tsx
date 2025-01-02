import { MouseEvent, TouchEvent, useState } from "react";

interface FloorPlanImageProps {
  src: string;
  onLoad?: () => void;
  onClick?: () => void;
  onContext?: (x: number, y: number) => void;
  onLongPress?: (x: number, y: number) => void;
  longPressDuration?: number;
  moveThreshold?: number;
}

const FloorPlanImage = ({
  src,
  onLoad,
  onClick,
  onContext,
  onLongPress,
  longPressDuration = 2000,
  moveThreshold = 10
}: FloorPlanImageProps) => {
  const [isLongPress, setIsLongPress] = useState(false);

  let pressTimer: number | undefined = undefined;
  let startX = 0;
  let startY = 0;

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

  const handleTouchStart = (event: TouchEvent<HTMLImageElement>) => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    const rect = event.currentTarget.getBoundingClientRect();

    pressTimer = setTimeout(() => {
      setIsLongPress(true);
      pressTimer = undefined;
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

  const handleTouchMove = (event: TouchEvent<HTMLImageElement>) => {
    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - startX);
    const deltaY = Math.abs(touch.clientY - startY);

    if (deltaX > moveThreshold || deltaY > moveThreshold) {
      clearTimeout(pressTimer);
      setIsLongPress(false);
      pressTimer = undefined;
    }
  };

  const handleTouchEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = undefined;
    }
    if (!isLongPress) {
      if (onClick !== undefined) {
        onClick();
      }
    }
    setIsLongPress(false);
  };

  const handleTouchCancel = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = undefined;
    }
    setIsLongPress(false);
  };

  return (
    <img
      src={src}
      id={`fp-${src}`}
      alt="Floor plan"
      style={{
        width: "500px",
        height: "500px",
        display: "block",
        pointerEvents: "all",
        touchAction: "auto"
      }}
      onLoad={onLoad}
      onContextMenu={handleImageContext}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    />
  );
};

export default FloorPlanImage;
