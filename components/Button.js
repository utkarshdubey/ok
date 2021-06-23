import React from "react";
import styled from "styled-components";
import useSound from "use-sound";
import useRainbow from "../hooks/useRainbow";

const Button = ({
  children,
  intervalDelay = 1300,
  isGrey,
  ...delegated
}) => {
  const transitionDelay = intervalDelay * 1.25;

  const colors = useRainbow({ intervalDelay });

  const colorKeys = Object.keys(colors);

  const soundUrl = "/sounds/pops.mp3";
  const [play, { stop }] = useSound(soundUrl, { volume: 0.5 });
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <ButtonElem
      {...delegated}
      onMouseEnter={() => {
        setIsHovering(true);
        play();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        stop();
      }}
      style={{
        ...colors,
        transition: isGrey
          ? ""
          : `
          ${colorKeys[0]} ${transitionDelay}ms linear,
          ${colorKeys[1]} ${transitionDelay}ms linear,
          ${colorKeys[2]} ${transitionDelay}ms linear
        `,
        background: isGrey
          ? "#44474D"
          : `
          radial-gradient(
            circle at top left,
            var(${colorKeys[2]}),
            var(${colorKeys[1]}),
            var(${colorKeys[0]})
          )
        `,
      }}
    >
      {children}
    </ButtonElem>
  );
};

const ButtonElem = styled.button`
  font-weight: 600;
  display: inline-block;
  width: 100%;
  padding: 30px 150px;
  border-width: 0;
  font-size: 0.8rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  margin: 20px 0px;
  position: relative;
  border: none;
  border-radius: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;
  cursor: pointer;

  &:after {
    background: #fff;
    content: "";
    height: 155px;
    left: -75px;
    opacity: 0.2;
    position: absolute;
    top: -50px;
    transform: rotate(35deg);
    transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    width: 50px;
    z-index: -10;
  }

  &:hover {
    &:after {
      left: 120%;
      transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
    }
  }
`;

export default Button;
