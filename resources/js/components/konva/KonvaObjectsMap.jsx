import KonvaCircle from "./elements/KonvaCircle";
import KonvaImage from "./elements/KonvaImage";
import KonvaLine from "./elements/KonvaLine";
import KonvaRect from "./elements/KonvaRect";

const KonvaObjectsMap = ({
  konvaObjects,
  selectedKonvaObject,
  setSelectedKonvaObject,
  handleKonvaObjectChange,
}) => {
  const onChangeHandler = (obj, newAttrs) => {
    handleKonvaObjectChange(obj, newAttrs);
  };

  return konvaObjects.map(({ id, type, ...obj }) => {
    if (type === "img") {
      return (
        <KonvaImage
          key={id}
          shapeProps={obj}
          isSelected={id === selectedKonvaObject}
          onSelect={() => {
            setSelectedKonvaObject(id);
          }}
          onChange={(newAttrs) => {
            onChangeHandler(obj, newAttrs);
          }}
        />
      );
    } else if (type === "rect") {
      return (
        <KonvaRect
          key={id}
          shapeProps={obj}
          isSelected={id === selectedKonvaObject}
          onSelect={() => {
            setSelectedKonvaObject(id);
          }}
          onChange={(newAttrs) => {
            onChangeHandler(obj, newAttrs);
          }}
        />
      );
    } else if (type === "circle") {
      return (
        <KonvaCircle
          key={id}
          shapeProps={obj}
          isSelected={id === selectedKonvaObject}
          onSelect={() => {
            setSelectedKonvaObject(id);
          }}
          onChange={(newAttrs) => {
            onChangeHandler(obj, newAttrs);
          }}
        />
      );
    } else if (type === "line") {
      return (
        <KonvaLine
          key={id}
          shapeProps={obj}
          isSelected={id === selectedKonvaObject}
          onSelect={() => {
            setSelectedKonvaObject(id);
          }}
          onChange={(newAttrs) => {
            onChangeHandler(obj, newAttrs);
          }}
        />
      );
    }
  });
};

export default KonvaObjectsMap;
