import styled from '@emotion/styled';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const CancleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border-radius: 50%;
  transform: translateY(-50%);
`;

export const S = {
  InputWrapper,
  CancleButton,
};
