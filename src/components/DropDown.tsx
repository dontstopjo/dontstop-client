import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '../styles/theme';
import { Arrow } from '../assets';

interface DropDownType {
  label?: string;
  options: readonly string[];
  onChange?: (value: string) => void;
}

export const DropDown = ({ label, options, onChange }: DropDownType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onChange?.(value);
  };

  return (
    <Wrapper>
      {label && <Label>{label}</Label>}

      <DropDownContent onClick={() => setIsOpen((prev) => !prev)}>
        {selected || '선택해주세요'}
        <Arrow />
      </DropDownContent>

      {isOpen && (
        <OptionList>
          {options.map((option) => (
            <Option key={option} onClick={() => handleSelect(option)}>
              {option}
            </Option>
          ))}
        </OptionList>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Label = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
`;

const DropDownContent = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${colors.gray[100]};
  font-size: 16px;
  color: ${colors.gray[800]};
`;

const OptionList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;

  width: 100%; /* ⭐ 버튼 크기 맞춤 */
  height: 200px;
  border-radius: 8px;
  background: ${colors.gray[100]};
  overflow: scroll;
`;

const Option = styled.div`
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: #f5f5f557;
  }
`;
