import styled from "styled-components";

import React from "react";

function Icon() {
  return (
    <IndiaMap src="/map.png" draggable={false}/>
  );
}

const MapSvg = () => {
  return (
    <div>
      <Icon />
    </div>
  );
};

const IndiaMap = styled.img`
  height: 60%;
  width: 60%;
`;

export default MapSvg;
