import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Icon = ({ text, ...delegated }) => {
  return <IconWrapper {...delegated}>{text}</IconWrapper>;
};

const Accessibility = ({ text, ...delegated }) => {
  return (
    <>
      <Link href="/">
        <FlagIcon src="/flag.png" />
      </Link>
      <MainWrapper>
        <Icon text={text} {...delegated} />
      </MainWrapper>
    </>
  );
};

const IconWrapper = styled.div`
  padding: 20px 20px;
  margin: 0px 10px;
  background: #9796f0;
  background: ${(p) =>
    p.isGrey
      ? "var(--background-grey)"
      : `linear-gradient(
    to right,
    #c471f5,
    #7f1dd3
  )`};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
`;

const MainWrapper = styled.div`
  display: flex;
  position: absolute;
  top: 50px;
  right: 50px;
`;

const FlagIcon = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  top: 50px;
  left: 80px;
  cursor: pointer;
`;

export default Accessibility;
