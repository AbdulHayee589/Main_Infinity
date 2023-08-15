import { fabric } from "fabric";

export const draw = (currRef, offsetX, offsetY) => {
  const canvas = currRef;
  const newLine = new fabric.PatternBrush('', { stroke: 'black', strokeWidth: 2});

  canvas.add(newLine);
  newLine.path.push(['M', offsetX, offsetY]);
}
