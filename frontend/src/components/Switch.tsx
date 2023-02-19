import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  onChange: (value: boolean) => void;
  value: boolean;
}

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  min-width: 40px;
  height: 20px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  &::before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  display: none;

  &:checked + ${Slider} {
    background-color: #00e36a;
  }

  &:checked + ${Slider}::before {
    transform: translateX(20px);
  }
`;

const Switch: React.FC<Props> = ({ onChange, value }) => {
  const [isOn, setIsOn] = useState(value);

  const handleClick = async () => {
    setIsOn(!isOn);
    await onChange(!isOn);
  };

  return (
    <SwitchContainer>
      <Input type="checkbox" checked={isOn} onChange={handleClick} />
      <Slider className="slider round"></Slider>
    </SwitchContainer>
  );
};

export default Switch;
