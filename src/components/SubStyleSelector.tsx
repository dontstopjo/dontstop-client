import styled from '@emotion/styled';
import { useState } from 'react';
import { colors } from '../styles/theme';
import { mainStyles, subStyles, type MainStyle } from '../types/styleType';

interface SubStyleSelectorType {
  selectedSubs: string[] | undefined;
  setSelectedSubs: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SubStyleSelector = ({
  selectedSubs = [],
  setSelectedSubs,
}: SubStyleSelectorType) => {
  const [selectedMain, setSelectedMain] = useState<MainStyle>(mainStyles[0]);
  const [error, setError] = useState<string>('');

  const handleMainClick = (style: MainStyle) => {
    setSelectedMain(style);
    setError('');
  };

  const handleSubClick = (sub: string) => {
    setSelectedSubs((prev) => {
      const current = prev ?? [];

      if (current.includes(sub)) {
        setError('');
        return current.filter((item) => item !== sub);
      }

      if (current.length >= 2) {
        setError('서브 스타일은 최대 2개까지 선택할 수 있어요.');
        return current;
      }

      setError('');
      return [...current, sub];
    });
  };

  const handleReset = () => {
    setSelectedSubs([]);
    setError('');
  };

  return (
    <SelectorWrapper>
      <LeftPanel>
        {mainStyles.map((style) => (
          <MainItem
            key={style}
            isSelected={selectedMain === style}
            onClick={() => handleMainClick(style)}
          >
            {style}
          </MainItem>
        ))}
      </LeftPanel>

      <Divider />

      <RightPanel>
        <TopBar>
          <CountLabel>{selectedSubs.length} / 2 선택</CountLabel>
          <ResetButton onClick={handleReset}>초기화</ResetButton>
        </TopBar>

        <SubGrid>
          {selectedMain &&
            subStyles[selectedMain].map((sub) => (
              <SubTag
                key={sub}
                isSelected={selectedSubs.includes(sub)}
                onClick={() => handleSubClick(sub)}
              >
                {sub}
              </SubTag>
            ))}
        </SubGrid>

        <ErrorText>{error}</ErrorText>
      </RightPanel>
    </SelectorWrapper>
  );
};

const SelectorWrapper = styled.div`
  display: flex;
  gap: 0;
  padding: 6px;
  border-radius: 20px;
  background-color: ${colors.gray[50]};
  width: fit-content;
`;

const LeftPanel = styled.div`
  width: 148px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px;
  max-height: 260px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[200]};
    border-radius: 99px;
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: ${colors.gray[200]};
  margin: 8px 0;
  flex-shrink: 0;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 8px 10px 8px 14px;
  min-width: 0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const CountLabel = styled.span`
  font-size: 12px;
  color: ${colors.gray[500]};
  letter-spacing: 0.2px;
`;

const ResetButton = styled.button`
  font-size: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${colors.gray[500]};
  padding: 3px 8px;
  border-radius: 8px;
  transition:
    background 0.15s,
    color 0.15s;

  &:hover {
    background-color: ${colors.gray[100]};
    color: ${colors.gray[800]};
  }
`;

const MainItem = styled.button<{ isSelected: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  border: none;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    background 0.15s,
    color 0.15s;

  background-color: ${({ isSelected }) =>
    isSelected ? colors.gray[900] : 'transparent'};
  color: ${({ isSelected }) =>
    isSelected ? colors.gray[100] : colors.gray[600]};
  font-weight: ${({ isSelected }) => (isSelected ? 500 : 400)};

  &:hover {
    background-color: ${({ isSelected }) => !isSelected && colors.gray[100]};
    color: ${({ isSelected }) => !isSelected && colors.gray[800]};
    transition:
      background 0.15s,
      color 0.15s;
  }
`;

const SubGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 6px 8px;
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  padding-right: 2px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.gray[200]};
    border-radius: 99px;
  }
`;

const SubTag = styled.div<{ isSelected: boolean }>`
  padding: 7px 14px;
  border-radius: 99px;
  font-size: 13px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;

  background-color: ${({ isSelected }) =>
    isSelected ? colors.gray[900] : colors.gray[100]};
  color: ${({ isSelected }) =>
    isSelected ? colors.gray[100] : colors.gray[700]};

  &:hover {
    background-color: ${({ isSelected }) => !isSelected && colors.gray[200]};
    transition: background 0.15s;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const ErrorText = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #ff4d4f;
  min-height: 18px;
`;
