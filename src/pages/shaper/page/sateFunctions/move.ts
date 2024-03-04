import { ShaperPageState } from "../ShaperPageState";

export function moveShape(
  state: ShaperPageState,
  ids: string[],
  direction: "x" | "y",
  transition: number,
): ShaperPageState {
  const shapes = state.shapes.map((shape) => {
    if (!ids.includes(shape.id)) {
      return shape;
    }

    const left = shape.left + transition * (direction === "x" ? 1 : 0);
    const top = shape.top + transition * (direction === "y" ? 1 : 0);

    return { ...shape, left, top };
  });

  return { ...state, shapes };
}
