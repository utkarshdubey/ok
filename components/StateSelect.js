import React from "react";
import styled from "styled-components";
import stateData from "@/static/IndiaStates.json";

const StateSelect = ({ value, handleChange }) => {
  return (
    <Select value={value} onChange={handleChange}>
      <option defaultValue>Select state</option>
      {stateData.map((state, _) => (
        <option key={_} value={state}>{state}</option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  font-weight: 800;
  display: inline-block;
  width: 100%;
  padding: 30px 150px;
  border-width: 0;
  font-size: 0.8rem;
  text-align: center;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
  background: transparent;
  text-decoration: none;
  margin: 20px 0px;
  position: relative;
  border: 4px solid var(--primary);
  border-radius: 20px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  z-index: 20;
  overflow: hidden;
  cursor: pointer;
`;

export default StateSelect;
