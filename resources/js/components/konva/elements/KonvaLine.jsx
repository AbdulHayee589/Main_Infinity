import { useEffect, useRef } from "react";
import { Line, Transformer } from "react-konva";

const KonvaLine = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  ...restProps
}) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const handleOnDragEnd = (e) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleOnTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newPoints = node.points().map((point, index) => {
      if (index % 2 === 0) {
        // X coordinate of a point
        return point * scaleX;
      } else {
        // Y coordinate of a point
        return point * scaleY;
      }
    });

    onChange({
      ...shapeProps,
      points: newPoints,
    });
  };

  useEffect(() => {
    if (isSelected) {
      shapeRef.current.moveToTop();
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Line
        ref={shapeRef}
        {...shapeProps}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={handleOnDragEnd}
        onTransformEnd={handleOnTransformEnd}
        draggable
        {...restProps}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => newBox}
          rotateEnabled
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
        />
      )}
    </>
  );
};
export default KonvaLine;
