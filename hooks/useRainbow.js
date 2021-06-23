import React from "react";

import { range, generateId } from "../utils/index";
import useIncrementingNumber from "./useIncrementingNumber";

const rainbowColors = [
  "hsl(278, 87%, 70%)", // gradient - 1
  "hsl(272, 76%, 47%)", // indigo
  "hsl(0, 0%, 45%)", // white
  "hsl(260deg, 100%, 55%)", // violet
  "hsl(272, 76%, 47%)", // pink
];
const paletteSize = rainbowColors.length;
const WINDOW_SIZE = 3;

// During compile-time build, we have to assume no browser support.
// On mount, we'll check if `CSS.registerProperty` exists
const hasBrowserSupport =
  typeof window !== "undefined"
    ? typeof window.CSS.registerProperty === "function"
    : false;

const getColorPropName = (id, index) => `--magic-rainbow-color-${id}-${index}`;

const useRainbow = ({ intervalDelay = 2000 }) => {
  const prefersReducedMotion =
    typeof window === "undefined"
      ? true
      : window.matchMedia("(prefers-reduced-motion: no-preference)");

  const isEnabled = hasBrowserSupport && prefersReducedMotion.matches;

  const { current: uniqueId } = React.useRef(generateId());

  // Register all custom properties
  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }

    range(0, WINDOW_SIZE).map((index) => {
      const name = getColorPropName(uniqueId, index);
      const initialValue = rainbowColors[index];
      CSS.registerProperty({
        name,
        initialValue,
        syntax: "<color>",
        inherits: false,
      });
    });
  }, [WINDOW_SIZE, isEnabled]);

  const intervalCount = useIncrementingNumber(intervalDelay);

  return range(0, WINDOW_SIZE).reduce((acc, index) => {
    const effectiveIntervalCount = isEnabled ? intervalCount : 0;

    const name = getColorPropName(uniqueId, index);
    const value = rainbowColors[(effectiveIntervalCount + index) % paletteSize];

    return {
      ...acc,
      [name]: value,
    };
  }, {});
};

export default useRainbow;
