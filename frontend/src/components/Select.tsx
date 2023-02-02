import React, { FC } from "react";
import styled from "styled-components";

interface Option {
  value: string;
  label: string;
  color: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  refInput?: React.RefObject<HTMLSelectElement>;
}

const StyledSelect = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;
const Option = styled.option`
  color: ${(props: { color: string }) => props.color};
`;

const Select: FC<Props> = ({ options, value, onChange, refInput }) => {
  return (
    <StyledSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      ref={refInput}
      placeholder="Select a class"
    >
      {options.map(({ value, label, color }) => (
        <Option key={value} value={value} color={color}>
          {label}
        </Option>
      ))}
    </StyledSelect>
  );
};

export default Select;
