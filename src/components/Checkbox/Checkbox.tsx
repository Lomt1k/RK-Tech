import { FC, useState } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: flex;
  gap: 10px;
  cursor: pointer;
  user-select: none;
`;

const StyledInput = styled.input`
  cursor: pointer;
`;

type CheckboxProps = {
 label: string;
 onStateChange: (state: boolean) => void;
 defaultChecked?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ label, onStateChange, defaultChecked = false }) => {
 const [isChecked, setIsChecked] = useState(defaultChecked);

 const handleChange = () => {
   const value = !isChecked;
   setIsChecked(value);
   onStateChange(value);
 };

 return (
   <StyledLabel>
     <StyledInput
       type="checkbox"
       checked={isChecked}
       onChange={handleChange}
       aria-label={label}
     />
     {label}
   </StyledLabel>
 );
};

export default Checkbox;
