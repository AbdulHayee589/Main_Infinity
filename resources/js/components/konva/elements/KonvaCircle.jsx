import { useEffect, useRef } from "react";
import { Circle, Transformer } from "react-konva";

const KonvaCircle = ({ shapeProps, isSelected, onSelect, onChange, ...restProps }) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const handleOnDragEnd = (e) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

  const handleOnTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newRadius = Math.max(
      5,
      Math.max(
        node.width() * scaleX,
        node.height() * scaleY
      ) / 2
    );

    onChange({
      ...shapeProps,
      radius: newRadius,
    });
  }

  useEffect(() => {
    if (isSelected) {
      shapeRef.current.moveToTop();
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <Circle
        ref={shapeRef}
        radius={shapeProps.radius}
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
export default KonvaCircle;
