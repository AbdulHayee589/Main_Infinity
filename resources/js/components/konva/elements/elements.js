import { v4 as uuidv4 } from "uuid";

const defaultFill = "royalblue";
const defaultWidth = 50;
const defaultHeight = 50;
const defaultRadius = 25;

const addNewImage = (imageObj) => ({
    id: uuidv4(),
    type: 'img',
    x: 0,
    y: 0,
    image: imageObj,
    width: imageObj.width,
    height: imageObj.height,
});

const addNewRect = () => ({
    id: uuidv4(),
    type: "rect",
    x: 0,
    y: 0,
    width: defaultWidth,
    height: defaultHeight,
    fill: defaultFill,
});

const addNewCircle = () => ({
    id: uuidv4(),
    type: "circle",
    x: 25,
    y: 25,
    radius: defaultRadius,
    fill: defaultFill,
});

const addNewLine = () => ({
    id: uuidv4(),
    type: "line",
    x: 25,
    y: 25,
    points: [0, 0, 150, 0], // Specify the starting and ending points
    stroke: "royalblue", // Line color
    strokeWidth: 2, // Line width
});

export { addNewImage, addNewRect, addNewCircle, addNewLine };
