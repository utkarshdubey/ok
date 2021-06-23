import styled from "styled-components";
import { generateSparkle } from "./generateSparkle";
import { useRandomInterval, usePrefersReducedMotion } from "../../hooks/index";
import { range } from "../../utils/index";
import React from "react";
import Sparkle from "./SparkleInstance";

const DEFAULT_COLOR = 'hsl(50deg, 100%, 50%)';

const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }) => {
  const [sparkles, setSparkles] = React.useState(() => {
    return range(3).map(() => generateSparkle(color));
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 450
  );
  return (
    <Wrapper {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <ChildWrapper>{children}</ChildWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;
const ChildWrapper = styled.strong`
  position: relative;
  z-index: 1;
  font-weight: bold;
`;
export default Sparkles;