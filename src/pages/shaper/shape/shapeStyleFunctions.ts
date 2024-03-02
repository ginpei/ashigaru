import { ShapeData } from "./ShapeData";

export function mergeMultipleShapes(shapes: ShapeData[]): Partial<ShapeData> {
  const result: Partial<ShapeData> = {};

  if (shapes.length < 1) {
    return result;
  }

  const keys = Object.keys(shapes[0]) as (keyof ShapeData)[];
  for (const key of keys) {
    const value = shapes[0]?.[key];
    const same = shapes.every((shape) => shape[key] === value);
    result[key] = same ? (value as any) : undefined;
  }

  return result;
}

function mergeValue<T extends keyof ShapeData>(
  shapes: ShapeData[],
  key: T,
): ShapeData[T] | undefined {
  const value = shapes[0]?.[key];
  const same = shapes.every((shape) => shape[key] === value);
  return same ? value : undefined;
}

export function canvasDataToStyle(data: ShapeData): React.CSSProperties {
  return {
    ...getShapeLayoutStyle(data),
    backgroundColor: data.color,
    position: "absolute",
  };
}

export function getShapeLayoutStyle(
  shape: ShapeData,
): Record<"top" | "left" | "width" | "height", number> {
  return {
    top: shape.top,
    left: shape.left,
    width: shape.width,
    height: shape.height,
  };
}
