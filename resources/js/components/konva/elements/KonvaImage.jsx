import { useEffect, useRef } from "react";
import { Image, Transformer } from "react-konva";

const KonvaImage = ({ shapeProps, isSelected, onSelect, onChange, ...restProps }) => {
  const shapeRef = useRef(null);
  const trRef = useRef(null);

  const handleOnDragEnd = (e) => {
    onChange({
      ...shapeProps,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleOnTransformEnd = (e) => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    onChange({
      ...shapeProps,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
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
      <Image
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
export default KonvaImage;
